# HolaPing — EP 01 (PILOTO)
## "Por qué tu WiFi no llega a toda la casa (y qué haría un ingeniero)"

**Estado:** BORRADOR v1 — escrito sin Voice Card. Espera correcciones de Jeremy.
**Largo:** ~1.550 palabras ≈ 12 min a 130 ppm.
**Convención:** `>` = literal, se lee tal cual. Viñetas = se habla libre, son apuntes.
**🔴 = hueco que solo Jeremy puede llenar (caso real, cifra, anécdota).**

---

## [INTRO — 30 s — LITERAL]

> Si en tu casa hay una pieza donde el WiFi simplemente no llega, te tengo una mala
> noticia: no es culpa de tu plan de internet. Y contratar más megas no lo va a arreglar.
>
> [PAUSA]
>
> Soy Jeremy, ingeniero en telecomunicaciones. Esto es HolaPing.
>
> Hoy te voy a explicar por qué pasa esto de verdad — no la versión que te dan en el
> call center — y qué haría yo, con nombre y apellido, si fuera mi casa. Al final te voy
> a decir cuál es la solución barata, cuál es la cara, y cuál es la que casi nadie te
> ofrece porque da más trabajo venderla.

---

## [BLOQUE 1 — Qué está pasando realmente — VIÑETAS]

- El WiFi es radio. No es magia, no es "internet" — es una antena chica emitiendo ondas.
  Y las ondas se topan con cosas.
- Lo que se come tu señal, de peor a mejor: **hormigón armado** (el fierro que lleva
  adentro es lo peor de todo), **ladrillo**, **espejos y ventanas con película**,
  **el agua** — sí, un estanque de peces o un termo te bloquea señal — y al final la
  tabiquería de volcanita, que casi no molesta.
- Casa chilena típica: el router está donde llegó el cable de la compañía. O sea, el
  rincón del living. El peor lugar posible: desde una esquina, la mitad de la señal se
  va para afuera, a la calle.
- Y ahí viene la segunda parte: **hay dos WiFi, no uno.**
  - **2.4 GHz:** llega lejos, atraviesa muros, pero es lenta y está saturada. En un
    edificio hay treinta routers peleando por el mismo espacio. Y ahí mismo viven el
    microondas, el teléfono inalámbrico y el Bluetooth.
  - **5 GHz:** mucho más rápida y limpia, pero se muere al segundo muro. Es la que te da
    300 megas parado al lado del router y 4 megas en la pieza del fondo.
- **El dato de ingeniero:** las rayitas de tu celular no significan nada. La señal se mide
  en **dBm**, y es un número negativo: mientras más cerca de cero, mejor.
  - **-50 dBm** → excelente
  - **-67 dBm** → el mínimo para que una videollamada o Netflix ande sin cortarse
  - **-80 dBm** → tienes una rayita, el celular dice "conectado", y no anda nada
  - Ese es el rango donde vive la frustración: **conectado pero inservible.** Y es peor
    que estar desconectado, porque el celular se aferra a esa red mala en vez de pasarse
    a datos móviles.

**🔴 [JEREMY — tu caso real acá]:** una casa donde mediste y encontraste esto. ¿Qué decía
el cliente que le pasaba? ¿Qué te encontraste al medir? Un dato concreto: metros, dBm,
"el router estaba dentro de un mueble cerrado", lo que sea.

**[TRANSICIÓN — LITERAL]:**
> Ahora, ¿por qué te importa a ti esto? Porque de acá sale la plata que estás gastando mal.

---

## [BLOQUE 2 — Qué significa esto para ti — VIÑETAS]

- **Si estás en tu casa:** te venden más megas. Pasas de 200 a 600 y la pieza del fondo
  sigue igual. Obvio: el cuello de botella nunca estuvo en la calle, está en los últimos
  diez metros, adentro de tu casa. Es como ensanchar la carretera y dejar el portón del
  estacionamiento del mismo ancho.
- **El repetidor:** lo compras, lo enchufas, y algo mejora. Pero hay tres cosas que nadie
  te cuenta:
  1. Un repetidor común **te parte la velocidad a la mitad**, porque tiene que escuchar
     al router y retransmitir con la misma antena. No puede hacer las dos cosas a la vez.
  2. Si lo pones donde ya no llega bien la señal, estás **repitiendo señal mala**.
     Amplificaste el problema.
  3. Y el vicio clásico: tu celular se queda pegado al repetidor cuando ya volviste al
     living. No se cambia solo. Eso tiene nombre — *sticky client* — y vuelve loca a la
     gente sin que sepa por qué.
- **Si tienes una pyme:** acá deja de ser una molestia y pasa a ser plata.
  - El punto de venta que se cae un sábado a las ocho de la tarde.
  - La máquina de la bodega que no sincroniza el inventario.
  - Las cámaras que graban en la nube... hasta que la señal se cae y no graban nada,
    justo el día que pasó algo.
- **Lo importante:** todos estos son el mismo problema con distinta cara. **Cobertura,
  no velocidad.** Y se arreglan distinto.

**🔴 [JEREMY — acá va tu caso de pyme]:** el negocio donde el problema era cobertura y lo
estaban tratando como problema de plan contratado. ¿Cuánto llevaban pagando de más?

**[TRANSICIÓN — LITERAL]:**
> Ya. Si esta fuera mi casa, o el negocio de un cliente mío, esto es exactamente lo que
> haría, y en este orden. Y ojo, porque los dos primeros pasos son gratis.

---

## [BLOQUE 3 — Qué haría yo, paso a paso — VIÑETAS NUMERADAS]

1. **Medir antes de comprar nada. Gratis.**
   - Una app de análisis WiFi en el celular. Caminas la casa anotando los dBm de cada pieza.
   - En quince minutos tienes un mapa real. Sin esto estás comprando a ciegas — y así es
     como la gente termina con tres repetidores enchufados que no sirven.

2. **Mover el router. Gratis, y arregla como la mitad de los casos.**
   - Al centro de la casa, no al rincón. En alto, no en el suelo. Afuera del mueble, no
     adentro. Lejos del microondas, del refrigerador y de los espejos.
   - Si el cable de la compañía no llega al centro, se puede extender. Cuesta poco y es
     la mejor plata que vas a gastar en esto.
   - **🔴 [JEREMY]:** ¿tienes un caso donde solo mover el router lo resolvió todo?
     Va perfecto acá.

3. **Ordenar las bandas.**
   - Ponles nombres distintos a la de 2.4 y a la de 5. En serio.
   - Así el notebook del escritorio va fijo a 5 GHz, y el celular que anda paseando por
     la casa se queda en 2.4. Decides tú, no el aparato.

4. **Recién ahora, hardware. Y en este orden:**
   - **Lo correcto: un cable de red hasta un segundo punto de acceso.** Un cable, y un
     access point en el otro extremo de la casa. Cero pérdida de velocidad, señal fuerte
     en los dos lados. Es más lata de instalar, sí. Es la única solución que no tiene truco.
   - **El intermedio: mesh con backhaul dedicado.** Si no se puede pasar cable, un mesh
     bueno — de esos que reservan una radio solo para hablar entre ellos — sí funciona.
     Ojo: los mesh baratos son repetidores con otro nombre, y tienen exactamente el mismo
     problema de partir la velocidad a la mitad.
   - **El parche: repetidor.** Sirve si lo pones **a mitad de camino**, no en el punto
     muerto, y sabiendo que vas a perder velocidad. Como parche está bien. Como solución
     definitiva, no.

5. **Lo que NO haría: contratar más megas para arreglar cobertura.**
   - Si tu problema es que no llega la señal, más velocidad contratada no cambia
     absolutamente nada. Vas a pagar más todos los meses por el mismo problema.

---

## [CIERRE + CTA — LITERAL]

> Resumiendo, y quédate con esto: **si el WiFi anda bien al lado del router y mal en la
> pieza del fondo, tu problema es cobertura, no velocidad. Y la solución empieza gratis:
> mide, y mueve el router.**
>
> [PAUSA]
>
> Si ya mediste, ya moviste el router, y aún así hay una zona muerta en tu casa o en tu
> negocio, escríbeme y lo vemos. Te digo derechamente si se arregla moviendo cosas o si
> de verdad necesitas hardware. Y si no necesitas nada, también te lo voy a decir.
>
> **🔴 [JEREMY: acá va tu CTA exacta — diagnóstico gratis / precio publicado / garantía
> escrita / WhatsApp. Elige UNA sola para probar en el piloto, no tres.]**
>
> Soy Jeremy, esto fue HolaPing, y nos vemos a la próxima.

---

## MARCADORES DE CLIP

**[CLIP 1] — Las rayitas mienten** (del Bloque 1, el dato de dBm) · ~45 s
- Texto en pantalla, segundo 1: **"Tu celular te está mintiendo"**
- Remate: "-80 dBm es conectado pero inservible. Y eso es peor que estar desconectado."

**[CLIP 2] — El repetidor te parte la velocidad a la mitad** (Bloque 2) · ~40 s
- Texto en pantalla, segundo 1: **"Por qué tu repetidor no sirvió"**
- Remate: "Si lo pones en el punto muerto, estás repitiendo señal mala."

**[CLIP 3] — Más megas no arregla cobertura** (Bloque 3, punto 5) · ~30 s
- Texto en pantalla, segundo 1: **"Deja de pagar más megas"**
- La analogía de la carretera y el portón va acá. Es lo más clipeable del episodio.

---

## TITULARES ALTERNATIVOS
1. Por qué tu WiFi no llega a toda la casa (y qué haría un ingeniero)
2. Tu WiFi no está malo: está mal puesto
3. Contratar más megas NO va a arreglar tu WiFi — te explico por qué

## SHOW NOTES / DESCRIPCIÓN

> Si hay una pieza de tu casa donde el WiFi simplemente no llega, el problema
> probablemente no es tu plan de internet. En este primer episodio de HolaPing te explico,
> como ingeniero en telecomunicaciones, por qué pasa de verdad: qué materiales se comen la
> señal, la diferencia entre 2.4 y 5 GHz, por qué las rayitas del celular no significan
> nada, y por qué un repetidor mal puesto empeora las cosas. Y después, los cinco pasos
> que yo seguiría — los dos primeros son gratis.
>
> 00:00 El problema que más veo
> 01:30 Qué se come tu señal de WiFi
> 04:00 Las rayitas mienten: qué son los dBm
> 06:00 Por qué más megas no arregla nada
> 08:00 Los cinco pasos que yo seguiría
> 11:00 Lo que NO haría
>
> Ping Cero — servicio técnico e infraestructura de redes.

*(Los timestamps son estimados: hay que ajustarlos después de grabar.)*
