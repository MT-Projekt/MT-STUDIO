import 'server-only'
import { randomUUID } from 'crypto'

// Wysyłka maili przez Microsoft Graph (client credentials flow, wg EMAIL_SETUP.md).
// Aplikacja w Entra ID ma uprawnienie Mail.Send ograniczone do skrzynki MAIL_FROM.

const REQUIRED = ['AZURE_TENANT_ID', 'AZURE_CLIENT_ID', 'AZURE_CLIENT_SECRET', 'MAIL_FROM', 'MAIL_TO'] as const

export function missingGraphConfig(): string[] {
  return REQUIRED.filter(k => !process.env[k])
}

// Błąd z danymi do diagnostyki. Szczegóły można pokazać publicznie:
// bez sekretów, tokenów, identyfikatorów aplikacji/tenanta, adresów e-mail
// i danych osobowych z formularza.
export class GraphError extends Error {
  constructor(message: string, public details: Record<string, string | undefined>) {
    super(message)
    this.name = 'GraphError'
  }
}

export function formatGraphError(e: GraphError): string {
  const rows = Object.entries(e.details).filter(([, v]) => v)
  const width = Math.max(...rows.map(([k]) => k.length))
  return [e.message, ...rows.map(([k, v]) => `  ${k.padEnd(width)} : ${v}`)].join('\n')
}

// Microsoft potrafi wstawić do opisu błędu identyfikatory (GUID) i adresy — wycinamy je.
function sanitize(text: string): string | undefined {
  const s = text
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, '<id>')
    .replace(/[^\s@'"<>]+@[^\s@'"<>]+\.[a-z]{2,}/gi, '<adres>')
    .slice(0, 300)
  return s || undefined
}

// Podpowiedź po polsku dla najczęstszych błędów Entra ID / Graph / Exchange.
function hint(status: number, codes: string, description: string): string | undefined {
  if (description.includes('RAOP'))
    return 'Application Access Policy w Exchange blokuje aplikację dla skrzynki nadawcy (MAIL_FROM). Sprawdzić, czy skrzynka jest bezpośrednim członkiem grupy polityki, albo odczekać propagację zmian (do ponad 1 h).'
  if (codes.includes('7000222')) return 'Sekret aplikacji WYGASŁ — wygenerować nowy w Entra ID i podmienić AZURE_CLIENT_SECRET w .env.'
  if (codes.includes('7000215')) return 'Nieprawidłowy sekret aplikacji — sprawdzić AZURE_CLIENT_SECRET w .env.'
  if (codes.includes('700016')) return 'Aplikacja o tym AZURE_CLIENT_ID nie istnieje w tym tenancie.'
  if (codes.includes('90002')) return 'Nieprawidłowy AZURE_TENANT_ID.'
  if (status === 404 || codes === 'ErrorInvalidUser' || codes === 'ResourceNotFound')
    return 'Skrzynka nadawcy (MAIL_FROM) nie istnieje albo nie ma licencji Exchange Online.'
  if (status === 401) return 'Graph odrzucił token — problem z uwierzytelnieniem aplikacji.'
  if (codes === 'ErrorAccessDenied') return 'Brak dostępu do skrzynki — sprawdzić uprawnienie Mail.Send i zgodę administratora.'
  return undefined
}

function tokenRoles(jwt: string): string[] {
  try {
    return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString()).roles ?? []
  } catch {
    return []
  }
}

let cached: { token: string; expiresAt: number; roles: string[] } | null = null

async function getAccessToken(): Promise<{ token: string; roles: string[] }> {
  if (cached && Date.now() < cached.expiresAt) return cached

  const r = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(process.env.AZURE_TENANT_ID!)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        client_id: process.env.AZURE_CLIENT_ID!,
        client_secret: process.env.AZURE_CLIENT_SECRET!,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  )
  const data = await r.json().catch(() => ({}))
  if (!r.ok || !data.access_token) {
    const codes = (data.error_codes ?? []).join(',')
    throw new GraphError('Pobranie tokenu z Entra ID nieudane', {
      etap: 'token (Entra ID)',
      http: `${r.status} ${data.error ?? ''}`.trim(),
      'kody AADSTS': codes || undefined,
      opis: sanitize(String(data.error_description ?? '').split(/\r?\n/)[0]),
      podpowiedz: hint(r.status, codes, ''),
      'trace-id': data.trace_id,
      'correlation-id': data.correlation_id,
    })
  }
  // Token odświeżamy minutę przed wygaśnięciem.
  cached = {
    token: data.access_token,
    expiresAt: Date.now() + (Number(data.expires_in) - 60) * 1000,
    roles: tokenRoles(data.access_token),
  }
  return cached
}

export interface MailInput {
  subject: string
  text: string
  replyTo?: { address: string; name?: string }
}

export async function sendMail({ subject, text, replyTo }: MailInput): Promise<void> {
  const { token, roles } = await getAccessToken()
  const clientRequestId = randomUUID()
  const r = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(process.env.MAIL_FROM!)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // Identyfikator, po którym to zapytanie da się znaleźć w logach Microsoftu.
        'client-request-id': clientRequestId,
        'return-client-request-id': 'true',
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: 'Text', content: text },
          toRecipients: [{ emailAddress: { address: process.env.MAIL_TO! } }],
          ...(replyTo ? { replyTo: [{ emailAddress: replyTo }] } : {}),
        },
        // Kopia i tak trafia do skrzynki MAIL_TO — nie dublujemy jej w wysłanych nadawcy.
        saveToSentItems: false,
      }),
    }
  )
  // Graph potwierdza przyjęcie wiadomości kodem 202 Accepted.
  if (r.status !== 202) {
    const data = await r.json().catch(() => ({}))
    if (r.status === 401) cached = null
    const code = String(data?.error?.code ?? '')
    const description = String(data?.error?.message ?? '')
    const inner = data?.error?.innerError ?? {}
    throw new GraphError('Wysyłka przez Microsoft Graph nieudana', {
      etap: 'sendMail (Microsoft Graph)',
      uprawnienia: roles.join(', ') || '(brak)',
      http: `${r.status} ${code}`.trim(),
      opis: sanitize(description),
      podpowiedz: hint(r.status, code, description),
      'request-id': inner['request-id'] ?? r.headers.get('request-id') ?? undefined,
      'client-request-id': inner['client-request-id'] ?? r.headers.get('client-request-id') ?? clientRequestId,
      'czas (UTC)': inner.date ?? r.headers.get('date') ?? undefined,
    })
  }
}
