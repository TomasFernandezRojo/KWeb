'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: '¿Cuánto tiempo tarda en estar lista mi web?',
    a: 'Depende del tipo y complejidad del proyecto. Al recibir su consulta le daremos un plazo estimado claro y realista.',
  },
  {
    q: '¿Necesito saber de tecnología para manejar mi web?',
    a: 'No. Diseñamos todo para que sea simple de administrar. Además lo capacitamos para que pueda gestionarla solo.',
  },
  {
    q: '¿Trabajan con cualquier tipo de negocio?',
    a: 'Sí. Hemos desarrollado webs para todo tipo de rubros. Si tiene una idea, nosotros la construimos.',
  },
  {
    q: '¿Cómo es el proceso de pago?',
    a: 'Coordinamos todo por WhatsApp. Trabajamos con un anticipo y el saldo contra entrega del proyecto.',
  },
  {
    q: '¿La web va a aparecer en Google?',
    a: 'Sí. Todos nuestros proyectos incluyen configuración básica de SEO para que su sitio sea indexado correctamente.',
  },
  {
    q: '¿Qué pasa si quiero cambios después de la entrega?',
    a: 'Incluimos revisiones durante el desarrollo. Los cambios posteriores se coordinan y presupuestan por separado.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#060606]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5F5F3] tracking-tight">
            Preguntas frecuentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.04)]'
                  : 'border-[rgba(255,255,255,0.07)] bg-[#0D0D0D] hover:border-[rgba(201,168,76,0.2)]'
              }`}
            >
              <button
                className="w-full text-left flex items-center justify-between gap-4 p-6"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[#F5F5F3] text-base leading-snug pr-2">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 w-7 h-7 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] text-xl font-light"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[#F5F5F3]/60 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
