import Link from "next/link";
import { Bed, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/lib/properties";

const opColor: Record<string, string> = {
  Venta: "bg-clay text-cream",
  Alquiler: "bg-ink text-cream",
  Temporario: "bg-olive text-cream",
};

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      href={`/propiedad/${p.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(33,27,20,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.fotos[0]}
          alt={`${p.titulo} en ${p.barrio}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${opColor[p.operacion]}`}
        >
          {p.operacion}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-cream/90 px-3 py-1 text-sm font-semibold text-ink backdrop-blur">
          {p.precio}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl leading-tight text-ink">{p.titulo}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5" /> {p.barrio}, {p.ciudad}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-clay" /> {p.m2} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-clay" />
            {p.dormitorios ? `${p.dormitorios} dorm` : "Monoamb."}
          </span>
          <span className="ml-auto text-xs font-medium text-clay opacity-0 transition-opacity group-hover:opacity-100">
            Ver ficha →
          </span>
        </div>
      </div>
    </Link>
  );
}
