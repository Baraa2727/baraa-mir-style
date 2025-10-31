'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // ESC schließt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Body Scroll-Lock + horizontales Scrollen unterbinden
  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-x-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-x-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-x-scroll');
    };
  }, [open]);

  // Abstände
  const insetHeaderRight = 8;   // Burger NOCH näher an den rechten Rand
  const insetPanel = 12;        // Abstand für das X im Panel (oben + rechts)

  return (
    <>
      {/* MOBILE HEADER: fixed, Logo mittig, Burger rechts */}
      <div
        className="mobile-header"
        role="banner"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 5000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          minHeight: 56,
          background: '#fff',
          borderBottom: 'none',
          paddingRight: insetHeaderRight, // <— näher zum Rand
        }}
      >
        <div
          className="mobile-logo"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          BARAA
        </div>

        {/* minimalistischer Burger */}
        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            width: 30,
            height: 22,
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            border: 'none',
            background: 'transparent',
            padding: 0,
          }}
        >
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
        </button>
      </div>

      {/* OFF-CANVAS: fixed, deckend, über allem */}
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 9999,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div
          className="panel"
          style={{ position: 'absolute', inset: 0, background: 'var(--menu-bg, #111)' }}
        >
          {/* Panel-Header: Logo mittig, X oben rechts (gleicher Abstand oben/rechts) */}
          <div
            className="mobile-menu-header"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 56,
              borderBottom: 'none',
            }}
          >
            <div
              className="mobile-logo"
              style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: '#fff' }}
            >
              BARAA
            </div>

            <button
              className="close-x"
              aria-label="Menü schließen"
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: insetPanel,          // leicht nach unten
                right: insetPanel,
                fontSize: 28,
                lineHeight: 1,
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#fff',
              }}
            >
              ×
            </button>
          </div>

          {/* Menü mittig */}
          <div
            className="mobile-menu-body"
            style={{
              height: 'calc(100dvh - 56px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <nav
              className="mobile-menu-nav"
              role="navigation"
              aria-label="Hauptmenü"
              style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'center' }}
            >
              <Link href="/" onClick={() => setOpen(false)}>Images</Link>
              <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
