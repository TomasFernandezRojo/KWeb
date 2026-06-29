import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Bed, Bath, Maximize, MapPin, Check, MessageCircle, Phone,
} from "lucide-react";
import Gallery from "@/components/Gallery";
import Agente from "@/components/Agente";
import { properties, getProperty } from "@/lib/properties";
import { brand, waLink } from "@/lib/brand";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function PropiedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProperty(id);
  if (!p) notFound();

  const msg = `Hola Lugar, me interesa "${p.titulo}" en ${p.barrio} (${p.precio}). ¿Podemos coordinar una visita?`;

  return (
    <main className="relative min-h-screen pb-24">
      <Agente />

      <div className="mx-auto max-w-6xl px-5 pt-10">
        <Link href="/#propiedades" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-clay">
          <ArrowLeft className="h-4 w-4" /> Volver a propiedades
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-clay px-3 py-1 text-xs font-semibold text-cream">{p.operacion}</span>
              <span className="text-sm text-muted">{p.tipo}</span>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">{p.titulo}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
              <MapPin className="h-4 w-4 text-clay" /> {p.barrio}, {p.ciudad}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl text-clay">{p.precio}</p>
          </div>
        </div>

        <div className="mt-8">
          <Gallery fotos={p.fotos} alt={`${p.titulo} en ${p.barrio}`} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-6 border-y border-line py-6">
              <Spec icon={Maximize} v={`${p.m2} m²`} l="Superficie" />
              <Spec icon={Bed} v={p.dormitorios ? `${p.dormitorios}` : "Mono"} l="Dormitorios" />
              <Spec icon={Bath} v={`${p.banos}`} l="Baños" />
            </div>

            <h2 className="mt-8 font-display text-2xl text-ink">Descripción</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{p.descripcion}</p>

            <h2 className="mt-8 font-display text-2xl text-ink">Características</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-ink-soft">
                  <Check className="h-4 w-4 text-clay" /> {a}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA lateral */}
          <aside className="h-fit rounded-3xl border border-line bg-cream p-6 lg:sticky lg:top-24">
            <p className="font-display text-2xl text-ink">¿Te interesa?</p>
            <p className="mt-2 text-sm text-ink-soft">Coordinamos una visita cuando te quede cómodo, o resolvé tus dudas con nuestro asistente.</p>
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3 font-semibold text-cream transition-colors hover:bg-clay-deep">
              <MessageCircle className="h-5 w-5" /> Consultar por WhatsApp
            </a>
            <a href={`tel:${brand.telefono}`} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-clay hover:text-clay">
              <Phone className="h-5 w-5" /> {brand.telefono}
            </a>
            <p className="mt-5 text-center text-xs text-muted">{brand.direccion}</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Spec({ icon: Icon, v, l }: { icon: typeof Maximize; v: string; l: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bone-2 text-clay">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-ink">{v}</p>
        <p className="text-xs text-muted">{l}</p>
      </div>
    </div>
  );
}
