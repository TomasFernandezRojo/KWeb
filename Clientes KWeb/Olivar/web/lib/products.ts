/* ─────────────────────────────────────────────────────────────
   DATOS PLACEHOLDER — reemplazar con catálogo real del cliente.
   `media` mapea a una clase de textura en globals.css; cuando haya
   fotos reales, cambiar el render por <img src=...>.
   ───────────────────────────────────────────────────────────── */

export type Categoria = {
  id: string;
  nombre: string;
  desc: string;
  media: "media-aceite" | "media-aceituna" | "media-frutos";
  soon?: boolean;
  items: { nombre: string; detalle: string }[];
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "aceites",
    nombre: "Aceites de oliva",
    desc: "Extra virgen de primera prensada en frío. Intensidad frutada, baja acidez.",
    media: "media-aceite",
    items: [
      { nombre: "Extra Virgen Clásico", detalle: "500 ml · acidez < 0,3%" },
      { nombre: "Varietal Arbequina", detalle: "500 ml · suave y frutado" },
      { nombre: "Blend Intenso", detalle: "250 ml · final amargo noble" },
    ],
  },
  {
    id: "aceitunas",
    nombre: "Aceitunas",
    desc: "Cosecha propia, curado natural en salmuera. Verdes y negras de mesa.",
    media: "media-aceituna",
    items: [
      { nombre: "Verdes en salmuera", detalle: "Frasco 350 g" },
      { nombre: "Negras al natural", detalle: "Frasco 350 g" },
      { nombre: "Rellenas / saborizadas", detalle: "Frasco 250 g" },
    ],
  },
  {
    id: "frutos-secos",
    nombre: "Frutos secos",
    desc: "Selección de almendras, nueces y mix. Próximamente en el catálogo.",
    media: "media-frutos",
    soon: true,
    items: [
      { nombre: "Almendras tostadas", detalle: "Próximamente" },
      { nombre: "Nueces mariposa", detalle: "Próximamente" },
      { nombre: "Mix premium", detalle: "Próximamente" },
    ],
  },
];

export const PROCESO = [
  { n: "01", titulo: "Cosecha", desc: "Recolección en el punto justo de maduración, a mano, en nuestro olivar." },
  { n: "02", titulo: "Molienda en frío", desc: "Prensado el mismo día, por debajo de 27°C, para conservar aroma y nutrientes." },
  { n: "03", titulo: "Decantado", desc: "Reposo natural sin filtros agresivos: el aceite se aclara solo." },
  { n: "04", titulo: "Embotellado", desc: "Envasado en lotes pequeños y trazables, del campo a tu mesa." },
];

export const DIFERENCIALES = [
  { titulo: "Producción propia", desc: "Controlamos cada etapa, del árbol al frasco." },
  { titulo: "Sin conservantes", desc: "Curado y prensado natural, como se hacía siempre." },
  { titulo: "Lotes pequeños", desc: "Frescura real: producimos poco y rotamos rápido." },
  { titulo: "Envíos a todo el país", desc: "Despachamos a domicilio en 24/48 hs." },
];

export type Testimonio = { texto: string; autor: string; compro: string };

export const TESTIMONIOS: Testimonio[] = [
  { texto: "El mejor aceite de oliva que probé en años. Se nota que es artesanal de verdad.", autor: "Marcela Giménez", compro: "Aceite de oliva" },
  { texto: "Las aceitunas tienen un sabor que no encontrás en el supermercado. Adictivas.", autor: "Diego Ramírez", compro: "Aceitunas" },
  { texto: "Pedí un jueves y el viernes ya lo tenía en casa. Atención de 10.", autor: "Sofía Ledesma", compro: "Combo degustación" },
  { texto: "Lo regalé para las fiestas y todos me preguntaron de dónde lo saqué.", autor: "Andrés Paz", compro: "Caja regalo" },
  { texto: "Se nota la frescura, no tiene nada que ver con las marcas de góndola.", autor: "Valentina Molina", compro: "Aceite de oliva" },
  { texto: "Compro hace meses y la calidad es siempre la misma. Recomendados.", autor: "Gustavo Ferreyra", compro: "Cliente frecuente" },
  { texto: "El extra virgen es otra cosa. Cambió cómo cocino en casa.", autor: "Carolina Bianchi", compro: "Extra virgen" },
  { texto: "Llegó perfecto a Neuquén, bien embalado. Vuelvo a comprar seguro.", autor: "Martín Sosa", compro: "Aceitunas" },
  { texto: "Atención por WhatsApp impecable, me asesoraron qué variedad llevar.", autor: "Lucía Vega", compro: "Aceite de oliva" },
];
