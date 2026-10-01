import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";

/** Segundos → frames. Todo el montaje se escribe en segundos, como el guion. */
export const s = (segundos: number) => Math.round(segundos * 30);

/**
 * Toma que ocupa desde `desde` hasta `hasta`, en segundos.
 *
 * El hijo recibe la duración en frames, porque el zoom de cada toma se calcula
 * sobre su propio largo: así una toma de 1,4 s y otra de 6 s recorren el mismo
 * camino de zoom a velocidades distintas, y ninguna se siente apurada.
 */
export const Corte: React.FC<{
  desde: number;
  hasta: number;
  entrada?: number;
  children: (duracion: number) => React.ReactNode;
}> = ({ desde, hasta, entrada = 0, children }) => {
  const duracion = s(hasta) - s(desde);
  return (
    <Sequence from={s(desde)} durationInFrames={duracion} layout="none">
      {entrada > 0 ? (
        <Aparecer frames={entrada}>{children(duracion)}</Aparecer>
      ) : (
        children(duracion)
      )}
    </Sequence>
  );
};

const Aparecer: React.FC<{ frames: number; children: React.ReactNode }> = ({
  frames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, frames], [0, 1], {
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
