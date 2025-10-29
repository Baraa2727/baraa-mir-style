'use client';

import './globals.css';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import SideDock from '../components/SideDock';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Body-Scroll sperren wenn Mobile-Menü offen
  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) html.classList.add('menu-open');
    else html.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <html lang="de">
      <body>
        {/* Desktop: SideDock; Mobile: Hamburger */}
        <SideDock />

        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <main className="content">{children}</main>

        {/* Mobile Slide-in Menü */}
        <aside
          className={`mobile-menu${menuOpen ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="mobile-menu__top">
            <div className="mobile-brand">BARAA</div>
            <button
              className="mobile-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
            <Link href="/">Images</Link>
            <Link href="/print">3D Print</Link>
            <Link href="/about">About</Link>
          </nav>
        </aside>
      </body>
    </html>
  );
}
