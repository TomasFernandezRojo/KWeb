'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WA_LINK = 'https://wa.me/5493072074300'

export default function MotionFooter() {
  const containerRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big background text parallax
      if (bigTextRef.current) {
        gsap.fromTo(
          bigTextRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={containerRef} className="relative bg-[#080808] overflow-hidden border-t border-[rgba(201,168,76,0.1)] pt-20 pb-10">
      {/* Cinematic big background text */}
      <div
        ref={bigTextRef}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-extrabold tracking-tighter leading-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.06)',
          }}
        >
          KWEB
        </span>
      </div>

      {/* Footer content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-12 border-b border-[rgba(201,168,76,0.1)]">
          {/* Logo */}
          <div className="text-3xl font-extrabold tracking-tight">
            <span className="text-[#C9A84C]">K</span>
            <span className="text-[#F5F5F3]">Web</span>
          </div>

          {/* Links */}
          <nav className="flex gap-8 text-sm text-[#F5F5F3]/60 font-medium">
            {['Servicios', 'Portfolio', 'Contacto'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#C9A84C] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(201,168,76,0.3)] text-sm text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#080808] transition-all duration-300 font-semibold"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm text-[#F5F5F3]/40">
          <p>© 2026 KWeb. Desarrollo web profesional en Argentina.</p>
          <p className="flex items-center gap-1">
            Hecho con{' '}
            <span className="text-[#C9A84C]">❤</span>{' '}
            por KWeb
          </p>
        </div>
      </div>
    </footer>
  )
}
