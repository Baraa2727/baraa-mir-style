'use client';

import React, { useRef, useEffect } from 'react';
import '../app/ImageCompare.css';

type ImageCompareProps = {
  before: string; // rechtes Bild (AI Generated)
  after: string;  // linkes Bild (Original)
};

export default function ImageCompare({ before, after }: ImageCompareProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const posRef = useRef(50); // 0..100
  const frameRequestedRef = useRef(false);
  const lastClientXRef = useRef<number | null>(null);

  const handleArrowsRef = useRef<HTMLDivElement | null>(null);
  const hasDraggedRef = useRef(false);

  const aiLabelRef = useRef<HTMLDivElement | null>(null);
  const originalLabelRef = useRef<HTMLDivElement | null>(null);

  const isVideo = (src: string | undefined | null) => {
    if (!src) return false;
    const s = src.toLowerCase();
    return s.endsWith('.mp4') || s.endsWith('.webm') || s.endsWith('.mov');
  };

  const clamp = (n: number, min = 0, max = 100) =>
    Math.min(max, Math.max(min, n));

  const applyPos = (value: number) => {
    const clamped = clamp(value);
    posRef.current = clamped;
    const el = containerRef.current;
    if (el) {
      el.style.setProperty('--compare-pos', `${clamped}%`);
    }
  };

  useEffect(() => {
    applyPos(50);
  }, []);

  const updateLabels = (value: number) => {
    const ai = aiLabelRef.current;
    const orig = originalLabelRef.current;
    if (!ai || !orig) return;

    // weit nach links → fast nur rechtes (AI) sichtbar
    const showAI = value < 20;
    // weit nach rechts → fast nur linkes (Original) sichtbar
    const showOriginal = value > 80;

    ai.classList.toggle('visible', showAI);
    orig.classList.toggle('visible', showOriginal);
  };

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = clamp(pct);
    applyPos(clamped);
    updateLabels(clamped);
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current) return;
    e.preventDefault();
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    lastClientXRef.current = e.clientX;
    updateFromClientX(e.clientX);

    // Puls-Animation beim ersten Anfassen stoppen
    if (!hasDraggedRef.current) {
      hasDraggedRef.current = true;
      const arrows = handleArrowsRef.current;
      if (arrows) {
        arrows.classList.remove('pulse');
      }
    }
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    lastClientXRef.current = e.clientX;

    if (!frameRequestedRef.current) {
      frameRequestedRef.current = true;
      requestAnimationFrame(() => {
        frameRequestedRef.current = false;
        if (lastClientXRef.current != null) {
          updateFromClientX(lastClientXRef.current);
        }
      });
    }
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const Media = ({ src }: { src: string }) =>
    isVideo(src) ? (
      <video
        src={src}
        className="compare-media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        // @ts-ignore
        webkit-playsinline="true"
      />
    ) : (
      <img src={src} alt="" className="compare-media" />
    );

  return (
    <div
      ref={containerRef}
      className="compare-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Linkes Bild – Original */}
      <div className="compare-layer compare-left">
        <Media src={after} />
      </div>

      {/* Rechtes Bild – AI */}
      <div className="compare-layer compare-right">
        <Media src={before} />
      </div>

      {/* Slider-Linie + Pfeile */}
      <div className="compare-handle">
        <div className="handle-line" />
        <div
          ref={handleArrowsRef}
          className="handle-arrows pulse"
          aria-hidden
        >
          <span className="arrow left">‹</span>
          <span className="arrow right">›</span>
        </div>
      </div>

      {/* Labels unten */}
      <div ref={originalLabelRef} className="compare-label left">
        Original
      </div>
      <div ref={aiLabelRef} className="compare-label right">
        AI Generated
      </div>
    </div>
  );
}
