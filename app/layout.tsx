import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SideDock from "../components/SideDock";
import MobileNav from "../components/MobileNav";

export const metadata: Metadata = {
  title: "BARAA",
  description: "Architectural Images, 3D Print & Models",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        {/* Desktop: linke Dock */}
        <div className="only-desktop">
          <SideDock />
        </div>

        {/* Mobile: Top-Bar mit Burger */}
        <MobileNav />

        {/* Inhalt */}
        <main className="site">{children}</main>
      </body>
    </html>
  );
}