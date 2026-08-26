'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Marquee } from '@/components/ui/marquee'
import { clientes, type Cliente } from '@/lib/clientes'

gsap.registerPlugin(ScrollTrigger)

/* Trama fina de puntos — textura de la tarjeta, sin foto de stock */
const DOTS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff' fill-opacity='0.16'/%3E%3C/svg%3E\")"

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

/** La marca de la casa, al fondo de la tarjeta: grande y tenue, arrimada a
 *  la derecha. Vive en la mitad de arriba, que es donde no hay texto. */
function MarcaDeFondo({ c }: { c: Cliente }) {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[17%] pointer-events-none select-none transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
      style={{ width: c.markW, right: c.markRight, opacity: c.markOpacity }}
    >
      <Image
        src={c.mark}
        alt=""
        width={600}
        height={300}
        // Los SVG se sirven tal cual: el optimizador de Next no los procesa.
        unoptimized={c.mark.endsWith('.svg')}
        className="w-full h-auto"
      />
    </div>
  )
}

function ProjectCard({ c }: { c: Cliente }) {
  const enVivo = c.estado === 'produccion'

  const contenido = (
    <>
      {/* Fondo teñido con el color de la marca */}
      <div className="absolute inset-0" style={{ background: c.gradient }} />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: DOTS }} />
      <div
        className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 opacity-60 group-hover/card:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${c.accent}38 0%, transparent 65%)` }}
      />
      <MarcaDeFondo c={c} />
      {/* La marca se apaga hacia abajo para que el texto siempre gane */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* Contenido */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {c.categoria}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/60 mt-1 whitespace-nowrap shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: enVivo ? c.accent : 'rgba(255,255,255,0.3)',
                boxShadow: enVivo ? `0 0 10px ${c.accent}` : 'none',
              }}
            />
            {enVivo ? 'En producción' : 'En desarrollo'}
          </span>
        </div>

        <div>
          <h3 className="font-syne text-2xl font-extrabold text-white mb-2 tracking-tight">
            {c.nombre}
          </h3>
          <p className="text-white/55 text-[13px] leading-relaxed mb-5">{c.resumen}</p>

          <div className="flex items-center justify-between gap-3">
            <span className="text-white/35 text-[11px] font-mono truncate">{c.etiqueta}</span>
            <span
              className="shrink-0 text-xs font-semibold flex items-center gap-1.5 md:translate-x-3 md:opacity-0 md:group-hover/card:translate-x-0 md:group-hover/card:opacity-100 transition-all duration-300"
              style={{ color: c.accent }}
            >
              {c.cta}
              {c.href && <ArrowIcon className="w-3 h-3" />}
            </span>
          </div>
        </div>
      </div>

      {/* Borde */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover/card:ring-white/25 transition-colors duration-400" />
    </>
  )

  const clase =
    'group/card relative w-[320px] h-[420px] rounded-2xl overflow-hidden shrink-0 block'

  if (c.href && !c.externo) {
    return (
      <Link href={c.href} aria-label={`Ver el caso de ${c.nombre}`} className={clase}>
        {contenido}
      </Link>
    )
  }
  if (c.href) {
    return (
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver el sitio de ${c.nombre}`}
        className={clase}
      >
        {contenido}
      </a>
    )
  }
  return (
    <div aria-label={`${c.nombre} — en desarrollo`} className={`${clase} cursor-default`}>
      {contenido}
    </div>
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
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-32 bg-[#F7F6F3] overflow-hidden">
      {/* Encabezado — contenido */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={headerRef}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">
              Con quién trabajamos
            </p>
            <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
              Clientes reales, en producción.
            </h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
            No son maquetas. Son sistemas que empresas usan todos los días.
          </p>
        </div>
      </div>

      {/* Marquee — a todo lo ancho */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#F7F6F3] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#F7F6F3] to-transparent" />

        <Marquee pauseOnHover repeat={3} className="[--duration:70s] py-4">
          {clientes.map((c) => (
            <ProjectCard key={c.slug} c={c} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
