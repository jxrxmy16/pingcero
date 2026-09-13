# Ping Cero — Prompts para generar imágenes de video

Set de prompts pensados para que **todo el material se vea de la misma familia** que el clip
del notebook que ya tienes (`ElevenLabs_video_google-veo-3-1-fast_...mp4`): fondo oscuro,
luz coral entrando de costado, poca profundidad de campo, aire para poner texto encima.

Los prompts van **en inglés** a propósito: todos los generadores (Veo, Imagen, Midjourney,
Flux, DALL·E) responden bastante mejor en inglés, aunque el video final sea en español.

---

## 1. Bloque de estilo — pégalo al final de cada prompt

Esto es lo que mantiene la continuidad entre tomas. Si lo cambias, cámbialo en todas.

```
cinematic product photography, dark moody workshop, deep navy-black background (#1A1E42),
warm coral-orange rim light (#E07B3C) from the right, soft volumetric haze, shallow depth
of field, 85mm lens, f/1.8, high detail, muted contrast, no text, no logos
```

### Bloque negativo

Si tu generador acepta negativos (Midjourney con `--no`, Flux, Stable Diffusion):

```
text, letters, watermark, logo, brand names, extra fingers, deformed hands, plastic skin,
oversaturated colors, blue LED gaming lights, cyan neon, cluttered background, stock photo smile
```

> El **azul frío y el cian** son los que más arruinan la continuidad: chocan con el coral de la
> marca. Los modelos los meten solos apenas ven "computer" o "tech", por eso conviene bloquearlos.

### Formato

| Uso | Proporción | Flag |
|---|---|---|
| Video principal | 16:9 | `--ar 16:9` |
| Instagram / estado de WhatsApp | 9:16 | `--ar 9:16` |
| Miniatura / catálogo | 4:5 | `--ar 4:5` |

Genera cada toma en 16:9 **y** en 9:16 desde el principio. Recortar un 16:9 a vertical
siempre deja la composición mal, porque el sujeto queda pegado a un borde.

---

## 2. Prompts por escena

Cada uno indica a qué parte del video sirve y dónde dejar espacio libre para el texto.

### 2.1 · Apertura alternativa — taller al amanecer
*Sirve como plano de inicio si algún día quieres reemplazar el clip del notebook.
Deja el tercio izquierdo vacío para el logo.*

```
A tidy electronics repair workbench in a dark room, closed silver laptop in the center right,
small screwdriver set and anti-static mat, single warm coral light source from the right edge,
thin dust particles floating in the light beam, empty dark space on the left third of the frame,
cinematic product photography, dark moody workshop, deep navy-black background, warm coral-orange
rim light from the right, soft volumetric haze, shallow depth of field, 85mm lens, f/1.8,
high detail, muted contrast, no text, no logos
```

### 2.2 · Manos reparando — la toma más importante
*Es la que comunica "servicio técnico de verdad". Va después de la escena de marca.*

```
Close-up of a technician's hands using a precision screwdriver on the open back panel of a laptop,
motherboard and cooling fan visible, hands in focus, tool tip catching a warm coral highlight,
dark navy background falling off to black, no face visible, cinematic product photography,
dark moody workshop, warm coral-orange rim light from the right, soft volumetric haze,
shallow depth of field, 85mm lens, f/1.8, high detail, muted contrast, no text, no logos
```

> **Truco para las manos:** pide siempre que estén *sosteniendo una herramienta* y que se vean
> desde arriba o de costado. Los modelos fallan mucho menos que con manos abiertas o señalando.
> Si igual salen dedos raros, genera 4 variantes y elige, es más rápido que insistir con el prompt.

### 2.3 · Macro de placa madre
*Textura de fondo para la escena de precios, o transición entre secciones.
Funciona muy bien desenfocado al 60% con el texto encima.*

```
Extreme macro of a computer motherboard, capacitors and copper traces, tiny coral-orange
reflections on the metal contacts, most of the frame in soft bokeh, dark navy tones,
cinematic product photography, deep navy-black background, warm coral-orange rim light,
shallow depth of field, 100mm macro lens, f/2.8, high detail, muted contrast, no text, no logos
```

### 2.4 · Pasta térmica
*Ilustra "Limpieza física + cambio de pasta térmica — $20.000 a $35.000".*

```
Macro shot of a hand applying a small dot of thermal paste onto a CPU die with an applicator,
bare CPU socket visible, clean and precise, warm coral highlight on the metal heat spreader,
dark navy background, cinematic product photography, dark moody workshop, warm coral-orange
rim light from the right, shallow depth of field, 100mm macro lens, f/2.8, high detail,
muted contrast, no text, no logos
```

### 2.5 · Ventilador con polvo — el "antes"
*Genera este y el 2.6 con la misma semilla para que se vea el mismo equipo.*

```
Macro of a laptop cooling fan and heatsink completely clogged with grey dust, visible dust
buildup on the fins, dim coral side light, slightly desaturated, dark navy background,
cinematic product photography, dark moody workshop, shallow depth of field, 100mm macro lens,
f/2.8, high detail, muted contrast, no text, no logos
```

### 2.6 · Ventilador limpio — el "después"
*Mismo encuadre, sin polvo y con más luz. El corte entre 2.5 y 2.6 vende solo el servicio.*

```
Macro of the same laptop cooling fan and heatsink perfectly clean, polished copper heat pipes,
bright warm coral rim light, crisp and clear, dark navy background, cinematic product photography,
dark moody workshop, shallow depth of field, 100mm macro lens, f/2.8, high detail, muted contrast,
no text, no logos
```

### 2.7 · Instalación de SSD / RAM
*Ilustra "Instalación de SSD / ampliación de RAM — $15.000 a $25.000 + repuesto".*

```
Close-up of a hand inserting an M.2 SSD into a laptop slot at an angle, RAM modules resting on
the anti-static mat beside it, coral highlight along the metal edge of the drive, dark navy
background, cinematic product photography, dark moody workshop, warm coral-orange rim light
from the right, shallow depth of field, 85mm lens, f/1.8, high detail, muted contrast,
no text, no logos
```

### 2.8 · Armado de PC — flat lay
*Ilustra "Armado de PC a pedido — $40.000 a $70.000". Deja aire arriba para un título.*

```
Top-down flat lay of PC components neatly arranged on a dark workbench, graphics card,
motherboard, RAM sticks, SSD and cooling fan, geometric grid layout with even spacing,
warm coral light raking across from the right, generous empty dark space at the top of the frame,
cinematic product photography, deep navy-black background, soft volumetric haze,
35mm lens, high detail, muted contrast, no text, no logos
```

### 2.9 · Redes y WiFi
*Ilustra "Configuración de redes y WiFi — $30.000 a $60.000".*

```
Close-up of a hand plugging an ethernet cable into a small office router, status LEDs glowing
warm amber, neatly routed cables in soft focus behind, dark navy background, cinematic product
photography, dark moody workshop, warm coral-orange rim light from the right, shallow depth of
field, 85mm lens, f/1.8, high detail, muted contrast, no text, no logos
```

### 2.10 · Oficina pyme — para la fila "Empresas"
*Es la única toma donde conviene que se vea un espacio completo y no un detalle.*

```
Small business office at dusk, three desktop computers on desks seen from a low angle, screens
off, warm coral light spilling from a window on the right, empty chairs, calm and orderly,
dark navy shadows, cinematic photography, soft volumetric haze, shallow depth of field,
35mm lens, f/2.0, high detail, muted contrast, no people, no text, no logos
```

### 2.11 · Virus y malware
*Ilustra "Eliminación de virus y malware". Sin calaveras ni candados de stock: es un cliché.*

```
Laptop screen showing an abstract cascade of corrupted pixel glitch artifacts in dim red and
orange, screen light reflecting on a dark desk surface, room in darkness, shot from a low
three-quarter angle, cinematic photography, deep navy-black background, shallow depth of field,
50mm lens, f/1.8, high detail, muted contrast, no text, no logos, no user interface elements
```

### 2.12 · Entrega al cliente — cierre emocional
*Va justo antes de la escena final de contacto. Es la toma que cierra la promesa
"te lo devolvemos andando".*

```
Two pairs of hands exchanging a closed silver laptop across a counter, warm coral light from
the side, both people out of frame from the shoulders up, calm and professional gesture,
dark navy background, cinematic photography, soft volumetric haze, shallow depth of field,
50mm lens, f/2.0, high detail, muted contrast, no faces, no text, no logos
```

### 2.13 · El cliente escribiendo por WhatsApp
*Ilustra el paso "01 · Nos contactas". Ojo: el prompt evita a propósito la interfaz
de WhatsApp, porque los modelos la dibujan mal y además es marca registrada.*

```
Close-up of hands holding a smartphone in a dim room, screen glowing warm coral and lighting
the fingers, generic blank messaging screen with no readable interface, dark navy background,
cinematic photography, shallow depth of field, 85mm lens, f/1.8, high detail, muted contrast,
no text, no logos, no readable user interface
```

### 2.14 · Fondo abstracto para las tarjetas de precio
*Genera 3 o 4 variantes. Sirven de fondo al 15% de opacidad detrás de las filas de servicios,
para que esas escenas no queden tan planas.*

```
Abstract macro texture of blurred circuit board bokeh, out-of-focus coral-orange light points
on a deep navy field, no recognizable objects, smooth gradient falloff, cinematic photography,
100mm macro lens, f/1.4, extreme shallow depth of field, muted contrast, no text, no logos
```

---

## 3. Si vas a animar las imágenes con Veo

Genera la imagen primero y úsala como fotograma inicial (image-to-video). Los movimientos que
mejor funcionan son los **lentos y cortos** — 4 a 6 segundos. Pídelos así:

| Toma | Movimiento a pedir |
|---|---|
| 2.2 Manos reparando | `slow push-in, subtle hand movement tightening the screw, no camera shake` |
| 2.3 Macro placa | `very slow dolly across the board, rack focus from foreground to background` |
| 2.5 → 2.6 Ventilador | `static shot, dust particles lifting away from the fan blades` |
| 2.8 Flat lay | `slow top-down orbit, 15 degrees, components stay still` |
| 2.10 Oficina | `slow lateral truck to the right, light shifting across the desks` |
| 2.14 Fondo abstracto | `extremely slow drift, bokeh points floating` |

Frases que conviene agregar siempre: `cinematic, 24fps, no camera shake, no zoom punch`.
Y una que ahorra descartes: `no people entering frame`.

---

## 4. Cuatro reglas que evitan rehacer todo

1. **Nunca pidas texto en la imagen.** Ni el nombre, ni los precios, ni "Ping Cero". Los modelos
   escriben mal y el kerning queda roto. Todo el texto se pone encima en Remotion, donde además
   queda nítido y editable. Por eso `no text, no logos` va en todos los prompts.

2. **Nunca pidas marcas reales.** Pedir "HP laptop" o "Dell motherboard" da logos deformados y
   además es una marca registrada que no es tuya. Las 16 marcas ya aparecen como texto en la
   escena del carrusel, que es la forma correcta de mencionarlas.

3. **Fija la semilla.** Si tu generador la soporta (`--seed` en Midjourney, campo *seed* en Flux),
   usa el mismo número para todas las tomas de una tanda. Es lo que hace que se vean del mismo
   video y no de cuatro bancos de imágenes distintos.

4. **Genera de más.** Cuatro variantes por toma y te quedas con una. Sale más barato en tiempo
   que pelear con el prompt para arreglar una mano.

---

## 5. Cómo meterlas al proyecto

1. Deja los archivos en `video/public/tomas/` (por ejemplo `manos-reparando.jpg`).
2. En Remotion se usan con `<Img src={staticFile("tomas/manos-reparando.jpg")} />`.
3. Para que no queden congeladas, conviene un *Ken Burns*: un `scale` que va de 1 a 1.06 a lo
   largo de la escena, con `interpolate`. Es sutil y hace que una foto se sienta filmada.

Avísame cuando tengas las imágenes y te armo las escenas nuevas dentro del video.
