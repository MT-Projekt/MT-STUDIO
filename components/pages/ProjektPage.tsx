import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/lib/sanity'
import { Dictionary } from '@/lib/dictionaries'
import GalleryLightbox from '@/components/GalleryLightbox/GalleryLightbox'
import styles from '@/styles/projekt.module.css'

interface Props {
  lang: string
  dict: Dictionary
  slug: string
}

function CalendarIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function RoadIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M2 8h20M2 16h20M6 4v16M18 4v16" />
    </svg>
  )
}

export default async function ProjektPage({ lang, dict, slug }: Props) {
  const [project, all] = await Promise.all([
    getProjectBySlug(slug, lang),
    getAllProjects(lang),
  ])
  if (!project) notFound()

  const base = lang === 'en' ? '/en' : ''
  const currentIdx = all.findIndex(p => p.slug === project.slug)
  const next = all[(currentIdx + 1) % all.length]
  const d = dict.project_page
  const gallery = project.images ?? []
  const hasTechSection = Boolean(project.pointCloudImage || project.terrainModelImage || project.existingStateImage)

  const infoCards = [
    project.year && { label: d.year, value: String(project.year), Icon: CalendarIcon },
    project.location && { label: d.location, value: project.location, Icon: PinIcon },
    project.area && { label: d.area, value: project.area, Icon: RoadIcon },
  ].filter(Boolean) as { label: string; value: string; Icon: () => React.JSX.Element }[]

  return (
    <article className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.heroImg}
          placeholder={project.coverImageLqip ? 'blur' : 'empty'}
          blurDataURL={project.coverImageLqip}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.breadcrumbs}>
            <Link href={base || '/'}>{d.home}</Link>
            <span> › </span>
            <Link href={`${base}/projekty`}>{d.back}</Link>
            <span> › </span>
            <span className={styles.breadcrumbCurrent}>{project.title}</span>
          </div>
          <span className={styles.heroBadge}>{d.badge}</span>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          {project.description && <p className={styles.heroDesc}>{project.description}</p>}
          {project.location && (
            <div className={styles.heroLocation}>
              <PinIcon />
              {project.location}
            </div>
          )}
        </div>
      </section>

      {/* INFO CARDS */}
      {infoCards.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {infoCards.map(({ label, value, Icon }) => (
              <div key={label} className={styles.card}>
                <div className={styles.cardIcon}>
                  <Icon />
                </div>
                <h3>{value}</h3>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHMURA PUNKTÓW */}
      {hasTechSection && (
        <section className={styles.techSection}>
          <div className={styles.techInner}>
            <div className={styles.techHeader}>
              <span className={styles.techEyebrow}>{d.tech_eyebrow}</span>
              <h2 className={styles.techTitle}>{d.tech_title}</h2>
            </div>
            <div className={styles.techGrid}>
              {project.pointCloudImage && (
                <div className={styles.techPanelLarge}>
                  <span className={styles.panelCaption}>{d.tech_pointcloud}</span>
                  <Image
                    src={project.pointCloudImage}
                    alt={d.tech_pointcloud}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className={styles.techPanelImg}
                    placeholder={project.pointCloudImageLqip ? 'blur' : 'empty'}
                    blurDataURL={project.pointCloudImageLqip}
                  />
                </div>
              )}
              {(project.terrainModelImage || project.existingStateImage) && (
                <div className={styles.techPanelRow}>
                  {project.terrainModelImage && (
                    <div className={styles.techPanelSmall}>
                      <span className={styles.panelCaption}>{d.tech_terrain}</span>
                      <Image
                        src={project.terrainModelImage}
                        alt={d.tech_terrain}
                        fill
                        quality={90}
                        sizes="(max-width: 1024px) 50vw, 35vw"
                        className={styles.techPanelImg}
                        placeholder={project.terrainModelImageLqip ? 'blur' : 'empty'}
                        blurDataURL={project.terrainModelImageLqip}
                      />
                    </div>
                  )}
                  {project.existingStateImage && (
                    <div className={styles.techPanelSmall}>
                      <span className={styles.panelCaption}>{d.tech_existing}</span>
                      <Image
                        src={project.existingStateImage}
                        alt={d.tech_existing}
                        fill
                        quality={90}
                        sizes="(max-width: 1024px) 50vw, 35vw"
                        className={styles.techPanelImg}
                        placeholder={project.existingStateImageLqip ? 'blur' : 'empty'}
                        blurDataURL={project.existingStateImageLqip}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryHeader}>
            <div>
              <h2>{d.gallery_title}</h2>
              <div className={styles.greenLine} />
            </div>
          </div>
          <GalleryLightbox images={gallery} alt={project.title} />
        </section>
      )}

      {/* NEXT PROJECT */}
      {next && (
        <div className={styles.nextProject}>
          <span className={styles.nextLabel}>{d.next}</span>
          <Link href={`${base}/projekty/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextTitle}>{next.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      )}

      {/* CONTACT PANEL */}
      <section className={styles.contactPanel}>
        <div className={styles.contactFlex}>
          <div className={styles.contactLeft}>
            <div className={styles.contactIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3>{d.contact_title}</h3>
              <p>{d.contact_text}</p>
            </div>
          </div>
          <a href={`${base}/#kontakt`} className={styles.contactBtn}>
            {d.contact_cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </section>
    </article>
  )
}
