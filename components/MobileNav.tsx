'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // ESC schließt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Body Scroll-Lock, wenn Menü offen
  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <>
      {/* Mobile Header: Logo zentriert, Burger rechts */}
      <div className="mobile-header" role="banner">
        <div className="mobile-logo">BARAA</div>

        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Vollflächiges, deckendes Off-Canvas von rechts */}
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-header">
          <div className="mobile-logo">BARAA</div>
          <button
            className="close-x"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu-nav" role="navigation" aria-label="Hauptmenü">
          <Link href="/" onClick={() => setOpen(false)}>Images</Link>
          <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      </aside>
    </>
  );
}
