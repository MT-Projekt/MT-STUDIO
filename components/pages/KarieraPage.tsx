import Image from "next/image";
import Link from "next/link";
import { studioInfo } from "@/lib/mockData";
import { getJobPostings } from "@/lib/sanity";
import { Dictionary } from "@/lib/dictionaries";
import JobCategoryIcon from "@/components/JobCategoryIcon/JobCategoryIcon";
import styles from "@/styles/kariera.module.css";

interface Props {
  lang: string;
  dict: Dictionary;
}

function PaperPlaneIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

const whyTiles = [
  {
    image: "/images/kariera/ludzie-i-atmosfera.png",
    title: "Ludzie i atmosfera",
    title_en: "People & atmosphere",
    text: "Jesteśmy zespołem, w którym współpraca, szacunek i dobra atmosfera są na co dzień.",
    text_en:
      "We are a team where collaboration, respect and a good atmosphere are part of everyday work.",
  },
  {
    image: "/images/kariera/rozwoj.png",
    title: "Rozwój zawodowy",
    title_en: "Professional growth",
    text: "Wspieramy rozwój kompetencji poprzez szkolenia, udział w konferencjach i ciekawe projekty.",
    text_en:
      "We support skills development through training, conferences and interesting projects.",
  },
  {
    image: "/images/kariera/realny-wplyw.png",
    title: "Realny wpływ",
    title_en: "Real impact",
    text: "Nasze projekty poprawiają bezpieczeństwo, komfort i jakość życia tysięcy ludzi.",
    text_en:
      "Our projects improve the safety, comfort and quality of life of thousands of people.",
  },
  {
    image: "/images/kariera/stabilnosc.png",
    title: "Stabilność",
    title_en: "Stability",
    text: "Działamy nieprzerwanie od lat, oferując stabilne warunki zatrudnienia.",
    text_en:
      "We have been operating continuously for years, offering stable employment conditions.",
  },
  {
    image: "/images/kariera/nowoczesne-narzedza.png",
    title: "Nowoczesne narzędzia",
    title_en: "Modern tools",
    text: "Pracujemy w środowisku BIM, korzystamy z nowoczesnego oprogramowania i technologii.",
    text_en:
      "We work in a BIM environment and use modern software and technology.",
  },
];

export default async function KarieraPage({ lang, dict }: Props) {
  const d = (dict as any).kariera_page;
  const base = lang === "en" ? "/en" : "";
  const isEn = lang === "en";
  const mailHref = `mailto:${studioInfo.email}?subject=${encodeURIComponent(isEn ? "Job application" : "Aplikacja o pracę")}`;
  const jobs = await getJobPostings(lang);
  const visibleJobs = jobs.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/kariera/carrier-hero.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>{d.eyebrow}</span>
          <h1 className={styles.heroTitle}>
            {d.title}
            <span className={styles.heroTitleAccent}>{d.title_accent}</span>
          </h1>
          <p className={styles.heroText}>{d.text}</p>
          <Link href={`${base}/o-nas`} className={styles.heroCta}>
            {d.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* CO NAS WYRÓŻNIA */}
      <section className={styles.why}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.why_eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.why_title}</h2>
        </div>
        <div className={styles.whyGrid}>
          {whyTiles.map((tile) => (
            <div key={tile.title} className={styles.whyTile}>
              <div className={styles.whyIcon}>
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  quality={100}
                  sizes="120px"
                />
              </div>
              <h3 className={styles.whyTitle}>
                {isEn ? tile.title_en : tile.title}
              </h3>
              <p className={styles.whyText}>
                {isEn ? tile.text_en : tile.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOŁĄCZ DO ZESPOŁU */}
      {visibleJobs.length > 0 ? (
        <section className={styles.jobsSection}>
          <span className={styles.joinEyebrow}>{d.jobs_eyebrow}</span>
          <h2 className={styles.jobsTitle}>{d.jobs_title}</h2>
          <div className={styles.jobsList}>
            {visibleJobs.map((job) => (
              <Link
                key={job.id}
                href={job.externalUrl || `${base}/kariera/oferty/${job.slug}`}
                {...(job.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={styles.jobRow}
              >
                <div className={styles.jobIcon}>
                  <JobCategoryIcon category={job.category} />
                </div>
                <div className={styles.jobInfo}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <span className={styles.jobMeta}>{job.location} · {job.employmentType}</span>
                </div>
                <p className={styles.jobSummary}>{job.summary}</p>
                <svg className={styles.jobArrow} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
          {jobs.length > 3 && (
            <div className={styles.jobsSeeAllRow}>
              <Link href={`${base}/kariera/oferty`} className={styles.jobsSeeAll}>
                {d.jobs_see_all}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          )}
        </section>
      ) : (
        <section className={styles.joinSection}>
          <span className={styles.joinEyebrow}>{d.join_eyebrow}</span>
          <div className={styles.joinCard}>
            <div className={styles.joinIllustration}>
              <Image
                src="/images/kariera/brak-rekrutacji.png"
                alt=""
                fill
                quality={90}
                sizes="(max-width: 1024px) 160px, 220px"
              />
            </div>
            <div className={styles.joinContent}>
              <h2 className={styles.joinTitle}>{d.join_title}</h2>
              <p>{d.join_text1}</p>
              <p>{d.join_text2}</p>
              <p>{d.join_text3}</p>
              <a href={mailHref} className={styles.joinCta}>
                {d.join_cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* APLIKACJA SPONTANICZNA */}
      <section className={styles.spontaneousBar}>
        <div className={styles.spontaneousLeft}>
          <div className={styles.spontaneousIcon}>
            <PaperPlaneIcon />
          </div>
          <div>
            <h3 className={styles.spontaneousTitle}>{d.spontaneous_title}</h3>
            <p className={styles.spontaneousText}>{d.spontaneous_text}</p>
          </div>
        </div>
        <a href={mailHref} className={styles.spontaneousCta}>
          {d.spontaneous_cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
    </>
  );
}
