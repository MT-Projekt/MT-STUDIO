'use client'
import { useState } from 'react'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

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
}

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: podpiąć pod Strapi / własny endpoint
    await new Promise(r => setTimeout(r, 1000))
    setStatus('sent')
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
