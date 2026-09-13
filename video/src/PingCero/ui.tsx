import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, OVERLAP } from "./theme";

/**
 * Envoltorio de escena: entra con fundido sobre la escena anterior
 * (por eso las escenas se solapan OVERLAP frames en el timeline).
 */
export const Scene: React.FC<{
  from: number;
  durationInFrames: number;
  background: string;
  children: React.ReactNode;
}> = ({ from, durationInFrames, background, children }) => (
  <Sequence from={from} durationInFrames={durationInFrames} layout="none">
    <SceneFade background={background}>{children}</SceneFade>
  </Sequence>
);

const SceneFade: React.FC<{ background: string; children: React.ReactNode }> = ({
  background,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, OVERLAP], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background, opacity, fontFamily: FONT }}>
      {children}
    </AbsoluteFill>
  );
};

/** Entrada estándar: sube unos píxeles y aparece. `delay` en frames. */
export const FadeUp: React.FC<{
  delay?: number;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, distance = 28, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6 },
    durationInFrames: 22,
  });
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `translateY(${(1 - p) * distance}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Barrita coral + texto en versalitas, el "kicker" del catálogo. */
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame - delay, [0, 18], [0, 44], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width, height: 3, background: C.coral, borderRadius: 2 }} />
      <FadeUp delay={delay + 4} distance={10}>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: C.coral,
          }}
        >
          {children}
        </span>
      </FadeUp>
    </div>
  );
};

export const SectionTitle: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  delay?: number;
}> = ({ children, dark = false, delay = 0 }) => (
  <FadeUp delay={delay}>
    <h1
      style={{
        fontSize: 62,
        fontWeight: 800,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
        color: dark ? C.white : C.indigo,
        margin: 0,
      }}
    >
      {children}
    </h1>
  </FadeUp>
);

/** Contenedor con los márgenes del catálogo (14mm ≈ 96px a esta escala). */
export const Pad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ padding: "84px 110px", justifyContent: "center" }}>
    {children}
  </AbsoluteFill>
);
