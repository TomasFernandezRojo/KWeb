"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  const show = (idx: number) => {
    setI(idx);
    setOpen(true);
  };
  const prev = () => setI((v) => (v - 1 + fotos.length) % fotos.length);
  const next = () => setI((v) => (v + 1) % fotos.length);

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={() => show(0)}
          className="col-span-4 overflow-hidden rounded-2xl md:col-span-2 md:row-span-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotos[0]} alt={alt} className="aspect-[4/3] h-full w-full object-cover transition-transform hover:scale-105 md:aspect-auto" />
        </button>
        {fotos.slice(1, 5).map((f, idx) => (
          <button key={idx} onClick={() => show(idx + 1)} className="col-span-2 overflow-hidden rounded-2xl md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f} alt={alt} className="aspect-[4/3] w-full object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4" onClick={() => setOpen(false)}>
          <button className="absolute right-5 top-5 text-cream" onClick={() => setOpen(false)} aria-label="Cerrar">
            <X className="h-8 w-8" />
          </button>
          <button
            className="absolute left-4 text-cream md:left-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fotos[i]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
          />
          <button
            className="absolute right-4 text-cream md:right-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <span className="absolute bottom-5 text-sm text-cream/70">{i + 1} / {fotos.length}</span>
        </div>
      )}
    </>
  );
}
