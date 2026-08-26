import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Globe, MapPin, IdCard, Calculator, MessagesSquare, Smartphone, Gauge,
  ArrowUpRight, ArrowLeft, type LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/ui/reveal'

/* ===== Paleta REAL de Expreso Diemar =====
   Azul = estructura · Naranja = acento y CTAs · Celeste = luz.
   Los mismos tokens que usa diemar.vercel.app.                        */
const SITIO_DIEMAR = 'https://diemar.vercel.app'
const WA_KWEB = 'https://wa.me/5493072074300'

export const metadata: Metadata = {
  title: 'Expreso Diemar — Caso | KWeb',
  description:
    'Somos el área tecnológica de Expreso Diemar: sitio nuevo, tracking en vivo, cotizador propio y un asistente que atiende en la web y en WhatsApp.',
  openGraph: {
    title: 'Expreso Diemar — Caso | KWeb',
    description:
      'Sitio nuevo, tracking en vivo, cotizador propio y un asistente que atiende en la web y en WhatsApp.',
    locale: 'es_AR',
    type: 'article',
  },
}

/* --- Datos del caso --------------------------------------------------- */

const hechos = [
  { valor: '+40', label: 'Años de Diemar en la ruta' },
  { valor: '5', label: 'Sistemas en producción' },
  { valor: '24/7', label: 'El asistente no cierra' },
  { valor: '1', label: 'Cerebro para web y WhatsApp' },
]

interface Modulo {
  titulo: string
  texto: string
  Icon: LucideIcon
  vivo: boolean
}

const modulos: Modulo[] = [
  {
    titulo: 'Sitio nuevo',
    texto: 'Rediseño completo con la identidad real de la marca. Rápido, propio y mobile-first.',
    Icon: Globe,
    vivo: true,
  },
  {
    titulo: 'Tracking en vivo',
    texto: 'El cliente pone el número de guía y ve el estado real de su envío al instante.',
    Icon: MapPin,
    vivo: true,
  },
  {
    titulo: 'Seguimiento por CUIT o DNI',
    texto: 'Sin número de guía a mano: con el documento aparecen todos sus envíos.',
    Icon: IdCard,
    vivo: true,
  },
  {
    titulo: 'Cotizador propio',
    texto: 'Calcula el precio con el tarifario real de la empresa. No estima: cotiza.',
    Icon: Calculator,
    vivo: true,
  },
  {
    titulo: 'Asistente en la web',
    texto: 'Rastrea, cotiza y responde. Cuando hace falta una persona, deriva.',
    Icon: MessagesSquare,
    vivo: true,
  },
  {
    titulo: 'Bot de WhatsApp',
    texto: 'El mismo asistente, en el canal donde los clientes ya les escriben.',
    Icon: Smartphone,
    vivo: false,
  },
  {
    titulo: 'Panel de control',
    texto: 'Bandeja de conversaciones, derivación a un humano y estadísticas de lo que se pregunta.',
    Icon: Gauge,
    vivo: false,
  },
]

const stack = [
  'Next.js', 'TypeScript', 'Postgres', 'Vercel', 'GitHub Actions',
  'Claude API', 'WhatsApp Cloud API',
]

/* --- Página ----------------------------------------------------------- */

export default function DiemarCase() {
  return (
    <main className="bg-white">

      {/* ===== Barra superior ===== */}
      <header className="sticky top-0 z-50 bg-[#062a4a]/85 backdrop-blur-md border-b border-[#16507f]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#eaf3fb]/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="font-syne font-bold">
              <span className="text-[#C9A84C]">K</span>Web
            </span>
          </Link>

          <a
            href={SITIO_DIEMAR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#ff6900] hover:bg-[#ff8534] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Ver el sitio
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[#062a4a]">
        {/* Luz celeste y acento naranja */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 78% 8%, rgba(89,172,244,0.28) 0%, transparent 58%), radial-gradient(ellipse at 8% 100%, rgba(255,105,0,0.16) 0%, transparent 55%)',
          }}
        />
        {/* Rejilla fina, guiño al mapa de rutas */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(89,172,244,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(89,172,244,0.10) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(180deg, black 0%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 85%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <Reveal>
            <Image
              src="/clientes/diemar.png"
              alt="Expreso Diemar"
              width={800}
              height={208}
              priority
              className="h-12 md:h-16 w-auto mb-10"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8534] mb-5">
              <span className="w-6 h-px bg-[#ff6900]" aria-hidden="true" />
              Caso — Área tecnológica
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="font-syne text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] max-w-3xl text-balance">
              Cuarenta años venciendo distancias.
              <span className="block text-[#59acf4]">Ahora también en pantalla.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-[#eaf3fb]/65 text-base md:text-lg leading-relaxed max-w-2xl">
              Expreso Diemar mueve carga por todo el país desde los años 80. Nos contrataron
              como su área tecnológica: rehicimos el sitio y construimos los sistemas que
              antes se resolvían por teléfono.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={SITIO_DIEMAR}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6900] hover:bg-[#ff8534] text-white font-semibold px-6 py-3.5 rounded-full transition-colors"
              >
                Entrar al sitio de Diemar
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={WA_KWEB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#2e8fe0]/50 text-[#eaf3fb] hover:bg-[#2e8fe0]/15 font-semibold px-6 py-3.5 rounded-full transition-colors"
              >
                Quiero algo así
              </a>
            </div>
          </Reveal>
        </div>

        {/* Franja de datos */}
        <div className="relative border-t border-[#16507f] bg-[#083358]/60">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#16507f]">
            {hechos.map((h, i) => (
              <Reveal key={h.label} delay={i * 70}>
                <div className="px-2 py-7 md:py-9 text-center">
                  <p className="font-syne text-3xl md:text-4xl font-extrabold text-[#ff6900] leading-none">
                    {h.valor}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-[#eaf3fb]/45 leading-snug">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== El punto de partida ===== */}
      <section className="bg-[#f2f7fc] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-14">
          <Reveal className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b60a9] mb-3">
              El punto de partida
            </p>
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-[#0f2436] tracking-tight">
              Una empresa grande con una web chica.
            </h2>
          </Reveal>

          <div className="md:col-span-7 space-y-5">
            {[
              'El sitio informaba y nada más: para saber dónde estaba un envío había que llamar.',
              'Cada cotización pasaba por una persona, con el tarifario abierto al lado.',
              'Nada de lo que preguntaban los clientes quedaba registrado en ningún lado.',
            ].map((t, i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="flex gap-4 items-start bg-white border border-[#dce8f3] rounded-2xl p-5 md:p-6">
                  <span className="font-syne font-extrabold text-[#59acf4] text-lg leading-none pt-0.5 shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-[#0f2436]/75 leading-relaxed">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Qué construimos ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b60a9] mb-3">
                  Qué construimos
                </p>
                <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-[#0f2436] tracking-tight">
                  Siete piezas, un solo sistema.
                </h2>
              </div>
              <p className="text-[#5b7288] text-sm max-w-xs leading-relaxed">
                Todo hecho a medida sobre la operación real de Diemar. Nada comprado, nada
                genérico.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modulos.map((m, i) => (
              <Reveal key={m.titulo} delay={(i % 3) * 80}>
                <div className="group h-full bg-white border border-[#dce8f3] rounded-2xl p-6 hover:border-[#2e8fe0]/60 hover:shadow-[0_10px_36px_rgba(11,96,169,0.10)] transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-[#0b60a9]/[0.07] border border-[#0b60a9]/15 flex items-center justify-center text-[#0b60a9] group-hover:bg-[#0b60a9]/[0.13] transition-colors">
                      <m.Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        m.vivo
                          ? 'text-[#ff6900] border-[#ff6900]/30 bg-[#ff6900]/[0.07]'
                          : 'text-[#5b7288] border-[#dce8f3] bg-[#f2f7fc]'
                      }`}
                    >
                      {m.vivo ? 'En producción' : 'En marcha'}
                    </span>
                  </div>
                  <h3 className="font-syne text-lg font-bold text-[#0f2436] mb-2">{m.titulo}</h3>
                  <p className="text-[#5b7288] text-sm leading-relaxed">{m.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== La decisión técnica ===== */}
      <section className="bg-[#062a4a] py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 15% 20%, rgba(46,143,224,0.22) 0%, transparent 55%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8534] mb-4">
              La decisión que sostiene todo
            </p>
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Un cerebro, dos canales.
            </h2>
            <p className="text-[#eaf3fb]/65 leading-relaxed">
              Toda la lógica del negocio vive en un solo lugar. La web y WhatsApp le preguntan
              a la misma función: cuando cambia una tarifa o una regla, se cambia una vez y
              sale en los dos lados el mismo día. Sin dos versiones que se desincronizan.
            </p>
          </Reveal>

          <Reveal delay={120} className="md:col-span-5">
            <div className="bg-[#0b3e68]/70 border border-[#16507f] rounded-2xl p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#59acf4] mb-5">
                Con qué está hecho
              </p>
              <ul className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li
                    key={t}
                    className="text-xs font-medium text-[#eaf3fb]/80 border border-[#2e8fe0]/30 bg-[#062a4a]/60 px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-20 text-center"
              style={{ background: 'linear-gradient(135deg, #ff6900 0%, #e85d00 55%, #b23a1e 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="relative">
                <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white tracking-tight text-balance max-w-2xl mx-auto">
                  ¿Su empresa todavía resuelve todo por teléfono?
                </h2>
                <p className="mt-5 text-white/85 max-w-xl mx-auto leading-relaxed">
                  Lo que hicimos con Diemar se puede hacer con cualquier operación que hoy
                  dependa de que alguien atienda.
                </p>
                <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={WA_KWEB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0f2436] font-semibold px-7 py-3.5 rounded-full hover:bg-[#f2f7fc] transition-colors"
                  >
                    Hablemos por WhatsApp
                  </a>
                  <a
                    href={SITIO_DIEMAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/45 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    Ver el sitio de Diemar
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Pie ===== */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-syne text-lg font-bold tracking-tight text-stone-900">
            <span className="text-[#C9A84C]">K</span>Web
          </Link>
          <p className="text-stone-400 text-xs text-center">
            Caso desarrollado para Expreso Diemar · Las marcas pertenecen a sus titulares.
          </p>
          <Link
            href="/#portfolio"
            className="text-sm font-semibold text-[#C9A84C] hover:gap-3 inline-flex items-center gap-1.5 transition-all"
          >
            Ver más trabajos →
          </Link>
        </div>
      </footer>
    </main>
  )
}
