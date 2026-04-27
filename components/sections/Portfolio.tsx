'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Kloths',
    category: 'Tienda Online',
    description: 'E-commerce de surfwear con carrito, MercadoPago y gestión de stock.',
    url: 'https://kloths.com.ar',
    gradient: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #90E0EF 100%)',
    tag: 'kloths.com.ar',
    span: 'md:col-span-2',
  },
  {
    id: 2,
    title: 'Trigga',
    category: 'Agencia Web',
    description: 'Landing institucional para agencia de automatizaciones con IA.',
    url: 'https://trigga.vercel.app',
    gradient: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 50%, #22D68A22 100%)',
    tag: 'trigga.vercel.app',
    span: 'md:col-span-1',
  },
  {
    id: 3,
    title: 'OnWay',
    category: 'App Mobile',
    description: 'Marketplace de crowdshipping — viajeros que llevan paquetes de camino.',
    url: '#',
    gradient: 'linear-gradient(135deg, #0066FF 0%, #0052CC 60%, #003D99 100%)',
    tag: 'En desarrollo',
    span: 'md:col-span-1',
  },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.portfolio-card') ?? []
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
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

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
  }

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">Portfolio</p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Proyectos reales.
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`portfolio-card ${p.span} card-tilt group relative overflow-hidden rounded-2xl cursor-default`}
              style={{ height: '300px', opacity: 0, transition: 'transform 0.3s ease' }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              {/* Gradient background */}
              <div className="absolute inset-0" style={{ background: p.gradient }} />

              {/* Noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {p.category}
                  </span>
                  {p.url !== '#' && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                      aria-label={`Ver ${p.title}`}
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                      </svg>
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="font-syne text-3xl font-extrabold text-white mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs">{p.description}</p>
                  <p className="text-white/40 text-xs font-mono mt-3">{p.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
