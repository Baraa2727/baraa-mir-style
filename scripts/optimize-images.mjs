import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();

// Originale liegen hier:
const ORIGINALS_DIR = path.join(ROOT, "public", "media_originals");
// Optimierte Dateien werden hierhin geschrieben:
const OUTPUT_DIR = path.join(ROOT, "public", "media");

// Maximalbreiten
const DEFAULT_MAX_WIDTH = 2200;       // normale Projekte
const THEWID_HERO_MAX_WIDTH = 1800;   // THE WID global / Haus-Hero
const THEWID_OTHER_MAX_WIDTH = 1600;  // andere THE-WID-Bilder

const QUALITY = 85;

async function optimizeImage(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const relFromOriginals = path
    .relative(ORIGINALS_DIR, srcPath)
    .replace(/\\/g, "/");

  // Zielpfad unter public/media
  const outPath = path.join(OUTPUT_DIR, relFromOriginals);
  const outDir = path.dirname(outPath);
  await fs.mkdir(outDir, { recursive: true });

  // Max-Breite je nach Ordner bestimmen
  let maxWidth = DEFAULT_MAX_WIDTH;
  if (relFromOriginals.startsWith("thewid/hero/")) {
    maxWidth = THEWID_HERO_MAX_WIDTH;
  } else if (relFromOriginals.startsWith("thewid/")) {
    maxWidth = THEWID_OTHER_MAX_WIDTH;
  }

  const img = sharp(srcPath);
  const meta = await img.metadata();

  if (!meta.width) {
    console.log(`Skipping (no width): ${relFromOriginals}`);
    return;
  }

  // Nur verkleinern, wenn Bild größer als maxWidth ist
  if (meta.width <= maxWidth) {
    console.log(`Skipping (already <= maxWidth): ${relFromOriginals}`);
    // Trotzdem das Original 1:1 nach OUTPUT kopieren (falls noch nicht da)
    await fs.copyFile(srcPath, outPath);
    return;
  }

  console.log(
    `Optimizing ${relFromOriginals}: ${meta.width}px → max ${maxWidth}px`
  );

  await img
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY })
    .toFile(outPath);

  console.log(`  → Wrote optimized: ${path.relative(OUTPUT_DIR, outPath)}`);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else {
      await optimizeImage(full);
    }
  }
}

walk(ORIGINALS_DIR)
  .then(() => console.log("✅ Image optimization finished (from media_originals → media)"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
