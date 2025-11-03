'use client';

import Link from 'next/link';

type Props = {
  color?: 'blue' | 'white' | 'black';
  /** feste Zielbreite in px (Höhe wird via Seitenverhältnis berechnet, wenn nicht gesetzt) */
  width?: number;
  /** feste Zielhöhe in px (überschreibt die aus width berechnete Höhe) */
  height?: number;
  onClick?: () => void;
  className?: string;
};

const COLOR = {
  blue: '#00AEEF',
  white: '#ffffff',
  black: '#101010',
} as const;

// Seitenverhältnis deines Logos (ungefähr): 132 : 40
const AR = 132 / 40;

export default function Logo({
  color = 'blue',
  width,
  height,
  onClick,
  className = '',
}: Props) {
  const fill = COLOR[color];
  let w = typeof width === 'number' ? width : 132;
  let h = typeof height === 'number' ? height : Math.round(w / AR);

  return (
    <Link href="/" onClick={onClick} aria-label="Home">
      <span
        className={className}
        style={{
          display: 'inline-block',
          width: w,
          height: h,
          color: fill,
          backgroundColor: 'currentColor',
          WebkitMaskImage: "url('/logo-baraa.png')",
          maskImage: "url('/logo-baraa.png')",
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </Link>
  );
}
