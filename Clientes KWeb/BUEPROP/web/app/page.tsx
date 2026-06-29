"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Phone, ArrowUpRight, ArrowRight,
  Home, Building2, KeyRound, LineChart, BedDouble, Maximize,
  ShieldCheck, Star, Menu,
} from 'lucide-react'
import { properties, cover, type Prop } from '@/lib/properties'
import { WA, IG, TEL, TEL2, DIRECCION, GOLD, Instagram, Logo } from '@/lib/brand'

const HERO_IMG = 'https://cdn.crmprop.com/Multiple/D/e/p/574273afe8ac0095!Departamento-Recoleta-French-y-Azcuenaga-REC026-1h500.JPG'
const NOSOTROS_IMG = 'https://cdn.crmprop.com/Multiple/R/E/C/df881787f19c3372!RECOLETA-Anchorena-y-Juncal-REC027-1h500.JPG'

const OPERACIONES = ['Todas', 'Venta', 'Alquiler'] as const
const BARRIOS = ['Todos', 'Recoleta', 'Palermo', 'Belgrano', 'Monserrat'] as const

const imgOf = (id: string) => properties.find(p => p.id === id)?.gallery[0] ?? ''
const servicios = [
  { icon: KeyRound, num: '01', title: 'Compraventa', desc: 'Compra y venta de propiedades residenciales y comerciales con asesoramiento integral y atención personalizada.', img: imgOf('REC026') },
  { icon: Home, num: '02', title: 'Alquiler', desc: 'Alquiler residencial, comercial y temporario en los mejores barrios de Capital Federal.', img: imgOf('REC043') },
  { icon: Building2, num: '03', title: 'Inversiones & Desarrollos', desc: 'Oportunidades de inversión y desarrollos inmobiliarios pensados para hacer crecer tu capital.', img: imgOf('PAL010') },
  { icon: LineChart, num: '04', title: 'Tasaciones', desc: 'Valuación profesional de tu propiedad según mercado real, sin cargo y sin compromiso.', img: imgOf('MON003') },
]

const zonas = ['Recoleta', 'Palermo', 'Belgrano', 'Barrio Norte', 'Monserrat', 'Núñez', 'Las Cañitas', 'Caballito', 'Centro']

type Testi = { name: string; meta: string; text: string }
const testimonios: Testi[] = [
  { name: 'Florencia D.', meta: 'Compra · Recoleta', text: 'Una experiencia impecable de principio a fin. Nos asesoraron con honestidad y encontramos el departamento soñado en Recoleta.' },
  { name: 'Gonzalo M.', meta: 'Alquiler · Palermo', text: 'Atención personalizada de verdad. Sergio y su equipo se ocuparon de cada detalle. Profesionalismo total.' },
  { name: 'Andrea V.', meta: 'Venta · Belgrano', text: 'Vendí mi departamento en tiempo récord y al mejor precio. Comunicación clara y seguimiento permanente.' },
  { name: 'Matías P.', meta: 'Compra · Palermo', text: 'Buscaba en Palermo hace tiempo y entendieron exactamente lo que necesitaba. Trato cálido y muy profesional.' },
  { name: 'Valentina S.', meta: 'Alquiler · Recoleta', text: 'Resolvieron todo el alquiler en pocos días, sin vueltas con la documentación. Súper recomendables.' },
  { name: 'Joaquín R.', meta: 'Inversión · Belgrano', text: 'Me asesoraron sobre rentabilidad real antes de invertir. Honestidad y datos concretos, no humo.' },
  { name: 'Camila T.', meta: 'Venta · Monserrat', text: 'Vendieron mi departamento al valor que esperaba. Fotos profesionales y un seguimiento constante.' },
  { name: 'Lucas D.', meta: 'Alquiler temporario · Recoleta', text: 'Necesitaba algo amueblado por unos meses y me consiguieron justo lo que buscaba. Excelente atención.' },
  { name: 'Sofía G.', meta: 'Compra · Recoleta', text: 'Primera compra y me acompañaron en cada paso con muchísima paciencia. Transparencia total.' },
]
const col1 = testimonios.slice(0, 3)
const col2 = testimonios.slice(3, 6)
const col3 = testimonios.slice(6, 9)

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function TestiCard({ t }: { t: Testi }) {
  return (
    <div className="tcard">
      <div className="flex gap-1 mb-3">{Array(5).fill(0).map((_, k) => <Star key={k} size={14} fill={GOLD} style={{ color: GOLD }} />)}</div>
      <p className="text-[0.92rem] leading-relaxed">“{t.text}”</p>
      <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold font-serif" style={{ background: 'var(--gold-soft)', color: GOLD }}>{t.name[0]}</div>
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-[0.74rem]" style={{ color: 'var(--fg-faint)' }}>{t.meta}</div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl md:text-4xl font-semibold">{value}</div>
      <div className="text-[0.7rem] uppercase tracking-[0.18em] mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</div>
    </div>
  )
}

function PropertyCard({ p }: { p: Prop }) {
  return (
    <Link href={`/propiedad/${p.id}`} className="prop-card group block">
      <div className="relative h-56 overflow-hidden" style={{ background: '#eee' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover(p)} alt={`${p.tipo} en ${p.barrio}`} loading="lazy" className="prop-img w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,0.55) 100%)' }} />
        <span className="absolute top-3 left-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
          style={{ background: p.op === 'Venta' ? GOLD : 'rgba(255,255,255,0.92)', color: p.op === 'Venta' ? '#fff' : '#16130F', border: p.op === 'Venta' ? 'none' : '1px solid rgba(0,0,0,0.08)' }}>
          {p.op}
        </span>
        <span className="absolute top-3 right-3 text-[0.62rem] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full backdrop-blur" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
          {p.barrio}
        </span>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <span className="font-serif text-2xl text-white drop-shadow font-semibold">{p.precio}</span>
          <span className="text-[0.7rem] px-2 py-0.5 rounded-full backdrop-blur" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>{p.gallery.length} fotos</span>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[0.7rem] uppercase tracking-[0.16em] mb-1" style={{ color: GOLD }}>{p.tipo}</div>
        <div className="flex items-center gap-1.5 text-[0.95rem] font-medium">
          <MapPin size={14} style={{ color: 'var(--fg-faint)' }} /> {p.direccion}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 text-[0.82rem]" style={{ borderTop: '1px solid var(--line)', color: 'var(--fg-muted)' }}>
          <span className="flex items-center gap-1.5"><Maximize size={14} /> {p.m2.toLocaleString('es-AR')} m²</span>
          {p.ambientes != null && <span className="flex items-center gap-1.5"><BedDouble size={14} /> {p.ambientes} amb</span>}
          <span className="ml-auto flex items-center gap-1 font-medium" style={{ color: GOLD }}>Ver ficha <ArrowUpRight size={14} /></span>
        </div>
      </div>
    </Link>
  )
}

export default function Page() {
  const [op, setOp] = useState<string>('Todas')
  const [barrio, setBarrio] = useState<string>('Todos')

  const filtered = useMemo(() => properties.filter(p =>
    (op === 'Todas' || p.op === op) && (barrio === 'Todos' || p.barrio === barrio)
  ), [op, barrio])

  return (
    <div id="top">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(251,250,248,0.82)', borderBottom: '1px solid var(--line-soft)' }}>
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#propiedades" className="nav-link">Propiedades</a>
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#contacto" className="nav-link">Contacto</a>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm !py-2.5 !px-5"><Phone size={15} /> Contactar</a>
          <Menu size={22} className="md:hidden" style={{ color: 'var(--fg-muted)' }} />
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-[86vh] flex items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,rgba(15,12,10,0.86) 0%,rgba(15,12,10,0.62) 45%,rgba(15,12,10,0.25) 100%)' }} />
        <div className="relative max-w-6xl mx-auto px-5 w-full py-24 text-white">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5 text-[0.68rem] uppercase tracking-[0.2em] font-bold" style={{ color: '#fff' }}>
              <span className="inline-block w-8 h-px" style={{ background: GOLD }} /> Recoleta · Palermo · Belgrano
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-serif font-medium leading-[1.04] text-[2.8rem] md:text-[4.6rem] max-w-3xl">
              Vendemos sueños y<br />experiencias <span className="italic" style={{ color: GOLD }}>emocionantes</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 text-[1.05rem] md:text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Compraventa, alquiler y tasaciones en los mejores barrios de Capital Federal, con la atención personalizada que nos distingue.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#propiedades" className="btn-gold">Ver propiedades <ArrowRight size={17} /></a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost !text-white !border-white/30 hover:!bg-white/10">Tasá tu propiedad</a>
            </div>
          </FadeUp>
          <FadeUp delay={0.34}>
            <div className="mt-16 flex flex-wrap gap-10 md:gap-16">
              <Stat value="4,9★" label="Google · +80 reseñas" />
              <Stat value="ISO 9001" label="Gestión certificada" />
              <Stat value="Recoleta" label="Barrio Norte · CABA" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="max-w-6xl mx-auto px-5 py-24">
        <FadeUp className="max-w-2xl mb-14">
          <div className="label mb-3">Qué hacemos</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Ética profesional y atención personalizada</h2>
        </FadeUp>
        <div>
          {servicios.map((s, i) => (
            <div key={s.title} className={`sfeat ${i % 2 ? 'alt' : ''}`}>
              <div className="sfeat-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gold-soft)' }}>
                    <s.icon size={20} style={{ color: GOLD }} />
                  </div>
                  <span className="label">{s.num}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl mb-3 font-semibold">{s.title}</h3>
                <p className="text-[0.98rem] leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>{s.desc}</p>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">Consultar <ArrowUpRight size={15} /></a>
              </div>
              <div className="sfeat-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROPIEDADES */}
      <section id="propiedades" className="py-24" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <div className="label mb-3">Catálogo</div>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Propiedades destacadas</h2>
            </div>
            <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>{filtered.length} propiedades</span>
          </FadeUp>

          <FadeUp className="flex flex-col gap-3 mb-10">
            <div className="flex flex-wrap gap-2">
              {OPERACIONES.map(o => <button key={o} className="chip" data-active={op === o} onClick={() => setOp(o)}>{o}</button>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {BARRIOS.map(b => <button key={b} className="chip" data-active={barrio === b} onClick={() => setBarrio(b)}>{b}</button>)}
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
          {filtered.length === 0 && <p className="text-center py-16" style={{ color: 'var(--fg-muted)' }}>No hay propiedades con ese filtro.</p>}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="max-w-6xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <FadeUp>
          <div className="label mb-3">Nosotros</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">Una inmobiliaria que construye relaciones para toda la vida</h2>
          <p className="text-[1.02rem] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
            En BUEPROP nos distinguimos por la ética profesional y la atención personalizada. Acompañamos a cada cliente
            en la compra, venta o alquiler de su propiedad con transparencia y compromiso.
          </p>
          <p className="text-[1.02rem] leading-relaxed mb-8" style={{ color: 'var(--fg-muted)' }}>
            Nuestros procesos cuentan con certificación de calidad ISO 9001, respaldando cada operación.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5"><ShieldCheck size={18} style={{ color: GOLD }} /> <span className="text-sm">ISO 9001 · Calidad certificada</span></div>
            <div className="flex items-center gap-2.5"><Star size={18} style={{ color: GOLD }} /> <span className="text-sm">4,9★ con +80 reseñas</span></div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid var(--line)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={NOSOTROS_IMG} alt="Propiedad BUEPROP" className="w-full h-full object-cover" />
          </div>
        </FadeUp>
      </section>

      {/* ZONAS MARQUEE */}
      <section className="py-8 overflow-hidden" style={{ borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="zona-track">
          {[...zonas, ...zonas].map((z, i) => (
            <span key={i} className="font-serif text-3xl md:text-4xl px-8 flex items-center gap-8" style={{ color: i % 2 ? 'var(--fg-faint)' : 'var(--fg)' }}>
              {z} <span style={{ color: GOLD }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <FadeUp className="max-w-2xl mb-14">
          <div className="label mb-3">Clientes</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Lo que dicen quienes confiaron en nosotros</h2>
        </FadeUp>
        <div className="tcol-cols">
          <div className="tcol-col col-1" style={{ '--dur': '34s' } as React.CSSProperties}>
            {[...col1, ...col1].map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
          <div className="tcol-col col-2" style={{ '--dur': '44s' } as React.CSSProperties}>
            {[...col2, ...col2].map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
          <div className="tcol-col col-3" style={{ '--dur': '39s' } as React.CSSProperties}>
            {[...col3, ...col3].map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="max-w-6xl mx-auto px-5 pb-24">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center text-white" style={{ background: GOLD }}>
            <div className="text-[0.68rem] uppercase tracking-[0.2em] font-bold mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>Hablemos</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">¿Querés comprar, alquilar o tasar tu propiedad?</h2>
            <p className="mt-5 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.88)' }}>Escribinos por WhatsApp y te asesoramos hoy mismo, sin compromiso.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3.5 rounded-full hover:opacity-90 transition" style={{ color: GOLD }}>Escribir por WhatsApp <ArrowUpRight size={17} /></a>
              <a href={`tel:${TEL.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 border border-white/50 px-6 py-3.5 rounded-full hover:bg-white/10 transition"><Phone size={16} /> {TEL}</a>
            </div>
          </div>
        </FadeUp>
      </section>

      <SiteFooter />
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="px-5 py-14" style={{ borderTop: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="text-[0.85rem] mt-4 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Inmobiliaria en Barrio Norte. Compraventa, alquiler y tasaciones en CABA. Certificación ISO 9001.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={IG} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--line)' }}><Instagram size={16} /></a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--line)' }}><Phone size={16} /></a>
          </div>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Oficina</div>
          <p className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{DIRECCION}<br />Lun a Vie · 10 a 18 h</p>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Contacto</div>
          <ul className="space-y-2.5 text-[0.85rem]" style={{ color: 'var(--fg-muted)' }}>
            <li className="flex items-center gap-2"><Phone size={14} /> {TEL}</li>
            <li className="flex items-center gap-2"><Phone size={14} /> {TEL2}</li>
            <li className="flex items-center gap-2"><Instagram size={14} /> @bueprop</li>
          </ul>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Operaciones</div>
          <ul className="space-y-2.5 text-[0.85rem]" style={{ color: 'var(--fg-muted)' }}>
            <li><a href="/#propiedades" className="hover:opacity-80">Compraventa</a></li>
            <li><a href="/#propiedades" className="hover:opacity-80">Alquiler</a></li>
            <li><a href="/#propiedades" className="hover:opacity-80">Alquiler temporario</a></li>
            <li><a href={WA} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Tasaciones</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3 text-[0.74rem]" style={{ borderTop: '1px solid var(--line-soft)', color: 'var(--fg-faint)' }}>
        <span>© {new Date().getFullYear()} BUEPROP. Todos los derechos reservados.</span>
        <span>Arq. Sergio Esquerdo — CUCICBA 7280 · Sitio renovado por <a href="https://kwebs.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>KWebs</a></span>
      </div>
    </footer>
  )
}
