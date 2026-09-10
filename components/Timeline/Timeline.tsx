'use client'

import { useEffect, useRef } from 'react'
import styles from './Timeline.module.css'

interface TimelineItem {
  year: string
  title: string
  title_en: string
  text: string
  text_en: string
}

interface Props {
  items: TimelineItem[]
  lang: string
}

export default function Timeline({ items, lang }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const isEn = lang === 'en'

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    const progress = progressRef.current
    if (!wrap || !track || !progress) return

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect()
      const wrapH = wrap.offsetHeight
      const viewH = window.innerHeight
      const trackW = track.scrollWidth - window.innerWidth

      const scrolled = -rect.top
      const total = wrapH - viewH
      const ratio = Math.max(0, Math.min(1, scrolled / total))

      track.style.transform = `translateX(-${ratio * trackW}px)`
      progress.style.width = `${ratio * 100}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop: sticky horizontal scroll */}
      <div ref={wrapRef} className={styles.wrapper}>
        <div className={styles.sticky}>
          <div ref={trackRef} className={styles.track}>
            {items.map(item => (
              <div key={item.year} className={styles.item}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.itemTitle}>{isEn ? item.title_en : item.title}</h3>
                <p className={styles.itemText}>{isEn ? item.text_en : item.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.progressBar}>
            <div ref={progressRef} className={styles.progress} />
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className={styles.mobile}>
        {items.map(item => (
          <div key={item.year} className={styles.mobileItem}>
            <span className={styles.year}>{item.year}</span>
            <h3 className={styles.itemTitle}>{isEn ? item.title_en : item.title}</h3>
            <p className={styles.itemText}>{isEn ? item.text_en : item.text}</p>
          </div>
        ))}
      </div>
    </>
  )
}
