import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lugar.vercel.app"),
  title: "Lugar — Inmobiliaria en Córdoba | Alquilá, vendé, viví",
  description:
    "Inmobiliaria en el centro de Córdoba. Venta, alquiler, temporario y tasaciones. Propiedades en Nueva Córdoba, Centro, Alta Córdoba y más. Atención de lunes a domingo.",
  keywords: [
    "inmobiliaria Córdoba",
    "departamentos Nueva Córdoba",
    "alquiler Córdoba",
    "venta departamentos Córdoba",
    "alquiler temporario Córdoba",
    "tasaciones Córdoba",
  ],
  openGraph: {
    title: "Lugar — Inmobiliaria en Córdoba",
    description: "Alquilá, vendé, viví. Propiedades en Córdoba con atención cercana.",
    type: "website",
    locale: "es_AR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Lugar — alquilá, vendé, viví",
  image: "https://lugar.vercel.app/og.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Independencia 864, Oficina H",
    addressLocality: "Córdoba",
    addressCountry: "AR",
  },
  telephone: brand.telefono,
  email: brand.email,
  url: "https://lugar.vercel.app",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    reviewCount: "302",
  },
  openingHours: "Mo-Su 08:00-20:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
