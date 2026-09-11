'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type FormError = 'captcha' | 'validation' | 'generic'

interface ContactDict {
  name: string
  name_placeholder: string
  email: string
  email_placeholder: string
  message: string
  message_placeholder: string
  submit: string
  sending: string
  success_title: string
  success_sub: string
  consent: string
  consent_link: string
  consent_error: string
  error_captcha: string
  error_validation: string
  error_generic: string
}

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function ContactForm({ dict, lang = 'pl' }: { dict: ContactDict; lang?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [error, setError] = useState<FormError | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [scriptReady, setScriptReady] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const base = lang === 'en' ? '/en' : ''

  // Widget Cloudflare Turnstile (captcha) — renderowany po załadowaniu skryptu.
  useEffect(() => {
    if (!scriptReady || !SITE_KEY || !widgetRef.current || !window.turnstile || widgetId.current) return
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: SITE_KEY,
      action: 'contact_form',
      theme: 'dark',
      language: lang === 'en' ? 'en' : 'pl',
      callback: (t: string) => setToken(t),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    })
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = null
    }
  }, [scriptReady, lang])

  // Token jest jednorazowy — po każdej próbie wysyłki trzeba go odnowić.
  const resetCaptcha = () => {
    setToken('')
    if (widgetId.current) window.turnstile?.reset(widgetId.current)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setConsentError(true)
      return
    }
    if (!token) {
      setError(SITE_KEY ? 'captcha' : 'generic')
      return
    }
    setError(null)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent, company: honeypot, token, lang }),
      })
      if (res.ok) {
        setStatus('sent')
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.error === 'validation' ? 'validation' : data.error === 'captcha' ? 'captcha' : 'generic')
    } catch {
      setError('generic')
    }
    setStatus('idle')
    resetCaptcha()
  }

  if (status === 'sent') {
    return (
      <div className={styles.success}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <p>{dict.success_title}<br />{dict.success_sub}</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
        />
      )}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">{dict.name}</label>
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={dict.name_placeholder}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">{dict.email}</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={dict.email_placeholder}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">{dict.message}</label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={dict.message_placeholder}
        />
      </div>
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </div>
      <div className={styles.consentRow}>
        <input
          className={styles.checkbox}
          id="consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={e => {
            setConsent(e.target.checked)
            if (e.target.checked) setConsentError(false)
          }}
        />
        <label className={styles.consentLabel} htmlFor="consent">
          {dict.consent}{' '}
          <Link href={`${base}/polityka-prywatnosci`} className={styles.consentLink} target="_blank" rel="noopener noreferrer">
            {dict.consent_link}
          </Link>
        </label>
      </div>
      {consentError && <p className={styles.consentErrorText}>{dict.consent_error}</p>}
      {SITE_KEY && <div ref={widgetRef} className={styles.turnstile} />}
      {error && <p className={styles.formError} role="alert">{dict[`error_${error}`]}</p>}
      <button className={styles.btn} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? dict.sending : dict.submit}
        {status !== 'sending' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </form>
  )
}
