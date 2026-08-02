#!/usr/bin/env python3
"""
Construye la "agenda" DNI/CUIT -> guías a partir del reporte_guias.xlsx de Setup.
Corre en la automatización nocturna (GitHub Actions). Salida: guias-index.json.

Uso:  python build_guias_index.py <reporte_guias.xlsx> <salida.json>
"""
import sys, json, re, time
from datetime import datetime, timezone
from collections import defaultdict
import openpyxl

REPORTE = sys.argv[1] if len(sys.argv) > 1 else "reporte_guias.xlsx"
SALIDA = sys.argv[2] if len(sys.argv) > 2 else "guias-index.json"

# Cuántas guías (más recientes) guardamos por persona. Suficiente para el cliente
# final y mantiene la agenda chica.
MAX_POR_DOC = 25


def col_index(header, *starts):
    for i, h in enumerate(header):
        if h and any(str(h).lower().startswith(s.lower()) for s in starts):
            return i
    return None


def fecha_ord(s):
    m = re.match(r"(\d{2})/(\d{2})/(\d{4})", str(s or ""))
    return m.group(3) + m.group(2) + m.group(1) if m else "00000000"


def main():
    t0 = time.time()
    wb = openpyxl.load_workbook(REPORTE, read_only=True, data_only=True)
    ws = wb.active
    rows = ws.iter_rows(values_only=True)
    header = list(next(rows))

    I = {
        "id": col_index(header, "Id"),
        "estado": col_index(header, "Estado"),
        "nif_emisor": col_index(header, "Nif Emisor"),
        "nif_receptor": col_index(header, "Nif Receptor"),
        "nif_cliente": col_index(header, "NIF Cliente"),
        "creacion": col_index(header, "Creaci"),
    }

    # doc -> lista de (fecha_ord, guia)
    docs = defaultdict(list)
    total = 0

    def agregar(num, fecha, guia):
        if not num or len(num) < 7:
            return
        docs[num].append((fecha, guia))
        # Si es CUIT (11 díg.), también lo indexamos por el DNI de adentro,
        # así el cliente lo encuentra ponga CUIT o DNI.
        if len(num) == 11:
            docs[num[2:10]].append((fecha, guia))

    for r in rows:
        total += 1
        guia = r[I["id"]]
        if not guia:
            continue
        fecha = fecha_ord(r[I["creacion"]])
        for key in ("nif_emisor", "nif_receptor", "nif_cliente"):
            v = r[I[key]]
            if v:
                agregar(re.sub(r"[^0-9]", "", str(v)), fecha, str(guia))

    # Ordenar por fecha desc, deduplicar y recortar
    out = {}
    for doc, lst in docs.items():
        seen = set()
        recientes = []
        for fecha, guia in sorted(lst, key=lambda x: x[0], reverse=True):
            if guia in seen:
                continue
            seen.add(guia)
            recientes.append(guia)
            if len(recientes) >= MAX_POR_DOC:
                break
        out[doc] = recientes

    payload = {
        "updated": datetime.now(timezone.utc).isoformat(),
        "totalGuias": total,
        "totalDocs": len(out),
        "docs": out,
    }
    with open(SALIDA, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))

    import os
    kb = os.path.getsize(SALIDA) / 1024
    print(f"OK  guías: {total:,}  docs: {len(out):,}  "
          f"archivo: {kb:.0f} KB  tiempo: {time.time()-t0:.1f}s")


if __name__ == "__main__":
    main()
