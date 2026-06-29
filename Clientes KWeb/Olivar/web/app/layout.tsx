import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://olivar.com.ar"),
  title: "OLIVAR | Aceite de oliva extra virgen, aceitunas y frutos secos artesanales",
  description:
    "Comprá aceite de oliva extra virgen, aceitunas de cosecha propia y frutos secos seleccionados. Producción artesanal en lotes pequeños, prensado en frío. Envíos a todo el país y todos los medios de pago.",
  keywords: [
    "aceite de oliva extra virgen",
    "aceitunas artesanales",
    "frutos secos",
    "aceite de oliva Argentina",
    "comprar aceite de oliva online",
    "aceitunas en salmuera",
    "almendras nueces",
    "productos artesanales",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "OLIVAR",
    title: "OLIVAR | Aceite de oliva extra virgen, aceitunas y frutos secos",
    description:
      "Producción artesanal en lotes pequeños, prensado en frío. Del olivar a tu mesa. Envíos a todo el país.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "OLIVAR",
  description:
    "Productor artesanal de aceite de oliva extra virgen, aceitunas de cosecha propia y frutos secos seleccionados.",
  url: "https://olivar.com.ar",
  areaServed: "AR",
  address: { "@type": "PostalAddress", addressCountry: "AR", addressRegion: "Buenos Aires" },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aceite de oliva extra virgen" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aceitunas" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Frutos secos" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="grain min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
