// Datos de marca y contacto de Lugar — fuente: brief/CONTENIDO.md (verificado 29/06/2026)

export const brand = {
  nombre: "Lugar",
  nombreFull: "Lugar — alquilá, vendé, viví",
  slogan: "Te ayudamos a alcanzar tus sueños",
  bajada:
    "Inmobiliaria en el corazón de Córdoba. Venta, alquiler, temporario y tasaciones, con atención cercana de lunes a domingo.",
  zona: "Córdoba Capital",
  direccion: "Independencia 864 — Oficina H, X5000 Córdoba",
  telefono: "+54 351 423-4376",
  whatsapp: "5493515213517",
  whatsappLabel: "+54 9 351 521-3517",
  email: "info@lugarcba.com",
  horario: "Lunes a domingo, 8 a 20 h",
  rating: "4,4",
  reviews: "302",
  instagram: "https://www.instagram.com/lugar.cba/",
  instagramHandle: "@lugar.cba",
  facebook: "https://www.facebook.com/lugar.cba/",
  webActual: "https://www.lugarcba.com/",
  // Google Maps embed (output=embed, sin API key)
  mapsEmbed:
    "https://www.google.com/maps?q=Independencia%20864%2C%20C%C3%B3rdoba%2C%20Argentina&output=embed",
  mapsLink: "https://maps.google.com/?q=Independencia+864+Cordoba",
};

export function waLink(text?: string) {
  const base = `https://wa.me/${brand.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
