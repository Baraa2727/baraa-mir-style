import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();

// Eingang: große Originalbilder
const ORIGINALS_DIR = path.join(ROOT, "public", "media_originals");
// Ausgabe: optimierte Bilder
const OUTPUT_DIR = path.join(ROOT, "public", "media");

// Milde, hochwertige Maximalbreiten
const DEFAULT_MAX_WIDTH = 3200;      // normale Projekte
const THEWID_HERO_MAX_WIDTH = 3000;  // THE WID Haupt-Hero / Haus-Hero
const THEWID_OTHER_MAX_WIDTH = 2800; // THE WID sonstige Bilder

// Hohe Qualität
const QUALITY = 90;

async function optimizeImage(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();

  // Nur JPG / PNG anfassen
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

  // ------------------------------------------
  // NEU: nur bearbeiten, wenn nötig
  // → Wenn es bereits ein Output gibt,
  //   der gleich neu oder neuer ist als das Original,
  //   dann überspringen wir dieses Bild.
  // ------------------------------------------
  try {
    const [srcStat, outStat] = await Promise.all([
      fs.stat(srcPath),
      fs.stat(outPath),
    ]);

    if (outStat.mtimeMs >= srcStat.mtimeMs) {
      console.log(`Skipping (already optimized): ${relFromOriginals}`);
      return;
    }
  } catch (err) {
    // Wenn outPath noch nicht existiert → fs.stat wirft Fehler → normal,
    // in dem Fall machen wir einfach weiter und optimieren/kopieren das Bild.
  }

  // ----------------------------
  // 1) HAUPTSEITE (MasonryGrid)
  //    → ext-01.jpg, ext-02.jpg, ...
  //    → NIE verkleinern, nur kopieren
  // ----------------------------
  const baseName = path.basename(relFromOriginals);
  if (baseName.startsWith("ext-")) {
    console.log(
      `Copy HOMEPAGE image (no resize): ${relFromOriginals}`
    );
    await fs.copyFile(srcPath, outPath);
    return;
  }

  // ----------------------------
  // 2) Maximalbreite je nach Pfad
  // ----------------------------
  let maxWidth = DEFAULT_MAX_WIDTH;

  // Alle Bilder unter public/media_originals/projekte → max. 3000px
  if (relFromOriginals.startsWith("projekte/")) {
    maxWidth = 3000;

  // THE WID – Haupt-Hero
  } else if (relFromOriginals.startsWith("thewid/hero/")) {
    maxWidth = THEWID_HERO_MAX_WIDTH;

  // THE WID – restliche Bilder
  } else if (relFromOriginals.startsWith("thewid/")) {
    maxWidth = THEWID_OTHER_MAX_WIDTH;
  }

  let meta;
  try {
    meta = await sharp(srcPath).metadata();
  } catch (err) {
    console.log(`Skipping (sharp error): ${relFromOriginals}`);
    console.log("  →", err.message);
    // Sicher: Original einfach kopieren
    await fs.copyFile(srcPath, outPath);
    return;
  }

  if (!meta.width) {
    console.log(`Skipping (no width): ${relFromOriginals}`);
    await fs.copyFile(srcPath, outPath);
    return;
  }

  // Wenn Bild eh schon klein genug → nur kopieren
  if (meta.width <= maxWidth) {
    console.log(
      `Copy only (<= maxWidth): ${relFromOriginals} (${meta.width}px <= ${maxWidth}px)`
    );
    await fs.copyFile(srcPath, outPath);
    return;
  }

  // ----------------------------
  // 3) Mild verkleinern
  // ----------------------------
  console.log(
    `Optimizing ${relFromOriginals}: ${meta.width}px → ${maxWidth}px`
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
