import Link from "next/link";
import items from "../content/items.json";

type Item = {
  id: string;
  kind: "image" | "video";
  src: string;
  title?: string;
};

/* Reihenmuster: 2,3,3,2,4, (wiederholt sich) */
const PATTERN = [2, 3, 3, 2, 4];

function chunkByPattern<T>(arr: T[], pattern: number[]) {
  const rows: T[][] = [];
  let i = 0, p = 0;
  while (i < arr.length) {
    const take = pattern[p % pattern.length];
    rows.push(arr.slice(i, i + take));
    i += take;
    p++;
  }
  return rows;
}

export default function MasonryGrid() {
  const data = items as Item[];
  const rows = chunkByPattern(data, PATTERN);

  return (
    <section className="rows">
      {rows.map((row, idx) => (
        <div className="row" data-cols={PATTERN[idx % PATTERN.length]} key={idx}>
          {row.map((it) => (
            <Link href={`/project/${it.id}`} key={it.id} className="tile" prefetch={false}>
              {it.kind === "video" ? (
                <video src={it.src} muted autoPlay loop playsInline />
              ) : (
                <img src={it.src} alt={it.title || ""} />
              )}
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
