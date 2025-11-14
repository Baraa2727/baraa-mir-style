"use client";

import { useState } from "react";
import Image from "next/image";
import projectsData from "../../../content/projects.json";

type ProjectRow = {
  layout: "single" | "double";
  images: string[];
};

type Project = {
  id: string;
  title: string;
  client?: string;
  hero: string;
  heroImages?: string[];   // NEU: optional mehrere Hero-Bilder
  intro?: string;
  website?: string;
  rows: ProjectRow[];
};

const projects = projectsData as Project[];

// ===== THE WID Spezialdaten =====

type HouseRow = {
  layout: "single" | "double";
  images: string[];
};

type House = {
  id: string;      // "1" ..."9"
  label: string;   // "Haus 1" ...
  hero: string;
  rows: HouseRow[];
};

const THEWID_PROJECT: {
  id: string;
  title: string;
  client?: string;
  hero: string;
  heroImages?: string[];
  intro?: string;
  website?: string;
  houses: House[];
} = {
  id: "thewid",
  title: "THE WID",
  client: "Alfons & Alfreda",
  hero: "/media/i01-hero.jpg",
  heroImages: ["/media/i01-hero.jpg"], // hier kannst du später weitere Bilder ergänzen
  intro:
    "Planned to open in 2026, located in Senja, Norway. The area is known for its striking landscapes.",
  website: "https://www.alfons-alfreda.de",
  houses: [
    {
      id: "1",
      label: "Haus 1",
      hero: "/media/thewid/haus1/building1.jpg",
      rows: [{ layout: "single", images: ["/media/thewid/haus1/entrance1.jpg"] }]
    },
    {
      id: "2",
      label: "Haus 2",
      hero: "/media/thewid/haus2/building2.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus2/entrance2.jpg",
            "/media/thewid/haus2/entrance2-2.jpg"
          ]
        }
      ]
    },
    {
      id: "3",
      label: "Haus 3",
      hero: "/media/thewid/haus3/building3.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus3/building3-2.jpg",
            "/media/thewid/haus3/entrance3.jpg"
          ]
        }
      ]
    },
    {
      id: "4",
      label: "Haus 4",
      hero: "/media/thewid/haus4/building4.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus4/building4-2.jpg",
            "/media/thewid/haus4/entrance4.jpg"
          ]
        },
        {
          layout: "single",
          images: ["/media/thewid/haus4/building4-3.jpg"]
        }
      ]
    },
    {
      id: "5",
      label: "Haus 5",
      hero: "/media/thewid/haus5/building5.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus5/entrance5.jpg"]
        }
      ]
    },
    {
      id: "6",
      label: "Haus 6",
      hero: "/media/thewid/haus6/building6.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus6/building6-3.jpg",
            "/media/thewid/haus6/entrance6.jpg"
          ]
        },
        {
          layout: "single",
          images: ["/media/thewid/haus6/building6-2.jpg"]
        },
        {
          layout: "single",
          images: ["/media/thewid/haus6/building6-4.jpg"]
        }
      ]
    },
    {
      id: "7",
      label: "Haus 7",
      hero: "/media/thewid/haus7/building7.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus7/entrance7.jpg"]
        }
      ]
    },
    {
      id: "8",
      label: "Haus 8",
      hero: "/media/thewid/haus8/building8.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus8/entrance8.jpg"]
        }
      ]
    },
    {
      id: "9",
      label: "Haus 9+10",
      hero: "/media/thewid/haus9/building9.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus9/entrance9.jpg"]
        }
      ]
    }
  ]
};

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ProjectPage({ params, searchParams }: PageProps) {
  // Spezialfall: /project/thewid
  if (params.id === "thewid") {
    const houseParam = searchParams?.house;
    const initialHouseId =
      typeof houseParam === "string" ? houseParam : undefined;

    return <TheWidPage initialHouseId={initialHouseId} />;
  }

  // Normale Projektseite aus projects.json
  const project = projects.find((p) => p.id === params.id);
  const [heroIndex, setHeroIndex] = useState(0); // Slider-State für normale Projekte

  if (!project) {
    return (
      <main className="project-page">
        <p>Project not found.</p>
      </main>
    );
  }

  const heroImages =
    project.heroImages && project.heroImages.length > 0
      ? project.heroImages
      : [project.hero];

  const showHeroArrows = heroImages.length > 1;

  const websiteLabel = project.website
    ?.replace(/^https?:\/\//, "")
    .replace(/^www\./, "");

  const handlePrev = () => {
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNext = () => {
    setHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <main className="project-page">
      {/* Hero mit Slider */}
      <section className="project-hero">
        <div className="project-hero-media">
          <Image
            src={heroImages[heroIndex]}
            alt={project.title}
            fill
            className="project-img"
            sizes="100vw"
            priority
          />
        </div>

        {showHeroArrows && (
          <>
            <button
              type="button"
              className="project-hero-arrow project-hero-arrow-left"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="project-hero-arrow project-hero-arrow-right"
              onClick={handleNext}
            >
              ›
            </button>
          </>
        )}

        {/* Info-Box */}
        <div className="project-info-card">
          <h1 className="project-title">{project.title}</h1>

          {project.client && (
            <div className="project-client">{project.client}</div>
          )}

          {project.intro && <p className="project-intro">{project.intro}</p>}

          {project.website && websiteLabel && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {websiteLabel}
            </a>
          )}
        </div>
      </section>

      {/* Galerie unten */}
      <section className="project-gallery">
        {project.rows.map((row, idx) => (
          <div
            key={`${project.id}-row-${idx}`}
            className={
              row.layout === "double"
                ? "project-row project-row-double"
                : "project-row project-row-single"
            }
          >
            {row.images.map((src, i) => (
              <div key={src + i} className="project-image">
                <img src={src} alt={project.title} />
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

// ================== THE WID Spezial-Komponente ==================

function TheWidPage({ initialHouseId }: { initialHouseId?: string }) {
  const houses = THEWID_PROJECT.houses;
  const fallbackHouse = houses[0];

  // Slider für THE-WID-Haupt-Hero
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages =
    THEWID_PROJECT.heroImages && THEWID_PROJECT.heroImages.length > 0
      ? THEWID_PROJECT.heroImages
      : [THEWID_PROJECT.hero];
  const showHeroArrows = heroImages.length > 1;

  // aktives Haus im State halten
  const [activeHouseId, setActiveHouseId] = useState<string>(
    houses.find((h) => h.id === initialHouseId)?.id ?? fallbackHouse.id
  );

  const activeHouse =
    houses.find((h) => h.id === activeHouseId) ?? fallbackHouse;

  const websiteLabel = THEWID_PROJECT.website
    ?.replace(/^https?:\/\//, "")
    .replace(/^www\./, "");

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <main className="project-page">
      {/* Globaler THE-WID Hero (mit Slider) */}
      <section className="project-hero">
        <div className="project-hero-media">
          <Image
            src={heroImages[heroIndex]}
            alt={THEWID_PROJECT.title}
            fill
            className="project-img"
            sizes="100vw"
            priority
          />
        </div>

        {showHeroArrows && (
          <>
            <button
              type="button"
              className="project-hero-arrow project-hero-arrow-left"
              onClick={handlePrevHero}
            >
              ‹
            </button>
            <button
              type="button"
              className="project-hero-arrow project-hero-arrow-right"
              onClick={handleNextHero}
            >
              ›
            </button>
          </>
        )}

        <div className="project-info-card">
          <h1 className="project-title">{THEWID_PROJECT.title}</h1>

          {THEWID_PROJECT.client && (
            <div className="project-client">{THEWID_PROJECT.client}</div>
          )}

          {THEWID_PROJECT.intro && (
            <p className="project-intro">{THEWID_PROJECT.intro}</p>
          )}

          {THEWID_PROJECT.website && websiteLabel && (
            <a
              href={THEWID_PROJECT.website}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {websiteLabel}
            </a>
          )}
        </div>
      </section>

      {/* Haus-Tabs + Haus-Content */}
      <section className="wid-houses">
        <div className="wid-houses-tabs">
          {houses.map((house) => (
            <button
              key={house.id}
              type="button"
              onClick={() => setActiveHouseId(house.id)}
              className={
                "wid-house-tab" +
                (house.id === activeHouse.id ? " wid-house-tab-active" : "")
              }
            >
              {house.label}
            </button>
          ))}
        </div>

        {/* Aktives Haus: eigener Hero + Galerie */}
        <section key={activeHouse.id} className="wid-house-detail">
          <div className="wid-house-hero">
            <div className="project-hero-media wid-house-hero-media">
              <Image
                src={activeHouse.hero}
                alt={activeHouse.label}
                fill
                className="project-img"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <section className="project-gallery">
            {activeHouse.rows.map((row, idx) => (
              <div
                key={`house-${activeHouse.id}-row-${idx}`}
                className={
                  row.layout === "double"
                    ? "project-row project-row-double"
                    : "project-row project-row-single"
                }
              >
                {row.images.map((src, i) => (
                  <div key={src + i} className="project-image">
                    <img src={src} alt={activeHouse.label} />
                  </div>
                ))}
              </div>
            ))}
          </section>
        </section>
      </section>

      {/* Unsichtbares Preloading aller Haus-Hero-Bilder */}
      <div style={{ display: "none" }}>
        {houses.map((h) => (
          <img key={h.id} src={h.hero} alt="" />
        ))}
      </div>
    </main>
  );
}
