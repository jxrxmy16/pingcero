import React from "react";
import { C, FONT } from "./theme";

/**
 * Isotipo radar. `pulse` (0–1) abre un anillo extra hacia afuera,
 * el mismo gesto que hace el radar animado del sitio.
 */
export const Radar: React.FC<{ size: number; pulse?: number; dim?: boolean }> = ({
  size,
  pulse = 0,
  dim = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {pulse > 0 ? (
      <circle
        cx="24"
        cy="24"
        r={13 + pulse * 10}
        stroke={C.coral}
        strokeWidth={2}
        opacity={(1 - pulse) * 0.5}
      />
    ) : null}
    <circle
      cx="24"
      cy="24"
      r="21"
      stroke={C.coral}
      strokeWidth="1.5"
      opacity={dim ? 0.25 : 0.32}
    />
    <circle cx="24" cy="24" r="13" stroke={C.coral} strokeWidth="2.5" />
    <circle cx="24" cy="24" r="5" fill={C.coral} />
  </svg>
);

/**
 * Logotipo "Ping●Cero". El punto coral usa un solo valor derivado del
 * tamaño de fuente, igual que la clase .pc-dot del sitio: no puede
 * desincronizarse entre usos.
 */
export const Wordmark: React.FC<{ size: number; dark?: boolean }> = ({
  size,
  dark = true,
}) => {
  const dot = Math.max(4, Math.round(size * 0.115));
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: size,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: dark ? C.white : C.indigo,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: 800 }}>Ping</span>
      <span
        style={{
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: C.coral,
          margin: `0 ${Math.round(size * 0.09)}px`,
        }}
      />
      <span style={{ fontWeight: 300 }}>Cero</span>
    </span>
  );
};

export const LogoLockup: React.FC<{
  size: number;
  dark?: boolean;
  pulse?: number;
}> = ({ size, dark = true, pulse = 0 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: Math.round(size * 0.42),
    }}
  >
    <Radar size={size * 1.55} pulse={pulse} dim={!dark} />
    <Wordmark size={size} dark={dark} />
  </div>
);
