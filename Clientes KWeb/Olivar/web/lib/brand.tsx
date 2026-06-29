import React from "react";

/* ─────────────────────────────────────────────────────────────
   MARCA / CONTACTO — OLIVAR (placeholder)
   Reemplazar con datos reales del cliente cuando lleguen.
   ───────────────────────────────────────────────────────────── */
export const BRAND = "OLIVAR";
export const TAGLINE = "Del olivar a tu mesa";

// TODO(cliente): número real
export const WA_NUMBER = "5491100000000";
export const WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola OLIVAR, quería hacer una consulta sobre los productos."
)}`;
export const IG = "https://instagram.com/";
export const TEL = "+54 9 11 0000-0000";
export const EMAIL = "hola@olivar.com.ar";
export const UBICACION = "Buenos Aires, Argentina";

// TODO(cliente): dirección exacta del local / olivar.
export const DIRECCION = "Buenos Aires, Argentina";
// Mapa embebido sin API key (output=embed). Cambiar DIRECCION y listo.
export const MAPA_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&z=12&output=embed`;
export const MAPA_LINK = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}`;

export const OIL = "#d2a64f"; // acento dorado (debe coincidir con --oil)

export function waFor(producto: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola OLIVAR, me interesa "${producto}". ¿Me pasan info y precio?`
  )}`;
}

export function Instagram({ size = 16, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Logotipo: rama de olivo minimal + wordmark */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 group" aria-label={`${BRAND} — inicio`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M6 27 C6 16 11 8 24 5" stroke="var(--olive)" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="20.5" cy="8" rx="3.4" ry="2" transform="rotate(-32 20.5 8)" fill="var(--oil)" />
        <ellipse cx="13.5" cy="15" rx="3.4" ry="2" transform="rotate(-32 13.5 15)" fill="var(--olive)" />
        <ellipse cx="9" cy="22" rx="3" ry="1.8" transform="rotate(-32 9 22)" fill="var(--olive)" />
      </svg>
      <span className="font-serif text-[1.5rem] leading-none tracking-[0.14em] font-medium">{BRAND}</span>
    </a>
  );
}
