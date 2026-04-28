'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Marquee } from '@/components/ui/marquee'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  category: string
  description: string
  url: string | null
  image: string
  gradient: string
  accentColor: string
  tag: string
  live: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Kloths',
    category: 'Tienda Online',
    description: 'E-commerce de surfwear con carrito, MercadoPago y gestión de stock en tiempo real.',
    url: 'https://kloths.com.ar',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    gradient: 'linear-gradient(170deg, rgba(0,90,150,0.82) 0%, rgba(0,160,210,0.72) 55%, rgba(100,210,240,0.60) 100%)',
    accentColor: '#00C8FF',
    tag: 'kloths.com.ar',
    live: true,
  },
  {
    id: 2,
    title: 'Trigga',
    category: 'Agencia Web',
    description: 'Landing institucional para agencia de automatizaciones con IA y workflows inteligentes.',
    url: 'https://trigga.vercel.app',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    gradient: 'linear-gradient(170deg, rgba(8,8,8,0.92) 0%, rgba(18,18,18,0.88) 55%, rgba(34,214,138,0.25) 100%)',
    accentColor: '#22D68A',
    tag: 'trigga.vercel.app',
    live: true,
  },
  {
    id: 3,
    title: 'OnWay',
    category: 'App Mobile',
    description: 'Marketplace de crowdshipping — viajeros que llevan paquetes de camino.',
    url: null,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
    gradient: 'linear-gradient(170deg, rgba(0,50,150,0.88) 0%, rgba(0,75,200,0.82) 55%, rgba(50,120,255,0.70) 100%)',
    accentColor: '#5B9BFF',
    tag: 'En desarrollo',
    live: false,
  },
]

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.url ?? undefined}
      target={p.live ? '_blank' : undefined}
      rel={p.live ? 'noopener noreferrer' : undefined}
      aria-label={p.live ? `Ver ${p.title}` : `${p.title} — en desarrollo`}
      className="group/card relative w-[300px] h-[400px] rounded-2xl overflow-hidden shrink-0 block"
      style={{ cursor: p.live ? 'pointer' : 'default' }}
    >
      {/* Background photo */}
      <Image
        src={p.image}
        alt={p.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        sizes="300px"
      />

      {/* Color gradient overlay */}
      <div className="absolute inset-0" style={{ background: p.gradient }} />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {p.category}
          </span>

          {/* External link icon — appears on hover */}
          <div
            className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 translate-y-1 group-hover/card:translate-y-0 transition-all duration-300"
            aria-hidden="true"
          >
            {p.live ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
        </div>

        {/* Bottom info */}
        <div>
          <h3 className="font-syne text-3xl font-extrabold text-white mb-2 tracking-tight">
            {p.title}
          </h3>
          <p className="text-white/55 text-sm leading-relaxed mb-4">
            {p.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-white/35 text-xs font-mono">{p.tag}</span>

            {/* Animated CTA */}
            <span
              className="text-xs font-semibold flex items-center gap-1 translate-x-3 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300"
              style={{ color: p.accentColor }}
            >
              {p.live ? 'Ver proyecto →' : 'Próximamente'}
            </span>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover/card:ring-[#C9A84C]/35 transition-all duration-400" />
    </a>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 bg-[#F7F6F3] overflow-hidden">
      {/* Header — constrained */}
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="mb-14" style={{ opacity: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">Portfolio</p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Proyectos reales.
          </h2>
        </div>
      </div>

      {/* Marquee — full bleed */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#F7F6F3] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#F7F6F3] to-transparent" />

        <Marquee pauseOnHover className="[--duration:40s] py-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
