import './globals.css'
import type { ReactNode } from 'react'
import SideDock from '../components/SideDock'
export const metadata = { title: 'Baraa — Architectural Rendering', description: 'Portfolio' }
export default function RootLayout({children}:{children:ReactNode}){
  return (<html lang="de"><body>
    <SideDock/>
    {children}
    <footer className="footer">
      <a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a>
    </footer>
  </body></html>)
}
