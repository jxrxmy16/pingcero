# Ping Cero — Música para el video de 90 segundos

Los tiempos de acá abajo son los **cortes reales del montaje**, sacados del proyecto.
Si la música respeta estos cinco momentos, el video se siente editado *sobre* la música
aunque la hayas generado después.

---

## 1. Qué estilo le va

**Cinematográfico contenido, no corporativo alegre.**

El video es oscuro, cálido y honesto: un taller, unas manos, un equipo que vuelve a andar.
La música tiene que acompañar esa promesa, no venderla a gritos.

| Va | No va |
|---|---|
| Electrónica mínima cinematográfica | EDM con drop |
| Pads análogos cálidos, sub grave con pulso | Ukelele + palmas "pyme feliz" |
| Rhodes o piano apagado, pocas notas | Guitarra épica de banco de sonidos |
| Percusión híbrida sobria que suma capas | Hi-hats de trap rápidos |
| **Instrumental, sin voces** | Voz cantada (compite con el texto en pantalla) |

**Tempo:** 90 BPM. A ese tempo el compás dura 2,67 s y los cortes del video caen
naturalmente cerca de los tiempos fuertes.
**Tonalidad sugerida:** La menor — melancólica al inicio, y basta subir al relativo mayor
(Do) en el cierre para que se sienta la resolución sin cambiar de tema.

---

## 2. Mapa de tiempos — los cinco momentos que importan

| Segundo | Qué pasa en pantalla | Qué debe hacer la música |
|---|---|---|
| 0:00 | Ventilador sucio | Drone grave, pulso lento, **sin batería**. Tensión contenida. |
| 0:06,5 | Pantalla con fallas | Se suma una disonancia leve. Sigue sin batería. |
| 0:13 | El notebook empieza a abrirse | **Empieza el build.** Un swell que crece 7 segundos. |
| **0:18** | La pantalla se enciende con el logo | **Punto de giro.** El swell resuelve acá. |
| **0:20** | Entra el taller | **Primer golpe.** Entra el pulso rítmico. La música cambia de humor: de problema a solución. |
| 0:25 | Manos reparando | Groove estable, se suma un elemento melódico. |
| **0:31** | Etiqueta "Antes" | **Corte casi total, 1,4 segundos de aire.** Solo queda el sub. |
| **0:32,4** | Etiqueta "Después" | **Segundo golpe, el más fuerte del video.** Vuelve todo de una vez. |
| 0:35,6 | Pasta térmica | Groove pleno, suma percusión. |
| 0:39,6 | Router y redes | Se mantiene, agrega una capa. |
| 0:43,6 | "Diagnóstico gratis" | **Meseta: baja la densidad**, se abre el aire. El mensaje pesa más en el silencio. |
| 0:50 | Precios | Vuelve el groove, más melódico y sostenido. |
| 1:03,5 | "Y también hacemos" | Variación: baja medio escalón, mantiene el pulso. |
| **1:15** | Entrega del equipo | **Momento emotivo.** Entra pad cálido o cuerdas suaves. |
| 1:18,5 | Celular / WhatsApp | Sostiene. |
| **1:21,5** | Logo y teléfonos | **Resolución.** Acorde mayor, sensación de cerrado. |
| 1:28,5 → 1:30 | Fundido a negro | **Fade out de 1,5 segundos.** Silencio exacto en 1:30,0. |

Duración total: **90,0 segundos exactos.**

---

## 3. Prompt para Suno

**Campo *Style of Music*:**

```
cinematic minimal electronic, warm analog pads, deep sub-bass pulse, muted rhodes,
restrained hybrid percussion, hopeful but understated, patient build, 90 BPM, A minor,
instrumental, no vocals
```

**Campo de letra** (marca *Instrumental* y pega la estructura):

```
[Intro - 0:00] sparse dark drone, slow sub pulse, no drums, tension
[Build - 0:13] rising swell, filter opening, anticipation
[Drop - 0:20] warm pulse enters, steady groove, hopeful shift
[Verse - 0:25] muted rhodes melody over soft percussion
[Break - 0:31] near silence, only sub-bass, 1.5 seconds
[Impact - 0:33] full return, all layers at once
[Verse - 0:36] full groove, added percussion layers
[Bridge - 0:44] density drops, open air, sustained pad
[Chorus - 0:50] melodic and sustained, confident
[Verse - 1:04] slight step down, keeps the pulse
[Outro - 1:15] warm strings enter, emotional lift
[Resolve - 1:22] major chord resolution, fade out at 1:28
```

---

## 4. Prompt para ElevenLabs Music

Este acepta prosa larga con tiempos, así que conviene dárselo todo junto:

```
Compose a 90-second instrumental track for a computer repair service video. No vocals.
Cinematic minimal electronic at 90 BPM in A minor, warm and understated, never corporate
or cheerful. Structure: 0-13s sparse dark drone with a slow sub-bass pulse and no drums,
quiet tension. 13-20s a rising swell that resolves exactly at 20s. At 20s a warm rhythmic
pulse enters and the mood turns hopeful. 25-31s muted rhodes melody over soft percussion.
At 31s cut to near silence leaving only sub-bass for 1.5 seconds, then at 32.5s bring
everything back at once as the strongest impact of the piece. 36-44s full groove with
layered percussion. 44-50s density drops for open space. 50-64s sustained melodic section.
64-75s a slight step down keeping the pulse. At 75s warm strings enter for an emotional
lift. At 82s resolve to a major chord and fade out completely by 90 seconds.
```

---

## 5. Detalles que hacen la diferencia

1. **Genera 3 versiones y elige.** La primera casi nunca tiene los golpes en el segundo justo.
2. **Lo que hay que revisar al escuchar:** que en el **0:20** y en el **0:32,4** pase algo.
   Esos dos son los que sostienen el video entero. Si la música no los marca, se pierde
   la mitad del efecto del antes/después.
3. **Si el corte queda desfasado por menos de medio segundo**, no regeneres la canción:
   se corre el audio unos frames en el proyecto y listo. Eso lo ajusto yo.
4. **Volumen:** si algún día le agregas una voz en off, la música baja a −18 LUFS.
   Sola, puede ir a −14 LUFS, que es el estándar de redes sociales.
5. **Instagram y TikTok bajan el volumen** de los graves al comprimir. Si el track vive
   solo del sub, en el celular no se escucha nada: pide que haya también un elemento
   melódico en el registro medio.

---

## 6. Cómo la sumo al video

Deja el archivo en `video/public/musica.mp3` y avísame. Lo conecto con `<Audio>` de
Remotion, con el fade de salida calzado al fundido a negro, y vuelvo a renderizar.
