'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function SideDock() {
  // Sichtbarkeit per Scroll steuern (unverändert)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const d = y - lastY.current
      if (y > 80 && d > 2) setHidden(true)
      else if (d < -2 || y < 20) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className={`side-dock ${hidden ? 'hidden' : ''}`}>
      {/* Logo größer */}
      <div className="logo" style={{ fontSize: '22px', letterSpacing: '0.04em' }}>
        <Link href="/">BARAA</Link>
      </div>

      <nav>
        <Link href="/" className="active">Images</Link>
        <Link href="/print">3D Print</Link>
        <Link href="/about">About</Link>
      </nav>
    </aside>
  )
}
