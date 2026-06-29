# Gestión de propiedades del dueño — propuesta (próximo paso)

> Pregunta de Tomas (29/06): ¿cómo hace el dueño de Lugar para **agregar propiedades** y **marcar cuándo se vendió/alquiló** una?
> Esto NO se construye en la previa actual (la previa usa data scrapeada y estática). Es la decisión de arquitectura para la versión productiva.

## Contexto clave
Lugar **ya usa Tokko Broker** como CRM (su web actual sale de ahí). Ya cargan cada propiedad en Tokko, le sacan fotos, ponen precio y, cuando se vende/alquila, la dan de baja **ahí**. Ese es su flujo actual y no conviene romperlo.

## Opciones

### Opción 1 — Integrar con la API de Tokko Broker  ✅ RECOMENDADA
La web nueva (de KWebs) **consume las propiedades directo desde Tokko** vía su API.
- El dueño **sigue cargando todo en Tokko, como ya hace** (cero cambio de hábito, cero aprendizaje).
- Agregar propiedad = la carga en Tokko → aparece sola en la web.
- Marcar vendida/alquilada = la marca en Tokko → desaparece sola de la web.
- El **agente IA** se alimenta del mismo feed → siempre responde con stock real y actualizado.
- **Pendiente de verificar:** que el plan de Tokko de Lugar incluya acceso a la API (Tokko tiene API REST de propiedades; hay que confirmar credenciales/alcance con ellos).
- Trabajo de KWebs: una capa que pega a la API de Tokko, cachea y normaliza. Reemplaza el `properties.ts` estático por fetch a Tokko (revalidación cada X horas).

### Opción 2 — Panel admin propio (mini-CMS)
Construir un `/admin` con login donde el dueño agrega/edita/baja propiedades.
- Implica: auth, base de datos, carga de fotos, formulario. Más desarrollo y mantenimiento.
- **Problema:** duplica lo que ya hacen en Tokko → tendrían que cargar dos veces. Solo tiene sentido si **abandonan Tokko**.

### Opción 3 — CMS headless (Sanity / Payload)
El dueño carga en un panel tipo CMS y la web lee de ahí.
- Más lindo que el admin a mano, pero mismo problema que la 2: doble carga si siguen con Tokko.

## Recomendación
**Ir por la Opción 1 (API de Tokko).** Es la que respeta el flujo actual del dueño: él sigue trabajando en Tokko y la web + el agente se actualizan solos. "Marcar vendido" = lo que ya hace hoy. Solo si en algún momento quieren dejar Tokko, evaluamos un panel propio (Opción 2).

## Para la reunión con Ignacio
Preguntar: "¿Con qué plan de Tokko trabajan? ¿Tienen acceso a la API?" → eso define si vamos por la integración directa (lo ideal) o si hay que pensar un panel aparte.
