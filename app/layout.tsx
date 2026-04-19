import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KWeb — Desarrollo Web Profesional en Argentina',
  description:
    'Diseñamos webs que generan resultados. Landing pages, tiendas online, webs institucionales, portfolios y proyectos a medida.',
  keywords: [
    'desarrollo web argentina',
    'diseño web profesional',
    'landing page',
    'tienda online',
    'ecommerce',
    'portfolio web',
    'agencia web argentina',
  ],
  openGraph: {
    title: 'KWeb — Desarrollo Web Profesional en Argentina',
    description:
      'Diseñamos webs que generan resultados. Landing pages, tiendas online, webs institucionales, portfolios y proyectos a medida.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-jakarta antialiased bg-[#080808] text-[#F5F5F3]`}
      >
        {children}
      </body>
    </html>
  )
}
