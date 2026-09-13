import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { useFormato } from "../Historia/formato";
import { LogoLockup } from "./Logo";
import { C } from "./theme";

/**
 * Posición de la pantalla del notebook, medida sobre el clip y expresada en
 * fracciones del encuadre 16:9. Al ser fracciones, sirve igual cuando el clip
 * se muestra a pantalla completa (horizontal) que cuando va en una banda
 * centrada (vertical).
 *
 * Centro de la pantalla ≈ (0.669, 0.306) del encuadre.
 */
const PANTALLA = {
  left: 0.4573,
  top: 0.0796,
  width: 0.4219,
  height: 0.45,
};

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, ancho, alto } = useFormato();

  // En vertical el clip no se recorta a 9:16 —perdería la pantalla del
  // notebook— sino que se agranda 1,9× y se corre hasta dejar la pantalla
  // justo en el centro del cuadro. Los bordes de la caja se difuminan, así
  // que no se lee como un video "con franjas negras".
  const ESCALA_V = 1.9;
  const CENTRO = {
    x: PANTALLA.left + PANTALLA.width / 2,
    y: PANTALLA.top + PANTALLA.height / 2,
  };

  const cajaAncho = vertical ? Math.round(ancho * ESCALA_V) : ancho;
  const cajaAlto = vertical ? Math.round((cajaAncho * 9) / 16) : alto;
  const cajaLeft = vertical ? Math.round(ancho / 2 - cajaAncho * CENTRO.x) : 0;
  const cajaTop = vertical ? Math.round(alto * 0.42 - cajaAlto * CENTRO.y) : 0;

  // El notebook termina de abrirse cerca del segundo 5: recién ahí entra el logo.
  const entrada = interpolate(frame, [140, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulso del radar, en bucle de 2 s.
  const pulse = ((frame - 140) % 60) / 60;

  // Destello final: la pantalla "prende" y entrega el corte a lo que sigue.
  const flash = interpolate(frame, [222, 236], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#07080D" }}>
      <div
        style={{
          position: "absolute",
          left: cajaLeft,
          top: cajaTop,
          width: cajaAncho,
          height: cajaAlto,
          overflow: "hidden",
          maskImage: vertical
            ? "linear-gradient(180deg, transparent 0, #000 13%, #000 87%, transparent 100%)"
            : undefined,
          WebkitMaskImage: vertical
            ? "linear-gradient(180deg, transparent 0, #000 13%, #000 87%, transparent 100%)"
            : undefined,
        }}
      >
        <OffthreadVideo
          src={staticFile("hero-laptop-30fps.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Viñeta: oscurece bordes y deja el foco en la pantalla. */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 62% 34%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Logo sobre la pantalla del notebook. */}
        <div
          style={{
            position: "absolute",
            left: cajaAncho * PANTALLA.left,
            top: cajaAlto * PANTALLA.top,
            width: cajaAncho * PANTALLA.width,
            height: cajaAlto * PANTALLA.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "perspective(1000px) rotateY(-15deg) rotate(-1.2deg)",
            opacity: entrada * 0.96,
          }}
        >
          <div
            style={{
              transform: `scale(${0.86 + entrada * 0.14})`,
              filter: "drop-shadow(0 0 26px rgba(26,30,66,0.35))",
            }}
          >
            <LogoLockup
              size={Math.round(58 * (cajaAncho / 1920))}
              dark={false}
              pulse={frame > 140 ? pulse : 0}
            />
          </div>
        </div>
      </div>

      <AbsoluteFill style={{ background: C.coralSoft, opacity: flash * 0.92 }} />
    </AbsoluteFill>
  );
};
