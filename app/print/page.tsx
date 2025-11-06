import MasonryGrid from "../../components/MasonryGrid";
import printItems from "../../content/print-items.json";

export default function PrintPage() {
  return (
    <main className="site">
      <header className="header">
        <h1>We prototype and build.</h1>
      </header>

      <MasonryGrid
        items={printItems as any}
        clickable={false}                       // 🔹 nicht anklickbar
        rowSpecs={[{ cols: 2, aspect: "square" }]} // 🔹 erste Reihe: 2 quadratisch
        defaultSpec={{ cols: 3, aspect: "portrait" }} // 🔹 ab Reihe 2: 3 hochformat
      />
    </main>
  );
}
