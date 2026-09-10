import Link from "next/link";
import styles from "./Footer.module.css";
import SocialIcons from "@/components/SocialIcons/SocialIcons";

interface Props {
  lang: string;
  tagline: string;
}

export default function Footer({ lang, tagline }: Props) {
  const year = new Date().getFullYear();
  const base = lang === "en" ? "/en" : "";
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <img src="/mtp-logo.png" alt="MT Projekt" className={styles.logo} />
          <p className={styles.tagline}>{tagline}</p>
          <SocialIcons />
        </div>
        <div className={styles.center}>
          <p>© {year} MT-PROJEKT Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
        </div>
        <div className={styles.right}>
          <strong>INFRASTRUKTURA DROGOWA</strong>
          <p>biuro@mt-p.pl</p>
          <p>{lang === "en" ? "E-delivery address" : "Adres e-doręczeń"}: AE:PL-12056-90342-WDIAT-06</p>
        </div>
      </div>
    </footer>
  );
}
