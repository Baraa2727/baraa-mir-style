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

  const insetPanel = 12; // Abstand oben/rechts für das X im Panel

  const scrollTop = () => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
  };

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
          justifyContent: 'center',
          minHeight: 56,
          background: '#fff',
          borderBottom: 'none',
        }}
      >
        {/* Logo klickbar -> Home & nach oben */}
        <Link
          href="/"
          onClick={scrollTop}
          className="mobile-logo"
          style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          BARAA
        </Link>

        {/* Burger – nah am rechten Rand */}
        <button
          className="burger"
          aria-label="Menü öffnen"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
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
          // Blau über CSS-Variable; falls nicht gesetzt, fallback #1756ff
          style={{ position: 'absolute', inset: 0, background: 'var(--menu-bg, #1756ff)' }}
        >
          {/* Panel-Header: Logo mittig, X oben rechts */}
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
            {/* Logo klickbar -> Home & nach oben, schließt Panel */}
            <Link
              href="/"
              onClick={() => { scrollTop(); setOpen(false); }}
              className="mobile-logo"
              style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
            >
              BARAA
            </Link>

            <button
              className="close-x"
              aria-label="Menü schließen"
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: insetPanel,
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
              <Link href="/" onClick={() => { setOpen(false); scrollTop(); }}>Images</Link>
              <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
