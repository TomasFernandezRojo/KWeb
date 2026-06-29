import {
  Home, KeyRound, CalendarClock, LineChart, Star, MapPin, Phone,
  Mail, Clock, MessageCircle, ArrowRight, ShieldCheck,
} from "lucide-react";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
import Navbar from "@/components/Navbar";
import FlipWords from "@/components/FlipWords";
import PropertyGrid from "@/components/PropertyGrid";
import Agente from "@/components/Agente";
import { properties } from "@/lib/properties";
import { brand, waLink } from "@/lib/brand";

const servicios = [
  { icon: KeyRound, t: "Venta", d: "Acompañamos cada paso de la compra y venta, con asesoramiento legal y tasación incluida." },
  { icon: Home, t: "Alquiler", d: "Departamentos y casas en los mejores barrios de Córdoba, con contratos claros." },
  { icon: CalendarClock, t: "Temporario", d: "Estadías por día o por mes, totalmente amobladas y listas para habitar." },
  { icon: LineChart, t: "Tasaciones", d: "Conocé el valor real de tu propiedad con un informe profesional y sin cargo." },
];

const opiniones = [
  { n: "Martina G.", t: "Alquilé un depto en Nueva Córdoba y fue todo rapidísimo. Me acompañaron en cada paso." },
  { n: "Federico L.", t: "Vendí mi casa con ellos. Tasación justa y siempre disponibles para responder dudas." },
  { n: "Carla P.", t: "Atención de primera. Encontré el temporario ideal para mi estadía de trabajo." },
  { n: "Diego R.", t: "Muy profesionales y cercanos. Te explican todo sin vueltas." },
  { n: "Sofía M.", t: "El equipo me ayudó a encontrar mi primer departamento. Súper recomendables." },
  { n: "Andrés V.", t: "Seriedad y buena onda. La mejor inmobiliaria con la que trabajé en Córdoba." },
];

const stats = [
  { v: brand.rating + " ★", l: `${brand.reviews} reseñas en Google` },
  { v: "82+", l: "propiedades activas" },
  { v: "8 a 20 h", l: "todos los días" },
  { v: "Córdoba", l: "capital y alrededores" },
];

const destacadas = properties.filter((p) => p.destacada).slice(0, 1);
const heroImg = destacadas[0]?.fotos[0] ?? properties[0].fotos[0];
const barrios = Array.from(new Set(properties.map((p) => p.barrio)));

export default function Page() {
  return (
    <main id="top" className="relative overflow-x-hidden">
      <Navbar />
      <Agente />

      {/* HERO */}
      <section className="relative px-5 pb-16 pt-32 md:pt-40">
        <div className="aurora" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="blur-in inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-ink-soft">
              <ShieldCheck className="h-4 w-4 text-clay" /> Inmobiliaria en el centro de Córdoba
            </span>
            <h1 className="blur-in mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl" style={{ animationDelay: "0.1s" }}>
              <FlipWords words={["Alquilá", "Vendé", "Viví"]} />
              <br />
              tu próximo lugar.
            </h1>
            <p className="blur-in mt-6 max-w-md text-lg text-ink-soft" style={{ animationDelay: "0.2s" }}>
              {brand.bajada}
            </p>
            <div className="blur-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
              <a href="#propiedades" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream transition-colors hover:bg-clay">
                Ver propiedades <ArrowRight className="h-4 w-4" />
              </a>
              <a href={waLink("Hola Lugar, quería hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink transition-colors hover:border-clay hover:text-clay">
                <MessageCircle className="h-4 w-4" /> Hablar con un asesor
              </a>
            </div>
            <div className="blur-in mt-10 flex items-center gap-2 text-sm text-muted" style={{ animationDelay: "0.4s" }}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-clay text-clay" />
                ))}
              </div>
              <span><b className="text-ink">{brand.rating}</b> · {brand.reviews} reseñas en Google</span>
            </div>
          </div>

          <div className="blur-in relative" style={{ animationDelay: "0.25s" }}>
            <div className="overflow-hidden rounded-[2rem] border border-line shadow-[0_40px_80px_-40px_rgba(33,27,20,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImg} alt="Propiedad destacada de Lugar" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-cream px-5 py-4 shadow-xl">
              <p className="font-display text-2xl text-ink">+82</p>
              <p className="text-xs text-muted">propiedades en Córdoba</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE de barrios */}
      <section className="border-y border-line bg-bone-2 py-4">
        <div className="marquee-track">
          {[...barrios, ...barrios, ...barrios].map((b, i) => (
            <span key={i} className="mx-6 font-display text-xl text-ink-soft/70">
              {b} <span className="text-clay">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">Qué hacemos</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
            Todo lo que necesitás para tu próximo lugar
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s) => (
            <div key={s.t} className="group rounded-2xl border border-line bg-cream p-6 transition-colors hover:border-clay">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bone-2 text-clay transition-colors group-hover:bg-clay group-hover:text-cream">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROPIEDADES */}
      <section id="propiedades" className="bg-bone-2 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-clay">Propiedades</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
                Encontrá tu lugar en Córdoba
              </h2>
            </div>
            <p className="text-sm text-muted">Mostrando una selección · 82 en el catálogo completo</p>
          </div>
          <div className="mt-10">
            <PropertyGrid />
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={properties[1].fotos[0]} alt="Lugar inmobiliaria" className="aspect-[5/4] w-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-clay">Nosotros</p>
            <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {brand.slogan}
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              En Lugar acompañamos a cada persona a encontrar el lugar donde quiere vivir, invertir o crecer. Conocemos Córdoba a fondo y trabajamos con atención cercana, de lunes a domingo.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.l} className="border-l-2 border-clay pl-4">
                  <p className="font-display text-3xl text-ink">{s.v}</p>
                  <p className="text-sm text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPINIONES — 3 columnas auto-scroll */}
      <section className="overflow-hidden bg-ink py-24 text-cream">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-clay-soft">Opiniones</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Lo que dicen quienes ya encontraron su lugar
            </h2>
          </div>
        </div>
        <div className="mt-12 grid max-h-[460px] grid-cols-1 gap-4 overflow-hidden px-5 md:grid-cols-3">
          {[["vscroll", 0], ["vscroll-slow", 2], ["vscroll-rev", 4]].map(([cls, off], col) => (
            <div key={col} className={col === 2 ? "hidden md:block" : ""}>
              <div className={cls as string}>
                {[...opiniones, ...opiniones].map((o, i) => {
                  const op = opiniones[(i + (off as number)) % opiniones.length];
                  return (
                    <div key={i} className="mb-4 rounded-2xl border border-cream/10 bg-cream/5 p-5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, k) => (
                          <Star key={k} className="h-3.5 w-3.5 fill-clay-soft text-clay-soft" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-cream/85">“{op.t}”</p>
                      <p className="mt-3 text-sm font-semibold text-clay-soft">{op.n}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO + MAPA */}
      <section id="contacto" className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-clay">Contacto</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Vení a conocernos
            </h2>
            <p className="mt-4 text-ink-soft">Estamos en el centro de Córdoba, atendiendo todos los días de 8 a 20 h.</p>

            <div className="mt-8 space-y-4">
              <a href={brand.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-ink-soft hover:text-clay">
                <MapPin className="mt-0.5 h-5 w-5 text-clay" /> {brand.direccion}
              </a>
              <a href={`tel:${brand.telefono}`} className="flex items-center gap-3 text-ink-soft hover:text-clay">
                <Phone className="h-5 w-5 text-clay" /> {brand.telefono}
              </a>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-ink-soft hover:text-clay">
                <Mail className="h-5 w-5 text-clay" /> {brand.email}
              </a>
              <p className="flex items-center gap-3 text-ink-soft">
                <Clock className="h-5 w-5 text-clay" /> {brand.horario}
              </p>
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-soft hover:text-clay">
                <Instagram className="h-5 w-5 text-clay" /> {brand.instagramHandle}
              </a>
            </div>

            <a href={waLink("Hola Lugar, quería hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 font-semibold text-cream transition-colors hover:bg-clay-deep">
              <MessageCircle className="h-5 w-5" /> Escribinos por WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-line">
            <iframe
              src={brand.mapsEmbed}
              title="Ubicación de Lugar"
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line bg-bone-2 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row">
          <div>
            <p className="font-display text-2xl text-ink">{brand.nombre}<span className="text-clay">.</span></p>
            <p className="mt-1 text-sm text-muted">{brand.nombreFull}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#propiedades" className="hover:text-clay">Propiedades</a>
            <a href="#servicios" className="hover:text-clay">Servicios</a>
            <a href="#contacto" className="hover:text-clay">Contacto</a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-clay">Instagram</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl px-5 text-xs text-muted/70">
          © {new Date().getFullYear()} Lugar — alquilá, vendé, viví. Sitio desarrollado por KWebs.
        </p>
      </footer>
    </main>
  );
}
