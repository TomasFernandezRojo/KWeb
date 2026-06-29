"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
type PropHit = {
  id: string; titulo: string; barrio: string; precio: string;
  operacion: string; m2: number; foto: string;
};

const sugerencias = [
  "Deptos en Nueva Córdoba",
  "Algo para alquiler temporario",
  "Casas en venta hasta USD 180.000",
];

export default function Agente() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Lugar. Contame qué estás buscando (zona, operación, presupuesto) y te muestro las opciones que tenemos.",
    },
  ]);
  const [hits, setHits] = useState<PropHit[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, hits, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...msgs, { role: "user" as const, content: q }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    setHits([]);
    try {
      const r = await fetch("/api/agente", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await r.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply }]);
      setHits(data.props ?? []);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Uy, hubo un problema. Probá de nuevo en un momento." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-clay text-cream shadow-[0_14px_40px_-12px_rgba(181,81,46,0.8)] transition-transform hover:scale-105"
        aria-label="Asistente de Lugar"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[560px] max-h-[78vh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-bone shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line bg-cream px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-cream">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-lg leading-none text-ink">Asistente Lugar</p>
              <p className="text-xs text-muted">Respondemos al instante</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 no-scrollbar">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-ink text-cream"
                    : "bg-cream text-ink-soft"
                }`}
              >
                {m.content}
              </div>
            ))}

            {hits.length > 0 && (
              <div className="space-y-2">
                {hits.map((h) => (
                  <Link
                    key={h.id}
                    href={`/propiedad/${h.id}`}
                    className="flex gap-3 rounded-2xl border border-line bg-cream p-2 transition-colors hover:border-clay"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={h.foto} alt={h.titulo} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{h.titulo}</p>
                      <p className="text-xs text-muted">{h.barrio} · {h.m2} m²</p>
                      <p className="mt-1 text-sm font-semibold text-clay">{h.precio}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-1 rounded-2xl bg-cream px-3.5 py-3 w-16">
                <span className="h-2 w-2 animate-bounce rounded-full bg-clay [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-clay [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-clay" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {sugerencias.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-ink-soft hover:border-clay hover:text-clay"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-cream px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-cream disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
