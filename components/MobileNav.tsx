'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

  const insetPanel = 12;
  const scrollTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {} };

  return (
    <>
      {/* FIXED Mobile Header */}
      <div
        className="mobile-header"
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 56,
          background: '#fff',
          borderBottom: 'none',
        }}
      >
        {/* Logo etwas tiefer */}
        <Logo
          color="blue"
          width={140}
          onClick={scrollTop}
          style={{ marginTop: '10px' }}
        />

        {/* Burger */}
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

      {/* OFF-CANVAS Panel */}
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
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--menu-bg, #00AEEF)',
          }}
        >
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
            {/* Logo etwas tiefer im Off-Canvas */}
            <Logo
              color="white"
              width={140}
              onClick={() => {
                scrollTop();
                setOpen(false);
              }}
              style={{ marginTop: '12px' }}
            />

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
              <Link href="/" onClick={() => { setOpen(false); scrollTop(); }}>Images</Link>
              <Link href="/print" onClick={() => setOpen(false)}>3D Print</Link>
              <Link href="/ai" onClick={() => setOpen(false)}>AI</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
