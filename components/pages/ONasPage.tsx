import Image from 'next/image'
import Link from 'next/link'
import Timeline from '@/components/Timeline/Timeline'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/o-nas.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

function ShieldCheckIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

const processSteps = [
  { illustration: '/images/proces-analiza.png' },
  { illustration: '/images/proces-projektowanie.png' },
  { illustration: '/images/proces-koordynacja.png' },
  { illustration: '/images/proces-wsparcie.png' },
]

const timelineItems = [
  { year: '2012', title: 'Powstanie firmy pod inną nazwą', title_en: 'Company founded under a different name', text: 'Firma Biuro Inżynierskie Marcin Płużyński została założona przez Marcina Płużyńskiego, rozpoczynając działalność w obszarze inżynierii i projektowania budowlanego.', text_en: 'Biuro Inżynierskie Marcin Płużyński was founded by Marcin Płużyński, starting operations in civil engineering and design.' },
  { year: '2014', title: 'Współpraca', title_en: 'Cooperation', text: 'Pierwszy wspólny projekt z firmą „TOMKOR" – Nadzory i Projektowanie Korczak Tomasz. Realizacja dokumentacji projektowej w Michałowicach.', text_en: 'First joint project with "TOMKOR" – Nadzory i Projektowanie Korczak Tomasz. Design documentation delivered in Michałowice.' },
  { year: '2016', title: 'Pierwsza duża inwestycja', title_en: 'First major investment', text: 'Zrealizowano pierwszy duży projekt pod nową marką – projekt ścieżek rowerowych w Żyrardowie.', text_en: 'First major project delivered under the new brand – a cycle path design in Żyrardów.' },
  { year: '2017', title: 'Budowa zespołu projektowego', title_en: 'Building the design team', text: 'Rozpoczęto budowę profesjonalnego zespołu projektowego, co umożliwiło rozbudowę firmy i realizację coraz bardziej złożonych projektów.', text_en: 'Started building a professional design team, enabling company growth and increasingly complex projects.' },
  { year: '2018', title: 'Założenie wspólnej firmy', title_en: 'Founding of the joint company', text: '27 grudnia 2018 roku zarejestrowano firmę MT-Projekt Sp. z o.o. Skład Zarządu: Marcin Płużyński (Prezes) oraz Tomasz Korczak (Wiceprezes). Firma powstała z inicjatywy specjalistów z branży budowlanej.', text_en: 'MT-Projekt Sp. z o.o. was registered on 27 December 2018. Management Board: Marcin Płużyński (President) and Tomasz Korczak (Vice-President), founded by construction industry specialists.' },
  { year: '2019', title: 'Pierwsze zlecenia pod marką MT-Projekt', title_en: 'First projects under the MT-Projekt brand', text: 'Realizacja pierwszych większych projektów pod nową marką oraz wprowadzenie technologii BIM, co pozwoliło na efektywniejsze zarządzanie projektami.', text_en: 'Delivery of the first major projects under the new brand and the introduction of BIM technology for more efficient project management.' },
  { year: '2020', title: 'Rozwój na rynku krajowym', title_en: 'Growth on the domestic market', text: 'Utworzono dedykowane zespoły: sanitarny oraz geodezyjny, co pozwoliło na rozszerzenie oferty o projektowanie instalacji sanitarnych oraz pomiary geodezyjne.', text_en: 'Dedicated sanitary and surveying teams were created, expanding the offer to sanitary installation design and land surveying.' },
  { year: '2021', title: 'Zakup drona i wprowadzenie fotogrametrii', title_en: 'Drone purchase and introduction of photogrammetry', text: 'Firma zainwestowała w zakup drona, co umożliwiło wprowadzenie fotogrametrii, przyspieszając procesy projektowe i podnosząc jakość analiz. Zmiana siedziby firmy.', text_en: 'The company invested in a drone, introducing photogrammetry to speed up design processes and improve analysis quality. Company headquarters relocated.' },
  { year: '2023', title: 'Nowy wspólnik w firmie', title_en: 'New partner joins the company', text: 'Zwiększenie składu zarządu o Michała Gal, który został drugim Wiceprezesem. Firma pozyskała nowego wspólnika w celu dalszego rozwoju i umocnienia pozycji na rynku.', text_en: 'Michał Gal joined the Management Board as second Vice-President, bringing a new partner for further growth and market position.' },
  { year: '2024', title: 'Dołączenie do Polskiej Izby Kolei i Polskiego Kongresu Drogowego', title_en: 'Joining the Polish Railway Chamber and Polish Road Congress', text: 'Firma została członkiem prestiżowych organizacji branżowych, takich jak Polska Izba Kolei oraz Polski Kongres Drogowy.', text_en: 'The company became a member of prestigious industry organisations, including the Polish Railway Chamber and the Polish Road Congress.' },
  { year: '2025', title: 'Dołączenie do ASCE', title_en: 'Joining ASCE', text: 'Prezes Marcin Płużyński został członkiem American Society of Civil Engineers, co stanowi krok w stronę dalszej ekspansji i współpracy międzynarodowej.', text_en: 'President Marcin Płużyński became a member of the American Society of Civil Engineers, a step towards further expansion and international cooperation.' },
  { year: '2026', title: 'Zakup systemu LiDAR', title_en: 'LiDAR system purchase', text: 'Firma zainwestowała w zakup nowoczesnego systemu LiDAR, zwiększając dokładność pomiarów terenowych i usprawniając pozyskiwanie danych przestrzennych.', text_en: 'The company invested in a modern LiDAR system, increasing the accuracy of field surveys and streamlining spatial data acquisition.' },
]

const competences = [
  { title_pl: 'Drogi', title_en: 'Roads', text_pl: 'Tworzymy kompleksowe projekty dróg oraz obiektów inżynierskich, łącząc nowoczesne rozwiązania z bezpieczeństwem, trwałością i funkcjonalnością.', text_en: 'We create comprehensive road and engineering structure designs, combining modern solutions with safety, durability and functionality.' },
  { title_pl: 'Sieci i odwodnienia', title_en: 'Networks & drainage', text_pl: 'Opracowujemy projekty sieci sanitarnych, kanalizacji deszczowej, odwodnienia oraz infrastruktury technicznej.', text_en: 'We design sanitary networks, stormwater drainage, drainage systems and technical infrastructure.' },
  { title_pl: 'Inżynieria ruchu', title_en: 'Traffic engineering', text_pl: 'Projektujemy organizację ruchu, sygnalizację świetlną i oznakowanie drogowe oraz wykonujemy analizy bezpieczeństwa ruchu drogowego (BRD).', text_en: 'We design traffic organisation, traffic signals and road signage, and carry out road safety audits.' },
  { title_pl: 'Zieleń i ochrona środowiska', title_en: 'Greenery & environment', text_pl: 'Wykonujemy inwentaryzacje dendrologiczne oraz opracowujemy projekty nasadzeń miejskich i zagospodarowania terenów zieleni.', text_en: 'We carry out tree inventories and design urban planting schemes and green area development.' },
  { title_pl: 'Koordynacja projektów', title_en: 'Project coordination', text_pl: 'Prowadzimy koordynację wszystkich branż projektowych, zapewniając zgodność opracowań, terminowość działań i sprawną realizację całego procesu projektowego.', text_en: 'We coordinate all design disciplines, ensuring consistency, timeliness and smooth delivery of the entire design process.' },
  { title_pl: 'Geodezja', title_en: 'Surveying', text_pl: 'Wykonujemy pomiary geodezyjne oraz opracowujemy mapy do celów projektowych, mapy podziałowe, ortofotomapy i modele terenu 3D.', text_en: 'We carry out surveying works and prepare maps for design purposes, subdivision maps, orthophotomaps and 3D terrain models.' },
  { title_pl: 'BIM i koordynacja cyfrowa', title_en: 'BIM & digital coordination', text_pl: 'Tworzymy modele BIM oraz realistyczne wizualizacje 3D, które ułatwiają prezentację projektowanych rozwiązań.', text_en: 'We create BIM models and realistic 3D visualisations that make it easier to present design solutions.' },
  { title_pl: 'Nadzory inwestorskie', title_en: 'Investment supervision', text_pl: 'Sprawujemy nadzór nad realizacją inwestycji, kontrolując zgodność robót z dokumentacją projektową, przepisami oraz wymaganiami jakościowymi.', text_en: 'We supervise project execution, verifying compliance of works with design documentation, regulations and quality requirements.' },
]

export default function ONasPage({ lang, dict }: Props) {
  const d = (dict as any).o_nas_page
  const base = lang === 'en' ? '/en' : ''
  const isEn = lang === 'en'

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/heromain.png"
            alt={d.hero_title}
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{d.hero_eyebrow}</span>
          <h1 className={styles.heroTitle}>{d.hero_title}</h1>
          <p className={styles.heroSub}>{d.hero_sub}</p>
        </div>
      </section>

      {/* OŚ CZASU */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.timeline_eyebrow}</span>
        </div>
        <Timeline items={timelineItems} lang={lang} />
      </section>

      {/* KOMPETENCJE */}
      <section className={styles.competences}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.competences_eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.competences_title}</h2>
        </div>
        <div className={styles.competencesGrid}>
          {competences.map(c => (
            <div key={c.title_pl} className={styles.competenceCard}>
              <h3 className={styles.competenceTitle}>{isEn ? c.title_en : c.title_pl}</h3>
              <p className={styles.competenceText}>{isEn ? c.text_en : c.text_pl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JAK PRACUJEMY */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.eyebrow}>{d.process_eyebrow}</span>
          <h2 className={styles.processTitle}>{d.process_title}</h2>
          <p className={styles.processSub}>{d.process_sub}</p>
        </div>

        <div className={styles.processTimeline}>
          <span className={`${styles.processEndDot} ${styles.processEndDotLeft}`} />
          {processSteps.map((step, i) => (
            <div key={i} className={styles.processTimelineStep}>
              <div className={styles.processDot}>
                <Image
                  src={step.illustration}
                  alt=""
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 60px, (max-width: 1024px) 78px, 104px"
                  className={styles.processDotImg}
                />
              </div>
            </div>
          ))}
          <span className={`${styles.processEndDot} ${styles.processEndDotRight}`} />
        </div>

        <div className={styles.processGrid}>
          {[
            [(dict as any).process.step1_num, (dict as any).process.step1_title],
            [(dict as any).process.step2_num, (dict as any).process.step2_title],
            [(dict as any).process.step3_num, (dict as any).process.step3_title],
            [(dict as any).process.step4_num, (dict as any).process.step4_title],
          ].map(([num, title]) => (
            <div key={num} className={styles.processCard}>
              <span className={styles.processNum}>{num}</span>
              <h3 className={styles.processStepTitle}>{title}</h3>
            </div>
          ))}
        </div>

        <div className={styles.processFooter}>
          <div className={styles.processFooterIcon}>
            <ShieldCheckIcon />
          </div>
          <p>{d.process_footer}</p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>{d.cta_title}</h2>
        <p className={styles.ctaSub}>{d.cta_sub}</p>
        <Link href={`${base}/#kontakt`} className={styles.ctaBtn}>
          {d.cta_btn}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </section>
    </>
  )
}
