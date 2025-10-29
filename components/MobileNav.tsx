'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // ESC zum Schließen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Obere Mobile-Bar (nur auf kleinen Screens sichtbar via CSS) */}
      <div className="mobile-topbar" role="banner">
        <div className="brand">BARAA</div>

        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-panel"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Vollflächiges Panel, solid, schiebt von rechts rein */}
      <aside
        id="mobile-panel"
        className={`mobile-panel${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="panel-header">
          <div className="brand">BARAA</div>
          <button
            className="close"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="panel-nav" role="navigation" aria-label="Hauptmenü">
          <Link href="/" onClick={() => setOpen(false)}>Images</Link>
          <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      </aside>

      {/* Klick auf die Verdunkelung schließt ebenfalls */}
      {open && <button className="mobile-scrim" aria-hidden onClick={() => setOpen(false)} />}
    </>
  );
}
