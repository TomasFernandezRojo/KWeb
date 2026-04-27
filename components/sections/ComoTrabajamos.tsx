'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '01',
    title: 'Nos contás tu idea',
    description: 'Analizamos tu negocio, tus objetivos y qué necesitás para construir la solución correcta.',
  },
  {
    n: '02',
    title: 'Diseñamos y desarrollamos',
    description: 'Construimos tu web con tecnología moderna, diseño único y atención a cada detalle.',
  },
  {
    n: '03',
    title: 'Lo lanzamos juntos',
    description: 'Publicamos tu sitio, lo configuramos y te acompañamos en el proceso de salida al aire.',
  },
]

export default function ComoTrabajamos() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = stepsRef.current?.querySelectorAll('.step-card') ?? []
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={sectionRef} className="py-24 md:py-32 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">Proceso</p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Simple y claro.
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="step-card relative bg-white rounded-2xl p-8 flex flex-col gap-5 border border-stone-200"
              style={{ opacity: 0 }}
            >
              {/* Number */}
              <span className="font-syne text-[5rem] font-extrabold leading-none text-stone-100 select-none absolute top-4 right-6">
                {s.n}
              </span>

              {/* Dot connector — desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-stone-200" />
              )}

              <div className="relative z-10 flex flex-col gap-3">
                <span className="font-syne text-sm font-bold text-[#C9A84C]">{s.n}</span>
                <h3 className="font-syne text-xl font-bold text-stone-900">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
