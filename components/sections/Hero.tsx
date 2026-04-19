'use client'

import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

const DottedSurface = dynamic(() => import('@/components/ui/dotted-surface'), {
  ssr: false,
})

const WA_LINK = 'https://wa.me/5493072074300'

export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      <DottedSurface />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(8,8,8,0.9) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', lineHeight: 1 }}
          className="font-extrabold tracking-tight text-[#F5F5F3] select-none"
        >
          <span className="text-[#C9A84C]">K</span>Web
        </motion.h1>

        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl font-light tracking-[0.25em] uppercase text-[#F5F5F3]/50"
        >
          Desarrollo web
        </motion.p>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#C9A84C] text-[#080808] text-sm font-bold px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.45)] hover:scale-105"
          >
            <span className="absolute inset-0 bg-[#E4C06E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              Consultar por WhatsApp
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
