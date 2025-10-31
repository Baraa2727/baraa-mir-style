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

  // Body Scroll-Lock + nur vertikales Scrollen erlauben
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

  return (
    <>
      {/* MOBILE HEADER: Logo mittig, Burger rechts, keine Unterlinie */}
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
          marginBottom: 8, // reduziert Abstand zum Content
        }}
      >
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

        {/* minimalistischer Burger (dünne, enge Linien) */}
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
            gap: 3,                 // enger
            border: 'none',
            background: 'transparent',
            padding: 0,
            marginRight: 6,
          }}
        >
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
          <span style={{ display: 'block', width: 22, height: 1, backgroundColor: '#101010' }} />
        </button>
      </div>

      {/* OFF-CANVAS: fixed, deckend, über ALLEM (inkl. Header), von rechts */}
      <aside
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,               // top/right/bottom/left = 0
          width: '100vw',
          height: '100dvh',
          zIndex: 9999,           // über Header/Burger
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Scrim hinter Panel (schließt bei Klick) */}
        {open && (
          <button
            className="mobile-scrim"
            aria-hidden
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0)', // deckendes Panel selbst ist rechts, scrim bleibt transparent
              border: 'none',
            }}
          />
        )}

        {/* Panel-Container rechts */}
        <div
          className="panel"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'var(--menu-bg, #111)',
          }}
        >
          {/* Panel-Header: Logo mittig, KEINE Linie; X absolut oben rechts */}
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
              style={{ fontSize: 28, lineHeight: 1, textDecoration: 'none', color: '#fff' }}
            >
              BARAA
            </div>

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
                color: '#fff',
              }}
            >
              ×
            </button>
          </div>

          {/* Menü mittig im Viewport */}
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
                gap: 24,
                textAlign: 'center',
              }}
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
