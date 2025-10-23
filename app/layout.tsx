// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SideDock from "../components/SideDock";

export const metadata: Metadata = {
  title: {
    default: "BARAA – 3D Renderings & Visualization",
    template: "%s | BARAA",
  },
  description:
    "Architectural renderings, 3D visualization and design by Baraa Shareet.",
  // KEINE icons-Angabe nötig – Next verwendet automatisch app/icon.png
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <SideDock />
        {children}
        <footer className="footer">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </footer>
      </body>
    </html>
  );
}
