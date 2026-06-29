import React from 'react'

// ─── MARCA / CONTACTO — Olhaus Grupo Inmobiliario ────────────────────────────
export const WA_NUMBER = '5491134940003'
export const WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Olhaus, vi una propiedad en la web y quería hacer una consulta.')}`
export const IG = 'https://www.instagram.com/olhausgrupoinmobiliario/'
export const TEL = '+54 11 3494-0003'
export const EMAIL = 'info@olhaus.com.ar'
export const GOLD = '#C9A36B'

export function waFor(titulo: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola Olhaus, me interesa la propiedad "${titulo}". ¿Me dan más información?`)}`
}

export function Instagram({ size = 16, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <a href="/#top" className="flex items-center gap-2.5 group">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M2 26 L11 8 L16 17 L21 8 L30 26" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="font-serif text-[1.35rem] leading-none tracking-[0.12em] font-semibold">OLHAUS</span>
    </a>
  )
}
