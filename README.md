# KWeb — Landing Page

Landing page ultra profesional para KWeb, agencia de desarrollo web en Argentina.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion** — animaciones de entrada y acordeón
- **GSAP + ScrollTrigger** — animaciones scroll, parallax, SVG path
- **Three.js** — fondo de partículas 3D animado en el hero
- **Plus Jakarta Sans** — tipografía via next/font

## Instrucciones

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
npm run build
npm start
```

## Estructura

```
app/
  layout.tsx        — Layout raíz con fuente y metadata SEO
  page.tsx          — Página principal (ensambla todas las secciones)
  globals.css       — Variables CSS, estilos base, scrollbar personalizado

components/
  ui/
    dotted-surface.tsx   — Fondo Three.js con partículas animadas (Hero)
    motion-footer.tsx    — Footer cinemático con GSAP reveal

  sections/
    Navbar.tsx           — Navbar fija con glassmorphism al scroll + menú mobile
    Hero.tsx             — Hero fullscreen con título staggered y CTA WhatsApp
    Marquee.tsx          — Banda marquee infinita con servicios
    Servicios.tsx        — Grid 3col de servicios con efecto 3D hover (GSAP)
    ComoTrabajamos.tsx   — 4 pasos con línea SVG animada por scroll
    Portfolio.tsx        — Grid masonry 6 proyectos con parallax GSAP
    FAQ.tsx              — Acordeón animado Framer Motion
    CTAFinal.tsx         — Sección CTA final con glow dorado
```

## Contacto

WhatsApp: [+54 9 307 207-4300](https://wa.me/5493072074300)
