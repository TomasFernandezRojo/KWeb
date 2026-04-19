'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: '+', label: 'Proyectos entregados' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos' },
  { value: 2, suffix: '', label: 'Desarrolladores dedicados' },
  { value: 24, suffix: 'hs', label: 'Tiempo de respuesta' },
]

const testimonials = [
  {
    quote:
      'KWeb transformó por completo la presencia online de mi restaurante. En pocas semanas triplicamos las reservas desde la web.',
    name: 'Martín Ríos',
    role: 'Dueño, La Parrilla de Martín',
    initials: 'MR',
  },
  {
    quote:
      'Profesionalismo y calidad en cada detalle. Mi tienda online quedó exactamente como la imaginé. Los recomiendo sin dudar.',
    name: 'Valentina Gómez',
    role: 'Emprendedora, Valenti Store',
    initials: 'VG',
  },
  {
    quote:
      'Necesitaba un portfolio que impresionara a los clientes desde el primer scroll. KWeb lo logró con creces.',
    name: 'Lucas Ferreyra',
    role: 'Fotógrafo Profesional',
    initials: 'LF',
  },
]

function AnimatedNumber({
  target,
  suffix,
  trigger,
}: {
  target: number
  suffix: string
  trigger: boolean
}) {
  const [current, setCurrent] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!trigger) return
    if (shouldReduce) {
      setCurrent(target)
      return
    }

    let startTime: number | null = null
    const duration = 1800

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [trigger, target, shouldReduce])

  return (
    <span>
      {current}
      {suffix}
    </span>
  )
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setStatsVisible(true),
      })

      if (!shouldReduce) {
        const statCards = statsRef.current?.querySelectorAll('.stat-card') ?? []
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        const testimonialCards =
          sectionRef.current?.querySelectorAll('.testimonial-card') ?? []
        gsap.fromTo(
          testimonialCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector('.testimonials-grid'),
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldReduce])

  return (
    <section
      ref={sectionRef}
      id="prueba-social"
      className="py-24 md:py-32 bg-[#080808]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card text-center p-8 rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#0D0D0D] hover:border-[rgba(201,168,76,0.3)] transition-all duration-300"
              style={shouldReduce ? undefined : { opacity: 0 }}
            >
              <p className="text-4xl md:text-5xl font-extrabold gold-gradient mb-2 tabular-nums">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  trigger={statsVisible}
                />
              </p>
              <p className="text-sm text-[#F5F5F3]/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-14">
          <p className="text-xs text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-4">
            Testimonios
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F3] tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group relative bg-[#0D0D0D] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 flex flex-col gap-6 hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
              style={shouldReduce ? undefined : { opacity: 0 }}
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-[#C9A84C]/30"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text */}
              <p className="text-[#F5F5F3]/70 text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex gap-1" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    className="w-4 h-4 text-[#C9A84C]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <div
                  className="w-10 h-10 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] text-xs font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5F5F3]">{t.name}</p>
                  <p className="text-xs text-[#F5F5F3]/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
