import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KWeb — Desarrollo Web Profesional en Argentina',
  description:
    'Diseñamos y desarrollamos webs personalizadas que generan clientes. Sin templates, sin límites. Landing pages, tiendas online y proyectos a medida.',
  keywords: [
    'desarrollo web argentina',
    'diseño web profesional',
    'landing page argentina',
    'tienda online mercadopago',
    'agencia web argentina',
    'paginas web a medida',
  ],
  openGraph: {
    title: 'KWeb — Desarrollo Web Profesional en Argentina',
    description:
      'Diseñamos y desarrollamos webs personalizadas que generan clientes. Sin templates, sin límites.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-dm antialiased bg-white text-stone-900`}>
        {children}
      </body>
    </html>
  )
}
