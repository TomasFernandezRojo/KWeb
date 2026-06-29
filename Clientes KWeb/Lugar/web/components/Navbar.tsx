"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, waLink } from "@/lib/brand";

const links = [
  { href: "#propiedades", label: "Propiedades" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bone/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-2xl font-semibold tracking-tight text-ink">
          {brand.nombre}
          <span className="text-clay">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-clay"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink("Hola Lugar, quería hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
          >
            Consultar
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
          aria-label="Menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bone px-5 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-ink-soft"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink("Hola Lugar, quería hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-full bg-clay px-5 py-2 text-center text-sm font-semibold text-cream"
          >
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
