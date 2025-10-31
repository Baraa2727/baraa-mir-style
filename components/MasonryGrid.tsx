'use client';

import { useEffect } from "react";
import itemsDefault from "../content/items.json";

type Item = {
  id: string;
  kind: "image" | "video";
  src: string;
  size?: "Small" | "Medium" | "Large" | "Full";
  title?: string;
  client?: string;
};

type RowSpec = {
  cols: 2 | 3 | 4;
  aspect: "square" | "portrait";
  centerVideo?: boolean;
  videoAtIndex?: number;
};

const ROW_SPECS: RowSpec[] = [
  { cols: 2, aspect: "square" },
  { cols: 3, aspect: "square", centerVideo: true },
  { cols: 2, aspect: "square" },
  { cols: 3, aspect: "portrait" },
  { cols: 2, aspect: "square" },
  { cols: 3, aspect: "portrait" },
  { cols: 4, aspect: "portrait" },
  { cols: 3, aspect: "square" },
  { cols: 4, aspect: "portrait" },
  { cols: 2, aspect: "square" },
  { cols: 4, aspect: "portrait", videoAtIndex: 2 },
];
const DEFAULT_SPEC: RowSpec = { cols: 3, aspect: "portrait" };

function sliceRows(data: Item[], rowsToTake?: number) {
  const buckets: { spec: RowSpec; items: Item[] }[] = [];
  let cursor = 0;
  let r = 0;
  while (cursor < data.length) {
    const spec = r < ROW_SPECS.length ? ROW_SPECS[r] : DEFAULT_SPEC;
    const take = spec.cols;
    const chunk = data.slice(cursor, cursor + take);
    if (!chunk.length) break;
    buckets.push({ spec, items: chunk });
    cursor += chunk.length;
    r++;
    if (rowsToTake && buckets.length >= rowsToTake) break;
  }
  return buckets;
}

function arrangeVideoPositions(buckets: { spec: RowSpec; items: Item[] }[]) {
  for (const b of buckets) {
    const { spec, items } = b;
    if (spec.centerVideo && items.length === 3) {
      const vIdx = items.findIndex(x => x.kind === "video");
      if (vIdx !== -1 && vIdx !== 1) {
        const [vid] = items.splice(vIdx, 1);
        items.splice(1, 0, vid);
      }
    }
    if (typeof spec.videoAtIndex === "number" &&
        spec.videoAtIndex >= 0 &&
        spec.videoAtIndex < items.length) {
      const vIdx = items.findIndex(x => x.kind === "video");
      if (vIdx !== -1 && vIdx !== spec.videoAtIndex) {
        const [vid] = items.splice(vIdx, 1);
        items.splice(spec.videoAtIndex, 0, vid);
      }
    }
  }
  return buckets;
}

export default function MasonryGrid({
  items,
  maxRows
}: {
  items?: Item[];
  maxRows?: number;
}) {
  const data = (items ?? (itemsDefault as Item[])).slice();
  const buckets = arrangeVideoPositions(sliceRows(data, maxRows));

  // Reveal-Animation
  useEffect(() => {
    const tiles = Array.from(document.querySelectorAll<HTMLElement>(".tile"));
    if (!tiles.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px 15% 0px", threshold: 0.10 }
    );

    tiles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data.length]);

  // Autoplay/Loop – robust auf iOS/Safari
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(".tile video"));
    if (!videos.length) return;

    const prep = (v: HTMLVideoElement) => {
      // Setze Props/Attribute DOPPELT (Property + HTML-Attribut) für iOS
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.autoplay = true;
      v.loop = true;
      v.controls = false;
      v.preload = "metadata";
    };

    videos.forEach((v) => {
      prep(v);
      // Fallbacks für Loop/Start
      v.addEventListener("ended", () => { v.currentTime = 0; v.play().catch(() => {}); });
    });

    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            prep(v);
            // direktes Play triggert Autoplay
            v.play().catch(() => {
              // zweiter Versuch
              setTimeout(() => { prep(v); v.play().catch(() => {}); }, 50);
            });
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    videos.forEach((v) => vio.observe(v));
    return () => vio.disconnect();
  }, [data.length]);

  return (
    <section className="rows">
      {buckets.map((b, i) => (
        <div key={`row-${i}`} className="row" data-cols={b.spec.cols}>
          {b.items.map((it, j) => {
            const href = `/project/${it.id}`;
            const aspectClass = b.spec.aspect === "portrait" ? "portrait" : "square";
            const delayMs = j * 40;

            return (
              <a
                key={it.id}
                href={href}
                className={`tile ${aspectClass}`}
                aria-label={it.title || it.id}
                style={{ transitionDelay: `${delayMs}ms` }}
              >
                {it.kind === "video" ? (
                  <video
                    src={it.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    controls={false}
                    preload="metadata"
                    // zusätzliche Trigger direkt am Element:
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      v.muted = true; v.defaultMuted = true; v.playsInline = true;
                      v.play().catch(() => {});
                    }}
                    onCanPlay={(e) => {
                      const v = e.currentTarget;
                      if (v.paused) v.play().catch(() => {});
                    }}
                  />
                ) : (
                  <img src={it.src} alt={it.title || it.id} />
                )}

                {(it.title || it.client) && (
                  <div className="label">
                    {it.client && <div className="label-client">{it.client}</div>}
                    {it.title && <div className="label-title">{it.title}</div>}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      ))}
    </section>
  );
}
