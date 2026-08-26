'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Globe, ShoppingBag, LayoutDashboard, Bot, Plug, Repeat,
  type LucideIcon,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA_LINK = 'https://wa.me/5493072074300'

interface Servicio {
  titulo: string
  linea: string
  Icon: LucideIcon
}

/* Lo que realmente construimos. Una línea cada uno — nada de relleno. */
const servicios: Servicio[] = [
  {
    titulo: 'Sitios web',
    linea: 'Institucional, landing o portfolio. Diseño propio, sin templates.',
    Icon: Globe,
  },
  {
    titulo: 'Tiendas online',
    linea: 'Catálogo, carrito, MercadoPago y stock en tiempo real.',
    Icon: ShoppingBag,
  },
  {
    titulo: 'Sistemas a medida',
    linea: 'Cotizadores, comparadores de precios y paneles internos.',
    Icon: LayoutDashboard,
  },
  {
    titulo: 'Asistentes con IA',
    linea: 'Bots que atienden en la web y en WhatsApp con datos reales.',
    Icon: Bot,
  },
  {
    titulo: 'Integraciones',
    linea: 'Conectamos APIs, sistemas de gestión y datos que hoy están sueltos.',
    Icon: Plug,
  },
  {
    titulo: 'Automatizaciones',
    linea: 'Tareas repetitivas que pasan a correr solas, todos los días.',
    Icon: Repeat,
  },
]

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.service-card') ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">
              Servicios
            </p>
            <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
              En lo que trabajamos.
            </h2>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C] hover:gap-3 transition-all duration-200 shrink-0"
          >
            Contanos qué necesitás →
          </a>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
          {servicios.map((s) => (
            <div
              key={s.titulo}
              className="service-card group bg-white p-8 flex flex-col gap-4 hover:bg-[#C9A84C]/[0.04] transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <s.Icon
                className="w-5 h-5 text-[#C9A84C] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-syne text-lg font-bold text-stone-900 mb-1.5">{s.titulo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.linea}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
