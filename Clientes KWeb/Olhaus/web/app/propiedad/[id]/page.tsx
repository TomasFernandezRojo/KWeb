import { notFound } from 'next/navigation'
import { properties, getProperty } from '@/lib/properties'
import PropertyView from './PropertyView'

export function generateStaticParams() {
  return properties.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getProperty(id)
  if (!p) return { title: 'Propiedad — Olhaus' }
  return {
    title: `${p.tipo} en ${p.barrio} — ${p.precio} | Olhaus`,
    description: `${p.tipo} en ${p.op.toLowerCase()} en ${p.barrio}. ${p.m2} m²${p.dorm ? `, ${p.dorm} dorm.` : ''}. ${p.precio}.`,
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getProperty(id)
  if (!p) notFound()
  return <PropertyView p={p} />
}
