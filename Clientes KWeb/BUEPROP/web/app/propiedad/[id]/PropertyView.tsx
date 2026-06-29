"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  MapPin, Phone, ArrowLeft, ArrowUpRight, BedDouble, Bath, Maximize,
  Compass, LayoutGrid, BadgeCheck, Ruler, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { properties, gallery, cover, type Prop } from '@/lib/properties'
import { WA, IG, TEL, GOLD, Instagram, Logo, waFor, DIRECCION, AGENT_NAME, AGENT_MAT, AGENT_INITIALS } from '@/lib/brand'

function spec(p: Prop) {
  const out: { icon: typeof Maximize; label: string; value: string }[] = []
  out.push({ icon: Maximize, label: 'Superficie', value: `${p.m2.toLocaleString('es-AR')} m²` })
  if (p.ambientes) out.push({ icon: LayoutGrid, label: 'Ambientes', value: String(p.ambientes) })
  if (p.dorm != null) out.push({ icon: BedDouble, label: 'Dormitorios', value: String(p.dorm) })
  if (p.banos != null) out.push({ icon: Bath, label: 'Baños', value: String(p.banos) })
  if (p.estado) out.push({ icon: BadgeCheck, label: 'Estado', value: p.estado })
  if (p.orientacion) out.push({ icon: Compass, label: 'Orientación', value: p.orientacion })
  if (p.disposicion) out.push({ icon: Ruler, label: 'Disposición', value: p.disposicion })
  return out
}

function descripcion(p: Prop) {
  const amb = p.ambientes ? `${p.ambientes} ambientes` : 'amplios espacios'
  const dormTxt = p.dorm ? ` con ${p.dorm} dormitorio${p.dorm > 1 ? 's' : ''}` : ''
  return `Excelente ${p.tipo.toLowerCase()} de ${amb}${dormTxt} ubicado en ${p.barrio}, ${p.zona}. ` +
    `${p.m2.toLocaleString('es-AR')} m² en ${p.estado ? p.estado.toLowerCase() + ' estado' : 'muy buen estado'}, ` +
    `con excelente luminosidad y terminaciones de calidad. Una oportunidad ideal en una de las mejores zonas, ` +
    `con todos los servicios y accesos a pasos. Consultanos para coordinar una visita.`
}

export default function PropertyView({ p }: { p: Prop }) {
  const imgs = gallery(p)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const specs = spec(p)
  const similares = properties.filter(s => s.id !== p.id && s.op === p.op).slice(0, 3)

  const next = () => setActive(a => (a + 1) % imgs.length)
  const prev = () => setActive(a => (a - 1 + imgs.length) % imgs.length)

  return (
    <div id="top">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(251,250,248,0.85)', borderBottom: '1px solid var(--line-soft)' }}>
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/#propiedades" className="nav-link flex items-center gap-2"><ArrowLeft size={15} /> Volver a propiedades</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Breadcrumb + título */}
        <div className="text-[0.78rem] mb-4" style={{ color: 'var(--fg-faint)' }}>
          <Link href="/" className="hover:opacity-80">Inicio</Link> <span className="mx-1.5">/</span>
          <Link href="/#propiedades" className="hover:opacity-80">Propiedades</Link> <span className="mx-1.5">/</span>
          <span style={{ color: 'var(--fg-muted)' }}>{p.barrio}</span>
        </div>

        {/* GALERÍA */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-3 mb-3">
          <button onClick={() => setLightbox(true)} className="relative h-[300px] md:h-[460px] rounded-2xl overflow-hidden group" style={{ border: '1px solid var(--line)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgs[active]} alt={`${p.tipo} en ${p.barrio}`} className="w-full h-full object-cover transition group-hover:scale-[1.02]" />
            <span className="absolute bottom-3 right-3 text-[0.72rem] px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-1.5" style={{ background: 'rgba(11,11,13,0.6)', color: '#F4F1EA' }}>
              <Maximize size={13} /> Ver {imgs.length} fotos
            </span>
            <span className="absolute top-3 left-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ background: p.op === 'Venta' ? GOLD : 'rgba(255,255,255,0.92)', color: p.op === 'Venta' ? '#fff' : '#16130F', border: p.op === 'Venta' ? 'none' : '1px solid rgba(0,0,0,0.08)' }}>
              {p.op}
            </span>
          </button>
          <div className="hidden lg:grid grid-rows-2 gap-3">
            {[1, 2].map(off => {
              const idx = (active + off) % imgs.length
              return (
                <button key={off} onClick={() => setActive(idx)} className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgs[idx]} alt="" className="w-full h-full object-cover hover:opacity-90 transition" />
                </button>
              )
            })}
          </div>
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10">
          {imgs.map((src, i) => (
            <button key={i} onClick={() => setActive(i)} className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition"
              style={{ border: i === active ? `2px solid ${GOLD}` : '1px solid var(--line)', opacity: i === active ? 1 : 0.6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* CONTENIDO */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.18em] mb-2" style={{ color: GOLD }}>{p.tipo} · {p.zona}</div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-2">{p.direccion}</h1>
            <div className="flex items-center gap-1.5 text-[0.95rem] mb-6" style={{ color: 'var(--fg-muted)' }}>
              <MapPin size={15} /> {p.barrio}, {p.zona}
            </div>
            <div className="font-serif text-4xl mb-1" style={{ color: GOLD }}>{p.precio}</div>
            {p.expensas && <div className="text-sm mb-8" style={{ color: 'var(--fg-faint)' }}>+ ${p.expensas} expensas</div>}

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
              {specs.map(s => (
                <div key={s.label} className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
                  <s.icon size={20} style={{ color: GOLD }} />
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: 'var(--fg-faint)' }}>{s.label}</div>
                    <div className="font-medium">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Descripción */}
            <h2 className="font-serif text-2xl mb-3 mt-12">Descripción</h2>
            <p className="text-[1rem] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>{descripcion(p)}</p>

            {/* Características */}
            <h2 className="font-serif text-2xl mb-3 mt-12">Características</h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[0.92rem]" style={{ color: 'var(--fg-muted)' }}>
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Operación</span><span style={{ color: 'var(--fg)' }}>{p.op}</span></li>
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Tipo</span><span style={{ color: 'var(--fg)' }}>{p.tipo}</span></li>
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Barrio</span><span style={{ color: 'var(--fg)' }}>{p.barrio}</span></li>
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Zona</span><span style={{ color: 'var(--fg)' }}>{p.zona}</span></li>
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Superficie</span><span style={{ color: 'var(--fg)' }}>{p.m2.toLocaleString('es-AR')} m²</span></li>
              {p.ambientes && <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Ambientes</span><span style={{ color: 'var(--fg)' }}>{p.ambientes}</span></li>}
              {p.dorm != null && <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Dormitorios</span><span style={{ color: 'var(--fg)' }}>{p.dorm}</span></li>}
              {p.banos != null && <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Baños</span><span style={{ color: 'var(--fg)' }}>{p.banos}</span></li>}
              {p.estado && <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Estado</span><span style={{ color: 'var(--fg)' }}>{p.estado}</span></li>}
              <li className="flex justify-between" style={{ borderBottom: '1px solid var(--line-soft)' }}><span>Código</span><span style={{ color: 'var(--fg)' }}>{p.id}</span></li>
            </ul>

            {/* Ubicación */}
            <h2 className="font-serif text-2xl mb-3 mt-12">Ubicación</h2>
            <div className="rounded-2xl overflow-hidden h-64 relative" style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}>
              <iframe
                title={`Mapa — ${p.barrio}`}
                className="w-full h-full"
                style={{ border: 0, filter: 'grayscale(0.35) contrast(1.05) brightness(0.95)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${p.barrio}, ${p.zona}, Argentina`)}&z=14&output=embed`}
              />
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${p.barrio}, ${p.zona}, Argentina`)}`} target="_blank" rel="noopener noreferrer"
                className="absolute bottom-3 right-3 text-[0.74rem] px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-1.5"
                style={{ background: 'rgba(11,11,13,0.7)', color: '#F4F1EA', border: '1px solid var(--line)' }}>
                <MapPin size={13} style={{ color: GOLD }} /> Ver en Google Maps
              </a>
            </div>
            <p className="text-[0.78rem] mt-3" style={{ color: 'var(--fg-faint)' }}>
              Ubicación aproximada. Descripciones, medidas y valores son orientativos; la información definitiva se verifica con la documentación del inmueble.
            </p>
          </div>

          {/* CONTACTO sticky */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <div className="font-serif text-2xl mb-1">¿Te interesa?</div>
              <p className="text-[0.88rem] mb-5" style={{ color: 'var(--fg-muted)' }}>Coordinamos una visita o te enviamos más info hoy mismo.</p>
              <a href={waFor(`${p.tipo} en ${p.barrio} (${p.id})`)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center mb-3">
                Consultar por WhatsApp <ArrowUpRight size={16} />
              </a>
              <a href={`tel:${TEL.replace(/\s/g, '')}`} className="btn-ghost w-full justify-center mb-5"><Phone size={15} /> {TEL}</a>
              <div className="pt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-semibold" style={{ background: 'var(--gold-soft)', color: GOLD }}>{AGENT_INITIALS}</div>
                <div>
                  <div className="text-sm font-medium">{AGENT_NAME}</div>
                  <div className="text-[0.74rem]" style={{ color: 'var(--fg-faint)' }}>{AGENT_MAT}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[0.8rem]" style={{ color: 'var(--fg-muted)' }}>
                <MapPin size={14} /> {DIRECCION}
              </div>
            </div>
          </aside>
        </div>

        {/* SIMILARES */}
        {similares.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl mb-6">Propiedades similares</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {similares.map(s => (
                <Link key={s.id} href={`/propiedad/${s.id}`} className="prop-card block">
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cover(s)} alt="" className="prop-img w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-3 font-serif text-xl text-white drop-shadow">{s.precio}</span>
                  </div>
                  <div className="p-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.14em]" style={{ color: GOLD }}>{s.tipo}</div>
                    <div className="text-sm font-medium flex items-center gap-1.5"><MapPin size={13} /> {s.barrio}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER mini */}
      <footer className="px-5 py-10 mt-16" style={{ borderTop: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-5 text-[0.82rem]" style={{ color: 'var(--fg-muted)' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Phone size={14} /> {TEL}</a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Instagram size={14} /> @bueprop</a>
          </div>
          <span className="text-[0.74rem]" style={{ color: 'var(--fg-faint)' }}>Sitio renovado por <a href="https://kwebs.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>KWebs</a></span>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(7,7,9,0.96)', color: '#fff' }} onClick={() => setLightbox(false)}>
          <button className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }} onClick={() => setLightbox(false)}><X size={22} /></button>
          <button className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }} onClick={e => { e.stopPropagation(); prev() }}><ChevronLeft size={26} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[active]} alt="" className="max-w-[90vw] max-h-[82vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }} onClick={e => { e.stopPropagation(); next() }}><ChevronRight size={26} /></button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{active + 1} / {imgs.length}</span>
        </div>
      )}
    </div>
  )
}
