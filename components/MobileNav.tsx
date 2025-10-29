"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Body-Scroll sperren wenn Menü offen
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      {/* Obere Leiste */}
      <header className="mobile-header only-mobile" aria-label="Mobile Header">
        <Link href="/" className="mobile-logo" onClick={() => setOpen(false)}>
          BARAA
        </Link>

        <button
          className="burger"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Overlay + Panel */}
      <div
        id="mobile-menu-panel"
        className={`mobile-menu ${open ? "open" : ""} only-mobile`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-menu-header">
          <span className="mobile-logo">BARAA</span>
          <button
            className="close-x"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu-nav" onClick={() => setOpen(false)}>
          <Link href="/">Images</Link>
          <Link href="/print">3D Print</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </>
  );
}
