# Plan — Maqueta Lugar (web premium + agente de consulta IA)

## Objetivo
Previa para **Ignacio Trentini**, coordinador de **Lugar – alquilá, vendé, viví** (inmobiliaria de Córdoba). Web nueva premium con sus propiedades reales + un **sector agéntico** (agente de consulta con IA real) que es justo lo que Ignacio pidió. Meta: cerrar a Lugar como cliente de KWebs; el agente como diferencial/add-on (posible sinergia con Trigga).

## Decisiones confirmadas (con Tomas, 29/06)
- **Agente:** demo funcional REAL → API de Claude con el catálogo de propiedades en contexto.
- **Propiedades:** reales scrapeadas de su Tokko (subset 12–18 destacadas).
- **Identidad:** propuesta nueva premium (KWebs propone la dirección; su web actual es template genérico de Tokko sin identidad fuerte).

## Info real de Lugar (fuentes verificadas)
- **Servicios:** Venta, Alquiler, Alquiler Temporario, Tasaciones — *(home lugarcba.com)*
- **Zona:** Córdoba capital, centro — *(web)*
- **Catálogo actual:** 82 props (68 deptos, 7 casas, 4 oficinas, 1 local, 1 cochera, 1 terreno) — *(/Propiedades)*
- **Plataforma actual:** Tokko Broker (template genérico) — *(pie de lugarcba.com)*
- **Contacto:** Independencia 864 Of. H, X5000 Córdoba · Fijo +54 351 423-4376 · WhatsApp +54 9 351 521-3517 · info@lugarcba.com · L–D 8–20 h — *(web + Google + Excel)*
- **Redes:** IG @lugar.cba · FB /lugar.cba — *(web + búsqueda)*
- **Reputación:** 4,4★ / 302 reseñas Google — *(ficha Google)*
- **Slogan:** "Te ayudamos a alcanzar tus sueños!" — *(web)*

## Stack (patrón Olhaus/BUEPROP)
Next 16.2 · React 19 · Tailwind 4 · framer-motion/motion · lucide-react · next-themes · cva/clsx/tailwind-merge.
**Agente:** Next API route (server-side) → Claude API. Deploy en Vercel (`lugar`).
Estructura: `Lugar/{brief, web}` · `web/{app, components, lib, public}` · ficha `app/propiedad/[id]`.

## Dirección de diseño propuesta (a validar en CP2)
Concepto que juega con el nombre "Lugar" / "viví" → sensación de **hogar premium**, para diferenciarse de las 3 previas dark anteriores (Olhaus dorado, BUEPROP rojo, Olivar verde).
- **Opción A (recomendada):** light editorial cálido — base hueso/crema, acento terracota/arcilla, serif elegante (titulares) + sans (texto). Cálido, humano, "lugar".
- **Opción B:** dark premium real-estate con acento cálido (si Ignacio es más clásico).
- Logo: NO rediseñar la marca (regla KWeb); modernizar wordmark.

## Skills a aplicar
- Diseño/UX: `/impeccable`, `/ui-ux-pro-max`, `web-design-guidelines`.
- Efectos: **21st.dev** (CSS puro, igual que Olhaus/BUEPROP/Olivar).
- Agente: leer skill **claude-api** ANTES de codear el endpoint (model id, params, tool use, caching).
- Al cerrar: `humanizer` para los copys, `/save` para registrar la sesión.

## Dependency graph
```
[1 brief/data real] ──► [2 scraping props Tokko] ──► [4 secciones + cards]
        │                                              ▲
        └──────────► [3 web base + design system] ────┘
                              │
                              ├──► [5 ficha /propiedad/[id]]
                              └──► [6 sector agéntico: API route + widget]  ◄── (necesita [2] catálogo)
                                              │
                                   [7 deploy Vercel + QA]
```

## Tareas (slices verticales)

### Fase 0 — Setup + data (fundación)
**T1. Brief con info real**
- Crear `Lugar/brief/CONTENIDO.md` (fuente de verdad) con toda la ficha + fuentes.
- AC: el archivo tiene servicios, zona, contacto, redes, slogan, todo con fuente citada.

**T2. Scraping de propiedades reales (Tokko)**
- Extraer 12–18 props de lugarcba.com/Propiedades → `web/lib/properties.ts` + `brief/props.json` (fotos CDN, precio, operación, tipo, m², amb, dorm, ubicación, código).
- AC: ≥12 props reales con foto válida y datos completos; tipan con una interface `Property`.
- Verificación: `console.table` de las props; abrir 3 URLs de foto y que carguen.
- ⚠️ Riesgo: Tokko puede requerir parsear su JSON interno o render dinámico. Plan B: scrapear las fichas individuales.

### Fase 1 — Web base
**T3. Bootstrap Next + design system**
- `create-next-app` (patrón Olhaus), Tailwind 4, fuentes, tokens de color (dirección elegida), `lib/brand.tsx`, layout, globals.css con variables.
- AC: `npm run dev` levanta sin errores; tokens y tipografías aplicados; build limpio.
- **CHECKPOINT CP2** → mostrar hero + design system a Tomas para validar dirección visual ANTES de seguir.

### Fase 2 — Secciones (la maqueta visible)
**T4. Hero + Navbar + efecto 21st.dev**
- Hero con efecto (aurora/text-generate/flip-words según dirección), CTA a propiedades y al agente.
- AC: hero responsive, efecto andando, CTA funcionales (scroll/anchor).

**T5. Sección Propiedades (grid + filtros) usando data real**
- Grid de cards con las props de T2, filtros básicos (operación/tipo), hover premium.
- AC: renderiza las props reales; filtros funcionan; cards linkean a la ficha.

**T6. Servicios + Nosotros + Opiniones + Contacto/Mapa + Footer**
- Servicios (4), bloque institucional con slogan real, opiniones (estilo 3-col auto-scroll Lookstudio), contacto con WhatsApp real + mapa Google embed (output=embed, sin API key) en Independencia 864, footer.
- AC: todas las secciones con data real; WhatsApp y mapa apuntan a Lugar.

**T7. Ficha de propiedad `/propiedad/[id]`**
- Galería lightbox, specs, precio, CTA WhatsApp + "consultar al agente".
- AC: ruta dinámica andando para cada prop; galería navegable.
- **CHECKPOINT CP3** → maqueta visual completa, revisión con Tomas.

### Fase 3 — Sector agéntico (el diferencial)
**T8. Endpoint del agente (API route → Claude)**
- Leer skill `claude-api` primero. `app/api/agente/route.ts`: recibe mensaje + historial, arma system prompt con el catálogo (T2) en contexto, llama a Claude (modelo a definir según claude-api), devuelve respuesta estructurada (texto + props sugeridas).
- AC: dado "deptos 2 amb en centro hasta USD X" devuelve props reales que matchean; no inventa propiedades fuera del catálogo.
- Verificación: 4–5 consultas de prueba con respuestas correctas citando props reales.
- ⚠️ Prerequisito: **API key de Claude** (¿la misma del wa-bot de Trigga?) + ojo presupuesto de tokens.

**T9. Widget de chat embebido (frontend)**
- Burbuja flotante + panel de chat, estados (typing, props como cards clickeables dentro del chat), diseño integrado a la identidad.
- AC: conversación en vivo contra T8; las props sugeridas linkean a la ficha; mobile-ok.
- **CHECKPOINT CP4** → probar el agente respondiendo en vivo con Tomas.

### Fase 4 — Cierre
**T10. Deploy + QA + entrega**
- Deploy Vercel (`lugar`), QA mobile/desktop, lighthouse, revisar que el agente ande en prod (API key en env de Vercel).
- AC: URL pública live; agente funcional en prod; sin errores de consola; build limpio.
- `humanizer` en copys + `/save` de la sesión + actualizar hub KWeb.

## Checkpoints (resumen)
- **CP1** (tras T2): validar data real scrapeada.
- **CP2** (tras T3): validar dirección visual antes de construir secciones.
- **CP3** (tras T7): maqueta visual completa.
- **CP4** (tras T9): agente funcional en vivo.
- **CP5** (tras T10): deploy final + entrega.

## Riesgos / dependencias abiertas
1. **API key de Claude** para el agente (confirmar cuál usar + límite de gasto).
2. **Scraping de Tokko** puede necesitar parseo del JSON dinámico (plan B: fichas individuales).
3. **Modelo del agente:** definir en T8 leyendo `claude-api` (sonnet rápido/barato vs el más nuevo).
4. **Honestidad comercial:** es una previa; Olhaus/BUEPROP no son clientes cerrados (no venderlos como tales).
5. **Negocio:** definir si el agente se factura dentro de KWebs o como add-on de Trigga (no bloquea la maqueta).
