'use client'

const WA_LINK = 'https://wa.me/5493072074300'

export default function MotionFooter() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06] pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">

          {/* Logo */}
          <span className="font-syne text-2xl font-bold">
            <span className="text-[#C9A84C]">K</span>
            <span className="text-white">Web</span>
          </span>

          {/* Nav */}
          <nav className="flex gap-8 text-sm text-white/40 font-medium">
            {['Servicios', 'Portfolio', 'Proceso', 'Contacto'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* WA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm text-white/60 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.12 1.522 5.855L.078 23.567a.75.75 0 00.91.91l5.71-1.444A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.745 9.745 0 01-4.983-1.366l-.356-.213-3.695.935.952-3.587-.232-.371A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 text-xs text-white/25">
          <p>© 2026 KWeb. Desarrollo web profesional en Argentina.</p>
          <p>Hecho con dedicación por KWeb</p>
        </div>
      </div>
    </footer>
  )
}
