'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
  color?: 'blue' | 'white' | 'black';
  /** feste Zielbreite in px (optional) */
  width?: number;
  /** feste Zielhöhe in px (optional) */
  height?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function Logo({
  color = 'blue',
  width,
  height,
  onClick,
  className,
  style,
}: Props) {
  // Grundhöhe des Logos
  const logoHeight = height ?? 28;

  const textColor =
    color === 'white'
      ? '#ffffff'
      : color === 'black'
      ? '#222222'
      : '#00AEEF'; // blue

  return (
    <Link
      href="/"
      onClick={onClick}
      className={className}
      style={{ textDecoration: 'none' }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: logoHeight,
          minWidth: width,
          padding: '0 4px',
          // Century Gothic + Fallbacks
          fontFamily:
            '"Century Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
          fontSize: logoHeight * 0.7,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: 1,
          color: textColor,
          ...style,
        }}
      >
        BARAA
      </span>
    </Link>
  );
}
