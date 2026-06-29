# Olhaus Grupo Inmobiliario — material extraído (fuente de verdad)

> Web real: https://www.olhaus.com.ar/ · CMS: Tecnogestion · Zona: Pilar + CABA (Zona Norte)
> Assets locales: `logo.png` (wordmark 201×60) · `props.json` (20 propiedades)

## Marca
- **Nombre:** Grupo Inmobiliario Olhaus
- **Logo:** wordmark "OLHAUS" + isotipo montaña "M" (blanco sobre negro en el avatar de WA/IG).
- **Estética recomendada:** **dark-premium** — negro/blanco con acento. Acentos vistos en su sitio: verde profundo `#0A4C03`, bordó/rojo `#9e192b`/`#850819`. Para previa propongo **negro + blanco + dorado/tierra suave** (look real estate premium, matchea el logo B&N).
- **No rediseñar el logo** (regla KWeb): respetar su esencia.

## Copy real
- **Misión (textual):** "Somos una empresa dedicada a proveer y crear soluciones globales de calidad en materia habitacional y comercial. Somos protagonistas de una nueva forma de trabajar en el sector inmobiliario, formando parte de la historia de nuestros clientes, aportando experiencia y excelencia. Nos distinguimos por ser un equipo que prioriza las relaciones y cautiva clientes para toda la vida, promoviendo el crecimiento profesional y personal de cada uno de sus miembros."
- **Slogan corto:** "Nuestro compromiso es acompañarte y brindarte todo lo necesario para lograr tu objetivo."

## Servicios
Venta · Alquiler · Alquiler Temporario · Tasaciones · Emprendimientos.
Tipos: Departamentos, Casas, Oficinas, Locales, PH, Terrenos, Cocheras, Depósitos.

## Contacto
- **WhatsApp / Tel:** 11 3494-0003
- **Email:** info@olhaus.com.ar
- **IG:** @olhausgrupoinmobiliario · FB: Olhausgrupoinmobiliario · LinkedIn: grupo-inmobiliario-olhaus
- **Oficinas:**
  - Los Crisantemos 265, Ed. Skyglass 1, Of. 209 — Del Viso, Pilar *(dato que pasó Tomas)*
  - Av. del Libertador 6091, Piso 5 Dto A — CABA
- **Matrícula:** Maria S. Vilariño — CSI 6726 / CPI 9801

## Propiedades reales (20 — `props.json`)
Fotos reales en `cdn.tecnogestion.com.ar/multimedia/OLH/...` (campo `img`).

**VENTA (10):**
- Depto Villa Santa Rita (CABA) — U$S 185.000 · 96 m² · 2 dorm · 2 baños
- Depto Villa Santa Rita — U$S 210.000 · 150 m² · 2 dorm · 2 baños
- Depto Villa Santa Rita — U$S 150.000 / 149.000 / 140.000 / 138.000 / 136.000 · ~60 m² · 1 dorm
- Depto Floresta (CABA) — U$S 149.000 · 62 m² · 1 dorm
- Terreno/Lote San Sebastián, Escobar — U$S 14.500 (811 m²) y U$S 20.000 (983 m²)

**ALQUILER (10):**
- Depto Alto del Molino, Pilar — $700.000 / $550.000 · 71 m² · 1 dorm (Zona Norte)
- Casa Mayling CC, Pilar — U$S 2.700 · 200 m² · 4 dorm
- Casa Maschwitz Privado, Escobar — U$S 2.500 · 250 m² · 6 dorm
- Casa Chalet Los Eucaliptus, Pilar — $1.700.000 · 135 m² · 3 dorm
- Depto Villanueva, Tigre — U$S 700 · 110 m² · 2 dorm
- Oficina San Nicolás (CABA) — $750.000 · 84 m²
- Depósito/Galpón Villa Rosa, Pilar — U$S 4.000 · 3.750 m²

> Filtros sugeridos: **Operación** (Venta/Alquiler) × **Tipo** (Departamento/Casa/Oficina/Terreno/Local) × **Zona** (Pilar–Zona Norte/CABA/Escobar/Tigre).

## Testimonios
No hay reseñas públicas scrapeadas. Usar 3-4 testimonios de tono inmobiliario (genéricos creíbles) o pedirle a Tomas reseñas reales de Google si las tiene.

## Nota para el pitch — administración de propiedades
La maqueta carga las propiedades reales scrapeadas del sitio actual (Tecnogestion). **En la versión final, el dueño administra las propiedades desde un panel** (alta/baja/edición de fotos, precio y datos) o la conectamos a su cargador actual vía import. NO es una web estática: las propiedades se actualizan solas. → mencionarlo al presentar para que quede claro que es un sitio vivo.

## Detalle de propiedad (implementado)
Cada propiedad tiene su ficha propia (`/propiedad/[id]`): galería con lightbox (6–56 fotos reales), specs (m²/ambientes/dorm/baños/estado/orientación/disposición), descripción, tabla de características, mapa de la zona y caja de contacto con WhatsApp + matrícula. Las cards del catálogo linkean a la ficha (ya NO saltan directo a WhatsApp).
