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

  // Body Scroll-Lock
  useEffect(() => {
    if (open) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <>
      {/* MOBILE HEADER: Logo links, Burger rechts */}
      <div
        className="mobile-header"
        role="banner"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div
          className="mobile-logo"
          style={{ fontSize: '28px', lineHeight: 1, textDecoration: 'none' }}
        >
          BARAA
        </div>

        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          // Fallback, falls keine Burger-Styles in CSS vorhanden sind:
          style={{
            width: 36,
            height: 28,
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            border: 'none',
            background: 'transparent',
            padding: 0,
          }}
        >
          <span style={{ display: 'block', width: 24, height: 2, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 24, height: 2, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 24, height: 2, backgroundColor: '#101010' }} />
        </button>
      </div>

      {/* PANEL: Vollflächig, von rechts; Logo mittig, X oben rechts */}
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        // stellt sicher, dass die Fläche wirklich voll ist (falls CSS fehlt)
        style={{ minHeight: '100dvh' }}
      >
        <div
          className="mobile-menu-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
          }}
        >
          <div
            className="mobile-logo"
            style={{
              justifySelf: 'center',
              fontSize: '28px',
              lineHeight: 1,
              textDecoration: 'none',
            }}
          >
            BARAA
          </div>

          <button
            className="close-x"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            // Falls CSS fehlt: Position oben rechts sicherstellen
            style={{
              fontSize: 28,
              lineHeight: 1,
              background: 'transparent',
              border: 'none',
              padding: '8px 12px',
              justifySelf: 'end',
            }}
          >
            ×
          </button>
        </div>

        {/* Menü mittig im Bildschirm */}
        <div
          className="mobile-menu-body"
          style={{
            height: 'calc(100dvh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <nav
            className="mobile-menu-nav"
            role="navigation"
            aria-label="Hauptmenü"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'center',
            }}
          >
            <Link href="/" onClick={() => setOpen(false)}>Images</Link>
            <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
