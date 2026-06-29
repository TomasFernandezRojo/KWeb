const { execSync } = require("child_process");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const EXCEL_PATH = "C:/Users/Esteban/OneDrive/Documentos/prospectos_kweb.xlsx";
const LOG_PATH = path.join(__dirname, "enviados.json");

// Rubros con mensaje adaptado en sender.js
// Cuando quieras agregar un rubro nuevo, primero adaptá el mensaje en sender.js
const RUBROS_ACTIVOS = ["Peluquerias"];

function cargarLog() {
  if (!fs.existsSync(LOG_PATH)) return [];
  return JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
}

function normalizarTelefono(tel) {
  let t = String(tel).replace(/\D/g, "");
  if (t.startsWith("0")) t = t.slice(1);
  if (t.startsWith("54")) {
    if (t.length === 12 && t[2] !== "9") t = "549" + t.slice(2);
  } else {
    if (t.length === 10) t = "549" + t;
    else if (t.length === 8 || t.length === 7) t = "54911" + t;
  }
  return t + "@c.us";
}

const log = cargarLog();
const yaEnviados = new Set(log.map((e) => e.telefono));
const wb = XLSX.readFile(EXCEL_PATH);

let rubroElegido = null;
let maxPendientes = 0;

for (const rubro of RUBROS_ACTIVOS) {
  const sheetName = wb.SheetNames.find(
    (s) => s.toLowerCase() === rubro.toLowerCase()
  );
  if (!sheetName) continue;
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
  const pendientes = rows.filter((p) => {
    const tel = normalizarTelefono(p.Telefono || p.Teléfono || p.telefono || p.Tel || "");
    return tel.length > 10 && !yaEnviados.has(tel);
  }).length;

  console.log(`Rubro "${rubro}": ${pendientes} pendientes`);
  if (pendientes > maxPendientes) {
    maxPendientes = pendientes;
    rubroElegido = rubro;
  }
}

if (!rubroElegido || maxPendientes === 0) {
  console.log("No hay prospectos pendientes en ningún rubro activo.");
  process.exit(0);
}

console.log(`\nArrancando con: "${rubroElegido}" (${maxPendientes} pendientes)\n`);
execSync(`node sender.js "${rubroElegido}"`, {
  cwd: __dirname,
  stdio: "inherit",
});
