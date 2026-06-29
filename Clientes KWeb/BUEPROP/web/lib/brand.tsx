import React from 'react'

// ─── MARCA / CONTACTO — BUEPROP (Arq. Sergio Esquerdo) ───────────────────────
export const WA_NUMBER = '5491157600000'
export const WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola BUEPROP, vi una propiedad en la web y quería hacer una consulta.')}`
export const IG = 'https://www.instagram.com/bueprop/'
export const TEL = '+54 9 11 5760-0000'
export const TEL2 = '+54 11 2072-7410'
export const DIRECCION = 'French 2354, Barrio Norte, CABA'
export const GOLD = '#E11A22' // acento de marca BUEPROP (rojo). Nombre conservado por compatibilidad.

export const AGENT_NAME = 'Arq. Sergio Esquerdo'
export const AGENT_MAT = 'Matrícula CUCICBA 7280'
export const AGENT_INITIALS = 'SE'

export function waFor(titulo: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola BUEPROP, me interesa la propiedad "${titulo}". ¿Me dan más información?`)}`
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

export function Logo() {
  return (
    <a href="/#top" className="flex items-center gap-2.5 group">
      <span className="flex items-center justify-center w-8 h-8 rounded-md text-white font-extrabold text-[1rem]" style={{ background: GOLD }}>B</span>
      <span className="text-[1.25rem] font-extrabold tracking-tight leading-none">
        BUE<span style={{ color: GOLD }}>PROP</span>
      </span>
    </a>
  )
}
