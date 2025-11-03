'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

export default function SideDock() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - lastY.current;
      if (y > 80 && d > 2) setHidden(true);
      else if (d < -2 || y < 20) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 400,
    color: '#000',
    textDecoration: 'none',
    opacity: 0.9,
    lineHeight: 1.1,
    transition: 'color 0.25s ease, opacity 0.25s ease',
  };

  const hoverColor = '#00AEEF';

  return (
    <aside className={`side-dock ${hidden ? 'hidden' : ''}`}>
      {/* Logo (Box bleibt unangetastet) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Logo color="blue" width={118} />
      </div>

      {/* Navigation: global gap = 0, Abstände je Link feinjustiert */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,            // kein globaler Abstand
          marginTop: 2,
        }}
      >
        {/* Images etwas NÄHER an 3D Print */}
        <Link
          href="/"
          style={{ ...linkStyle, marginBottom: 2 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          Images
        </Link>

        {/* 3D Print bleibt als Referenzpunkt */}
        <Link
          href="/print"
          style={{ ...linkStyle, margin: 0 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          3D Print
        </Link>

        {/* AI ebenfalls NÄHER an 3D Print */}
        <Link
          href="/ai"
          style={{ ...linkStyle, marginTop: 2 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          AI
        </Link>

        {/* About bleibt etwas weiter unten mit kleinem Rand unten */}
        <Link
          href="/about"
          style={{ ...linkStyle, marginTop: 14, marginBottom: 10 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          About
        </Link>
      </nav>
    </aside>
  );
}
