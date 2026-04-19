'use client'

import { motion, type Variants, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

const DottedSurface = dynamic(() => import('@/components/ui/dotted-surface'), {
  ssr: false,
})

const WA_LINK = 'https://wa.me/5493072074300'

const titleWords1 = ['Diseñamos', 'webs', 'que']
const titleWords2 = ['generan', 'resultados']

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Hero() {
  const shouldReduce = useReducedMotion()

  const resolvedContainerVariants: Variants = shouldReduce
    ? { hidden: {}, visible: {} }
    : containerVariants

  const resolvedWordVariants: Variants = shouldReduce
    ? { hidden: { opacity: 1, y: 0, filter: 'blur(0px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }
    : wordVariants

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Three.js Background */}
      <DottedSurface />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%), radial-gradient(ellipse at 50% 0%, rgba(8,8,8,0.6) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(8,8,8,0.8) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.06)] text-xs text-[#C9A84C] font-semibold uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          Agencia de desarrollo web · Argentina
        </motion.div>

        {/* Title — clamp() for Exaggerated Minimalism (skill: style-match) */}
        <motion.h1
          className="font-extrabold leading-[1.05] tracking-tight text-[#F5F5F3] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          variants={resolvedContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="flex flex-wrap justify-center gap-x-4 mb-1">
            {titleWords1.map((word) => (
              <motion.span key={word} variants={resolvedWordVariants}>
                {word}
              </motion.span>
            ))}
          </span>
          <span className="flex flex-wrap justify-center gap-x-4">
            {titleWords2.map((word) => (
              <motion.span
                key={word}
                variants={resolvedWordVariants}
                className="gold-gradient"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-lg md:text-xl text-[#F5F5F3]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          En KWeb transformamos su negocio en una experiencia digital
          profesional. Cada proyecto es único, cada solución es a medida.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#C9A84C] text-[#080808] text-base font-bold px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] hover:scale-105"
          >
            <span className="absolute inset-0 bg-[#E4C06E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              Consultar por WhatsApp
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#F5F5F3]/30 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/40 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}
