'use client'

export default function Marquee() {
  const items = [
    'Landing Pages',
    'Tiendas Online',
    'Webs Institucionales',
    'Portfolios',
    'Restaurants',
    'Proyectos a Medida',
    'Diseño Premium',
  ]

  const text = items.map((item) => `${item} ✦`).join('  ')
  const repeated = `${text}  ${text}  `

  return (
    <div
      className="relative overflow-hidden bg-[#080808] py-5 border-y border-[rgba(201,168,76,0.12)]"
      style={{ transform: 'rotate(-1.5deg)', margin: '2rem -4rem' }}
      aria-hidden="true"
    >
      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F5F5F3]/90 pr-8">
          {repeated}
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F5F5F3]/90 pr-8">
          {repeated}
        </span>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
    </div>
  )
}
