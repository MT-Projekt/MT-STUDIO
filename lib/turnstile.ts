import 'server-only'

type SiteverifyResult = {
  success: boolean
  hostname?: string
  action?: string
  'error-codes'?: string[]
  metadata?: { result_with_testing_key?: boolean }
}

// Powód odrzucenia trafia do logu serwera — bez tokenu i bez IP odwiedzającego.
function reject(reason: string): false {
  console.warn(`[contact] captcha odrzucona: ${reason}`)
  return false
}

// Weryfikacja tokenu Cloudflare Turnstile po stronie serwera (wg EMAIL_SETUP.md).
// Token jest jednorazowy — przeglądarka resetuje widget po każdej próbie wysyłki.
export async function verifyTurnstile(token: unknown, clientIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? '').split(',').map(h => h.trim()).filter(Boolean)
  )

  if (!secret) return reject('brak TURNSTILE_SECRET w .env')
  if (expectedHostnames.size === 0) return reject('brak TURNSTILE_HOSTNAMES w .env')
  if (typeof token !== 'string' || token.length === 0) return reject('brak tokenu w zapytaniu')
  if (token.length > 2048) return reject('token za dlugi')

  const body = new URLSearchParams({ secret, response: token })
  if (clientIp) body.set('remoteip', clientIp)

  let result: SiteverifyResult
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body,
    })
    result = await r.json()
  } catch (e) {
    return reject(`brak polaczenia z Cloudflare (${e instanceof Error ? e.message : e})`)
  }

  if (!result.success) {
    return reject(`Cloudflare odrzucil token: ${(result['error-codes'] ?? []).join(', ') || 'bez kodu'}`)
  }

  // Klucze testowe Cloudflare nie zwracają `action` ani prawdziwej domeny,
  // więc dopuszczamy je wyłącznie przy `npm run dev`. Na produkcji zawsze pełna kontrola.
  if (result.metadata?.result_with_testing_key && process.env.NODE_ENV !== 'production') {
    return true
  }

  if (result.action !== 'contact_form') {
    return reject(`niezgodna akcja: "${result.action ?? '(brak)'}" zamiast "contact_form"`)
  }
  if (!result.hostname || !expectedHostnames.has(result.hostname)) {
    return reject(
      `domena "${result.hostname ?? '(brak)'}" spoza TURNSTILE_HOSTNAMES (${[...expectedHostnames].join(', ')})`
    )
  }
  return true
}
