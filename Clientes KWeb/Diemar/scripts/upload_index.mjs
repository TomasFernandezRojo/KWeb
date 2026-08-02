// Sube guias-index.json a Vercel Blob con URL estable (mismo link cada noche).
// Necesita la env var BLOB_READ_WRITE_TOKEN (secret del proyecto de Vercel).
// Uso:  node upload_index.mjs [archivo]
import { put } from "@vercel/blob";
import fs from "node:fs";

const file = process.argv[2] || "guias-index.json";
const data = fs.readFileSync(file);

const { url } = await put("guias-index.json", data, {
  access: "private", // store privado (el índice tiene DNIs). Se lee con token.
  addRandomSuffix: false, // URL fija -> el sitio siempre lee el mismo link
  allowOverwrite: true,
  contentType: "application/json",
});

console.log("Índice subido a:", url);
console.log("(Poné esta URL en la env var GUIAS_INDEX_URL del proyecto de Vercel)");
