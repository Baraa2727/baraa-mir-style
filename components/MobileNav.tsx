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
      {/* MOBILE HEADER: Logo mittig, Burger rechts; keine Unterlinie */}
      <div
        className="mobile-header"
        role="banner"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          minHeight: 56,
          borderBottom: 'none',
        }}
      >
        {/* zentriertes Logo ohne Unterstreichung */}
        <div
          className="mobile-logo"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 28,
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          BARAA
        </div>

        {/* minimalistischer Burger rechts */}
        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            width: 32,
            height: 24,
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,                // enger zusammen
            border: 'none',
            background: 'transparent',
            padding: 0,
            marginRight: 4,
          }}
        >
          {/* dünnere Striche */}
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
        </button>
      </div>

      {/* PANEL: Vollflächig von rechts; X oben rechts; keine Unterlinie im Header */}
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        style={{ minHeight: '100dvh', position: 'relative' }}
      >
        {/* Panel-Header mit zentriertem Logo, ohne Linie */}
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
            style={{
              fontSize: 28,
              lineHeight: 1,
              textDecoration: 'none',
            }}
          >
            BARAA
          </div>

          {/* Close-X absolut oben rechts */}
          <button
            className="close-x"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontSize: 28,
              lineHeight: 1,
              background: 'transparent',
              border: 'none',
              padding: 8,
            }}
          >
            ×
          </button>
        </div>

        {/* Menü mittig im Bildschirm */}
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
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
