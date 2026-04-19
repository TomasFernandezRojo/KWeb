'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'E-commerce de Moda',
    category: 'Tienda Online',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 2,
    title: 'Restaurante Gourmet',
    category: 'Web para Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    span: 'col-span-1',
  },
  {
    id: 3,
    title: 'Dashboard Corporativo',
    category: 'Web Institucional',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    span: 'col-span-1',
  },
  {
    id: 4,
    title: 'Portfolio Fotógrafo',
    category: 'Portfolio Creativo',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    span: 'col-span-1',
  },
  {
    id: 5,
    title: 'Tienda de Tecnología',
    category: 'Tienda Online',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    span: 'col-span-1',
  },
  {
    id: 6,
    title: 'Consultora Empresarial',
    category: 'Landing Page',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    span: 'col-span-1 md:col-span-2',
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
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Parallax on images
      cards.forEach((card) => {
        const img = card.querySelector('img')
        if (!img) return
        gsap.fromTo(
          img,
          { scale: 1.15, y: '-10%' },
          {
            scale: 1.05,
            y: '5%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5F5F3] tracking-tight mb-5">
            Proyectos que hablan
            <br />
            <span className="gold-gradient">por sí solos</span>
          </h2>
          <p className="text-[#F5F5F3]/55 text-lg max-w-xl mx-auto">
            Referencias del tipo de trabajo que realizamos.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`portfolio-card ${project.span} group relative overflow-hidden rounded-2xl bg-[#0D0D0D] cursor-pointer`}
              style={{ height: '280px', opacity: 0 }}
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Default overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#080808]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C] border border-[rgba(201,168,76,0.4)] px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-extrabold text-[#F5F5F3] text-center px-4">
                  {project.title}
                </h3>
              </div>

              {/* Always visible label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 group-hover:translate-y-full transition-transform duration-400">
                <span className="text-xs text-[#C9A84C]/80 font-semibold uppercase tracking-widest block mb-1">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-[#F5F5F3]">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
