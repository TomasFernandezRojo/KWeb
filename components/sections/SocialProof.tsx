'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 1, suffix: '+', label: 'Proyectos entregados' },
  { value: 2, suffix: '', label: 'Desarrolladores' },
  { value: 24, suffix: 'hs', label: 'Tiempo de respuesta' },
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
    const duration = 1600

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
        const cards = statsRef.current?.querySelectorAll('.stat-card') ?? []
        gsap.fromTo(
          cards,
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
      }
    })

    return () => ctx.revert()
  }, [shouldReduce])

  return (
    <section className="py-20 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card text-center p-8 rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#0D0D0D] hover:border-[rgba(201,168,76,0.3)] transition-all duration-300"
              style={shouldReduce ? undefined : { opacity: 0 }}
            >
              <p className="text-5xl font-extrabold gold-gradient mb-3 tabular-nums">
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
      </div>
    </section>
  )
}
