import Link from 'next/link'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/not-found.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

export default function NotFoundPage({ lang, dict }: Props) {
  const d = dict.not_found
  const base = lang === 'en' ? '/en' : ''
  return (
    <section className={styles.page}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>{d.title}</h1>
      <p className={styles.text}>{d.text}</p>
      <div className={styles.actions}>
        <Link href={base || '/'} className={styles.primary}>{d.cta_home}</Link>
        <Link href={`${base}/projekty`} className={styles.secondary}>{d.cta_projects}</Link>
      </div>
    </section>
  )
}
