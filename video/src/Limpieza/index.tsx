import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Corte, s } from "../Historia/Corte";
import { useFormato } from "../Historia/formato";
import { C, FONT } from "../PingCero/theme";
import { Cierre, Gratis } from "../Redes";
import { Boquilla, Computador, VentiladorMacro } from "./Equipo";
import { generarPolvo, Polvo } from "./Polvo";

/**
 * "El polvo que te frena" — 30 s, ilustrado y animado, sin una sola fotografía.
 *
 * Es la contraparte de `ClipRedes`: mismo mensaje y misma paleta, pero en vector
 * plano. Sirve para alternar publicaciones sin que se vean repetidas, y resuelve
 * algo que las fotos no pueden mostrar: el polvo saliendo del disipador.
 *
 * Tres decisiones de montaje:
 * - **El fondo nunca corta.** Es el mismo lienzo índigo los 30 s y lo que cambia
 *   es lo que hay encima. En vector, un fundido entre fondos se nota sucio.
 * - **Vertical primero.** Las medidas se escriben para 1080×1920 y la versión
 *   horizontal es la que se adapta, no al revés.
 * - **La limpieza es un barrido**, no un corte: la misma geometría dibujada sucia
 *   y limpia, con una línea coral que descubre la versión limpia de izquierda a
 *   derecha. Por eso las dos ilustraciones comparten vector exacto.
 */
export const DURACION_LIMPIEZA = s(30);

const POLVO_AMBIENTE = generarPolvo(34, "ambiente");
const POLVO_INTERIOR = generarPolvo(64, "interior");

export const ClipLimpieza: React.FC = () => (
  <AbsoluteFill style={{ background: C.indigo, fontFamily: FONT }}>
    <Fondo />

    {/* ─── 1 · El equipo viejo (0–4,4 s) ─── */}
    <Corte desde={0} hasta={4.4}>
      {(d) => <EquipoViejo duracion={d} />}
    </Corte>

    {/* ─── 2 · El diagnóstico: no está vieja (4,4–9 s) ─── */}
    <Corte desde={4.4} hasta={9} entrada={10}>
      {(d) => <Diagnostico duracion={d} />}
    </Corte>

    {/* ─── 3 · La limpieza (9–16 s) ─── */}
    <Corte desde={9} hasta={16}>
      {(d) => <LimpiezaEnVivo duracion={d} />}
    </Corte>

    {/* ─── 4 · El resultado y el precio (16–20,8 s) ─── */}
    <Corte desde={16} hasta={20.8} entrada={10}>
      {() => <Resultado />}
    </Corte>

    {/* ─── 5 · El equipo andando (20,8–24,4 s) ─── */}
    <Corte desde={20.8} hasta={24.4} entrada={10}>
      {() => <EquipoAndando />}
    </Corte>

    {/* ─── 6 · La oferta (24,4–26,8 s) ─── */}
    <Corte desde={24.4} hasta={26.8} entrada={10}>
      {() => <Gratis />}
    </Corte>

    {/* ─── 7 · Contacto (26,8–30 s) ─── */}
    <Corte desde={26.8} hasta={30} entrada={12}>
      {() => <Cierre />}
    </Corte>

    <Grano />
  </AbsoluteFill>
);

/* ─────────────────────────────── Escenas ─────────────────────────────── */

const EquipoViejo: React.FC<{ duracion: number }> = ({ duracion }) => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  // La barra de carga avanza y se queda pegada: es la imagen exacta de un
  // equipo que "enciende pero no anda".
  const barra = interpolate(frame, [10, 46], [0.04, 0.23], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Arte>
        <div style={{ position: "relative" }}>
          <Computador ancho={v(900, 1000)} sucio={1} barra={barra} />
          <div style={{ position: "absolute", inset: "-14% -10%" }}>
            <Polvo motas={POLVO_AMBIENTE} opacidad={0.4} />
          </div>
        </div>
      </Arte>

      <Texto>
        <Titulo delay={4}>
          ¿Tu PC <span style={{ color: C.coral }}>anda lenta</span>?
        </Titulo>
        <Bajada delay={18} salida={duracion}>
          Se demora en todo y se calienta sola.
        </Bajada>
      </Texto>
    </>
  );
};

const Diagnostico: React.FC<{ duracion: number }> = ({ duracion }) => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  // Gira apenas y con tirones: el polvo lo está frenando.
  const angulo = frame * 0.7 + Math.sin(frame / 7) * 4;
  const temperatura = interpolate(frame, [6, duracion - 14], [64, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Medidor valor={temperatura} caliente />

      <Arte>
        <div style={{ position: "relative" }}>
          <VentiladorMacro ancho={v(900, 1000)} sucio={1} angulo={angulo} />
          <div style={{ position: "absolute", inset: "4% 6%" }}>
            <Polvo motas={POLVO_INTERIOR} opacidad={0.3} />
          </div>
        </div>
      </Arte>

      <Texto>
        <Titulo delay={2} salida={46}>
          No está <span style={{ color: C.coral }}>vieja</span>.
        </Titulo>
        <Titulo delay={52} superpuesto>
          Está llena de <span style={{ color: C.coral }}>polvo</span>.
        </Titulo>
      </Texto>
    </>
  );
};

const LimpiezaEnVivo: React.FC<{ duracion: number }> = ({ duracion }) => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  // El barrido no arranca en el frame 0 ni termina con la escena: hay un
  // respiro antes y otro después, que es donde cae el remate.
  const inicio = 16;
  const fin = duracion - 46;
  const avance = interpolate(frame, [inicio, fin], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Velocidad constante + un término cuadrático desde que empieza a destaparse:
  // acelera sin dar el salto que daría cambiar la velocidad de golpe.
  const angulo = frame * 0.7 + 0.016 * Math.pow(Math.max(0, frame - inicio), 2);

  const temperatura = interpolate(avance, [0.45, 1], [92, 54], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ancho = v(900, 1000);
  const alto = (ancho * 300) / 440;

  return (
    <>
      <Medidor valor={temperatura} caliente={avance < 0.75} />

      <Arte>
        <div style={{ position: "relative", width: ancho, height: alto }}>
          <VentiladorMacro ancho={ancho} sucio={1} angulo={angulo} />

          {/* La versión limpia, descubierta de izquierda a derecha. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${(1 - avance) * 100}% 0 0)`,
            }}
          >
            <VentiladorMacro ancho={ancho} sucio={0} angulo={angulo} />
          </div>

          {/* El polvo que sale volando. */}
          <div style={{ position: "absolute", inset: "4% 6%" }}>
            <Polvo motas={POLVO_INTERIOR} soplado={avance * 1.5} opacidad={0.34} />
          </div>

          {/* Línea de barrido y boquilla, montadas en el mismo borde. */}
          {avance > 0.01 && avance < 0.99 ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "-6%",
                  height: "112%",
                  left: `${avance * 100}%`,
                  width: 5,
                  borderRadius: 3,
                  background: C.coral,
                  boxShadow: `0 0 46px 10px rgba(224,123,60,0.55)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${avance * 100}%`,
                  transform: "translateY(-50%)",
                }}
              >
                <Boquilla alto={v(130, 190)} />
              </div>
            </>
          ) : null}
        </div>
      </Arte>

      <Texto>
        <Progreso avance={avance} />
      </Texto>
    </>
  );
};

const Resultado: React.FC = () => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  return (
    <>
      <Medidor valor={54} caliente={false} />

      <Arte>
        <VentiladorMacro ancho={v(900, 1000)} sucio={0} angulo={frame * 19} />
      </Arte>

      <Texto>
        <Rotulo delay={2}>Limpieza física + pasta térmica</Rotulo>
        <div
          style={{
            fontSize: v(80, 72),
            fontWeight: 800,
            color: C.coral,
            letterSpacing: "-0.03em",
            marginTop: 10,
            whiteSpace: "nowrap",
          }}
        >
          <Aparece delay={10}>$20.000 – $35.000</Aparece>
        </div>
        <Bajada delay={24}>Valor referencial · se confirma tras el diagnóstico</Bajada>
      </Texto>
    </>
  );
};

const EquipoAndando: React.FC = () => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  // Ahora la barra sí llega al final, y rápido. Es el remate del plano 1.
  const barra = interpolate(frame, [4, 30], [0.23, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const radar = frame > 34;

  return (
    <>
      <Arte>
        <Computador
          ancho={v(900, 880)}
          sucio={0}
          barra={barra}
          radar={radar}
          pulso={((frame - 34) % 60) / 60}
        />
      </Arte>

      <Texto>
        <Titulo delay={40}>
          Vuelve a <span style={{ color: C.coral }}>andar</span>.
        </Titulo>
      </Texto>
    </>
  );
};

/* ─────────────────────────── Piezas de pantalla ─────────────────────────── */

/** Lienzo de fondo: índigo con un halo coral al centro. No corta nunca. */
const Fondo: React.FC = () => (
  <>
    <AbsoluteFill
      style={{ background: `linear-gradient(160deg, ${C.indigo} 0%, #0D1026 100%)` }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 44%, rgba(224,123,60,0.16) 0%, rgba(224,123,60,0) 58%)",
      }}
    />
  </>
);

/**
 * Grano. En vector plano, una superficie perfectamente lisa se ve barata;
 * una textura muy leve encima la asienta. Es un SVG embebido que el navegador
 * dibuja una vez y repite, así que no pesa en el render.
 */
const GRANO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Grano: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage: GRANO,
      opacity: 0.05,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  />
);

/** La ilustración, en el mismo lugar en todas las escenas. */
const Arte: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { v } = useFormato();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${v(-40, -110)}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** El bloque de texto, siempre a la misma altura. */
const Texto: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { v } = useFormato();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "center",
        padding: v("0 110px 86px", "0 80px 300px"),
      }}
    >
      <div style={{ width: "100%" }}>{children}</div>
    </AbsoluteFill>
  );
};

const Aparece: React.FC<{
  delay?: number;
  salida?: number;
  distancia?: number;
  children: React.ReactNode;
}> = ({ delay = 0, salida, distancia = 22, children }) => {
  const frame = useCurrentFrame();
  const entra = interpolate(frame - delay, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sale =
    salida === undefined
      ? 1
      : interpolate(frame, [salida, salida + 10], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const p = entra * sale;

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * distancia}px)`,
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

const Titulo: React.FC<{
  children: React.ReactNode;
  delay?: number;
  salida?: number;
  /** Ocupa el lugar del titular anterior en vez de empujarlo hacia abajo. */
  superpuesto?: boolean;
}> = ({ children, delay, salida, superpuesto = false }) => {
  const { v } = useFormato();
  return (
    <div
      style={{
        fontSize: v(78, 70),
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: "-0.03em",
        color: C.white,
        // Cuando dos titulares se turnan en la misma escena, el segundo ocupa
        // el lugar del primero en vez de empujarlo hacia abajo.
        position: superpuesto ? "absolute" : "relative",
        left: 0,
        right: 0,
      }}
    >
      <Aparece delay={delay} salida={salida}>
        {children}
      </Aparece>
    </div>
  );
};

const Bajada: React.FC<{
  children: React.ReactNode;
  delay?: number;
  salida?: number;
}> = ({ children, delay = 0, salida }) => {
  const { v } = useFormato();
  return (
    <div
      style={{
        fontSize: v(30, 27),
        fontWeight: 500,
        color: "rgba(255,255,255,0.6)",
        marginTop: 18,
        lineHeight: 1.5,
      }}
    >
      <Aparece delay={delay} salida={salida} distancia={14}>
        {children}
      </Aparece>
    </div>
  );
};

const Rotulo: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const { v } = useFormato();
  return (
    <div
      style={{
        fontSize: v(26, 24),
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.72)",
      }}
    >
      <Aparece delay={delay} distancia={12}>
        {children}
      </Aparece>
    </div>
  );
};

/** Termómetro del equipo. Coral cuando está caliente, menta cuando se enfría. */
const Medidor: React.FC<{ valor: number; caliente: boolean }> = ({
  valor,
  caliente,
}) => {
  const { v } = useFormato();
  const color = caliente ? C.coral : C.mint;
  const lleno = interpolate(valor, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        padding: v("64px 0 0", "250px 0 0"),
      }}
    >
      <div style={{ width: v(420, 460) }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: v(22, 21),
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Temperatura
          </span>
          <span style={{ fontSize: v(46, 44), fontWeight: 800, color }}>
            {Math.round(valor)}°
          </span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "rgba(255,255,255,0.12)",
            marginTop: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${lleno * 100}%`,
              borderRadius: 4,
              background: color,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Barra de avance de la limpieza, con el remate en 100 %. */
const Progreso: React.FC<{ avance: number }> = ({ avance }) => {
  const { v } = useFormato();
  const listo = avance >= 1;

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: v(30, 28),
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.coral,
          }}
        >
          Limpieza
        </span>
        <span style={{ fontSize: v(44, 42), fontWeight: 800, color: C.white }}>
          {Math.round(avance * 100)}%
        </span>
      </div>

      <div
        style={{
          height: 12,
          borderRadius: 6,
          background: "rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${avance * 100}%`,
            borderRadius: 6,
            background: C.coral,
          }}
        />
      </div>

      <div style={{ marginTop: 20, height: v(44, 40) }}>
        {listo ? (
          <Aparece distancia={10}>
            <span
              style={{
                fontSize: v(34, 32),
                fontWeight: 700,
                color: C.mint,
              }}
            >
              Disipador libre · ventilador andando
            </span>
          </Aparece>
        ) : null}
      </div>
    </div>
  );
};
