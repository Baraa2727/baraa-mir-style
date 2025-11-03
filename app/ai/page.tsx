import MasonryGrid from "@/components/MasonryGrid";
import aiItems from "@/content/ai-items.json";

export const metadata = {
  title: "AI — BARAA",
};

export default function AIPage() {
  return (
    <main className="site">
      <header className="header">
        <h1>AI</h1>
      </header>

      <MasonryGrid items={aiItems as any} />
    </main>
  );
}
