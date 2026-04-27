'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WA_LINK = 'https://wa.me/5493072074300'

const services = [
  {
    id: 1,
    title: 'Página Web',
    description:
      'Landing pages, webs institucionales, portfolios, restaurantes — lo que necesites. Diseño único, hecho a medida para tu negocio.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Tienda Online',
    description:
      'E-commerce completo con catálogo, carrito de compras y MercadoPago integrado. Tus clientes compran desde cualquier dispositivo.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Proyecto a Medida',
    description:
      '¿Tenés una idea específica? La construimos. Desde apps web hasta sistemas complejos — sin límites, sin templates genéricos.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
]

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card') ?? []
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
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
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">Servicios</p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            ¿Qué necesitás?
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="service-card group border border-stone-200 rounded-2xl p-8 flex flex-col gap-5 hover:border-[#C9A84C]/40 hover:shadow-[0_8px_32px_rgba(201,168,76,0.08)] transition-all duration-300"
              style={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C]/15 transition-colors duration-300">
                {s.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-syne text-xl font-bold text-stone-900 mb-3">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.description}</p>
              </div>

              {/* Link */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C] hover:gap-3 transition-all duration-200"
              >
                Consultar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
