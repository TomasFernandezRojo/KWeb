"use client";

import { useMemo, useState } from "react";
import { properties, type Operacion } from "@/lib/properties";
import PropertyCard from "./PropertyCard";

const filtros: ("Todas" | Operacion)[] = ["Todas", "Venta", "Alquiler", "Temporario"];

export default function PropertyGrid() {
  const [op, setOp] = useState<"Todas" | Operacion>("Todas");
  const [tipo, setTipo] = useState<string>("Todos");

  const tipos = useMemo(
    () => ["Todos", ...Array.from(new Set(properties.map((p) => p.tipo)))],
    []
  );

  const list = useMemo(
    () =>
      properties.filter(
        (p) =>
          (op === "Todas" || p.operacion === op) &&
          (tipo === "Todos" || p.tipo === tipo)
      ),
    [op, tipo]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setOp(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                op === f
                  ? "bg-ink text-cream"
                  : "border border-line bg-cream text-ink-soft hover:border-clay hover:text-clay"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-full border border-line bg-cream px-5 py-2 text-sm text-ink-soft outline-none focus:border-clay"
        >
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t === "Todos" ? "Todos los tipos" : t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-12 text-center text-muted">
          No hay propiedades con esos filtros. Probá con otra combinación.
        </p>
      )}
    </div>
  );
}
