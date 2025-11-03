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
    fontSize: '14px',
    fontWeight: 500,
    color: '#000',
    textDecoration: 'none',
    opacity: 0.9,
    lineHeight: 1.1,
    transition: 'color 0.25s ease, opacity 0.25s ease',
  };

  const hoverColor = '#00AEEF';

  return (
    <aside className={`side-dock ${hidden ? 'hidden' : ''}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '8px',
        }}
      >
        <Logo color="blue" width={120} />
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          marginTop: '4px',
        }}
      >
        <Link
          href="/"
          style={linkStyle}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          Images
        </Link>

        <Link
          href="/print"
          style={linkStyle}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          3D Print
        </Link>

        {/* 🆕 AI-Seite */}
        <Link
          href="/ai"
          style={linkStyle}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          AI
        </Link>

        <Link
          href="/about"
          style={linkStyle}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = hoverColor)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#000')}
        >
          About
        </Link>
      </nav>
    </aside>
  );
}
