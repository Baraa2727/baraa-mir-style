"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
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
  heroImages?: string[];
  intro?: string;
  website?: string | string[];
  rows: ProjectRow[];
};

const projects = projectsData as Project[];

// ===== THE WID Spezialdaten =====

type HouseRow = {
  layout: "single" | "double";
  images: string[];
};

type House = {
  id: string; // "1" ..."9"
  label: string; // "Haus 1" ...
  hero: string;
  rows: HouseRow[];
  title?: string;
  client?: string;
  intro?: string;
  website?: string | string[];
};

const THEWID_PROJECT: {
  id: string;
  title: string;
  client?: string;
  hero: string;
  heroImages?: string[];
  intro?: string;
  website?: string | string[];
  houses: House[];
} = {
  id: "thewid",
  title: "THE WID",
  client: "Alfons & Alfreda",
  hero: "/media/thewid/hero/hero.jpg",
  heroImages: [
    "/media/thewid/hero/hero.jpg",
    "/media/thewid/hero/hero1.jpg",
    "/media/thewid/hero/hero2.jpg",
    "/media/thewid/hero/hero3.jpg",
    "/media/thewid/hero/hero4.jpg",
    "/media/thewid/hero/hero5.jpg",
    "/media/thewid/hero/hero6.jpg",
    "/media/thewid/hero/hero7.jpg",
    "/media/thewid/hero/hero8.jpg",
    "/media/thewid/hero/hero9.jpg",
    "/media/thewid/hero/hero10.jpg",
  ],
  intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
  website: ["https://www.alfons-alfreda.com", "https://www.thewid.cologne"],
  houses: [
    {
      id: "1",
      label: "Haus 1",
      title: "Haus 1",
      client: "Phase 5",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de"],
      hero: "/media/thewid/haus1/building1.jpg",
      rows: [
        { layout: "single", images: ["/media/thewid/haus1/entrance1.jpg"] },
        { layout: "single", images: ["/media/thewid/haus1/building1-1.jpg"] },
      ],
    },
    {
      id: "2",
      label: "Haus 2",
      title: "Haus 2",
      client: "Phase 5",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de"],
      hero: "/media/thewid/haus2/building2.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus2/entrance2.jpg",
            "/media/thewid/haus2/entrance2-2.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus2/building2-2.jpg"],
        },
      ],
    },
    {
      id: "3",
      label: "Haus 3",
      title: "Haus 3",
      client: "Phase 5 + Urban Agency",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de", "https://www.urban-agency.com"],
      hero: "/media/thewid/haus3/building3.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus3/building3-2.jpg",
            "/media/thewid/haus3/entrance3.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus3/building3-3.jpg"],
        },
      ],
    },
    {
      id: "4",
      label: "Haus 4",
      title: "Haus 4",
      client: "Phase 5 + Urbanlust",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de", "https://www.urbanlust.de"],
      hero: "/media/thewid/haus4/building4.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus4/building4-2.jpg",
            "/media/thewid/haus4/entrance4.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus4/building4-3.jpg"],
        },
      ],
    },
    {
      id: "5",
      label: "Haus 5",
      title: "Haus 5",
      client: "Damrau Kusserow",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.damrau-kusserow.de"],
      hero: "/media/thewid/haus5/building5.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus5/entrance5.jpg",
            "/media/thewid/haus5/building5-2.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus5/building5-3.jpg"],
        },
      ],
    },
    {
      id: "6",
      label: "Haus 6",
      title: "Haus 6",
      client: "Phase 5 + Urban Agency",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de", "https://www.urban-agency.com"],
      hero: "/media/thewid/haus6/building6.jpg",
      rows: [
        {
          layout: "double",
          images: [
            "/media/thewid/haus6/building6-3.jpg",
            "/media/thewid/haus6/entrance6.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus6/building6-2.jpg"],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus6/building6-4.jpg"],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus6/building6-5.jpg"],
        },
      ],
    },
    {
      id: "7",
      label: "Haus 7",
      title: "Haus 7",
      client: "urbanlust",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.urbanlust.de"],
      hero: "/media/thewid/haus7/building7.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus7/entrance7.jpg"],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus7/building7-2.jpg"],
        },
      ],
    },
    {
      id: "8",
      label: "Haus 8",
      title: "Haus 8",
      client: "Phase 5",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de"],
      hero: "/media/thewid/haus8/building8.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus8/entrance8.jpg"],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus8/building8-2.jpg"],
        },
      ],
    },
    {
      id: "9",
      label: "Haus 9+10",
      title: "Haus 9+10",
      client: "Phase 5",
      intro: `A new vision for Cologne’s Weststadt, featuring ten distinct buildings shaped for an urban future.
Located in one of Germany’s most dynamic economic hubs, it introduces spacious, smart work environments that highlight what contemporary architecture can achieve.`,
      website: ["https://www.phase5.de"],
      hero: "/media/thewid/haus9/building9.jpg",
      rows: [
        {
          layout: "single",
          images: ["/media/thewid/haus9/entrance9.jpg"],
        },
        {
          layout: "double",
          images: [
            "/media/thewid/haus9/building9-3.jpg",
            "/media/thewid/haus9/building9-4.jpg",
          ],
        },
        {
          layout: "single",
          images: ["/media/thewid/haus9/building9-5.jpg"],
        },
      ],
    },
  ],
};

// ===== Weiter-Navigation: Projekte & Häuser =====

const NEXT_PROJECT_MAP: Record<string, string> = {
  "ext-03": "ext-04",
  "ext-04": "ext-05",
  "ext-05": "ext-10",
  "ext-10": "ext-08",
  "ext-08": "ext-12",
  "ext-12": "ext-16", // ext-16 & ext-28 = gleiche Seite
  "ext-16": "ext-17",
  "ext-17": "ext-19",
  "ext-19": "ext-20",
  "ext-20": "ext-21",
  "ext-21": "ext-22",
  "ext-22": "ext-23",
  "ext-23": "ext-24",
  "ext-24": "ext-25",
  "ext-25": "ext-26",
  "ext-26": "ext-27",
  "ext-27": "ext-29",
  "ext-29": "ext-30",
  "ext-30": "ext-32",
  "ext-32": "ext-34",
  "ext-34": "ext-35",
};

const NEXT_HOUSE_MAP: Record<
  string,
  | { type: "house"; id: string; label?: string }
  | { type: "project"; id: string }
> = {
  "1": { type: "house", id: "2" },
  "2": { type: "house", id: "3" },
  "3": { type: "house", id: "4" },
  "4": { type: "house", id: "5" },
  "5": { type: "house", id: "6" },
  "6": { type: "house", id: "7" },
  "7": { type: "house", id: "8" },
  "8": { type: "house", id: "9", label: "Haus 8+9" },
  "9": { type: "project", id: "ext-03" },
};

// ===== Scroll-Reveal für Rows + Pfeil =====

function useProjectImageReveal() {
  useEffect(() => {
    const imageElements = Array.from(
      document.querySelectorAll<HTMLElement>(".project-image")
    );
    const nextLinks = Array.from(
      document.querySelectorAll<HTMLElement>(".project-next-link")
    );

    if (!imageElements.length && !nextLinks.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;

          if (target.classList.contains("project-image")) {
            target.classList.add("inview");
          }

          if (target.classList.contains("project-next-link")) {
            target.classList.add("project-next-link-inview");
          }

          io.unobserve(target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 15% 0px",
        threshold: 0.1,
      }
    );

    [...imageElements, ...nextLinks].forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  });
}

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ProjectPage({ params, searchParams }: PageProps) {
  useProjectImageReveal();

  // Spezial: THE WID
  if (params.id === "thewid") {
    const houseParam = searchParams?.house;
    const initialHouseId =
      typeof houseParam === "string" ? houseParam : undefined;

    return <TheWidPage initialHouseId={initialHouseId} />;
  }

  // Normale Projekte
  const project = projects.find((p) => p.id === params.id);
  const [heroIndex, setHeroIndex] = useState(0);

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

  const projectWebsites = project.website
    ? Array.isArray(project.website)
      ? project.website
      : [project.website]
    : [];

  const nextProjectId = NEXT_PROJECT_MAP[project.id];
  const nextProject = nextProjectId
    ? projects.find((p) => p.id === nextProjectId)
    : undefined;

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

        <div className="project-info-card">
          <h1 className="project-title">{project.title}</h1>

          {project.client && (
            <div className="project-client">{project.client}</div>
          )}

          {project.intro && <p className="project-intro">{project.intro}</p>}

          {projectWebsites.length > 0 && (
            <>
              {projectWebsites.map((url) => {
                const clean = url
                  .replace(/^https?:\/\//, "")
                  .replace(/^www\./, "");
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{
                      marginRight: "12px",
                      display: "inline-block",
                    }}
                  >
                    {clean}
                  </a>
                );
              })}
            </>
          )}
        </div>
      </section>

      {/* Rows / Galerie */}
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

      {/* Weiter zum nächsten Projekt */}
      {nextProject && (
        <a href={`/project/${nextProject.id}`} className="project-next-link">
          <span className="project-next-arrow" aria-hidden="true" />
          <span className="project-next-label">{nextProject.title}</span>
        </a>
      )}
    </main>
  );
}

// ================== THE WID Spezial-Komponente ==================

type TheWidPageProps = {
  initialHouseId?: string;
};

function TheWidPage({ initialHouseId }: TheWidPageProps) {
  useProjectImageReveal();

  const router = useRouter();
  const pathname = usePathname();

  const houses = THEWID_PROJECT.houses;
  const fallbackHouse = houses[0];

  // Swipe-Refs für den THE-WID-Haupt-Hero (nur Touch)
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Hero-Slider oben (THE WID)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [nextHeroIndex, setNextHeroIndex] = useState<number | null>(null);
  const [heroDirection, setHeroDirection] = useState<"next" | "prev" | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const heroImages =
    THEWID_PROJECT.heroImages && THEWID_PROJECT.heroImages.length > 0
      ? THEWID_PROJECT.heroImages
      : [THEWID_PROJECT.hero];

  const showHeroArrows = heroImages.length > 1;

  // aktives Haus
  const [activeHouseId, setActiveHouseId] = useState<string>(
    houses.find((h) => h.id === initialHouseId)?.id ?? fallbackHouse.id
  );

  const activeHouse =
    houses.find((h) => h.id === activeHouseId) ?? fallbackHouse;

  const activeHouseTitle = activeHouse.title ?? activeHouse.label;
  const activeHouseClient = activeHouse.client ?? THEWID_PROJECT.client;
  const activeHouseIntro = activeHouse.intro ?? THEWID_PROJECT.intro;
  const activeHouseWebsite = activeHouse.website ?? THEWID_PROJECT.website;

  const activeHouseWebsites = activeHouseWebsite
    ? Array.isArray(activeHouseWebsite)
      ? activeHouseWebsite
      : [activeHouseWebsite]
    : [];

  const projectWebsites = THEWID_PROJECT.website
    ? Array.isArray(THEWID_PROJECT.website)
      ? THEWID_PROJECT.website
      : [THEWID_PROJECT.website]
    : [];

  const handleSetHouse = (houseId: string, scrollToTabs: boolean) => {
    setActiveHouseId(houseId);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("house", houseId);
      const url = `${pathname}?${params.toString()}`;
      router.replace(url, { scroll: false });
    }

    if (scrollToTabs) {
      const el = document.getElementById("wid-houses-anchor");
      if (el && typeof window !== "undefined") {
        const rect = el.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        const offset = 0; // direkt an der Häuserzeile landen

        window.scrollTo({
          top: scrollTop + rect.top - offset,
          behavior: "smooth",
        });
      }
    }
  };

  const nextHouseConfig = NEXT_HOUSE_MAP[activeHouse.id];
  let nextHouseHref: string | null = null;
  let nextHouseLabel: string | null = null;
  let nextHouseId: string | null = null;
  let nextIsProject = false;

  if (nextHouseConfig?.type === "house") {
    const targetHouse = houses.find((h) => h.id === nextHouseConfig.id);
    if (targetHouse) {
      nextHouseId = nextHouseConfig.id;
      nextHouseHref = `/project/thewid?house=${nextHouseConfig.id}`;
      nextHouseLabel = nextHouseConfig.label ?? targetHouse.label;
    }
  } else if (nextHouseConfig?.type === "project") {
    nextIsProject = true;
    const targetProject = projects.find((p) => p.id === nextHouseConfig.id);
    if (targetProject) {
      nextHouseHref = `/project/${nextHouseConfig.id}`;
      nextHouseLabel = targetProject.title;
    }
  }

  const startSlide = (direction: "next" | "prev") => {
    if (!showHeroArrows || isAnimating) return;

    const len = heroImages.length;
    const targetIndex =
      direction === "next"
        ? (currentHeroIndex + 1) % len
        : (currentHeroIndex - 1 + len) % len;

    setHeroDirection(direction);
    setNextHeroIndex(targetIndex);
    setIsAnimating(true);
  };

  const handlePrevHero = () => startSlide("prev");
  const handleNextHero = () => startSlide("next");

  const handleSlideAnimationEnd = () => {
    if (!isAnimating || nextHeroIndex === null) return;
    setCurrentHeroIndex(nextHeroIndex);
    setNextHeroIndex(null);
    setHeroDirection(null);
    setIsAnimating(false);
  };

  return (
    <main className="project-page">
      {/* Globaler THE-WID Hero (Slider) */}
      <section className="project-hero">
        <div className="project-hero-media">
          <div
            className="wid-hero-slider"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                touchStartX.current = e.touches[0].clientX;
                touchDeltaX.current = 0;
              }
            }}
            onTouchMove={(e) => {
              if (touchStartX.current !== null && e.touches.length === 1) {
                const currentX = e.touches[0].clientX;
                touchDeltaX.current = currentX - touchStartX.current;
              }
            }}
            onTouchEnd={() => {
              if (touchStartX.current !== null) {
                const delta = touchDeltaX.current;
                const threshold = 50;

                if (Math.abs(delta) > threshold) {
                  if (delta < 0) {
                    startSlide("next");
                  } else {
                    startSlide("prev");
                  }
                }
              }
              touchStartX.current = null;
              touchDeltaX.current = 0;
            }}
          >
            {heroImages.map((src, idx) => {
              const isCurrent = idx === currentHeroIndex;
              const isNext = idx === nextHeroIndex;

              if (!isCurrent && !isNext) return null;

              let layerClass = "wid-hero-slide-layer";

              if (isCurrent && !isAnimating) {
                layerClass += " wid-hero-layer-current";
                if (currentHeroIndex === 0) {
                  layerClass += " wid-hero-layer-initial";
                }
              } else if (isCurrent && isAnimating && heroDirection === "next") {
                layerClass += " wid-hero-layer-slide-out-left";
              } else if (isCurrent && isAnimating && heroDirection === "prev") {
                layerClass += " wid-hero-layer-slide-out-right";
              } else if (isNext && isAnimating && heroDirection === "next") {
                layerClass += " wid-hero-layer-slide-in-from-right";
              } else if (isNext && isAnimating && heroDirection === "prev") {
                layerClass += " wid-hero-layer-slide-in-from-left";
              } else if (isNext && !isAnimating) {
                layerClass += " wid-hero-layer-current";
              }

              const handleAnimEnd = isNext ? handleSlideAnimationEnd : undefined;

              return (
                <div
                  key={idx}
                  className={layerClass}
                  onAnimationEnd={handleAnimEnd}
                >
                  <Image
                    src={src}
                    alt={THEWID_PROJECT.title}
                    fill
                    className="project-img"
                    priority
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Swipe-Indikator-Punkte */}
        {heroImages.length > 1 && (
          <div className="wid-hero-dots">
            {heroImages.map((_, idx) => (
              <span
                key={idx}
                className={
                  "wid-hero-dot" +
                  (idx === currentHeroIndex ? " wid-hero-dot-active" : "")
                }
              />
            ))}
          </div>
        )}

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

          {projectWebsites.length > 0 && (
            <>
              {projectWebsites.map((url) => {
                const clean = url
                  .replace(/^https?:\/\//, "")
                  .replace(/^www\./, "");
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{
                      marginRight: "12px",
                      display: "inline-block",
                    }}
                  >
                    {clean}
                  </a>
                );
              })}
            </>
          )}
        </div>
      </section>

      {/* Haus-Tabs + Haus-Content */}
      <section id="wid-houses-anchor" className="wid-houses">
        <div className="wid-houses-tabs">
          {houses.map((house) => (
            <button
              key={house.id}
              type="button"
              onClick={() => handleSetHouse(house.id, false)}
              className={
                "wid-house-tab" +
                (house.id === activeHouse.id ? " wid-house-tab-active" : "")
              }
            >
              {house.label}
            </button>
          ))}
        </div>

        {/* Aktives Haus */}
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

            {/* Textbox im Hero-Bild unten links */}
            <div
              className={`project-info-card wid-house-info-card wid-house-info-card-${activeHouse.id}`}
            >
              <h1 className="project-title">{activeHouseTitle}</h1>

              {activeHouseClient && (
                <div className="project-client">{activeHouseClient}</div>
              )}

              {activeHouseIntro && (
                <p className="project-intro">{activeHouseIntro}</p>
              )}

              {activeHouseWebsites.length > 0 && (
                <>
                  {activeHouseWebsites.map((url) => {
                    const clean = url
                      .replace(/^https?:\/\//, "")
                      .replace(/^www\./, "");
                    return (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{
                          marginRight: "12px",
                          display: "inline-block",
                        }}
                      >
                        {clean}
                      </a>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Rows/Bilder unter dem Haus-Hero */}
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

          {/* Weiter zum nächsten Haus / Projekt */}
          {nextHouseHref && nextHouseLabel && (
            nextIsProject ? (
              // Bei Haus 9: ganz normal zum nächsten Projekt
              <a href={nextHouseHref} className="project-next-link">
                <span className="project-next-arrow" aria-hidden="true" />
                <span className="project-next-label">{nextHouseLabel}</span>
              </a>
            ) : (
              // Bei Haus 1–8: Haus wechseln + zu den Tabs scrollen
              <a
                href={nextHouseHref}
                className="project-next-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (nextHouseId) {
                    handleSetHouse(nextHouseId, true);
                  }
                }}
              >
                <span className="project-next-arrow" aria-hidden="true" />
                <span className="project-next-label">{nextHouseLabel}</span>
              </a>
            )
          )}
        </section>
      </section>

      {/* Unsichtbares Preloading: THE-WID-Haupt-Hero-Bilder + Haus-Hero-Bilder */}
      <div style={{ display: "none" }}>
        {heroImages.map((src, idx) => (
          <img key={`wid-hero-${idx}`} src={src} alt="" />
        ))}
        {houses.map((h) => (
          <img key={h.id} src={h.hero} alt="" />
        ))}
      </div>
    </main>
  );
}
