'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/lib/types'
import styles from '@/styles/projekt.module.css'

interface Props {
  images: GalleryImage[]
  alt: string
}

export default function GalleryLightbox({ images, alt }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, prev, next])

  return (
    <>
      <div className={styles.galleryGrid}>
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className={styles.galleryItem}
            onClick={() => setOpenIndex(i)}
            aria-label={`${alt} — ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={`${alt} — ${i + 1}`}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 25vw"
              className={styles.galleryImg}
              placeholder={img.lqip ? 'blur' : 'empty'}
              blurDataURL={img.lqip}
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={close}>
          <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Zamknij">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Poprzednie zdjęcie"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
          )}

          <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[openIndex].url}
              alt={`${alt} — ${openIndex + 1}`}
              fill
              quality={90}
              sizes="100vw"
              className={styles.lightboxImage}
              placeholder={images[openIndex].lqip ? 'blur' : 'empty'}
              blurDataURL={images[openIndex].lqip}
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Następne zdjęcie"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          {images.length > 1 && (
            <div className={styles.lightboxCounter}>{openIndex + 1} / {images.length}</div>
          )}
        </div>
      )}
    </>
  )
}
