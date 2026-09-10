import Image from "next/image";
import { studioInfo } from "@/lib/mockData";
import { Dictionary } from "@/lib/dictionaries";
import styles from "@/styles/wspolpraca.module.css";

interface Props {
  lang: string;
  dict: Dictionary;
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  );
}

export default function WspolpracaPage({ lang, dict }: Props) {
  const d = (dict as any).wspolpraca_page;
  const mailHref = `mailto:${studioInfo.email}`;

  const partnerFeatures = [
    {
      image: "/images/wspolpraca/elastyczna-wspolpraca.png",
      text: d.partner_feature1,
    },
    {
      image: "/images/wspolpraca/terminowa-realizacja.png",
      text: d.partner_feature2,
    },
    {
      image: "/images/wspolpraca/dopasowanie-standardy-klienta.png",
      text: d.partner_feature3,
    },
  ];

  const expertiseItems = [
    {
      image: "/images/wspolpraca/projektowanie-drog-i-ulic.png",
      title: d.expertise1_title,
      text: d.expertise1_text,
    },
    {
      image: "/images/wspolpraca/bezpieczenstwo-ruchu-drogowego.png",
      title: d.expertise2_title,
      text: d.expertise2_text,
    },
    {
      image: "/images/wspolpraca/dokumentacja-cad-bim.png",
      title: d.expertise3_title,
      text: d.expertise3_text,
    },
    {
      image: "/images/wspolpraca/koordynacja-projektowa.png",
      title: d.expertise4_title,
      text: d.expertise4_text,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroMapWrap}>
          <Image
            src="/images/wspolpraca/hero.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.heroMapImage}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>{d.hero_eyebrow}</span>
          <h1 className={styles.heroTitle}>
            <span>{d.hero_title}</span>
            <span className={styles.heroTitleAccent}>
              {d.hero_title_accent}
            </span>
          </h1>
          <p className={styles.heroText}>{d.hero_text}</p>
          <a href={mailHref} className={styles.heroCta}>
            {d.hero_cta}
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* PARTNER W PROJEKTOWANIU */}
      <section className={styles.partner}>
        <div className={styles.partnerInner}>
          <div className={styles.partnerHeader}>
            <span className={styles.eyebrow}>{d.partner_eyebrow}</span>
            <h2 className={styles.partnerTitle}>
              {d.partner_title}
              <br />
              {d.partner_title2}
            </h2>
          </div>
          <div>
            <p className={styles.partnerText}>{d.partner_text}</p>
            <div className={styles.partnerFeatures}>
              {partnerFeatures.map((f) => (
                <div key={f.text} className={styles.partnerFeature}>
                  <div className={styles.partnerFeatureIcon}>
                    <Image
                      src={f.image}
                      alt=""
                      fill
                      quality={100}
                      sizes="86px"
                    />
                  </div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NASZA SPECJALIZACJA */}
      <section className={styles.expertise}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.eyebrow}>{d.expertise_eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.expertise_title}</h2>
        </div>
        <div className={styles.expertiseGrid}>
          {expertiseItems.map((item, i) => (
            <div key={item.title} className={styles.expertiseItem}>
              <span className={styles.expertiseNum}>0{i + 1}</span>
              <div className={styles.expertiseIcon}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  quality={100}
                  sizes="122px"
                />
              </div>
              <h3 className={styles.expertiseTitle}>{item.title}</h3>
              <p className={styles.expertiseText}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaImageWrap}>
          <Image
            src="/images/wspolpraca/bridge-cta.png"
            alt=""
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.ctaImage}
          />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{d.cta_title}</h2>
          <p className={styles.ctaText}>{d.cta_text}</p>
          <div className={styles.ctaRow}>
            <a href={mailHref} className={styles.ctaEmail}>
              <span className={styles.ctaEmailIcon}>
                <MailIcon />
              </span>
              {studioInfo.email}
            </a>
            <a href={mailHref} className={styles.ctaBtn}>
              {d.cta_btn}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
