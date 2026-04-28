'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Target, Crown,
  Globe, Code2, Palette, Zap, Cpu, Box, Rocket, CreditCard,
} from 'lucide-react'

const WA_LINK = 'https://wa.me/5493072074300'

const TOOLS = [
  { name: 'Next.js',       Icon: Globe      },
  { name: 'TypeScript',    Icon: Code2      },
  { name: 'Tailwind CSS',  Icon: Palette    },
  { name: 'Framer Motion', Icon: Zap        },
  { name: 'GSAP',          Icon: Cpu        },
  { name: 'Three.js',      Icon: Box        },
  { name: 'Vercel',        Icon: Rocket     },
  { name: 'MercadoPago',   Icon: CreditCard },
]

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-syne text-xl font-bold text-white">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/35 font-medium">{label}</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden flex items-center">

      {/* Background photo — user will swap this */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
          style={{
            maskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 75%, transparent 100%)',
          }}
        />
      </div>

      {/* Gold glow — top right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(201,168,76,0.13) 0%, transparent 60%)' }}
      />

      {/* Two-column content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left column ── */}
          <div className="lg:col-span-7 flex flex-col gap-7">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/8 text-xs font-semibold text-[#C9A84C] uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Agencia de Desarrollo Web — Argentina
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-syne text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-white"
            >
              Tu web,
              <br />
              tu vendedor
              <br />
              <span className="gold-gradient">24/7.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/45 text-lg max-w-md leading-relaxed"
            >
              Diseñamos y desarrollamos tu presencia digital, a medida.
              Sin templates, sin límites.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#C9A84C] text-[#0A0A0A] text-sm font-bold px-7 py-4 rounded-full hover:bg-[#E4C06E] transition-colors duration-200"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Escribirnos por WhatsApp
              </a>

              <a
                href="#portfolio"
                className="flex items-center gap-1.5 text-sm font-medium text-white/45 hover:text-white/80 transition-colors duration-200 py-4"
              >
                Ver trabajos ↓
              </a>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Stats glass card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
              {/* Subtle gold corner glow */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-[#C9A84C]/8 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Top stat */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9A84C]/15 ring-1 ring-[#C9A84C]/25 shrink-0">
                    <Target className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="font-syne text-2xl font-bold text-white leading-none">100%</div>
                    <div className="text-sm text-white/40 mt-0.5">Proyectos a medida</div>
                  </div>
                </div>

                {/* Satisfaction bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Satisfacción del cliente</span>
                    <span className="text-white font-semibold">100%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E4C06E]" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/8 mb-5" />

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <StatItem value="3+" label="Proyectos" />
                  <div className="w-px bg-white/8 mx-auto" />
                  <StatItem value="< 24h" label="Respuesta" />
                  <div className="w-px bg-white/8 mx-auto" />
                  <StatItem value="∞" label="Personalización" />
                </div>

                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-widest text-white/55 uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Disponible
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/8 px-3 py-1 text-[10px] font-semibold tracking-widest text-[#C9A84C] uppercase">
                    <Crown className="w-3 h-3" />
                    Hecho a medida
                  </span>
                </div>
              </div>
            </div>

            {/* Tools marquee card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] py-6 backdrop-blur-xl">
              <p className="mb-4 px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                Herramientas que utilizamos
              </p>

              {/* Fade masks */}
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
                }}
              >
                {/* 3 containers × same tools = seamless loop with gap-8 matching keyframe 2rem */}
                <div className="group flex gap-8">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex shrink-0 gap-8 animate-tools-marquee group-hover:[animation-play-state:paused]"
                    >
                      {TOOLS.map(({ name, Icon }) => (
                        <div
                          key={name}
                          className="flex items-center gap-2 opacity-40 hover:opacity-90 transition-opacity duration-200 cursor-default"
                        >
                          <Icon className="h-4 w-4 text-white shrink-0" />
                          <span className="text-sm font-semibold text-white whitespace-nowrap">{name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
      />
    </section>
  )
}
