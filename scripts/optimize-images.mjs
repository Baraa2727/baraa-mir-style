import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "public", "media");

// Standard-Breite für normale Bilder
const DEFAULT_MAX_WIDTH = 2200;
// Spezielle Breiten für THE WID
const THEWID_HERO_MAX_WIDTH = 1800;
const THEWID_OTHER_MAX_WIDTH = 1600;

const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  // relative Pfad innerhalb /public/media, mit `/` auch unter Windows
  const relFromMedia = path
    .relative(INPUT_DIR, filePath)
    .replace(/\\/g, "/");

  // Je nach Ordner andere maximale Breite
  let maxWidth = DEFAULT_MAX_WIDTH;

  if (relFromMedia.startsWith("thewid/hero/")) {
    maxWidth = THEWID_HERO_MAX_WIDTH;
  } else if (relFromMedia.startsWith("thewid/")) {
    maxWidth = THEWID_OTHER_MAX_WIDTH;
  }

  console.log(`Optimizing: ${relFromMedia} → max ${maxWidth}px`);

  const img = sharp(filePath);
  const meta = await img.metadata();

  // Wenn das Bild eh schon kleiner oder gleich ist, nichts tun
  if (meta.width && meta.width <= maxWidth) {
    console.log("  skip (already small enough)");
    return;
  }

  let pipeline = img.resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  // immer als JPEG mit QUALITY ausgeben (kannst du anpassen)
  pipeline = pipeline.jpeg({ quality: QUALITY });

  const tmpPath = filePath + ".tmp";
  await pipeline.toFile(tmpPath);
  await fs.rename(tmpPath, filePath);
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

walk(INPUT_DIR)
  .then(() => {
    console.log("✅ Done optimizing images in public/media");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
