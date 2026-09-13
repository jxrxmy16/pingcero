# PingCero — Fusión de archivos + correcciones

**Archivo entregable:** `pingcero-final.html` (único, autocontenido, listo para GitHub Pages)
**Base:** `index (1).html` (original) · **Aporte:** sección de marcas de `pingcero-rediseno-essence.html`

---

## Criterio general

Se priorizó **función > diseño**, tal como pediste. El original se mantuvo como base
estructural (conserva todos los scripts y secciones) y del rediseño se tomó **solo**
la sección de logos de marcas, reescrita con el sistema de estilos del original
(variables CSS, clases `.container`, `.fi` de fade-in) para que no se vea "pegada".

---

## 1. Estructura final

```
NAV → HERO → Servicios → Nosotros → Cómo funciona → [MARCAS] → FAQ → Contacto → FOOTER
```

La sección `#marcas` quedó entre "Cómo funciona" (fondo índigo oscuro) y
"Preguntas frecuentes" (fondo arena). Se le dio fondo crema para que **corte visualmente**
entre dos bloques y no queden dos superficies oscuras/beige pegadas.

**Decisiones de la sección:**
- Logos en escala de grises al 42% de opacidad → al pasar el mouse suben a 85% y se elevan 2px.
  Así no compiten con el contenido principal, que es el patrón estándar de un "logo cloud".
- Se mantuvo el `onerror` del rediseño: si el CDN falla, aparece el nombre en texto (HP, Lenovo…).
  Nunca queda un hueco roto.
- Se agregó `loading="lazy"` a las 6 imágenes (no bloquean la carga inicial).
- Se corrigió el ícono de MSI: `msi.svg` no existe en simple-icons → se usó `msibusiness.svg`.

---

## 2. Logo Ping Cero — tamaños

| Ubicación | Antes | Ahora |
|---|---|---|
| SVG radar (nav) | 28px | **34px** |
| Wordmark (nav) | 20px | **22px** |
| SVG radar (footer) | 22px | **30px** |
| Wordmark (footer) | 17px | **19px** |
| Gap ícono↔texto (nav) | 10px | **12px** |

En mobile (≤768px) el nav vuelve a 64px de alto y el wordmark a 20px, para no comerse
la pantalla en pantallas chicas.

---

## 3. Homogeneidad del logo → **Opción (a): punto naranja en todas partes**

Se aplicó `Ping●Cero` de forma consistente en **nav y footer**, con una clase única:

```css
.pc-dot { width:6px; height:6px; border-radius:50%; background:var(--coral); margin:0 4px; }
```

Al ser **una sola clase** compartida, el punto es literalmente el mismo tamaño (6px) y el
mismo color (`#E07B3C`) en los dos lugares — no puede desincronizarse a futuro.
Se mantuvo el ícono radar SVG animado, que es la marca gráfica.

> Se eligió `#E07B3C` (el coral del original) y **no** `#F2722C` (el del rediseño),
> porque el sitio completo ya está construido sobre `#E07B3C`.

---

## 4. Azul estandarizado a **#1A1E42**

Había tres azules distintos conviviendo. Ahora hay uno:

| Variable | Antes | Ahora |
|---|---|---|
| `--indigo` | `#1A1E42` | `#1A1E42` ✅ (el elegido) |
| `--teal` | `#0C2D3A` | → `#1A1E42` |
| `--footer-bg` | `#0F1628` | → `#1A1E42` |
| `--navy` (rediseño) | `#1A2440` | descartado |

Se resolvió por **alias en `:root`** en vez de buscar y reemplazar cada uso: las variables
viejas siguen existiendo pero apuntan a `--indigo`. Así ningún estilo quedó huérfano y el
día que quieras cambiar el azul, tocas **una sola línea**.

También se corrigieron dos azules hardcodeados que se saltaban las variables:
- Botón "Línea 2" del CTA: `background:#0C2D3A` → `var(--indigo)`.
- Barra marquee: `var(--teal)` → `var(--indigo)`.

Y de paso, dos bordes **cian** (`rgba(0,229,255,…)`) que chocaban con la paleta coral
pasaron a coral translúcido (botón Línea 2 y marquee).

> El cian se **mantuvo** en el cursor cyberpunk y la animación "snake", porque ahí es un
> efecto neón deliberado, no una inconsistencia de marca.

---

## 5. Tamaños y ritmo visual

- **Nav:** altura 64px → **72px** (desktop). Más aire, y el logo de 34px ya no queda apretado.
- **Hero h1:** pasó de tres valores fijos (58/46/40px según media query) a
  `clamp(34px, 6.2vw, 58px)` — escala fluida sin saltos entre breakpoints.
  Se eliminaron los overrides de media query que lo pisaban.
- **Hero subtítulo:** `clamp(16px, 1.6vw, 18px)`, ancho máximo 400px → 440px.
- **Botones:** ya estaban correctos (`padding:14px 22px`, `font-size:15px`); se respetaron.
- **Tarjetas de servicio:** `padding:30px 26px` verificado, no se comprimen.
- **Ritmo de espaciado:** la sección de marcas usa 12/24/32/48/64 para calzar con el resto.

---

## 6. Lo que se conservó intacto del original

- Cursor cyberpunk (`.c-inner` / `.c-outer` + seguimiento con `requestAnimationFrame`)
- Animación "snake" de la sección Cómo funciona (SVG generado por JS)
- Acordeón de FAQ (`toggleFaq`)
- Fade-ins al hacer scroll (`IntersectionObserver` sobre `.fi`, `.fi-left`, `.fi-right`)
- Radar animado del hero, tarjetas flotantes, barra de confianza, marquee
- Formulario de contacto (Formspree) y todos los enlaces de WhatsApp

**Verificado:** 7 secciones, tags balanceados (167 `div` abren / 167 cierran),
20 referencias a los scripts originales presentes, 6 logos de marca.

---

## 7. Actualización — barra de marcas animada + fix del botón Línea 2

### Marcas: de fila estática a carrusel infinito
- Pasó de 6 a **16 marcas**: HP, Lenovo, Dell, Asus, Acer, Apple, MSI, Samsung,
  Toshiba, Intel, AMD, Nvidia, Razer, Logitech, Huawei, Gigabyte.
- Rotación continua con CSS puro (`@keyframes brands-scroll`, 45s lineal infinito).
  El set se duplica en el HTML y la animación va de `0` a `translateX(-50%)`,
  así el loop **no tiene salto**: cuando termina la primera copia, la segunda está
  exactamente en la misma posición.
- **Sin JavaScript** — es CSS puro, no puede romperse ni pesa nada.
- Se pausa al pasar el mouse (para que puedan leer una marca puntual).
- Bordes difuminados con `mask-image` para que las marcas entren y salgan suaves
  en vez de cortarse de golpe.
- El set duplicado lleva `aria-hidden="true"` y `alt=""` → los lectores de pantalla
  no leen las 16 marcas dos veces.
- Respeta `prefers-reduced-motion`: si el usuario pidió menos animación en su sistema,
  la barra se detiene y se muestra como grilla centrada.

### Fix del botón "Línea 2" (el problema del final)
El archivo `pingcero-final.html` ya lo tenía bien, pero **el tema de WordPress no**:
tenía `background: transparent` sobre el bloque coral, por eso se fundía con el fondo.

Corregido en `Pagina/pingcero-theme/header.php`:
```css
.btn-cta-2 { background: var(--text); color:#fff; border:1px solid rgba(224,123,60,.35); }
```
De paso se unificaron los azules del tema (`--navy` y `--teal` → `#1A1E42`),
igual que en el HTML. **Requiere volver a subir `pingcero-theme.zip`** para verse en vivo.

---

## Pendiente / a considerar

- Los logos vienen del CDN de **simple-icons**. Si prefieres no depender de un CDN externo,
  se pueden descargar los 6 SVG a una carpeta `img/marcas/` y cambiar las rutas.
- El rediseño traía testimonios de ejemplo (placeholder). **No se integraron**
  a propósito: son texto inventado y publicar reseñas falsas perjudica la credibilidad.
  Cuando tengas reseñas reales de clientes, se agregan.
