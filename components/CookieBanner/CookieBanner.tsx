'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'mtp-privacy-notice'

interface CookieDict {
  text: string
  accept: string
  more: string
}

interface Props {
  lang: string
  dict: CookieDict
}

export default function CookieBanner({ lang, dict }: Props) {
  // Startujemy jako niewidoczny, zeby serwer i klient wyrenderowaly to samo.
  const [visible, setVisible] = useState(false)
  const base = lang === 'en' ? '/en' : ''

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'dismissed') setVisible(true)
    } catch {
      // Prywatne okno lub zablokowana pamiec przegladarki - pokazujemy komunikat.
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'dismissed')
    } catch {
      // Brak zapisu oznacza tylko, ze komunikat pojawi sie ponownie.
    }
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label={dict.accept}>
      <div className={styles.inner}>
        <p className={styles.text}>{dict.text}</p>
        <div className={styles.actions}>
          <Link href={`${base}/polityka-prywatnosci`} className={styles.more}>
            {dict.more}
          </Link>
          <button type="button" className={styles.accept} onClick={dismiss}>
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
