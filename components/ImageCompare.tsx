'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../app/ImageCompare.css';

type Props = {
  before: string; // AI generated (rechts, Basis)
  after: string;  // Original (links, Overlay)
};

export default function ImageCompare({ before, after }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50); // 0..100 (% von links)

  // Puls-Hinweis bis zum ersten Drag
  const [shouldPulse, setShouldPulse] = useState(false);
  const hasPulsedRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const isVideo = (src: string) => {
    const s = src.toLowerCase();
    return s.endsWith('.mp4') || s.endsWith('.webm') || s.endsWith('.mov');
  };

  // Puls starten, wenn sichtbar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !hasPulsedRef.current) {
          hasPulsedRef.current = true;
          setShouldPulse(true);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));
  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(pct));
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current) return;
    e.preventDefault();
    if (!hasDraggedRef.current) { hasDraggedRef.current = true; setShouldPulse(false); }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    updateFromClientX(e.clientX);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    updateFromClientX(e.clientX);
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    draggingRef.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const isLeft = pos < 25;
  const isRight = pos > 75;

  // Einheitliches Media-Element (Bild oder Video)
  const Media = ({ src, className }: { src: string; className?: string }) =>
    isVideo(src) ? (
      <video
        src={src}
        className={className ?? 'compare-media'}
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
      <img src={src} alt="" className={className ?? 'compare-media'} />
    );

  return (
    <div
      ref={containerRef}
      className="compare-container"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-label="Media comparison slider"
    >
      {/* Basis: AI (rechts) – rechts verankert */}
      <div className="compare-layer compare-base">
        <Media src={before} className="compare-media base-media" />
      </div>

      {/* Overlay: Original (links) – volle Größe, Sicht nur über Clip-Child */}
      <div className="compare-layer compare-overlay">
        <div className="compare-overlay-clip" style={{ width: `${pos}%` }}>
          <div className="compare-overlay-inner">
            <Media src={after} className="compare-media overlay-media" />
          </div>
        </div>
      </div>

      {/* Handle + Pfeile */}
      <div className="compare-handle" style={{ left: `${pos}%` }}>
        <div className="handle-line" />
        <div className={`handle-arrows ${shouldPulse ? 'pulse' : ''}`} aria-hidden>
          <span className="arrow left">‹</span>
          <span className="arrow right">›</span>
        </div>
      </div>

      {/* Labels */}
      {isLeft && <div className="compare-label right">AI Generated</div>}
      {isRight && <div className="compare-label left">Original</div>}
    </div>
  );
}
