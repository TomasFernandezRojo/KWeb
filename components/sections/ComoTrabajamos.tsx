'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Nos cuenta su idea',
    description:
      'Analizamos su negocio, sus objetivos y lo que necesita para construir la solución correcta.',
  },
  {
    number: '02',
    title: 'Diseñamos la propuesta',
    description:
      'Presentamos wireframes y la dirección visual del proyecto para su aprobación.',
  },
  {
    number: '03',
    title: 'Desarrollamos su web',
    description:
      'Construimos cada detalle con tecnología moderna, código limpio y atención al diseño.',
  },
  {
    number: '04',
    title: 'Lanzamos juntos',
    description:
      'Publicamos su sitio, lo configuramos y lo acompañamos en el proceso de salida al aire.',
  },
]

export default function ComoTrabajamos() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength()
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 1,
          },
        })
      }

      // Animate step cards
      if (stepsRef.current) {
        const cards = stepsRef.current.querySelectorAll('.step-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={sectionRef} className="py-24 md:py-32 bg-[#060606] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1) 20%, rgba(201,168,76,0.1) 80%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-4">
            Proceso
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5F5F3] tracking-tight">
            Nuestro proceso
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Desktop SVG connecting line */}
          <svg
            className="hidden lg:block absolute top-8 left-0 right-0 w-full h-4 pointer-events-none"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={lineRef}
              d="M 100 4 Q 250 4 350 4 Q 500 4 650 4 Q 750 4 900 4"
              stroke="#C9A84C"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="step-card group relative bg-[#0D0D0D] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 flex flex-col gap-4 hover:border-[rgba(201,168,76,0.3)] transition-all duration-300"
                style={{ opacity: 0 }}
              >
                {/* Step number badge */}
                <div className="w-14 h-14 rounded-full border-2 border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300 mb-2">
                  <span className="text-[#C9A84C] font-extrabold text-lg">{step.number}</span>
                </div>

                {/* Connector dot */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-2 h-2 rounded-full bg-[#C9A84C]/40 z-10" />
                )}

                <h3 className="text-lg font-bold text-[#F5F5F3]">{step.title}</h3>
                <p className="text-[#F5F5F3]/55 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
