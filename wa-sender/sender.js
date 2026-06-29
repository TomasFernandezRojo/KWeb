const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const EXCEL_PATH = "C:/Users/Esteban/OneDrive/Documentos/prospectos_kweb.xlsx";
const LOG_PATH = path.join(__dirname, "enviados.json");
const AUTH_PATH = path.join(__dirname, ".wwebjs_auth");
const LIMITE_DIARIO = 20;
const DELAY_MIN = 45000;
const DELAY_MAX = 90000;

const rubro = process.argv[2];
if (!rubro) {
  console.log('Uso: node sender.js "Nombre del rubro"');
  process.exit(1);
}

function cargarLog() {
  if (!fs.existsSync(LOG_PATH)) return [];
  return JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
}

function guardarLog(log) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
}

function enviadosHoy(log) {
  const hoy = new Date().toISOString().slice(0, 10);
  return log.filter((e) => e.fecha && e.fecha.startsWith(hoy)).length;
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

function leerProspectos(rubroNombre) {
  const wb = XLSX.readFile(EXCEL_PATH);
  const sheetName = wb.SheetNames.find(
    (s) => s.toLowerCase() === rubroNombre.toLowerCase()
  );
  if (!sheetName) {
    console.log(`Rubro "${rubroNombre}" no encontrado. Hojas disponibles:`);
    wb.SheetNames.forEach((s) => console.log(" -", s));
    process.exit(1);
  }
  return XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomDelay() {
  return DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN);
}

// Mata todo Chrome y borra los lock files antes de arrancar
function limpiarAntesDeArrancar() {
  // Matar todos los chrome.exe (incluye el headless zombi)
  try { execSync("taskkill /F /IM chrome.exe /T", { stdio: "ignore", timeout: 8000 }); } catch (_) {}
  // Espera bloqueante para que el OS libere handles
  const fin = Date.now() + 3000;
  while (Date.now() < fin) {}
  // Borrar lock files
  const sessionPath = path.join(AUTH_PATH, "session");
  ["lockfile", "DevToolsActivePort", "SingletonLock", "SingletonCookie", "SingletonSocket"].forEach((f) => {
    try { fs.unlinkSync(path.join(sessionPath, f)); } catch (_) {}
  });
}

function crearCliente() {
  return new Client({
    authStrategy: new LocalAuth({ dataPath: AUTH_PATH }),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote"],
    },
  });
}

async function conectar() {
  limpiarAntesDeArrancar();
  const client = crearCliente();
  await new Promise((resolve, reject) => {
    client.on("qr", (qr) => {
      console.log("\nEscanea este QR con WhatsApp:\n");
      qrcode.generate(qr, { small: true });
    });
    client.on("ready", () => resolve());
    client.on("auth_failure", () => reject(new Error("auth_failure")));
    client.initialize().catch(reject);
  });
  return client;
}

async function main() {
  const log = cargarLog();
  const yaEnviados = new Set(log.map((e) => e.telefono));
  const cantHoy = enviadosHoy(log);

  if (cantHoy >= LIMITE_DIARIO) {
    console.log(`Ya enviaste ${cantHoy} mensajes hoy (límite: ${LIMITE_DIARIO}). Volvé mañana.`);
    process.exit(0);
  }

  const restantes = LIMITE_DIARIO - cantHoy;
  console.log(`Enviados hoy: ${cantHoy}/${LIMITE_DIARIO}. Quedan ${restantes} para hoy.`);

  const prospectos = leerProspectos(rubro);
  const pendientes = prospectos.filter((p) => {
    const tel = normalizarTelefono(p.Telefono || p.Teléfono || p.telefono || p.Tel || "");
    return tel.length > 10 && !yaEnviados.has(tel);
  });

  console.log(`Prospectos pendientes en "${rubro}": ${pendientes.length}`);
  if (pendientes.length === 0) {
    console.log("No hay prospectos nuevos para este rubro.");
    process.exit(0);
  }

  console.log("\nConectando a WhatsApp (matando Chrome previo si existe)...");
  let client;
  try {
    client = await conectar();
  } catch (err) {
    console.log(`[ERROR] No se pudo conectar: ${err.message}`);
    console.log("Relanzando proceso en 5 segundos...");
    await delay(5000);
    spawnSync(process.execPath, [__filename, rubro], { stdio: "inherit" });
    process.exit(0);
  }

  console.log("\nWhatsApp conectado. Empezando envíos...\n");
  let enviados = 0;

  for (const p of pendientes) {
    if (enviados >= restantes) {
      console.log(`\nLímite diario alcanzado (${LIMITE_DIARIO}). Hasta mañana.`);
      break;
    }

    const nombre = p.Nombre || p.nombre || "buen día";
    const tel = normalizarTelefono(p.Telefono || p.Teléfono || p.telefono || p.Tel || "");
    const ciudad = p.Ciudad || p.ciudad || "";
    const instagram = (p.Instagram || p.instagram || "").trim();
    const sinWeb = (p["Sin web"] || p["sin web"] || "").toString().toUpperCase();
    const tieneWeb = sinWeb === "NO";

    let mensaje;

    if (tieneWeb) {
      // Variante para quienes tienen web desactualizada
      const apertura = instagram
        ? `Vi tu perfil en Instagram (${instagram}) y también entré a tu web.`
        : `Estaba buscando inmobiliarias${ciudad ? ` por ${ciudad}` : ""}, entré a tu web y quería escribirte.`;

      mensaje =
        `Hola *${nombre}*, ¿cómo andás? ${apertura}\n\n` +
        `Somos Tomas y Santiago, dos chicos de 18 de *KWebs*. Renovamos páginas web para inmobiliarias: un diseño más actual, el listado de propiedades con filtros y el contacto directo. En unos 7 días la tenés lista.\n\n` +
        `Si querés te armo una previa de cómo quedaría renovada, sin compromiso. La ves y si te cierra coordinamos una llamada. ¡Gracias!\n\n` +
        `kwebs.com.ar`;
    } else {
      // Variante para quienes no tienen web
      const apertura = instagram
        ? `Vi tu perfil en Instagram (${instagram}) y me fijé que no tenés una web propia.`
        : `Estaba buscando inmobiliarias${ciudad ? ` por ${ciudad}` : ""} y vi que no tenés una web propia.`;

      mensaje =
        `Hola *${nombre}*, ¿cómo andás? ${apertura}\n\n` +
        `Somos Tomas y Santiago, dos chicos de 18 de *KWebs*. Hacemos páginas web para inmobiliarias: el listado de propiedades con sus filtros y el contacto, todo listo para que la gente te encuentre. En unos 7 días la tenés andando.\n\n` +
        `Si querés te armo una previa de cómo quedaría la tuya, sin compromiso. La ves y si te gusta coordinamos una llamada cuando puedas. ¡Gracias!\n\n` +
        `kwebs.com.ar`;
    }

    try {
      const numberId = await client.getNumberId(tel.replace("@c.us", ""));
      if (!numberId) {
        console.log(`[SKIP] ${nombre} — número no registrado en WA`);
        continue;
      }

      await client.sendMessage(numberId._serialized, mensaje);

      // Registrar envío antes del archive para no perder el conteo si falla
      log.push({ telefono: tel, nombre, rubro, ciudad, fecha: new Date().toISOString() });
      guardarLog(log);
      yaEnviados.add(tel);
      enviados++;
      console.log(`[${enviados}/${restantes}] ✓ ${nombre} (${ciudad}) — ${tel}`);

      // Archivar sin que un fallo aquí corte el proceso
      await delay(2000);
      try {
        const chat = await client.getChatById(numberId._serialized);
        await chat.archive();
      } catch (_) {}

      const d = randomDelay();
      console.log(`   Esperando ${Math.round(d / 1000)}s...`);
      await delay(d);

    } catch (err) {
      if (err.message && (
        err.message.includes("detached Frame") ||
        err.message.includes("Execution context was destroyed") ||
        err.message.includes("Target closed") ||
        err.message.includes("browser already running")
      )) {
        console.log(`[RECONECTANDO] ${err.message.split("\n")[0]} — relanzando proceso fresco...`);
        try { await client.destroy(); } catch (_) {}
        await delay(5000);
        spawnSync(process.execPath, [__filename, rubro], { stdio: "inherit" });
        process.exit(0);
      } else {
        console.log(`[ERROR] ${nombre}: ${err.message}`);
      }
    }
  }

  console.log(`\nListo. ${enviados} mensajes enviados hoy. Total: ${cantHoy + enviados}/${LIMITE_DIARIO}`);
  try { await client.destroy(); } catch (_) {}
  process.exit(0);
}

main();
