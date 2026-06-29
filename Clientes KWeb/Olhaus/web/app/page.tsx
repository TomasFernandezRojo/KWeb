"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Phone, Mail, ArrowUpRight, ArrowRight,
  Home, Building2, KeyRound, LineChart, BedDouble, Bath, Maximize,
  ShieldCheck, Star, Menu,
} from 'lucide-react'
import { properties, cover, photoUrl, CDN, type Prop } from '@/lib/properties'
import { WA, IG, TEL, EMAIL, GOLD, Instagram, Logo } from '@/lib/brand'

// ─── FILTROS / COPY ──────────────────────────────────────────────────────────
const OPERACIONES = ['Todas', 'Venta', 'Alquiler'] as const
const TIPOS = ['Todos', 'Departamento', 'Casa', 'Oficina', 'Terreno', 'Galpón'] as const

const servicios = [
  { icon: KeyRound, num: '01', title: 'Venta', desc: 'Acompañamos toda la operación de compraventa con tasación, marketing y asesoramiento legal de principio a fin.', img: `${CDN}/OLH0855/OLH0855_002.jpg` },
  { icon: Home, num: '02', title: 'Alquiler', desc: 'Departamentos, casas y oficinas en Pilar, Zona Norte y CABA. Gestión de contratos y garantías incluida.', img: `${CDN}/OLH0860/OLH0860_001.jpg` },
  { icon: Building2, num: '03', title: 'Alquiler Temporario', desc: 'Soluciones flexibles para estadías cortas y corporativas, con atención personalizada todo el año.', img: `${CDN}/OLH0803/OLH0803_001.jpg` },
  { icon: LineChart, num: '04', title: 'Tasaciones', desc: 'Valuación profesional de tu propiedad según mercado real, sin cargo y sin compromiso.', img: `${CDN}/OLH0790/OLH0790_025.jpg` },
]

const zonas = ['Pilar', 'Del Viso', 'Escobar', 'Tigre', 'Nordelta', 'Maschwitz', 'Villa Rosa', 'Capital Federal', 'Villa Santa Rita', 'Recoleta']

type Testi = { name: string; meta: string; text: string }
const testimonios: Testi[] = [
  { name: 'Familia Gutiérrez', meta: 'Compra · Villa Santa Rita', text: 'Nos acompañaron en cada paso de la compra de nuestro departamento. Profesionalismo y cero sorpresas. Recomendables 100%.' },
  { name: 'Martín R.', meta: 'Alquiler · Pilar', text: 'Encontré el departamento ideal en Alto del Molino en una semana. Trato cálido y muy ágiles con la documentación.' },
  { name: 'Carolina V.', meta: 'Tasación · Escobar', text: 'Tasaron mi casa con seriedad y datos reales del mercado. Vendí más rápido de lo que esperaba.' },
  { name: 'Diego A.', meta: 'Compra · Nordelta', text: 'Buscaba en Zona Norte hace meses. En Olhaus entendieron lo que quería y cerramos en tiempo récord.' },
  { name: 'Lucía F.', meta: 'Venta · Pilar', text: 'Vendí mi casa con ellos. Marketing impecable, fotos profesionales y un seguimiento permanente. Muy recomendables.' },
  { name: 'Sebastián M.', meta: 'Alquiler · Tigre', text: 'Atención de primera. Me mostraron varias opciones hasta dar con la ideal. Cero vueltas con los contratos.' },
  { name: 'Paula R.', meta: 'Compra · Escobar', text: 'Primera vez comprando y me explicaron todo con paciencia. Transparencia total en cada número.' },
  { name: 'Hernán B.', meta: 'Inversión · CABA', text: 'Compré una unidad como inversión y me asesoraron sobre rentabilidad real. Profesionales de verdad.' },
  { name: 'Romina T.', meta: 'Alquiler temporario · Pilar', text: 'Necesitaba algo por unos meses y resolvieron todo enseguida. Súper flexibles y atentos.' },
]
const col1 = testimonios.slice(0, 3)
const col2 = testimonios.slice(3, 6)
const col3 = testimonios.slice(6, 9)

// ─── UI HELPERS ──────────────────────────────────────────────────────────────
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
      <p className="text-[0.92rem] leading-relaxed" style={{ color: 'var(--fg)' }}>“{t.text}”</p>
      <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-serif" style={{ background: 'var(--gold-soft)', color: GOLD }}>{t.name[0]}</div>
        <div>
          <div className="font-medium text-sm">{t.name}</div>
          <div className="text-[0.74rem]" style={{ color: 'var(--fg-faint)' }}>{t.meta}</div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl md:text-4xl" style={{ color: GOLD }}>{value}</div>
      <div className="text-[0.7rem] uppercase tracking-[0.18em] mt-1" style={{ color: 'var(--fg-muted)' }}>{label}</div>
    </div>
  )
}

// ─── PROPERTY CARD ───────────────────────────────────────────────────────────
function PropertyCard({ p }: { p: Prop }) {
  return (
    <Link href={`/propiedad/${p.id}`} className="prop-card group block">
      <div className="relative h-56 overflow-hidden bg-[#0e0e10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover(p)} alt={`${p.tipo} en ${p.barrio}`} loading="lazy"
          className="prop-img w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.55) 100%)' }} />
        <span className="absolute top-3 left-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
          style={{ background: p.op === 'Venta' ? GOLD : 'rgba(11,11,13,0.78)', color: p.op === 'Venta' ? '#0B0B0D' : '#F4F1EA', border: p.op === 'Venta' ? 'none' : '1px solid rgba(244,241,234,0.25)' }}>
          {p.op}
        </span>
        <span className="absolute top-3 right-3 text-[0.62rem] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full backdrop-blur"
          style={{ background: 'rgba(11,11,13,0.55)', color: '#F4F1EA' }}>
          {p.zona}
        </span>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <span className="font-serif text-2xl text-white drop-shadow">{p.precio}</span>
          <span className="text-[0.7rem] px-2 py-0.5 rounded-full backdrop-blur" style={{ background: 'rgba(11,11,13,0.55)', color: '#F4F1EA' }}>{p.fotos.length} fotos</span>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[0.7rem] uppercase tracking-[0.16em] mb-1" style={{ color: GOLD }}>{p.tipo}</div>
        <div className="flex items-center gap-1.5 text-[0.95rem] font-medium">
          <MapPin size={14} style={{ color: 'var(--fg-faint)' }} /> {p.barrio}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 text-[0.82rem]" style={{ borderTop: '1px solid var(--line)', color: 'var(--fg-muted)' }}>
          <span className="flex items-center gap-1.5"><Maximize size={14} /> {p.m2.toLocaleString('es-AR')} m²</span>
          {p.dorm != null && <span className="flex items-center gap-1.5"><BedDouble size={14} /> {p.dorm}</span>}
          {p.banos != null && <span className="flex items-center gap-1.5"><Bath size={14} /> {p.banos}</span>}
          <span className="ml-auto flex items-center gap-1 font-medium" style={{ color: GOLD }}>
            Ver ficha <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Page() {
  const [op, setOp] = useState<string>('Todas')
  const [tipo, setTipo] = useState<string>('Todos')

  const filtered = useMemo(() => properties.filter(p =>
    (op === 'Todas' || p.op === op) && (tipo === 'Todos' || p.tipo === tipo)
  ), [op, tipo])

  return (
    <div id="top">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(11,11,13,0.72)', borderBottom: '1px solid var(--line-soft)' }}>
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#propiedades" className="nav-link">Propiedades</a>
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#contacto" className="nav-link">Contacto</a>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm !py-2.5 !px-5">
            <Phone size={15} /> Contactar
          </a>
          <Menu size={22} className="md:hidden" style={{ color: 'var(--fg-muted)' }} />
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CDN}/OLH0796/OLH0796_054.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,rgba(11,11,13,0.94) 0%,rgba(11,11,13,0.82) 42%,rgba(11,11,13,0.45) 100%)' }} />
        <div className="relative max-w-6xl mx-auto px-5 w-full py-24">
          <FadeUp>
            <div className="label flex items-center gap-2 mb-5"><span className="inline-block w-8 h-px" style={{ background: GOLD }} /> Pilar · Zona Norte · CABA</div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-serif font-medium leading-[1.04] text-[2.8rem] md:text-[4.6rem] max-w-3xl">
              Encontrá la propiedad<br />que estabas <span className="italic" style={{ color: GOLD }}>buscando</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 text-[1.05rem] md:text-lg max-w-xl" style={{ color: 'var(--fg-muted)' }}>
              Nuestro compromiso es acompañarte y brindarte todo lo necesario para lograr tu objetivo inmobiliario.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#propiedades" className="btn-gold">Ver propiedades <ArrowRight size={17} /></a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost">Tasá tu propiedad</a>
            </div>
          </FadeUp>
          <FadeUp delay={0.34}>
            <div className="mt-16 flex flex-wrap gap-10 md:gap-16">
              <Stat value="+1.300" label="Operaciones" />
              <Stat value="2021" label="Desde" />
              <Stat value="Pilar · CABA" label="Cobertura" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SERVICIOS — tarjetas sticky que se apilan */}
      <section id="servicios" className="max-w-6xl mx-auto px-5 py-24">
        <FadeUp className="max-w-2xl mb-14">
          <div className="label mb-3">Qué hacemos</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Una inmobiliaria que te acompaña en cada paso</h2>
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
                <h3 className="font-serif text-3xl md:text-4xl mb-3">{s.title}</h3>
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
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Propiedades disponibles</h2>
            </div>
            <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>{filtered.length} propiedades</span>
          </FadeUp>

          {/* Filtros */}
          <FadeUp className="flex flex-col gap-3 mb-10">
            <div className="flex flex-wrap gap-2">
              {OPERACIONES.map(o => (
                <button key={o} className="chip" data-active={op === o} onClick={() => setOp(o)}>{o}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TIPOS.map(t => (
                <button key={t} className="chip" data-active={tipo === t} onClick={() => setTipo(t)}>{t}</button>
              ))}
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-16" style={{ color: 'var(--fg-muted)' }}>No hay propiedades con ese filtro.</p>
          )}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="max-w-6xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <FadeUp>
          <div className="label mb-3">Nuestra misión</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">Protagonistas de una nueva forma de trabajar el sector</h2>
          <p className="text-[1.02rem] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
            Somos una empresa dedicada a proveer y crear soluciones globales de calidad en materia habitacional y comercial.
            Formamos parte de la historia de nuestros clientes, aportando experiencia y excelencia.
          </p>
          <p className="text-[1.02rem] leading-relaxed mb-8" style={{ color: 'var(--fg-muted)' }}>
            Nos distinguimos por priorizar las relaciones y cautivar clientes para toda la vida.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5"><ShieldCheck size={18} style={{ color: GOLD }} /> <span className="text-sm">Matrícula CSI 6726 · CPI 9801</span></div>
            <div className="flex items-center gap-2.5"><Star size={18} style={{ color: GOLD }} /> <span className="text-sm">+1.300 seguidores en Instagram</span></div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid var(--line)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${CDN}/OLH0790/OLH0790_025.jpg`} alt="Propiedad Olhaus" className="w-full h-full object-cover" />
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
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Historias que nos enorgullecen</h2>
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
          <div className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <div className="label mb-4">Hablemos</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">
              ¿Querés comprar, alquilar o tasar tu propiedad?
            </h2>
            <p className="mt-5 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
              Escribinos por WhatsApp y te asesoramos hoy mismo, sin compromiso.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-gold">Escribir por WhatsApp <ArrowUpRight size={17} /></a>
              <a href={`mailto:${EMAIL}`} className="btn-ghost"><Mail size={16} /> {EMAIL}</a>
            </div>
          </div>
        </FadeUp>
      </section>

      <SiteFooter />
    </div>
  )
}

// ─── FOOTER (reutilizable) ───────────────────────────────────────────────────
export function SiteFooter() {
  return (
    <footer className="px-5 py-14" style={{ borderTop: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Logo />
          <p className="text-[0.85rem] mt-4 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Grupo Inmobiliario. Venta, alquiler y tasaciones en Pilar, Zona Norte y CABA.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={IG} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--line)' }}><Instagram size={16} /></a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--line)' }}><Phone size={16} /></a>
          </div>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Oficinas</div>
          <p className="text-[0.85rem] leading-relaxed mb-3" style={{ color: 'var(--fg-muted)' }}>
            Los Crisantemos 265 — Ed. Skyglass 1, Of. 209<br />Del Viso, Pilar
          </p>
          <p className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Av. del Libertador 6091, Piso 5 “A”<br />CABA
          </p>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Contacto</div>
          <ul className="space-y-2.5 text-[0.85rem]" style={{ color: 'var(--fg-muted)' }}>
            <li className="flex items-center gap-2"><Phone size={14} /> {TEL}</li>
            <li className="flex items-center gap-2"><Mail size={14} /> {EMAIL}</li>
            <li className="flex items-center gap-2"><Instagram size={14} /> @olhausgrupoinmobiliario</li>
          </ul>
        </div>
        <div>
          <div className="label mb-4 !text-[0.62rem]">Operaciones</div>
          <ul className="space-y-2.5 text-[0.85rem]" style={{ color: 'var(--fg-muted)' }}>
            <li><a href="/#propiedades" className="hover:opacity-80">Venta</a></li>
            <li><a href="/#propiedades" className="hover:opacity-80">Alquiler</a></li>
            <li><a href="/#propiedades" className="hover:opacity-80">Alquiler temporario</a></li>
            <li><a href={WA} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Tasaciones</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3 text-[0.74rem]" style={{ borderTop: '1px solid var(--line-soft)', color: 'var(--fg-faint)' }}>
        <span>© {new Date().getFullYear()} Olhaus Grupo Inmobiliario. Todos los derechos reservados.</span>
        <span>Maria S. Vilariño — CSI 6726 / CPI 9801 · Sitio renovado por <a href="https://kwebs.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>KWebs</a></span>
      </div>
    </footer>
  )
}
