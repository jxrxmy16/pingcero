import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { LogoLockup, Radar } from "../PingCero/Logo";
import { C } from "../PingCero/theme";
import { useFormato } from "./formato";
import { Toma } from "./tomas";

/**
 * Una toma en pantalla: imagen a sangre con un zoom lento (Ken Burns) para que
 * una foto fija se sienta filmada, más un degradado inferior que garantiza que
 * el texto se lea sin importar qué tan clara sea la imagen.
 */
export const Placa: React.FC<{
  toma: Toma;
  /** Largo de la toma, en frames. Define el recorrido del zoom. */
  duracion: number;
  /** Zoom inicial y final. >1 acerca, <1 aleja. */
  zoom?: [number, number];
  /** Desplazamiento horizontal en píxeles, para dar sensación de travelling. */
  paneo?: [number, number];
  oscurecer?: number;
  children?: React.ReactNode;
}> = ({
  toma,
  duracion,
  zoom = [1, 1.08],
  paneo = [0, 0],
  oscurecer = 0.35,
  children,
}) => {
  const frame = useCurrentFrame();
  const { vertical } = useFormato();

  const escala = interpolate(frame, [0, duracion], zoom, {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const x = interpolate(frame, [0, duracion], paneo, {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ background: "#07080D", overflow: "hidden" }}>
      {toma.disponible ? (
        <>
          <Img
            src={staticFile(toma.archivo)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: vertical ? (toma.foco ?? "50% 50%") : "50% 50%",
              transform: `scale(${escala}) translateX(${x}px)`,
              // Las tomas frías se desaturan primero: el tinte coral de abajo
              // necesita poco color propio con el que pelear.
              filter: toma.templar
                ? "saturate(0.3) contrast(1.2) brightness(0.84)"
                : "contrast(1.04) saturate(1.02)",
            }}
          />
          {toma.templar ? (
            <>
              {/* `color` toma el tono del coral y conserva la luminancia de la
                  foto: templa la imagen sin aplanar los detalles. */}
              <AbsoluteFill
                style={{
                  background: C.coral,
                  mixBlendMode: "color",
                  opacity: 0.42,
                }}
              />
              {/* Y las sombras se van al indigo de la marca. */}
              <AbsoluteFill
                style={{
                  background: C.indigo,
                  mixBlendMode: "multiply",
                  opacity: 0.34,
                }}
              />
            </>
          ) : null}
        </>
      ) : (
        <Pendiente toma={toma} />
      )}

      {/* Viñeta + piso oscuro: el texto siempre cae sobre algo legible. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(7,8,13,${oscurecer * 0.8}) 0%, rgba(7,8,13,0) 34%, rgba(7,8,13,${oscurecer * 0.55}) 62%, rgba(7,8,13,0.9) 100%)`,
        }}
      />

      {children}
    </AbsoluteFill>
  );
};

/** Placa que ocupa el lugar de una toma que todavía no existe. */
const Pendiente: React.FC<{ toma: Toma }> = ({ toma }) => {
  const frame = useCurrentFrame();
  const pulse = (frame % 60) / 60;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.indigo} 0%, #101430 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: `2px dashed rgba(224,123,60,0.45)`,
          borderRadius: 24,
          padding: "54px 78px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Radar size={68} pulse={pulse} />
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.coral,
            marginTop: 26,
          }}
        >
          Toma {String(toma.n).padStart(2, "0")} · pendiente
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: C.white,
            marginTop: 12,
            letterSpacing: "-0.02em",
          }}
        >
          {toma.titulo}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            marginTop: 14,
            fontFamily: "monospace",
          }}
        >
          public/{toma.archivo}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Titular sobre la imagen. Entra desde abajo con una barra coral que se abre;
 * es el mismo gesto del kicker del catálogo, en versión grande.
 */
export const Titular: React.FC<{
  kicker?: string;
  children: React.ReactNode;
  delay?: number;
  posicion?: "abajo" | "centro";
  /** Frame en el que el titular empieza a irse. Sirve cuando la toma sigue
   *  corriendo pero el texto ya cumplió su función. */
  salida?: number;
}> = ({ kicker, children, delay = 0, posicion = "abajo", salida }) => {
  const frame = useCurrentFrame();
  const { v } = useFormato();

  const entrada = interpolate(frame - delay, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const irse =
    salida === undefined
      ? 1
      : interpolate(frame, [salida, salida + 14], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const p = entrada * irse;
  const barra = interpolate(frame - delay, [0, 22], [0, 56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        // En vertical el texto sube: abajo se le deja aire a la interfaz de
        // Instagram y TikTok, que tapa los últimos ~150 px.
        padding: v("0 110px 96px", "0 70px 210px"),
        justifyContent: posicion === "abajo" ? "flex-end" : "center",
        alignItems: posicion === "centro" ? "center" : "flex-start",
        textAlign: posicion === "centro" ? "center" : "left",
      }}
    >
      <div
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 26}px)`,
        }}
      >
        {kicker ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 16,
              justifyContent: posicion === "centro" ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                width: barra,
                height: 3,
                background: C.coral,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.coral,
              }}
            >
              {kicker}
            </span>
          </div>
        ) : null}

        <div
          style={{
            fontSize: v(72, 62),
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: C.white,
            textShadow: "0 4px 40px rgba(0,0,0,0.55)",
            maxWidth: v(1300, 940),
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Etiqueta chica tipo "Antes / Después" en la esquina superior izquierda. */
export const Etiqueta: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { v } = useFormato();
  return (
  <AbsoluteFill style={{ padding: v("84px 110px", "190px 70px") }}>
    <div
      style={{
        alignSelf: "flex-start",
        background: "rgba(7,8,13,0.72)",
        border: "1px solid rgba(224,123,60,0.5)",
        borderRadius: 999,
        padding: "12px 28px",
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: C.coral,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
  );
};

/** Marca de agua discreta, abajo a la derecha, durante todo el video. */
export const Firma: React.FC = () => {
  const { v } = useFormato();
  return (
    <AbsoluteFill
      style={{
        padding: v("0 96px 56px", "0 70px 150px"),
        justifyContent: "flex-end",
        alignItems: "flex-end",
        opacity: 0.62,
      }}
    >
      <LogoLockup size={v(26, 24)} />
    </AbsoluteFill>
  );
};
