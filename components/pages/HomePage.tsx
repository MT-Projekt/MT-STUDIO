import Image from 'next/image'
import Link from 'next/link'
import { studioInfo } from '@/lib/mockData'
import { getFeaturedProjects, getTeam } from '@/lib/sanity'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import ContactForm from '@/components/ContactForm/ContactForm'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/home.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

const marqueeItems = [
  'Obiekty inżynierskie', 'Drogi i ulice', 'Sieci i odwodnienie',
  'Geodezja i pomiary', 'Koordynacja projektów', 'BIM / CAD', 'Nadzory inwestorskie',
]

const marqueeEn = [
  'Engineering structures', 'Roads & streets', 'Networks & drainage',
  'Surveying', 'Project coordination', 'BIM / CAD', 'Investment supervision',
]

function RoadIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L9 4h6l5 16M8 14h8M10 4L7 20M14 4l3 16" />
    </svg>
  )
}
function DropletIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}
function TrafficLightIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="18" rx="3" />
      <circle cx="12" cy="7" r="1.4" /><circle cx="12" cy="11" r="1.4" /><circle cx="12" cy="15" r="1.4" />
      <path d="M12 20v2" />
    </svg>
  )
}
function LeafIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13c0-6 8-10 16-10 0 8-4 16-10 16z" />
      <path d="M5 20 19 6" />
    </svg>
  )
}
function CoordinationIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" /><circle cx="17" cy="8" r="3" />
      <path d="M2 21c0-3.3 2.7-6 6-6s6 2.7 6 6M14 15.5c.6-.3 1.3-.5 2-.5 3.3 0 6 2.7 6 6" />
    </svg>
  )
}
function CompassIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8l-2.5 6.5L7 17l2.5-6.5z" />
    </svg>
  )
}
function CubeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5v10l-9 5-9-5V7z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

const aboutTiles = [
  { Icon: RoadIcon, title: 'Drogi', title_en: 'Roads', text: 'Tworzymy kompleksowe projekty dróg oraz obiektów inżynierskich, łącząc nowoczesne rozwiązania z bezpieczeństwem, trwałością i funkcjonalnością.', text_en: 'We create comprehensive road and engineering structure designs, combining modern solutions with safety, durability and functionality.' },
  { Icon: DropletIcon, title: 'Sieci i odwodnienia', title_en: 'Networks & drainage', text: 'Opracowujemy projekty sieci sanitarnych, kanalizacji deszczowej, odwodnienia oraz infrastruktury technicznej.', text_en: 'We design sanitary networks, stormwater drainage, drainage systems and technical infrastructure.' },
  { Icon: TrafficLightIcon, title: 'Inżynieria ruchu', title_en: 'Traffic engineering', text: 'Projektujemy organizację ruchu, sygnalizację świetlną i oznakowanie drogowe oraz wykonujemy analizy bezpieczeństwa ruchu drogowego (BRD).', text_en: 'We design traffic organisation, traffic signals and road signage, and carry out road safety audits.' },
  { Icon: LeafIcon, title: 'Zieleń i ochrona środowiska', title_en: 'Greenery & environment', text: 'Wykonujemy inwentaryzacje dendrologiczne oraz opracowujemy projekty nasadzeń miejskich i zagospodarowania terenów zieleni.', text_en: 'We carry out tree inventories and design urban planting schemes and green area development.' },
  { Icon: CoordinationIcon, title: 'Koordynacja projektów', title_en: 'Project coordination', text: 'Prowadzimy koordynację wszystkich branż projektowych, zapewniając zgodność opracowań, terminowość działań i sprawną realizację całego procesu projektowego.', text_en: 'We coordinate all design disciplines, ensuring consistency, timeliness and smooth delivery of the entire design process.' },
  { Icon: CompassIcon, title: 'Geodezja', title_en: 'Surveying', text: 'Wykonujemy pomiary geodezyjne oraz opracowujemy mapy do celów projektowych, mapy podziałowe, ortofotomapy i modele terenu 3D.', text_en: 'We carry out surveying works and prepare maps for design purposes, subdivision maps, orthophotomaps and 3D terrain models.' },
  { Icon: CubeIcon, title: 'BIM i koordynacja cyfrowa', title_en: 'BIM & digital coordination', text: 'Tworzymy modele BIM oraz realistyczne wizualizacje 3D, które ułatwiają prezentację projektowanych rozwiązań.', text_en: 'We create BIM models and realistic 3D visualisations that make it easier to present design solutions.' },
  { Icon: ShieldIcon, title: 'Nadzory inwestorskie', title_en: 'Investment supervision', text: 'Sprawujemy nadzór nad realizacją inwestycji, kontrolując zgodność robót z dokumentacją projektową, przepisami oraz wymaganiami jakościowymi.', text_en: 'We supervise project execution, verifying compliance of works with design documentation, regulations and quality requirements.' },
]

export default async function HomePage({ lang, dict }: Props) {
  const projects = await getFeaturedProjects(lang)
  const team = await getTeam(lang)
  const base = lang === 'en' ? '/en' : ''
  const d = dict as any
  const isEn = lang === 'en'

  const marqueeList = isEn ? marqueeEn : marqueeItems

  const aboutEyebrow = isEn ? 'About us' : 'O nas'
  const aboutTitle = isEn ? 'A multidisciplinary design office for modern infrastructure.' : 'Wielobranżowe biuro projektowe dla nowoczesnej infrastruktury.'
  const aboutCta = isEn ? 'Learn more about MT-Projekt →' : 'Poznaj bliżej MT-Projekt →'

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/heromain.png"
            alt="MT-Projekt infrastruktura drogowa"
            fill priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>{d.hero.label}</div>
          <h1 className={styles.heroTitle}>{d.hero.title}</h1>
          <p className={styles.heroSub}>{d.hero.sub}</p>
          <div className={styles.heroBtns}>
            <Link href={`${base}/projekty`} className={styles.heroBtn}>
              {d.hero.btn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>{d.hero.scroll}</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...marqueeList, ...marqueeList].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* O NAS */}
      <section className={styles.about} id="o-nas">
        <div className={styles.aboutHeader}>
          <span className={styles.aboutEyebrow}>{aboutEyebrow}</span>
          <h2 className={styles.aboutTitle}>{aboutTitle}</h2>
        </div>
        <div className={styles.aboutTilesGrid}>
          {aboutTiles.map((tile, i) => (
            <div key={tile.title} className={styles.aboutTile}>
              <div className={styles.aboutTileIcon}>
                <tile.Icon />
              </div>
              <h3 className={styles.aboutTileTitle}>
                <span className={styles.aboutTileNum}>{String(i + 1).padStart(2, '0')}</span>
                {isEn ? tile.title_en : tile.title}
              </h3>
              <p className={styles.aboutTileText}>{isEn ? tile.text_en : tile.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.aboutCtaRow}>
          <Link href={`${base}/o-nas`} className={styles.textLink}>{aboutCta}</Link>
        </div>
      </section>

      {/* PROJEKTY */}
      <section className={styles.projects} id="projekty">
        <div className={styles.projectsHeader}>
          <div>
            <span className={styles.eyebrowLeft}>{d.projects.eyebrow}</span>
            <h2 className={styles.projectsTitle}>{d.projects.section_title}</h2>
          </div>
          <Link href={`${base}/projekty`} className={styles.seeAll}>{d.projects.see_all}</Link>
        </div>
        <div className={styles.projectsGrid3}>
          {projects.slice(0, 9).map(p => (
            <ProjectCard key={p.id} project={p} size="medium" lang={lang} grayscale />
          ))}
        </div>
      </section>

      {/* ZESPÓŁ */}
      <section className={styles.team} id="zespol">
        <div className={styles.sectionCenter}>
          <span className={styles.eyebrow}>{d.team.eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.team.title}</h2>
        </div>
        <div className={styles.teamGrid4}>
          {team.map(member => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.teamPhoto}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={styles.teamImg}
                  placeholder={member.photoLqip ? 'blur' : 'empty'}
                  blurDataURL={member.photoLqip}
                />
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section className={styles.contact} id="kontakt">
        <div className={styles.contactInner}>
          <span className={styles.eyebrowDark}>{d.contact.eyebrow}</span>
          <h2 className={styles.contactTitle}>{d.contact.title}</h2>
          <div className={styles.contactBody}>
            <div className={styles.contactInfo}>
              <a href={`mailto:${studioInfo.email}`} className={styles.contactEmail}>
                {studioInfo.email}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <div className={styles.contactDetails}>
                <p>MT-Projekt Sp. z o.o.</p>
                <p>{studioInfo.address}</p>
                <p>{studioInfo.phone}</p>
                <p>{isEn ? "E-delivery address" : "Adres e-doręczeń"}: AE:PL-12056-90342-WDIAT-06</p>
              </div>
            </div>
            <div className={styles.contactFormWrap}>
              <ContactForm dict={d.contact} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
