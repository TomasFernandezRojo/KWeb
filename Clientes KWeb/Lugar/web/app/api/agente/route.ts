import { NextRequest, NextResponse } from "next/server";
import { properties, type Property, type Operacion } from "@/lib/properties";

export const runtime = "nodejs";

// ---- Búsqueda local sobre el catálogo real (siempre activa) ----
function searchProperties(q: string): Property[] {
  const t = q.toLowerCase();

  let op: Operacion | null = null;
  if (/(comprar|venta|vender|en venta)/.test(t)) op = "Venta";
  else if (/(tempora|por noche|por d[ií]a|airbnb|vacacion)/.test(t)) op = "Temporario";
  else if (/(alquil|renta|arrend)/.test(t)) op = "Alquiler";

  const barrios = [
    "nueva córdoba", "nueva cordoba", "centro", "alta córdoba", "alta cordoba",
    "alberdi", "cerro", "general paz", "tejas",
  ];
  const barrioHit = barrios.find((b) => t.includes(b));

  let tipo: string | null = null;
  if (/(casa|d[uú]plex|duplex)/.test(t)) tipo = "casa";
  else if (/(depto|departamento|monoambiente|monoamb)/.test(t)) tipo = "depto";

  const ambMatch = t.match(/(\d)\s*(amb|ambiente|dorm)/);
  const amb = ambMatch ? parseInt(ambMatch[1], 10) : null;

  // tope de precio (USD o ARS)
  let maxUSD: number | null = null;
  let maxARS: number | null = null;
  const usdM = t.match(/(?:usd|u\$s|dolares|d[oó]lares)\s*\$?\s*([\d.]+)/);
  if (usdM) maxUSD = parseInt(usdM[1].replace(/\./g, ""), 10);
  const arsM = t.match(/\$\s*([\d.]{6,})/);
  if (arsM && !usdM) maxARS = parseInt(arsM[1].replace(/\./g, ""), 10);

  let res = properties.filter((p) => {
    if (op && p.operacion !== op) return false;
    if (barrioHit && !p.barrio.toLowerCase().includes(barrioHit.split(" ")[0])) return false;
    if (tipo === "casa" && p.tipo === "Departamento") return false;
    if (tipo === "depto" && p.tipo !== "Departamento") return false;
    if (amb && p.ambientes < amb) return false;
    if (maxUSD && p.moneda === "USD" && p.precioNum > maxUSD) return false;
    if (maxARS && p.moneda === "ARS" && p.precioNum > maxARS) return false;
    return true;
  });

  if (res.length === 0) {
    res = properties.filter((p) => (op ? p.operacion === op : true)).slice(0, 3);
  }
  return res.slice(0, 4);
}

function localReply(q: string, found: Property[]): string {
  if (found.length === 0) {
    return "No encontré propiedades con esas características ahora mismo, pero tenemos más opciones en el catálogo. ¿Querés que te pase el contacto para una búsqueda a medida?";
  }
  const n = found.length;
  return `Encontré ${n} ${n === 1 ? "propiedad que encaja" : "propiedades que encajan"} con lo que buscás. Te las dejo acá abajo. Si alguna te interesa, podés ver la ficha completa o escribirnos por WhatsApp para coordinar una visita.`;
}

// ---- Reply con Claude (si hay API key) ----
async function claudeReply(
  messages: { role: string; content: string }[],
  found: Property[]
): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const catalogo = found.map((p) => ({
    titulo: p.titulo, tipo: p.tipo, operacion: p.operacion, precio: p.precio,
    barrio: p.barrio, m2: p.m2, ambientes: p.ambientes, dormitorios: p.dormitorios,
    amenities: p.amenities,
  }));

  const system = `Sos el asistente virtual de "Lugar", una inmobiliaria de Córdoba (Argentina). Atendés consultas en la web con tono cercano, claro y argentino (voseo), sin exagerar ni sonar robótico.
Reglas:
- Respondé SOLO sobre las propiedades reales que te paso. NO inventes propiedades, precios ni datos.
- Estas son las propiedades que matchean la consulta del usuario: ${JSON.stringify(catalogo)}.
- Sé breve (2-4 oraciones). Mencioná 1-2 opciones concretas por barrio/precio si vienen al caso.
- Cerrá invitando a ver la ficha o a escribir por WhatsApp para coordinar una visita.
- Si no hay matches, ofrecé tomar los datos para una búsqueda a medida.`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system,
        messages: messages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" ? text : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: string; content: string }[];
    };
    const last = messages?.[messages.length - 1]?.content ?? "";
    const found = searchProperties(last);

    const fromClaude = await claudeReply(messages, found);
    const reply = fromClaude ?? localReply(last, found);

    return NextResponse.json({
      reply,
      props: found.map((p) => ({
        id: p.id, titulo: p.titulo, barrio: p.barrio, precio: p.precio,
        operacion: p.operacion, m2: p.m2, foto: p.fotos[0],
      })),
      mode: fromClaude ? "claude" : "local",
    });
  } catch {
    return NextResponse.json(
      { reply: "Tuvimos un problema procesando tu consulta. Probá de nuevo en un momento.", props: [] },
      { status: 200 }
    );
  }
}
