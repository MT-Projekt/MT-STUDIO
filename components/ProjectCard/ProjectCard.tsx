'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/types'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  size?: 'large' | 'medium' | 'small'
  lang?: string
  grayscale?: boolean
  imageOnly?: boolean
}

export default function ProjectCard({ project, size = 'medium', lang = 'pl', grayscale = false, imageOnly = false }: Props) {
  const base = lang === 'en' ? '/en' : ''
  return (
    <Link href={`${base}/projekty/${project.slug}`} className={`${styles.card} ${grayscale ? styles.grayscale : ''} ${imageOnly ? styles.imageOnlyCard : ''}`}>
      <div className={styles.imageWrap}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          placeholder={project.coverImageLqip ? 'blur' : 'empty'}
          blurDataURL={project.coverImageLqip}
        />
        {!imageOnly && (
          <>
            <div className={styles.gradientOverlay} />
            <div className={styles.metaOverlay}>
              <span className={styles.year}>{project.year}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.location}>{project.location}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
