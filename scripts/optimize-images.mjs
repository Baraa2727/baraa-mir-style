import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "public", "media");
const MAX_WIDTH = 2500;
const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const rel = path.relative(ROOT, filePath);
  console.log("Optimizing:", rel);

  const img = sharp(filePath);
  const meta = await img.metadata();

  // Schon klein genug -> nichts tun
  if (meta.width && meta.width <= MAX_WIDTH && !meta.density) {
    return;
  }

  let pipeline = img.resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.jpeg({ quality: QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY });
  }

  await pipeline.toFile(filePath + ".tmp");
  await fs.rename(filePath + ".tmp", filePath);
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
    console.log("Done optimizing images in public/media");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
