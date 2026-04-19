'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rubros = [
  {
    name: 'Restaurantes y gastronomía',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    special: false,
  },
  {
    name: 'Moda y ropa',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
    special: false,
  },
  {
    name: 'Fotografía y arte',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    special: false,
  },
  {
    name: 'Empresas y consultoras',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    special: false,
  },
  {
    name: 'Tiendas online',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    special: false,
  },
  {
    name: 'Cualquier rubro',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    special: true,
    subtitle: '¿No está su rubro? No importa. Lo hacemos igual.',
  },
]

export default function Rubros() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.rubro-card') ?? []
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="rubros" className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-4">
            Industrias
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5F5F3] tracking-tight mb-5">
            Sin importar su industria
          </h2>
          <p className="text-[#F5F5F3]/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Hemos desarrollado webs para todo tipo de negocios y emprendimientos.
            Si tiene una idea, nosotros la construimos.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {rubros.map((rubro) => (
            <div
              key={rubro.name}
              className="rubro-card group relative overflow-hidden rounded-2xl bg-[#0D0D0D]"
              style={{ height: '240px', opacity: 0 }}
            >
              {/* Background image */}
              <Image
                src={rubro.image}
                alt={rubro.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-[#080808]/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-center">
                <h3 className="text-lg font-bold text-[#F5F5F3] leading-snug">
                  {rubro.name}
                </h3>
                {rubro.special && rubro.subtitle && (
                  <p className="mt-2 text-xs text-[#C9A84C] font-medium leading-snug max-w-[200px]">
                    {rubro.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p className="text-center mt-10 text-sm text-[#F5F5F3]/40 leading-relaxed">
          También trabajamos con: inmobiliarias, coaches, médicos, abogados,
          gimnasios, peluquerías y mucho más.
        </p>
      </div>
    </section>
  )
}
