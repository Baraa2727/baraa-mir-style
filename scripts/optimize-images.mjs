import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();

// Eingang: große Originalbilder
const ORIGINALS_DIR = path.join(ROOT, "public", "media_originals");
// Ausgabe: optimierte Bilder (von der Website benutzt)
const OUTPUT_DIR = path.join(ROOT, "public", "media");

// Maximalbreiten
const DEFAULT_MAX_WIDTH = 1800;      // normale Projekte
const THEWID_HERO_MAX_WIDTH = 1600;  // THE WID global / Haus-Heros
const THEWID_OTHER_MAX_WIDTH = 1400; // andere THE-WID-Bilder

const QUALITY = 80;

async function optimizeImage(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();

  // Nur JPG / JPEG / PNG anfassen – alles andere ignorieren
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    console.log(`Skipping (unsupported extension): ${srcPath}`);
    return;
  }

  const relFromOriginals = path
    .relative(ORIGINALS_DIR, srcPath)
    .replace(/\\/g, "/");

  const outPath = path.join(OUTPUT_DIR, relFromOriginals);
  const outDir = path.dirname(outPath);
  await fs.mkdir(outDir, { recursive: true });

  // Maximalbreite je nach Pfad bestimmen
  let maxWidth = DEFAULT_MAX_WIDTH;
  if (relFromOriginals.startsWith("thewid/hero/")) {
    maxWidth = THEWID_HERO_MAX_WIDTH;
  } else if (relFromOriginals.startsWith("thewid/")) {
    maxWidth = THEWID_OTHER_MAX_WIDTH;
  }

  let meta;
  try {
    meta = await sharp(srcPath).metadata();
  } catch (err) {
    console.log(`Skipping (sharp error): ${relFromOriginals}`);
    console.log("  →", err.message);
    // Zur Sicherheit das Original einfach nur kopieren
    await fs.copyFile(srcPath, outPath);
    return;
  }

  if (!meta.width) {
    console.log(`Skipping (no width): ${relFromOriginals}`);
    await fs.copyFile(srcPath, outPath);
    return;
  }

  // Wenn das Bild eh schon kleiner ist als maxWidth → nur kopieren
  if (meta.width <= maxWidth) {
    console.log(
      `Copy only (already <= maxWidth): ${relFromOriginals} (${meta.width}px)`
    );
    await fs.copyFile(srcPath, outPath);
    return;
  }

  console.log(
    `Optimizing ${relFromOriginals}: ${meta.width}px → max ${maxWidth}px`
  );

  await sharp(srcPath)
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
  .then(() => {
    console.log("✅ Optimization finished: media_originals → media");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
