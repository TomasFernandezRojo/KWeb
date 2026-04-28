'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_LINK = 'https://wa.me/5493072074300'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Proceso', href: '#proceso' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-syne text-xl font-bold tracking-tight">
          <span className="text-[#C9A84C]">K</span>
          <span className={scrolled ? 'text-stone-900' : 'text-white'}>Web</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? 'text-stone-500 hover:text-stone-900'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#C9A84C] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#b8952e] transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          Contactar
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Menú"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className={`block w-6 h-0.5 ${scrolled ? 'bg-stone-900' : 'bg-white'}`} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className={`block w-6 h-0.5 ${scrolled ? 'bg-stone-900' : 'bg-white'}`} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className={`block w-6 h-0.5 ${scrolled ? 'bg-stone-900' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t border-black/[0.06]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-stone-700 font-medium py-3 border-b border-stone-100 hover:text-[#C9A84C] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex justify-center bg-[#C9A84C] text-white font-semibold px-5 py-3 rounded-full"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
