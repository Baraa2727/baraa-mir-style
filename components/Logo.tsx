'use client';

import Link from 'next/link';

type Props = {
  color?: 'blue' | 'white' | 'black';
  size?: 'mobile' | 'desktop';
  onClick?: () => void;
  className?: string;
};

const COLOR = {
  blue: '#00AEEF',
  white: '#ffffff',
  black: '#101010',
} as const;

export default function Logo({
  color = 'blue',
  size = 'desktop',
  onClick,
  className = '',
}: Props) {
  const fill = COLOR[color];
  const dims = size === 'desktop'
    ? { width: 132, height: 40 }   // Desktop-Größe
    : { width: 108, height: 34 };  // Mobile-Größe

  return (
    <Link href="/" onClick={onClick} aria-label="Home">
      <span
        className={className}
        style={{
          display: 'inline-block',
          width: dims.width,
          height: dims.height,
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
