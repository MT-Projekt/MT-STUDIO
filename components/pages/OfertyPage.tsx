import Link from "next/link";
import { getJobPostings } from "@/lib/sanity";
import { Dictionary } from "@/lib/dictionaries";
import JobCategoryIcon from "@/components/JobCategoryIcon/JobCategoryIcon";
import styles from "@/styles/oferty.module.css";

interface Props {
  lang: string;
  dict: Dictionary;
}

export default async function OfertyPage({ lang, dict }: Props) {
  const d = (dict as any).oferta_page;
  const base = lang === "en" ? "/en" : "";
  const jobs = await getJobPostings(lang);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href={base || "/"}>{d.home}</Link>
        <span> › </span>
        <Link href={`${base}/kariera`}>{d.back}</Link>
        <span> › </span>
        <span className={styles.breadcrumbCurrent}>{d.back_offers}</span>
      </div>
      <h1 className={styles.title}>{d.all_offers_title}</h1>

      {jobs.length > 0 ? (
        <div className={styles.jobsList}>
          {jobs.map((job) => (
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
                <span className={styles.jobMeta}>
                  {job.location} · {job.employmentType}
                </span>
              </div>
              <p className={styles.jobSummary}>{job.summary}</p>
              <svg
                className={styles.jobArrow}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>{d.no_offers}</div>
      )}
    </div>
  );
}
