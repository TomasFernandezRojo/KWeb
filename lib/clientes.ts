// ===== Clientes reales de KWeb — fuente única de verdad =====
// El portfolio de la home y los casos de estudio leen de acá.

export type Estado = 'produccion' | 'desarrollo'

export interface Cliente {
  slug: string
  nombre: string
  categoria: string
  /** Una línea. Lo que hicimos, no adjetivos. */
  resumen: string
  /** A dónde lleva la tarjeta: caso interno o sitio externo. `null` = sin link. */
  href: string | null
  /** true si `href` sale del sitio */
  externo: boolean
  estado: Estado
  /** Lo que se lee abajo a la izquierda de la tarjeta */
  etiqueta: string
  /** Texto del CTA al hacer hover */
  cta: string
  /** Logo real de la marca, en `public/clientes/` */
  logo: string
  /** Fondo del cuadrado del logo — cada marca necesita el suyo para verse bien */
  logoBg: string
  accent: string
  /** Fondo de la tarjeta. Base oscura teñida con el color de la marca. */
  gradient: string
}

export const clientes: Cliente[] = [
  {
    slug: 'diemar',
    nombre: 'Expreso Diemar',
    categoria: 'Área tecnológica',
    resumen:
      '+40 años moviendo carga. Les rehicimos el sitio y construimos el tracking en vivo, el cotizador y el asistente.',
    href: '/clientes/diemar',
    externo: false,
    estado: 'produccion',
    etiqueta: 'diemar.vercel.app',
    cta: 'Ver el caso',
    logo: '/clientes/diemar.png',
    logoBg: '#062a4a',
    accent: '#FF6900',
    gradient:
      'linear-gradient(160deg, #062a4a 0%, #08487e 52%, #0b60a9 82%, #2e8fe0 100%)',
  },
  {
    slug: 'kloths',
    nombre: 'Kloths',
    categoria: 'Tienda online',
    resumen: 'E-commerce de surfwear con carrito, MercadoPago y stock en vivo.',
    href: 'https://kloths.com.ar',
    externo: true,
    estado: 'produccion',
    etiqueta: 'kloths.com.ar',
    cta: 'Ver sitio',
    logo: '/clientes/kloths.png',
    logoBg: '#FFFFFF',
    accent: '#00C8FF',
    gradient: 'linear-gradient(160deg, #04131c 0%, #063049 55%, #0a5d84 100%)',
  },
  {
    slug: 'sagosa',
    nombre: 'SAGOSA',
    categoria: 'Sistema a medida',
    resumen:
      'Cotizador de fletes sobre 3.500 productos y las 20.500 localidades del país.',
    href: 'https://sagosa-cotizador.vercel.app',
    externo: true,
    estado: 'produccion',
    etiqueta: 'sagosa-cotizador.vercel.app',
    cta: 'Ver sitio',
    logo: '/clientes/sagosa.svg',
    logoBg: '#101216',
    accent: '#FFCC01',
    gradient: 'linear-gradient(160deg, #14100a 0%, #2e2410 55%, #6b5510 100%)',
  },
  {
    slug: 'trigga',
    nombre: 'Trigga',
    categoria: 'Automatizaciones',
    resumen: 'Landing institucional para una agencia de automatizaciones con IA.',
    href: 'https://trigga.vercel.app',
    externo: true,
    estado: 'produccion',
    etiqueta: 'trigga.vercel.app',
    cta: 'Ver sitio',
    logo: '/clientes/trigga.svg',
    logoBg: '#0A0A0B',
    accent: '#22D68A',
    gradient: 'linear-gradient(160deg, #050d09 0%, #0a2419 55%, #114a31 100%)',
  },
  {
    slug: 'mundo-repuestos',
    nombre: 'Mundo Repuestos',
    categoria: 'Sistema a medida',
    resumen:
      'El precio de compra de una pieza en todos sus proveedores, desde un solo buscador.',
    href: null,
    externo: false,
    estado: 'desarrollo',
    etiqueta: 'En desarrollo',
    cta: 'Próximamente',
    logo: '/clientes/mundo-repuestos.jpg',
    logoBg: '#EC1D0B',
    accent: '#FF4A3D',
    gradient: 'linear-gradient(160deg, #180806 0%, #3d0f0a 55%, #7a1d12 100%)',
  },
]

export const getCliente = (slug: string) => clientes.find((c) => c.slug === slug)
