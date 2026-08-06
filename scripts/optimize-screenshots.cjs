const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const defaultSrc = path.join(__dirname, "..", "..", "app", "src", "main", "assets");
const srcDir = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;
const outDir = path.join(__dirname, "..", "assets", "screenshots");

if (!fs.existsSync(srcDir)) {
  console.error("No se encontró el directorio de capturas:", srcDir);
  console.error("Uso: node scripts/optimize-screenshots.cjs [ruta-al-repo-RestComanda]");
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /^rc-\d+\.png$/.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

(async () => {
  for (const f of files) {
    const out = path.join(outDir, f.replace(".png", ".webp"));
    await sharp(path.join(srcDir, f))
      .resize({ width: 608, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(out);
    const before = fs.statSync(path.join(srcDir, f)).size;
    const after = fs.statSync(out).size;
    console.log(
      `${f} -> ${path.basename(out)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${((1 - after / before) * 100).toFixed(0)}% menor)`
    );
  }
})();
