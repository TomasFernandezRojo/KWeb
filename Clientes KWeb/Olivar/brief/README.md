# OLIVAR — previa KWebs (prospecto: amigo de Santi)

**Rubro:** productor artesanal de **aceite de oliva, aceitunas** y (próximamente) **frutos secos**.
**Estado:** maqueta genérica para arrancar. Falta info real (llega ~26/06/2026).

## Cómo correrla
```
cd "Clientes KWeb/Olivar/web"
npm install        # ya hecho
npm run dev        # http://localhost:3000 (se levantó en :3007 al armarla)
```
Stack: Next.js 16 + Tailwind 4 + lucide-react. Mismo patrón que Olhaus/BUEPROP.

## Diseño
- **Dark + verde olivar** (OKLCH, neutros tintados). Acento dorado = aceite extra virgen.
- Tipografía: **Fraunces** (display serif, carácter artesanal) + **Hanken Grotesk** (body).
- Anti-slop: sin gradient-text, sin side-stripe borders, sin grids de cards idénticas, sin em dashes.
- Imágenes = placeholders con textura por producto (`.media-aceite/aceituna/frutos` en globals.css). Reemplazar por fotos reales.

## Estructura de la landing
Nav · Hero · Marquee de confianza · Origen · **Productos (3 categorías)** · Proceso (4 pasos) · Diferenciales · Testimonios · CTA/Contacto · Footer.

## Qué reemplazar cuando llegue la info (todo centralizado)
- **`web/lib/brand.tsx`** → nombre real, WhatsApp, IG, tel, mail, ubicación. (Hoy todo placeholder, marcado con `TODO(cliente)`.)
- **`web/lib/products.ts`** → catálogo real (categorías, items, detalles), proceso, diferenciales, testimonios.
- **Fotos reales** → del olivar, botellas, aceitunas, frutos secos (hero, origen, cards).
- **Marca "OLIVAR"** es nombre de trabajo → cambiar en `brand.tsx` (`BRAND`).

## Pendiente
- [ ] Confirmar nombre real de la marca y datos de contacto.
- [ ] Sumar fotos reales.
- [ ] Definir si querés tienda con carrito o pedido por WhatsApp (hoy: WhatsApp).
- [ ] Deploy preview en Vercel (proyecto `olivar`) para mandarle al prospecto.
