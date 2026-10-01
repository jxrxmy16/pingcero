import React from "react";
import { C } from "../PingCero/theme";

/**
 * Las dos ilustraciones del video, en vector plano y con la paleta de la marca.
 *
 * Las dos funcionan igual: una sola geometría que se dibuja **siempre limpia**,
 * y un `sucio` de 0 a 1 que le baja el color y le agrega la capa de polvo
 * encima. Así la escena de limpieza puede mostrar la versión sucia y la limpia
 * exactamente calzadas, y pasar de una a otra con un barrido, sin que se mueva
 * un solo píxel de la forma.
 */

const CUERPO = "#232A52";
const HUECO = "#141A3A";
const BORDE = "rgba(224,123,60,0.45)";

/** Filtro que envejece: le saca el color y lo apaga. */
const desgaste = (sucio: number) =>
  `saturate(${1 - sucio * 0.88}) brightness(${1 - sucio * 0.34})`;

/* ───────────────────────── El computador completo ───────────────────────── */

export const Computador: React.FC<{
  ancho: number;
  sucio?: number;
  /** Progreso de la barra de carga en pantalla, de 0 a 1. */
  barra?: number;
  /** Muestra el isotipo radar en vez de la barra. */
  radar?: boolean;
  /** 0 a 1: apertura del anillo del radar. */
  pulso?: number;
}> = ({ ancho, sucio = 0, barra = 0, radar = false, pulso = 0 }) => (
  <svg
    width={ancho}
    height={(ancho * 280) / 440}
    viewBox="0 0 440 280"
    fill="none"
    style={{ filter: desgaste(sucio), display: "block" }}
  >
    {/* Mesa */}
    <rect x="10" y="258" width="420" height="5" rx="2.5" fill={C.sand} opacity="0.22" />

    {/* Monitor */}
    <rect x="26" y="14" width="252" height="198" rx="16" fill={CUERPO} stroke={BORDE} strokeWidth="3" />
    <rect x="44" y="32" width="216" height="152" rx="8" fill={HUECO} />
    <circle cx="152" cy="198" r="4" fill={C.coral} opacity={radar ? 1 : 0.35} />

    {/* Contenido de la pantalla */}
    {radar ? (
      <g>
        {pulso > 0 ? (
          <circle
            cx="152"
            cy="108"
            r={19 + pulso * 16}
            stroke={C.coral}
            strokeWidth="2"
            opacity={(1 - pulso) * 0.55}
          />
        ) : null}
        <circle cx="152" cy="108" r="30" stroke={C.coral} strokeWidth="1.6" opacity="0.34" />
        <circle cx="152" cy="108" r="19" stroke={C.coral} strokeWidth="3" />
        <circle cx="152" cy="108" r="7.5" fill={C.coral} />
      </g>
    ) : (
      <g>
        <rect x="76" y="76" width="152" height="7" rx="3.5" fill="#FFFFFF" opacity="0.1" />
        <rect x="76" y="92" width="104" height="7" rx="3.5" fill="#FFFFFF" opacity="0.07" />
        <rect x="76" y="124" width="152" height="12" rx="6" fill="#FFFFFF" opacity="0.12" />
        <rect x="76" y="124" width={Math.max(6, 152 * barra)} height="12" rx="6" fill={C.coral} />
      </g>
    )}

    {/* Pie del monitor */}
    <path d="M164,212 L204,212 L212,244 L156,244 Z" fill={CUERPO} stroke={BORDE} strokeWidth="3" />
    <rect x="132" y="244" width="104" height="14" rx="7" fill={CUERPO} stroke={BORDE} strokeWidth="3" />

    {/* Torre */}
    <rect x="300" y="86" width="112" height="172" rx="14" fill={CUERPO} stroke={BORDE} strokeWidth="3" />
    <rect x="318" y="106" width="76" height="10" rx="5" fill={HUECO} />
    <circle cx="332" cy="138" r="8" fill={C.coral} opacity={radar ? 1 : 0.4} />
    {[168, 180, 192, 204].map((y) => (
      <rect key={y} x="318" y={y} width="76" height="5" rx="2.5" fill={HUECO} />
    ))}

    {/* Capa de polvo pegada al equipo: se posa en los bordes de arriba,
        que es exactamente donde se junta en un equipo real. */}
    <g opacity={sucio * 0.8} fill={C.muted}>
      <ellipse cx="80" cy="16" rx="42" ry="5" />
      <ellipse cx="160" cy="14" rx="30" ry="4" />
      <ellipse cx="232" cy="17" rx="26" ry="5" />
      <ellipse cx="330" cy="88" rx="24" ry="4.5" />
      <ellipse cx="382" cy="89" rx="20" ry="4" />
      <ellipse cx="176" cy="246" rx="34" ry="4" />
      <ellipse cx="356" cy="256" rx="40" ry="4" />
    </g>
  </svg>
);

/* ─────────────────── El interior: disipador y ventilador ─────────────────── */

const BLADE = "M 0,-10 C 36,-34 76,-24 86,-6 C 62,8 26,12 0,10 Z";

export const VentiladorMacro: React.FC<{
  ancho: number;
  sucio?: number;
  /** Ángulo del aspa, en grados. Lo calcula el montaje. */
  angulo?: number;
}> = ({ ancho, sucio = 0, angulo = 0 }) => (
  <svg
    width={ancho}
    height={(ancho * 300) / 440}
    viewBox="0 0 440 300"
    fill="none"
    style={{ filter: desgaste(sucio), display: "block" }}
  >
    <rect x="22" y="26" width="396" height="250" rx="22" fill="#1E2448" stroke={BORDE} strokeWidth="3" />

    {/* Caloducto y aletas del disipador */}
    <rect x="48" y="44" width="286" height="11" rx="5.5" fill={C.coral} opacity="0.55" />
    {new Array(9).fill(null).map((_, i) => (
      <rect
        key={i}
        x={48 + i * 15}
        y="58"
        width="7"
        height="188"
        rx="3.5"
        fill={C.coral}
        opacity="0.72"
      />
    ))}

    {/* Ventilador */}
    <circle cx="300" cy="160" r="104" fill="#161B3A" stroke={BORDE} strokeWidth="2.5" opacity="0.9" />
    <g transform={`rotate(${angulo} 300 160)`}>
      {new Array(7).fill(null).map((_, i) => (
        <path
          key={i}
          d={BLADE}
          transform={`rotate(${(i * 360) / 7} 300 160) translate(300 160)`}
          fill="#2E3560"
          stroke={C.coral}
          strokeWidth="2"
          strokeOpacity="0.4"
        />
      ))}
    </g>
    <circle cx="300" cy="160" r="26" fill={C.coral} />
    <circle cx="300" cy="160" r="10" fill="#161B3A" />

    {/* La mugre: tapa las aletas y se enreda entre las aspas. */}
    <g opacity={sucio} fill={C.muted}>
      {/* La capa que tapa las aletas: un bloque suave de base y encima manchones
          de distinto tamaño. Sin los manchones el borde queda recto y se lee
          como un rectángulo gris, no como mugre. */}
      <rect x="46" y="64" width="138" height="178" rx="20" opacity="0.4" />
      <ellipse cx="66" cy="70" rx="28" ry="15" opacity="0.6" />
      <ellipse cx="128" cy="62" rx="36" ry="13" opacity="0.5" />
      <ellipse cx="78" cy="104" rx="32" ry="20" opacity="0.7" />
      <ellipse cx="146" cy="178" rx="36" ry="23" opacity="0.65" />
      <ellipse cx="52" cy="186" rx="22" ry="28" opacity="0.5" />
      <ellipse cx="106" cy="240" rx="42" ry="15" opacity="0.55" />
      <ellipse cx="182" cy="116" rx="21" ry="30" opacity="0.5" />
      {/* Y la que se enreda entre las aspas. */}
      <ellipse cx="300" cy="74" rx="46" ry="17" opacity="0.55" />
      <ellipse cx="368" cy="140" rx="22" ry="30" opacity="0.5" />
      <ellipse cx="250" cy="236" rx="38" ry="19" opacity="0.55" />
      <ellipse cx="232" cy="120" rx="26" ry="22" opacity="0.5" />
      <ellipse cx="330" cy="206" rx="30" ry="18" opacity="0.45" />
    </g>
  </svg>
);

/**
 * Boquilla de aire comprimido. Va montada justo en el borde del barrido:
 * es lo que explica de dónde sale el aire que se lleva el polvo.
 */
export const Boquilla: React.FC<{ alto: number }> = ({ alto }) => (
  <svg
    width={(alto * 150) / 120}
    height={alto}
    viewBox="0 0 150 120"
    fill="none"
    style={{ display: "block" }}
  >
    {/* Chorro */}
    <g stroke={C.coral} strokeWidth="5" strokeLinecap="round" opacity="0.85">
      <path d="M8 60 H44" />
      <path d="M18 34 H50" opacity="0.6" />
      <path d="M18 86 H50" opacity="0.6" />
    </g>
    {/* Cuerpo */}
    <path d="M58 46 L108 36 L108 84 L58 74 Z" fill={C.coral} />
    <rect x="104" y="28" width="40" height="64" rx="14" fill={C.coral} />
    <rect x="114" y="44" width="18" height="32" rx="9" fill="#1A1E42" opacity="0.35" />
  </svg>
);
