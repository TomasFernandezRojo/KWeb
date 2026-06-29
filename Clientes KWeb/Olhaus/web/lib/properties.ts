// Datos reales de propiedades — Olhaus Grupo Inmobiliario (olhaus.com.ar)
// Galerías y fichas scrapeadas del sitio original. En la versión final,
// estas propiedades se administran desde el panel de la inmobiliaria.

export const CDN = 'https://cdn.tecnogestion.com.ar/multimedia/OLH/OLH'

export type Prop = {
  id: string
  op: 'Venta' | 'Alquiler'
  tipo: 'Departamento' | 'Casa' | 'Oficina' | 'Terreno' | 'Galpón'
  barrio: string
  zona: 'Zona Norte' | 'CABA'
  direccion: string
  precio: string
  expensas?: string
  m2: number
  ambientes?: number
  dorm?: number
  banos?: number
  estado?: string
  orientacion?: string
  disposicion?: string
  destacado?: boolean
  fotos: string[] // suffixes, e.g. "001"
}

const raw: Prop[] = [
  { id: 'OLH0855', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 185.000', m2: 96, ambientes: 3, dorm: 2, banos: 2, estado: 'Excelente', orientacion: 'Norte', disposicion: 'Frente', destacado: true, fotos: ['001','002','003','004','005','006','007','008','009','010','011','012'] },
  { id: 'OLH0850', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 210.000', m2: 150, ambientes: 3, dorm: 2, banos: 2, estado: 'Excelente', disposicion: 'Frente', destacado: true, fotos: ['001','002','003','004','005','006','007','008','009','010','011','012','013'] },
  { id: 'OLH0849', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 149.000', m2: 62, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006'] },
  { id: 'OLH0851', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 150.000', m2: 60, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009'] },
  { id: 'OLH0852', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 140.000', m2: 60, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009','010'] },
  { id: 'OLH0853', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 138.000', m2: 60, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009','010'] },
  { id: 'OLH0854', op: 'Venta', tipo: 'Departamento', barrio: 'Villa Santa Rita', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 136.000', m2: 60, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009','010'] },
  { id: 'OLH0848', op: 'Venta', tipo: 'Departamento', barrio: 'Floresta', zona: 'CABA', direccion: 'Emilio Lamarca 1000', precio: 'U$S 149.000', m2: 62, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['001','002','003','004','005','006'] },
  { id: 'OLH0857', op: 'Venta', tipo: 'Terreno', barrio: 'San Sebastián, Escobar', zona: 'Zona Norte', direccion: 'San Sebastián - Área 7', precio: 'U$S 14.500', m2: 811, fotos: ['011','001','002','003','004','005','006','007','008','009','010'] },
  { id: 'OLH0856', op: 'Venta', tipo: 'Terreno', barrio: 'San Sebastián, Escobar', zona: 'Zona Norte', direccion: 'San Sebastián - Área 12', precio: 'U$S 20.000', m2: 983, fotos: ['004','001','002','003','005','006','007','008','009','010','011','012','013','014'] },
  { id: 'OLH0796', op: 'Alquiler', tipo: 'Casa', barrio: 'Maschwitz Privado, Escobar', zona: 'Zona Norte', direccion: 'Maschwitz Privado 1300', precio: 'U$S 2.500', m2: 250, ambientes: 7, dorm: 6, banos: 5, estado: 'Excelente', destacado: true, fotos: ['054','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016','017','018','019','020'] },
  { id: 'OLH0803', op: 'Alquiler', tipo: 'Casa', barrio: 'Mayling C.C., Pilar', zona: 'Zona Norte', direccion: 'Chubut 400', precio: 'U$S 2.700', m2: 200, ambientes: 5, dorm: 4, banos: 3, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009','010','011','012','013','014','015'] },
  { id: 'OLH0790', op: 'Alquiler', tipo: 'Casa', barrio: 'Los Eucaliptus, Pilar', zona: 'Zona Norte', direccion: 'Champagnat 1100', precio: '$ 1.700.000', m2: 135, ambientes: 4, dorm: 3, banos: 2, estado: 'Excelente', fotos: ['025','001','002','003','004','005','006','007','008','009','010','011','012'] },
  { id: 'OLH0860', op: 'Alquiler', tipo: 'Departamento', barrio: 'Alto del Molino, Pilar', zona: 'Zona Norte', direccion: 'Chile y José Verdi', precio: '$ 700.000', m2: 71, ambientes: 2, dorm: 1, banos: 1, estado: 'Excelente', fotos: ['024','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016'] },
  { id: 'OLH0859', op: 'Alquiler', tipo: 'Departamento', barrio: 'Alto del Molino, Pilar', zona: 'Zona Norte', direccion: 'Chile y José Verdi — Condominio', precio: '$ 550.000', m2: 71, ambientes: 2, banos: 1, estado: 'Excelente', fotos: ['035','001','002','003','004','005','006','007','008','009','010','011','012','013'] },
  { id: 'OLH0810', op: 'Alquiler', tipo: 'Departamento', barrio: 'Villanueva, Tigre', zona: 'Zona Norte', direccion: 'Dean Funes 1600', precio: 'U$S 700', m2: 110, ambientes: 3, dorm: 2, banos: 2, estado: 'Excelente', fotos: ['038','001','002','003','004','005','006','007','008','009','010','011','012'] },
  { id: 'OLH0831', op: 'Alquiler', tipo: 'Oficina', barrio: 'San Nicolás', zona: 'CABA', direccion: 'Florida 400', precio: '$ 750.000', m2: 84, ambientes: 4, banos: 2, estado: 'Excelente', fotos: ['001','002','003','004','005','006','007','008','009','010','011','012'] },
  { id: 'OLH0847', op: 'Alquiler', tipo: 'Galpón', barrio: 'Villa Rosa, Pilar', zona: 'Zona Norte', direccion: 'De la Cárcova 1000', precio: 'U$S 4.000', m2: 3750, estado: 'Muy bueno', fotos: ['025','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015'] },
]

export const properties: Prop[] = raw

export function getProperty(id: string): Prop | undefined {
  return properties.find(p => p.id === id)
}

// URL completa de una foto
export function photoUrl(p: Prop, suffix: string): string {
  return `${CDN}/${p.id}/${p.id}_${suffix}.jpg`
}

export function cover(p: Prop): string {
  return photoUrl(p, p.fotos[0])
}

export function gallery(p: Prop): string[] {
  return p.fotos.map(s => photoUrl(p, s))
}
