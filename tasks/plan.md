# Plan — Modernización kwebs.com.ar (2026-08-26)

## Objetivo
Que la landing de KWeb muestre **clientes reales pagos** y el **abanico real de
desarrollos** que hacemos hoy (no solo "páginas web").

## Alcance
1. **Portfolio** — sacar OnWay (proyecto propio, no cliente). Sumar:
   - **Expreso Diemar** → caso de estudio interno (`/clientes/diemar`)
   - **SAGOSA** → live, `sagosa-cotizador.vercel.app`
   - **Mundo Repuestos** → en desarrollo
   - Se quedan Kloths y Trigga.
2. **`/clientes/diemar`** — landing propia con la **paleta real de Diemar**
   (azul `#0b60a9` / celeste `#59acf4` / naranja `#ff6900` / azul profundo `#062a4a`),
   explicando qué hacemos con ellos + botón a `diemar.vercel.app`.
3. **Servicios** — reescribir con los desarrollos reales, texto corto.

## Dato sensible (decisión tomada)
Los números internos de Diemar (116.583 guías, 375 localidades, 96,5 % conformadas)
salen de **su reporte privado** y **no están publicados en su propia web**.
→ **No se publican en KWeb.** El caso se cuenta por **capacidades construidas**,
no por volumen del cliente. `brief/material-para-la-web.md` lo deja explícito.

## Dependencias
```
Servicios.tsx ──┐
Portfolio.tsx ──┼─→ (independientes entre sí)
                │
lib/clientes.ts ─→ Portfolio.tsx
                └─→ app/clientes/diemar/page.tsx
```
`lib/clientes.ts` como fuente única: el portfolio y el caso leen los mismos datos.

## Fases
| # | Fase | Verificación |
|---|------|--------------|
| 1 | Fuente de datos de clientes | `tsc` compila |
| 2 | Portfolio con los 5 clientes reales | build OK, Diemar linkea a `/clientes/diemar` |
| 3 | Landing `/clientes/diemar` con paleta Diemar | ruta responde, links salen a `diemar.vercel.app` |
| 4 | Servicios reescrito, corto | build OK |
| 5 | Navbar + metadata | `next build` limpio |

**Checkpoint tras fase 3:** mostrarle la landing a Tomas antes de seguir.
