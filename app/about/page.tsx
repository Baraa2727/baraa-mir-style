import aboutData from "../../content/about.json";
import styles from "./About.module.css";

export default function AboutPage() {
  const { hero, images, bio, contact, location, clients } = aboutData;

  return (
    <main className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroName}>{hero.name}</h1>
        <p className={styles.heroTagline}>{hero.tagline}</p>
        <p className={styles.heroSubline}>{hero.subline}</p>
      </section>

      {/* Reihe 1: 2 Bilder */}
      <section className={styles.imageRow}>
        {images.row1.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </section>

      {/* Reihe 2: Text links, Bild rechts */}
      <section className={styles.bioSection}>
        <div className={styles.bioTextHeading}>
          <h2 className={styles.bioName}>{bio.name}</h2>
          <div className={styles.bioRole}>{bio.role}</div>
          {bio.paragraphs.map((p, idx) => (
            <p key={idx} className={styles.bioParagraph}>
              {p}
            </p>
          ))}
        </div>
        <div className={styles.bioImageWrapper}>
          <img src={images.row2} alt="" />
        </div>
      </section>

      {/* Reihe 3: 2 Bilder */}
      <section className={styles.imageRow}>
        {images.row3.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </section>

      {/* Reihe 4: Contact & Location – 2 Spalten, mittig */}
      <section className={styles.contactLocationSection}>
        <div className={styles.contactLocationInner}>
          {/* Contact */}
          <div>
            <h3 className={styles.contactBlockTitle}>
              {contact.title}
            </h3>
            <p className={styles.contactIntro}>{contact.intro}</p>
            <p className={styles.contactDetail}>
              {contact.phone}
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>

          {/* Location */}
          <div>
            <h3 className={styles.contactBlockTitle}>
              {location.title}
            </h3>
            <p className={styles.locationLines}>
              {location.lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className={styles.locationNote}>{location.note}</p>
          </div>
        </div>
      </section>

      {/* Reihe 5: Ein Bild mittig */}
      <section className={styles.singleImageSection}>
        <div className={styles.singleImageWrapper}>
          <img src={images.row5} alt="" />
        </div>
      </section>

      {/* Reihe 6: Clients */}
      <section className={styles.clientsSection}>
        <h3 className={styles.clientsTitle}>{clients.title}</h3>
        <div className={styles.clientsGrid}>
          {clients.items.map((client) => {
  const website = client.website;
  const clean =
    website &&
    website
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "");

  return (
    <div key={client.name}>
      <div className={styles.clientName}>{client.name}</div>
      {website && (
        <div className={styles.clientWebsite}>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {clean}
          </a>
        </div>
      )}
    </div>
  );
})}
        </div>
      </section>
    </main>
  );
}
