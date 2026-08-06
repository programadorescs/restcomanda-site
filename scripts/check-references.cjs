const fs = require("fs");
const path = require("path");

const html = fs.readFileSync("index.html", "utf8");
const refs = [
  ...html.matchAll(/(?:src|href)="(?!http|#|mailto|tel|data:)([^"]+)"/g),
].map((m) => m[1]);

const missing = [];
for (const r of new Set(refs)) {
  const clean = r.split("?")[0];
  if (!fs.existsSync(path.join(process.cwd(), clean))) missing.push(clean);
}

console.log("Referencias locales únicas:", new Set(refs).size);
if (missing.length) {
  console.log("FALTAN:");
  missing.forEach((m) => console.log("  -", m));
  process.exit(1);
}
console.log("Todas las referencias locales existen. OK");
