import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../PingCero/theme";

/**
 * El polvo del video: motas que flotan y, cuando entra el aire, salen
 * volando hacia la derecha.
 */
export type Mota = {
  /** Posición dentro del contenedor, de 0 a 1. */
  x: number;
  y: number;
  /** Radio en píxeles. */
  r: number;
  /** Desfase propio: hace que ninguna mota se mueva igual que otra. */
  fase: number;
};

/**
 * Semilla fija a propósito: `random()` de Remotion devuelve siempre lo mismo
 * para la misma semilla, así que el polvo cae idéntico en cada render. Con
 * `Math.random()` el video cambiaría entre una pasada y otra.
 */
export const generarPolvo = (cantidad: number, semilla: string): Mota[] =>
  new Array(cantidad).fill(null).map((_, i) => ({
    x: random(`${semilla}x${i}`),
    y: random(`${semilla}y${i}`),
    r: 1.6 + random(`${semilla}r${i}`) * 5,
    fase: random(`${semilla}f${i}`),
  }));

export const Polvo: React.FC<{
  motas: Mota[];
  /** 0 = flotando quieto · 1 = ya salió todo del cuadro. */
  soplado?: number;
  opacidad?: number;
  color?: string;
}> = ({ motas, soplado = 0, opacidad = 0.5, color = C.muted }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {motas.map((m, i) => {
        // Cada mota arranca en un momento distinto. Si se fueran todas juntas
        // parecería un corte de edición y no un soplido.
        const salida = interpolate(
          soplado,
          [m.fase * 0.42, m.fase * 0.42 + 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const flote = Math.sin(frame / (34 + m.fase * 44) + m.fase * 9) * 9;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${m.x * 100}%`,
              top: `${m.y * 100}%`,
              width: m.r * 2,
              height: m.r * 2,
              borderRadius: "50%",
              background: color,
              opacity: (1 - salida) * opacidad,
              transform: `translate(${salida * (170 + m.fase * 540)}px, ${
                flote - salida * (80 + m.fase * 260)
              }px)`,
            }}
          />
        );
      })}
    </>
  );
};
