'use client';

import { useEffect, useRef } from "react";
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

  // === Reveal-Animation ===
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

  // === Autoplay/Loop (Safari/iOS) ===
  // 1) setzt alle nötigen Flags doppelt (Property + Attribut)
  // 2) stößt play() an, wenn sichtbar
  // 3) "User Activation Bootstrap": erster Tap irgendwo => play() aller sichtbaren Videos (Low Power Mode)
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(".tile video"));
    if (!videos.length) return;

    const inViewport = (el: Element) => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight || document.documentElement.clientHeight;
      const w = window.innerWidth || document.documentElement.clientWidth;
      return r.bottom >= 0 && r.right >= 0 && r.top <= h && r.left <= w;
    };

    const prep = (v: HTMLVideoElement) => {
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      (v as any).webkitPlaysinline = true; // ältere iOS
      v.autoplay = true;
      v.setAttribute("autoplay", "");
      v.loop = true;
      v.controls = false;
      v.preload = "metadata";
    };

    videos.forEach((v) => {
      prep(v);
      // sichere Loops
      v.addEventListener("ended", () => { v.currentTime = 0; v.play().catch(() => {}); });
      // wenn das Video ready ist, einmal play() versuchen
      v.addEventListener("loadedmetadata", () => { if (inViewport(v)) v.play().catch(() => {}); });
      v.addEventListener("canplay", () => { if (inViewport(v) && v.paused) v.play().catch(() => {}); });
    });

    // Sichtbarkeits-Observer: Play/Pause je nach Viewport
    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            prep(v);
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    videos.forEach((v) => vio.observe(v));

    // *** User Activation Bootstrap ***
    const bootstrap = () => {
      if (bootstrappedRef.current) return;
      bootstrappedRef.current = true;

      // spiele alle gerade sichtbaren Videos an
      videos.forEach((v) => {
        if (inViewport(v)) {
          prep(v);
          v.play().catch(() => {});
        }
      });

      // Listener wieder entfernen
      window.removeEventListener("pointerdown", bootstrap, { capture: true } as any);
      window.removeEventListener("touchstart", bootstrap, { capture: true } as any);
      window.removeEventListener("click", bootstrap, { capture: true } as any);
    };

    // beim ERSTEN Tap irgendwo auf der Seite triggern
    window.addEventListener("pointerdown", bootstrap, { capture: true, passive: true });
    window.addEventListener("touchstart", bootstrap, { capture: true, passive: true });
    window.addEventListener("click", bootstrap, { capture: true });

    // Wenn die Seite wieder sichtbar wird, erneut versuchen (App-Switch)
    const onVis = () => {
      if (document.visibilityState === "visible") {
        videos.forEach((v) => { if (inViewport(v)) v.play().catch(() => {}); });
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      vio.disconnect();
      window.removeEventListener("pointerdown", bootstrap, { capture: true } as any);
      window.removeEventListener("touchstart", bootstrap, { capture: true } as any);
      window.removeEventListener("click", bootstrap, { capture: true } as any);
      document.removeEventListener("visibilitychange", onVis);
    };
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
