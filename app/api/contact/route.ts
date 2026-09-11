import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstile } from '@/lib/turnstile'
import { GraphError, formatGraphError, missingGraphConfig, sendMail } from '@/lib/graph'

// Formularz kontaktowy: walidacja -> pułapka na boty -> Turnstile -> wysyłka przez Microsoft Graph.
// Odpowiedzi: 200 { ok } | 400 validation | 403 captcha | 503 config | 502 send

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const s = value.trim()
  return s.length > 0 && s.length <= max ? s : null
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get('content-length') ?? 0) > 20_000) {
    return NextResponse.json({ error: 'validation' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'validation' }, { status: 400 })
  }

  // Pułapka na boty: pole niewidoczne dla człowieka. Botowi udajemy sukces.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, 100)?.replace(/[\r\n\t]+/g, ' ') ?? null
  const email = clean(body.email, 254)
  const message = clean(body.message, 5000)
  if (!name || !email || !EMAIL_RE.test(email) || !message || body.consent !== true) {
    return NextResponse.json({ error: 'validation' }, { status: 400 })
  }

  const clientIp =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip')

  if (!(await verifyTurnstile(body.token, clientIp ?? null))) {
    return NextResponse.json({ error: 'captcha' }, { status: 403 })
  }

  const missing = missingGraphConfig()
  if (missing.length > 0) {
    // Tylko nazwy brakujących zmiennych — bez wartości.
    console.error('[contact] brak konfiguracji:', missing.join(', '))
    return NextResponse.json({ error: 'config' }, { status: 503 })
  }

  const lang = body.lang === 'en' ? 'EN' : 'PL'
  try {
    await sendMail({
      subject: `Formularz kontaktowy: ${name}`,
      text: [
        'Nowa wiadomość z formularza kontaktowego na stronie mt-p.pl',
        '',
        `Imię i nazwisko: ${name}`,
        `E-mail: ${email}`,
        `Wersja językowa strony: ${lang}`,
        `Zgoda na przetwarzanie danych: TAK (${new Date().toISOString()})`,
        '',
        'Wiadomość:',
        message,
        '',
        '—',
        'Użyj opcji „Odpowiedz", a wiadomość trafi bezpośrednio do nadawcy.',
      ].join('\n'),
      replyTo: { address: email, name },
    })
  } catch (e) {
    // Szczegóły techniczne do diagnostyki — bez danych osobowych z formularza.
    if (e instanceof GraphError) console.error('[contact] ' + formatGraphError(e))
    else console.error('[contact] wysyłka nieudana:', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
