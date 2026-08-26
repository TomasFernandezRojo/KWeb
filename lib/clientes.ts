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
  /** Marca de la casa, al fondo de la tarjeta (`public/clientes/marks/`) */
  mark: string
  /** Ancho de la marca sobre la tarjeta — cada logotipo tiene su proporcion */
  markW: string
  /** Cuanto se separa del borde derecho. Cada logotipo encuadra distinto. */
  markRight: string
  /** Cuanto se deja ver la marca. Los logos opacos piden menos. */
  markOpacity: number
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
    mark: '/clientes/marks/diemar.png',
    markW: '58%',
    markRight: '6%',
    markOpacity: 0.2,
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
    mark: '/clientes/marks/kloths.png',
    markW: '74%',
    markRight: '4%',
    markOpacity: 0.2,
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
    mark: '/clientes/marks/sagosa.svg',
    markW: '80%',
    markRight: '5%',
    markOpacity: 0.22,
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
    mark: '/clientes/marks/trigga.svg',
    markW: '40%',
    markRight: '10%',
    markOpacity: 0.24,
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
    mark: '/clientes/marks/mundo-repuestos.png',
    markW: '76%',
    markRight: '4%',
    markOpacity: 0.18,
    accent: '#FF4A3D',
    gradient: 'linear-gradient(160deg, #180806 0%, #3d0f0a 55%, #7a1d12 100%)',
  },
]

export const getCliente = (slug: string) => clientes.find((c) => c.slug === slug)
