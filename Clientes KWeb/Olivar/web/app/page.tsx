import {
  Leaf, Droplets, Truck, ShieldCheck, ArrowUpRight, MapPin,
  Phone, Mail, CreditCard,
} from "lucide-react";
import {
  BRAND, TAGLINE, WA, IG, TEL, EMAIL, UBICACION,
  DIRECCION, MAPA_EMBED, MAPA_LINK,
  Logo, Instagram, waFor,
} from "@/lib/brand";
import { CATEGORIAS, DIFERENCIALES, TESTIMONIOS } from "@/lib/products";

const NAV = [
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

const TRUST = [
  "Aceite de oliva extra virgen",
  "Aceitunas de cosecha propia",
  "Frutos secos seleccionados",
  "Prensado en frío",
  "Sin conservantes",
  "Envíos a todo el país",
  "Todos los medios de pago",
];

// Opiniones repartidas en 3 columnas para el efecto de auto-scroll
const COLS = [
  TESTIMONIOS.slice(0, 3),
  TESTIMONIOS.slice(3, 6),
  TESTIMONIOS.slice(6, 9),
];

// Efecto "Text Generate" (21st.dev): cada palabra entra con blur escalonado
function Reveal({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="word-in" style={{ animationDelay: `${start + i * 0.08}s` }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <span id="top" />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[var(--line)] bg-[oklch(0.18_0.018_135_/_0.72)]">
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-[68px] flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-9">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
            ))}
          </div>
          <a href={WA} target="_blank" rel="noopener" className="btn-oil text-sm py-2.5 px-5">
            Pedir ahora <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Aurora Background (efecto 21st.dev) */}
          <div className="aurora-wrap" aria-hidden>
            <div className="aurora" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <div>
              <p className="label rise flex items-center gap-2">
                <Leaf size={14} /> Productor artesanal · {UBICACION}
              </p>
              <h1 className="display mt-6 text-[clamp(2.8rem,7vw,5.4rem)]">
                <Reveal text="El sabor del olivar," start={0.15} />
                <br />
                <span className="italic text-[var(--oil)]">
                  <Reveal text="sin atajos." start={0.55} />
                </span>
              </h1>

              {/* Flip Words (efecto 21st.dev) */}
              <p className="mt-6 font-serif text-[clamp(1.3rem,3vw,2rem)] text-[var(--fg-muted)]">
                Hacemos{" "}
                <span className="flip-mask font-medium text-[var(--oil)]">
                  <span className="flip-list">
                    <span>aceite&nbsp;de&nbsp;oliva</span>
                    <span>aceitunas</span>
                    <span>frutos&nbsp;secos</span>
                    <span>aceite&nbsp;de&nbsp;oliva</span>
                  </span>
                </span>
              </p>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)] rise" style={{ animationDelay: ".8s" }}>
                <span className="text-[var(--fg)]">Extra virgen, cosecha propia y lotes pequeños</span>.
                Prensado en frío, sin conservantes, del campo directo a tu mesa.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4 rise" style={{ animationDelay: ".95s" }}>
                <a href="#productos" className="btn-oil">Ver productos <ArrowUpRight size={18} /></a>
                <a href={WA} target="_blank" rel="noopener" className="btn-ghost">Hacer un pedido</a>
              </div>
            </div>

            {/* Bloque visual del hero (reemplazable por foto del olivar) */}
            <div className="rise" style={{ animationDelay: ".15s" }}>
              <div className="relative aspect-[4/5] rounded-[26px] overflow-hidden border border-[var(--line)] media-aceite">
                <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.16_0.02_135/.85),transparent_55%)]" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="label text-[var(--fg)]">Edición de cosecha</p>
                  <p className="font-serif text-3xl mt-1">Extra Virgen</p>
                  <p className="text-sm text-[var(--fg-muted)] mt-1">Acidez &lt; 0,3% · primera prensada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee de confianza ─────────────────────────── */}
        <section aria-label="Garantías" className="border-y border-[var(--line)] py-5 bg-[var(--bg-2)] overflow-hidden">
          <div className="marquee-track gap-12">
            {[...TRUST, ...TRUST].map((t, i) => (
              <span key={i} className="flex items-center gap-3 text-sm tracking-wide text-[var(--fg-muted)] whitespace-nowrap">
                <Leaf size={14} className="text-[var(--olive)]" /> {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── Productos ────────────────────────────────────── */}
        <section id="productos" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="label">El catálogo</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">Nuestros productos</h2>
            </div>
            <p className="max-w-sm text-[var(--fg-muted)]">
              De nuestro olivar a tu mesa. Tocá cada categoría para consultar y pedir por WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIAS.map((cat) => (
              <article key={cat.id} className="prod-card flex flex-col">
                <div className={`prod-media ${cat.media}`}>
                  <div className="layer absolute inset-0" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.16_0.02_135/.8),transparent_60%)]" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {cat.soon
                      ? <span className="tag soon">Próximamente</span>
                      : <span className="tag">Disponible</span>}
                  </div>
                  <h3 className="font-serif text-3xl absolute bottom-4 left-5 right-5">{cat.nombre}</h3>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{cat.desc}</p>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {cat.items.map((it) => (
                      <li key={it.nombre} className="flex items-baseline justify-between gap-3 text-sm border-b border-[var(--line-soft)] pb-2.5">
                        <span className="text-[var(--fg)]">{it.nombre}</span>
                        <span className="text-[var(--fg-faint)] text-right shrink-0">{it.detalle}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waFor(cat.nombre)}
                    target="_blank"
                    rel="noopener"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--oil)] hover:gap-2.5 transition-all"
                  >
                    Consultar {cat.nombre.toLowerCase()} <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Nosotros / Diferenciales (compacto) ──────────── */}
        <section id="nosotros" className="border-y border-[var(--line)] bg-[var(--bg-2)]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
            <div className="max-w-2xl mb-12">
              <p className="label">Por qué elegirnos</p>
              <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                Artesanal de verdad, del campo a tu mesa
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {DIFERENCIALES.map((d, i) => {
                const Icon = [ShieldCheck, Leaf, Droplets, Truck][i] ?? Leaf;
                return (
                  <div key={d.titulo} className="flex gap-4">
                    <Icon size={26} className="text-[var(--olive)] shrink-0 mt-1" />
                    <div>
                      <p className="font-serif text-xl">{d.titulo}</p>
                      <p className="text-sm text-[var(--fg-muted)] mt-1 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Opiniones (efecto 21st.dev: columnas auto-scroll) ── */}
        <section id="opiniones" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="label">Opiniones</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,4.5vw,3.2rem)]">Lo que dicen quienes ya compraron</h2>
          </div>

          <div className="opi-cols">
            {COLS.map((col, ci) => (
              <div
                key={ci}
                className={`opi-col ${ci === 1 ? "col-2 rev" : ""} ${ci === 2 ? "col-3" : ""}`}
                style={{
                  ["--dur" as string]: `${34 + ci * 5}s`,
                  animationDelay: `${[-2, -12, -6][ci]}s`,
                }}
              >
                {[...col, ...col].map((t, i) => (
                  <figure key={i} className="opi-card">
                    <blockquote className="text-[0.97rem] leading-relaxed text-[var(--fg)]">
                      “{t.texto}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      <span className={`opi-avatar ${i % 2 === 0 ? "a-olive" : "a-oil"}`}>
                        {t.autor.charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-[var(--fg)] truncate">{t.autor}</span>
                        <span className="block text-sm text-[var(--fg-faint)]">{t.compro}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA / Contacto ───────────────────────────────── */}
        <section id="contacto" className="relative overflow-hidden border-t border-[var(--line)]">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(60%_120%_at_50%_-20%,var(--oil-soft),transparent)]" />
          <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-24 sm:py-32 text-center">
            <p className="label">Hacé tu pedido</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,6vw,4rem)]">
              Probá la diferencia de lo<br /><span className="italic text-[var(--oil)]">verdaderamente artesanal</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-[var(--fg-muted)]">
              Escribinos por WhatsApp y coordinamos tu pedido. Envíos a todo el país.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href={WA} target="_blank" rel="noopener" className="btn-oil">Pedir por WhatsApp <ArrowUpRight size={18} /></a>
              <a href={`mailto:${EMAIL}`} className="btn-ghost">Escribir un mail</a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--fg-muted)]">
              <span className="flex items-center gap-2"><Phone size={15} className="text-[var(--olive)]" /> {TEL}</span>
              <span className="flex items-center gap-2"><Mail size={15} className="text-[var(--olive)]" /> {EMAIL}</span>
              <span className="flex items-center gap-2"><MapPin size={15} className="text-[var(--olive)]" /> {UBICACION}</span>
              <span className="flex items-center gap-2"><CreditCard size={15} className="text-[var(--olive)]" /> Todos los medios de pago</span>
            </div>

            {/* Mapa de ubicación */}
            <div className="mt-14 text-left">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p className="label">Dónde estamos</p>
                  <p className="font-serif text-2xl mt-1">{DIRECCION}</p>
                </div>
                <a href={MAPA_LINK} target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--oil)] hover:gap-2.5 transition-all whitespace-nowrap">
                  Cómo llegar <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="map-frame h-[340px]">
                <iframe
                  src={MAPA_EMBED}
                  title={`Ubicación de ${BRAND} en Google Maps`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-dark w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Logo size={24} />
            <p className="text-sm text-[var(--fg-faint)]">{TAGLINE}</p>
          </div>
          <div className="flex items-center gap-5">
            <a href={IG} target="_blank" rel="noopener" aria-label="Instagram" className="nav-link hover:text-[var(--oil)]"><Instagram size={20} /></a>
            <a href={WA} target="_blank" rel="noopener" className="nav-link">WhatsApp</a>
          </div>
        </div>
        <div className="border-t border-[var(--line-soft)]">
          <p className="mx-auto max-w-7xl px-5 sm:px-8 py-5 text-xs text-[var(--fg-faint)] text-center sm:text-left">
            © {new Date().getFullYear()} {BRAND}. Maqueta de demostración · sitio por KWebs.
          </p>
        </div>
      </footer>
    </>
  );
}
