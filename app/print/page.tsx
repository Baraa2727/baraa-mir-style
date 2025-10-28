import MasonryGrid from "../../components/MasonryGrid";
import printItems from "../../content/print-items.json";

export default function PrintPage() {
  return (
    <main>
      <header className="header">
        <h1>3D Print.</h1>
        <h1>We prototype and build.</h1>
      </header>
      <MasonryGrid items={printItems as any} maxRows={11} />
    </main>
  );
}
