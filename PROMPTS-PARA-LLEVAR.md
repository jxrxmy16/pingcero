# Ping Cero — Prompts para llevar

Hoja para copiar y pegar. La idea es que puedas abrir una sesión nueva de Claude Code
—acá o en otro computador— y retomar el trabajo sin tener que explicar el proyecto otra vez.

Se usa así:
1. Pegas el **bloque de contexto** (parte A). Una sola vez por sesión.
2. Pegas **un prompt** de la parte B, C o D. Uno por vez, no todos juntos.
3. Los prompts de la parte E son para pegar **en el generador** (Veo, Kling, Sora, Runway),
   no en Claude Code.

> Regla que ahorra tiempo: un prompt = una tarea. Si pides "genera las tomas que faltan,
> arregla la continuidad y monta la música" en un solo mensaje, la tercera tarea sale peor
> que las dos primeras.

---

## A · Bloque de contexto — pégalo al inicio de cada sesión

```
Proyecto: Ping Cero, servicio técnico de computación en Chile (pingcero.cl).
Repo: carpeta con web (HTML estático), catálogo A4 imprimible, logo SVG,
podcast (HolaPing) y video en Remotion.

Marca:
- Coral #E07B3C (acento), indigo #1A1E42 (azul único de la marca),
  crema #FAF8F3, arena #F0E8DC, mint #10B981.
- Tipografía Plus Jakarta Sans. El logo es "Ping●Cero" con punto coral de 6px
  más un ícono radar animado.
- Nada de cian ni azul frío fuera del cursor cyberpunk de la web: choca con el coral.

Video (carpeta video/, Remotion + TypeScript):
- Composición "PingCeroHistoria": 90 s exactos, 30 fps, 1920×1080.
- Misma historia en 9:16 ("PingCeroHistoriaVertical", 1080×1920) usando useFormato().
- Cuatro actos: problema 0-20 s, solución 20-50 s, servicios 50-75 s, cierre 75-90 s.
- Las tomas son fotos fijas con Ken Burns, catalogadas en video/src/Historia/tomas.ts.
  Cada toma tiene `disponible`; si es false, sale una placa con el nombre y el video
  igual se puede ver completo.
- Los textos, precios y contacto salen de video/src/PingCero/data.ts (fuente única).

Documentos que ya existen y hay que respetar:
- prompts-video.md → prompts de imagen y el bloque de estilo que da continuidad.
- prompt-musica.md → mapa de tiempos de la música, con los golpes en 0:20 y 0:32,4.
- DECISIONES.md → por qué está tomada cada decisión de diseño de la web.
- podcast/00-COMO-TRABAJAMOS.md → cómo se escriben los guiones del podcast.

Criterio general del proyecto: función antes que diseño, precios reales sin inventar,
nada de texto de relleno ni reseñas falsas. Todo en español chileno, sin corporativismo.
```

---

## B · Prompts para Claude Code — video

### B1 · Cerrar las tomas que faltan
```
Revisa video/src/Historia/tomas.ts y dime qué tomas tienen disponible:false.
Para cada una, escríbeme el prompt de imagen en inglés siguiendo exactamente el
bloque de estilo de prompts-video.md (misma paleta, misma luz coral desde la derecha,
mismo "no text, no logos"), y agrégalos a prompts-video.md en la sección que corresponde.
No toques los prompts que ya están.
```

### B2 · Ordenar la numeración de las tomas
```
En prompts-video.md los prompts van del 2.1 al 2.14, pero en tomas.ts los números
son otros (n:1 a n:15) y hay huecos: no existen las tomas 07, 08 ni 16, y el macro de
placa madre (prompt 2.3) no tiene entrada en tomas.ts.
Unifica la numeración: que el número del prompt sea el mismo que el del archivo y el
mismo que n. Actualiza los dos archivos y dime qué cambió, sin renombrar las imágenes
que ya están en video/public/tomas/.
```

### B3 · Versión corta de 30 segundos
```
Necesito una versión de 30 s de la historia para pauta en Instagram y Facebook,
reusando solo las tomas que ya existen en video/public/tomas/.
Agrega una composición nueva en video/src/Root.tsx sin tocar la de 90 s.
Quédate con lo que más vende: el par antes/después del ventilador, el gancho del
problema y el cierre con los teléfonos. Dime primero el mapa de tiempos y
después lo implementas.
```

### B4 · Clip vertical de 15 segundos para estado de WhatsApp
```
Arma un clip de 15 s en 9:16 que funcione sin audio y sin contexto previo:
gancho en el segundo 1 (no en el 3), antes/después del ventilador, precio del
servicio de limpieza y el teléfono. Texto grande, legible en un celular con
el brillo bajo. Usa los valores de data.ts, no los escribas a mano.
```

### B5 · Subtítulos quemados
```
El video se va a ver sin audio la mitad de las veces. Agrega subtítulos quemados
a la composición de 90 s: una sola línea a la vez, abajo, con fondo semitransparente
indigo, que aparezcan y desaparezcan con los cortes reales del montaje.
Hazlo como un componente aparte que reciba un arreglo de {desde, hasta, texto},
para que se pueda editar sin meterse en el montaje.
```

### B6 · Montar la música
```
Ya tengo el track. Está en video/public/musica.mp3.
Conéctalo con <Audio> de Remotion en la composición de 90 s, con fade out de 1,5 s
calzado al fundido a negro que arranca en 1:28,5. Verifica contra prompt-musica.md
que los golpes caigan en 0:20 y 0:32,4; si están corridos, ajusta el startFrom
en vez de pedirme otra canción.
```

### B7 · Voz en off
```
Escríbeme el guion de voz en off para los 90 s, calzado a los cortes reales del
montaje (están en video/src/Historia/index.tsx). Máximo 130 palabras por minuto,
español chileno, sin "en el mundo actual" ni listas de tres adjetivos.
Dame el texto dividido por bloques con el segundo de entrada de cada uno, para poder
grabarlo por partes. Ojo: si entra voz, la música baja a −18 LUFS.
```

### B8 · Renderizar y revisar
```
Renderiza PingCeroHistoria y PingCeroHistoriaVertical, y dime el peso de cada archivo
y cuánto tardó. Después saca un fotograma de cada corte de la versión vertical
y revisa que no haya texto cortado por el borde ni sujeto partido por el recorte 9:16.
Si algo queda mal encuadrado, ajusta el `foco` de esa toma en tomas.ts.
```

### B9 · Coherencia entre precios
```
Compara los precios de video/src/PingCero/data.ts, catalogo.html y
propuesta-web/servicios.html. Dime dónde no coinciden, en una tabla.
No cambies nada todavía: primero quiero ver las diferencias.
```

---

## C · Prompts para Claude Code — pedirle que escriba prompts de video

Estos son los que sirven cuando ya tienes la imagen y quieres el prompt de animación.

### C1 · Prompt de image-to-video para una toma puntual
```
Tengo la imagen video/public/tomas/01-manos-reparando.jpg y la quiero animar en Veo
como image-to-video, 5 segundos.
Escríbeme el prompt en inglés. Movimiento lento y corto, sin temblor de cámara,
sin gente entrando al cuadro, sin texto. Respeta el bloque de estilo de prompts-video.md
y dime también qué poner en el campo de negativos.
```

### C2 · Tanda completa
```
Para las 10 tomas que ya están en video/public/tomas/, escríbeme la tabla completa
de prompts de animación: archivo, movimiento de cámara pedido, duración en segundos
y el prompt en inglés listo para pegar.
Los movimientos tienen que ser distintos entre tomas seguidas del montaje: si dos
tomas consecutivas hacen push-in, el corte se siente repetido.
```

### C3 · Toma nueva que todavía no existe
```
Necesito una toma que no está en el catálogo: [DESCRIBE LA TOMA].
Escríbeme el prompt de imagen y el de animación, agrégala a tomas.ts con
disponible:false y dime en qué segundo del montaje la meterías y qué toma
desplazaría. No cambies la duración total de 90 s.
```

### C4 · Arreglar una imagen que salió fría
```
La imagen [ARCHIVO] salió con luz azulada y no pega con el resto.
Dos opciones: reescribir el prompt para regenerarla, o activarle templar:true en
tomas.ts. Dime cuál conviene en este caso y por qué, y aplícalo.
```

---

## D · Prompts para Claude Code — podcast y web

### D1 · Guion de episodio
```
Vamos a escribir el episodio de HolaPing sobre [TEMA DEL BANCO].
Antes de escribir, lee podcast/00-COMO-TRABAJAMOS.md y podcast/02-VOICE-CARD.md,
y usa el formato híbrido: literal en el hook, las transiciones y el cierre; viñetas
en el cuerpo. 1.300-1.900 palabras. Marca con 🔴 cada hueco que solo yo puedo llenar
(caso real, cifra, anécdota) y marca los 3 [CLIP] que sirven para vertical.
```

### D2 · Clips del episodio
```
Del guion de podcast/03-PILOTO-EP01-guion.md saca los 3 clips verticales.
Cada uno tiene que entenderse solo, sin haber visto el episodio, y durar entre
30 y 60 segundos. Dame para cada uno: el texto del hook que va en el segundo 1,
el fragmento exacto del guion, y el título para YouTube Shorts.
```

### D3 · Completar la Voice Card
```
Te voy a pegar 4 conversaciones reales de WhatsApp explicándole algo técnico a un
cliente. Con eso llena la ficha de podcast/02-VOICE-CARD.md: largo de frase,
analogías propias, chilenismos que sí van al guion, cómo abro y cómo cierro
una explicación. No inventes nada que no esté en las muestras; si un campo no se
puede deducir, déjalo vacío y dime qué muestra falta.
```

### D4 · Miniaturas del podcast
```
Escríbeme los prompts de imagen para las miniaturas de YouTube de los 5 primeros
episodios del banco de temas. Tienen que verse de la misma familia que las tomas
del video (fondo indigo, luz coral de costado) pero con espacio libre a la izquierda
para poner el título después. Sin texto en la imagen.
```

### D5 · Video de la web
```
En la web de Ping Cero quiero reemplazar el radar animado del hero por un video corto
en loop. Dime qué toma del catálogo serviría, qué duración y peso máximo conviene
para que no arruine la carga de la página, y cómo lo dejo con fallback a la animación
actual si el video no carga.
```

---

## E · Prompts listos para el generador de video

Estos van directo en Veo, Kling, Runway o Sora, como **image-to-video** usando la foto
de `video/public/tomas/` como fotograma inicial. Duración 4-6 s; más largo empieza a
inventar movimiento raro.

Bloque de negativos, el mismo para todos:

```
text, letters, watermark, logo, brand names, extra fingers, deformed hands,
oversaturated colors, blue LED lights, cyan neon, camera shake, zoom punch,
people entering frame, cuts, scene change
```

| Archivo | Prompt de animación |
|---|---|
| `01-manos-reparando.jpg` | `slow push-in, subtle hand movement tightening the screw, dust motes drifting in the coral light, cinematic, 24fps, no camera shake` |
| `02-ventilador-sucio.jpg` | `almost static shot, very slow drift to the right, dust visible on the fan fins, dim and heavy mood, cinematic, 24fps, no camera shake` |
| `03-ventilador-limpio.jpg` | `same framing, slow pull-back, coral rim light brightening across the clean copper heat pipes, crisp and clear, cinematic, 24fps, no camera shake` |
| `04-pasta-termica.jpg` | `macro, very slow dolly across the CPU, thermal paste applicator moving precisely, rack focus to the metal heat spreader, cinematic, 24fps, no camera shake` |
| `09-glitch-virus.jpg` | `static camera, corrupted pixel artifacts flickering slowly on the screen, screen light pulsing on the dark desk, no readable interface, cinematic, 24fps` |
| `10-entrega.jpg` | `slow push-in on the hands exchanging the laptop, calm and complete gesture, warm coral light from the side, no faces entering frame, cinematic, 24fps` |
| `11-celular.jpg` | `slow drift toward the phone, thumb typing, screen glow warming the fingers, blank messaging screen with no readable interface, cinematic, 24fps` |
| `12-taller.jpg` | `very slow lateral truck to the right, the workbench revealing itself, haze catching the coral light, no people, cinematic, 24fps, no camera shake` |
| `14-oficina.jpg` | `slow lateral truck to the right, light shifting across the desks, empty chairs, screens off, no people, cinematic, 24fps` |
| `15-router-redes.jpg` | `slow push-in on the router, status LEDs blinking warm amber in sequence, cables in soft focus behind, cinematic, 24fps, no camera shake` |

### Las tres que todavía faltan

Primero la imagen (prompts 2.7, 2.8 y 2.14 de `prompts-video.md`), después esta animación:

| Archivo a crear | Prompt de animación |
|---|---|
| `05-ssd-ram.jpg` | `slow push-in, hand seating the M.2 drive into the slot and pressing it down, coral highlight sliding along the metal edge, cinematic, 24fps, no camera shake` |
| `06-flat-lay-pc.jpg` | `slow top-down orbit, 15 degrees, components stay perfectly still, coral light raking across, cinematic, 24fps` |
| `13-fondo-abstracto.jpg` | `extremely slow drift, bokeh points floating and breathing, no recognizable objects, cinematic, 24fps` |

---

## F · Las reglas que no se negocian

Van acá para no tener que repetirlas en cada prompt.

1. **Nunca pidas texto en la imagen ni en el video.** Ni el nombre, ni los precios.
   Todo el texto se pone en Remotion, donde queda nítido y editable.
2. **Nunca pidas marcas reales.** "HP laptop" da logos deformados y además no es tu marca.
   Las 16 marcas aparecen como texto en la escena del carrusel, que es la forma correcta.
3. **Fija la semilla** en toda la tanda. Es lo que hace que las tomas se vean del mismo
   video y no de cuatro bancos de imágenes distintos.
4. **Genera 4 variantes y elige una.** Sale más barato que pelear con el prompt
   para arreglar una mano.
5. **Los precios salen de `data.ts`.** Si los escribes a mano en una escena nueva,
   el día que cambien vas a tener que buscarlos en tres lugares.
6. **90,0 segundos exactos.** La música está mapeada a esos cortes. Si mueves un corte,
   el mapa de `prompt-musica.md` queda desfasado y hay que actualizarlo también.
7. **Todo se ve primero en vertical.** El 9:16 es donde la gente lo va a ver de verdad,
   y es el formato donde el texto se corta.
