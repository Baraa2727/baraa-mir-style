import Link from "next/link";
import styles from "./Impressum.module.css";

export default function ImpressumPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Impressum</h1>

        <div className={styles.text}>
          <p>
            <strong>Mhd Baraa Shareet</strong>
            <br />
            Sternstraße 61
            <br />
            42275 Wuppertal
            <br />
            Germany
          </p>

          <p>
            E-Mail:{" "}
            <a href="mailto:baraashareet@gmail.com">baraashareet@gmail.com</a>
            <br />
            Telefon: <a href="tel:+491601064515">+49 160 1064515</a>
          </p>

          <p>
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
            <br />
            Mhd Baraa Shareet
          </p>
        </div>

        <div className={styles.back}>
          <Link href="/about">← Back to About</Link>
        </div>
      </section>
    </main>
  );
}
