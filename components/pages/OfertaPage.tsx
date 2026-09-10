import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobPostingBySlug } from "@/lib/sanity";
import { studioInfo } from "@/lib/mockData";
import { Dictionary } from "@/lib/dictionaries";
import JobCategoryIcon from "@/components/JobCategoryIcon/JobCategoryIcon";
import styles from "@/styles/oferty.module.css";

interface Props {
  lang: string;
  dict: Dictionary;
  slug: string;
}

export default async function OfertaPage({ lang, dict, slug }: Props) {
  const d = (dict as any).oferta_page;
  const base = lang === "en" ? "/en" : "";
  const isEn = lang === "en";
  const job = await getJobPostingBySlug(slug, lang);
  if (!job) notFound();

  const mailHref = `mailto:${studioInfo.email}?subject=${encodeURIComponent(
    isEn ? `Application: ${job.title}` : `Aplikacja: ${job.title}`
  )}`;

  return (
    <div className={styles.detailPage}>
      <div className={styles.breadcrumbs}>
        <Link href={base || "/"}>{d.home}</Link>
        <span> › </span>
        <Link href={`${base}/kariera`}>{d.back}</Link>
        <span> › </span>
        <Link href={`${base}/kariera/oferty`}>{d.back_offers}</Link>
        <span> › </span>
        <span className={styles.breadcrumbCurrent}>{job.title}</span>
      </div>

      <div className={styles.detailHeader}>
        <div className={styles.detailIcon}>
          <JobCategoryIcon category={job.category} />
        </div>
        <div>
          <h1 className={styles.detailTitle}>{job.title}</h1>
          <div className={styles.detailMetaRow}>
            <div className={styles.detailMetaItem}>
              <span className={styles.detailMetaLabel}>{d.location}</span>
              <span className={styles.detailMetaValue}>{job.location}</span>
            </div>
            <div className={styles.detailMetaItem}>
              <span className={styles.detailMetaLabel}>
                {d.employment_type}
              </span>
              <span className={styles.detailMetaValue}>
                {job.employmentType}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.detailDescription}>
        {job.description || job.summary}
      </p>

      <a href={mailHref} className={styles.detailCta}>
        {d.apply_cta}
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
  );
}
