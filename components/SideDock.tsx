'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function SideDock() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const isAI = pathname === '/ai';

  // Ein-/Ausblenden beim Scrollen wie gehabt
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

  const baseColor = isAI ? '#fff' : '#000';
  const hoverColor = '#00AEEF';

  const linkStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 400,
    color: baseColor,
    textDecoration: 'none',
    opacity: 0.9,
    lineHeight: 1.1,
    transition: 'color 0.25s ease, opacity 0.25s ease',
  };

  // Hover nur auf Nicht-AI Seiten blau einfärben
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isAI) return;
    (e.target as HTMLElement).style.color = hoverColor;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isAI) return;
    (e.target as HTMLElement).style.color = '#000';
  };

  return (
    <aside className={`side-dock ${hidden ? 'hidden' : ''}`}>
      {/* Logo: auf AI weiß, sonst blau – Größe unverändert */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Logo color={isAI ? 'white' : 'blue'} width={118} />
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          marginTop: 2,
        }}
      >
        <Link href="/" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          Images
        </Link>

        <Link href="/print" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          3D Print
        </Link>

        <Link href="/ai" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          AI
        </Link>

        <Link
          href="/about"
          style={{ ...linkStyle, marginTop: 14, marginBottom: 10 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          About
        </Link>
      </nav>
    </aside>
  );
}
