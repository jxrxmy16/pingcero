import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTACTO, MARCAS, PASOS, SELLOS, Servicio } from "./data";
import { LogoLockup, Radar } from "./Logo";
import { C } from "./theme";
import { FadeUp, Kicker, Pad, SectionTitle } from "./ui";

/* ───────────────────────── Escena 2 · Marca ───────────────────────── */

export const Marca: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = (frame % 60) / 60;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: C.indigo,
      }}
    >
      {/* Halo coral: continúa el brillo que dejó la pantalla del notebook. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(224,123,60,0.18) 0%, rgba(224,123,60,0) 62%)",
        }}
      />

      <FadeUp delay={4} distance={18}>
        <LogoLockup size={96} pulse={pulse} />
      </FadeUp>

      <FadeUp delay={16}>
        <p
          style={{
            fontSize: 40,
            fontWeight: 300,
            color: "rgba(255,255,255,0.86)",
            marginTop: 44,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Reparación y mantención de computadores
        </p>
      </FadeUp>

      <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
        {SELLOS.map((s, i) => (
          <FadeUp key={s} delay={26 + i * 5} distance={16}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "1px solid rgba(224,123,60,0.38)",
                background: "rgba(224,123,60,0.08)",
                borderRadius: 999,
                padding: "14px 26px",
                fontSize: 22,
                fontWeight: 600,
                color: C.white,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.coral,
                }}
              />
              {s}
            </div>
          </FadeUp>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────── Escenas 3 y 4 · Servicios y precios ─────────────────── */

const Fila: React.FC<{ item: Servicio; delay: number }> = ({ item, delay }) => (
  <FadeUp delay={delay} distance={20}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 26,
        border: `1px solid ${item.empresa ? C.indigo : C.border}`,
        background: item.empresa ? C.indigo : C.white,
        borderRadius: 16,
        padding: "22px 30px",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          flexShrink: 0,
          background: item.empresa ? "rgba(255,255,255,0.12)" : C.coralSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Radar size={30} dim />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 27,
            fontWeight: 700,
            lineHeight: 1.2,
            color: item.empresa ? C.white : C.indigo,
          }}
        >
          {item.nombre}
        </div>
        <div
          style={{
            fontSize: 19,
            marginTop: 5,
            color: item.empresa ? "rgba(255,255,255,0.62)" : C.muted,
          }}
        >
          {item.desc}
        </div>
      </div>

      <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
        <div
          style={{
            fontSize: 29,
            fontWeight: 800,
            color: item.gratis ? C.mint : item.empresa ? "#F5905A" : C.coralDark,
          }}
        >
          {item.precio}
        </div>
        {item.nota ? (
          <div style={{ fontSize: 17, fontWeight: 600, color: C.muted }}>
            {item.nota}
          </div>
        ) : null}
      </div>
    </div>
  </FadeUp>
);

export const Servicios: React.FC<{
  items: Servicio[];
  encabezado?: boolean;
  nota?: string;
}> = ({ items, encabezado = false, nota }) => (
  <AbsoluteFill style={{ background: C.cream }}>
    <Pad>
      {encabezado ? (
        <div style={{ marginBottom: 40 }}>
          <Kicker>Servicios y precios</Kicker>
          <div style={{ marginTop: 16 }}>
            <SectionTitle delay={8}>
              Tarifas claras,{" "}
              <span style={{ fontWeight: 300 }}>sin sorpresas</span>
            </SectionTitle>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 34 }}>
          <Kicker>Servicios y precios</Kicker>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item, i) => (
          <Fila
            key={item.nombre}
            item={item}
            delay={(encabezado ? 20 : 12) + i * 7}
          />
        ))}
      </div>

      {nota ? (
        <FadeUp delay={20 + items.length * 7} distance={12}>
          <p
            style={{
              fontSize: 19,
              color: C.muted,
              marginTop: 30,
              paddingTop: 20,
              borderTop: `1px solid ${C.border}`,
              lineHeight: 1.6,
            }}
          >
            {nota}
          </p>
        </FadeUp>
      ) : null}
    </Pad>
  </AbsoluteFill>
);

/* ───────────────────────── Escena 5 · Marcas ───────────────────────── */

export const Marcas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Las tarjetas tienen ancho fijo, así el ancho de una copia del set es un
  // número exacto: 16 × (ancho + separación). El set va duplicado y el
  // desplazamiento se toma en módulo de ese ancho, por lo que al terminar la
  // primera copia la segunda cae en la misma posición y el bucle no salta.
  const ANCHO_TARJETA = 210;
  const SEPARACION = 22;
  const ANCHO_COPIA = MARCAS.length * (ANCHO_TARJETA + SEPARACION);
  const x = -(((frame / fps) * 130) % ANCHO_COPIA);

  return (
    <AbsoluteFill style={{ background: C.indigo, justifyContent: "center" }}>
      <div style={{ padding: "0 110px" }}>
        <Kicker>Todas las marcas</Kicker>
        <div style={{ marginTop: 18, marginBottom: 62 }}>
          <SectionTitle dark delay={8}>
            Reparamos equipos de{" "}
            <span style={{ fontWeight: 300 }}>todas las marcas</span>
          </SectionTitle>
        </div>
      </div>

      {/* El difuminado va en el contenedor fijo, no en la fila que se mueve:
          si se aplica a la fila, la máscara viaja con ella y no se ve. */}
      <div
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: SEPARACION,
            transform: `translateX(${x}px)`,
            width: "max-content",
          }}
        >
          {[...MARCAS, ...MARCAS].map((m, i) => (
            <div
              key={`${m}-${i}`}
              style={{
                width: ANCHO_TARJETA,
                flexShrink: 0,
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 14,
                padding: "20px 0",
                fontSize: 30,
                fontWeight: 600,
                color: "rgba(255,255,255,0.78)",
                whiteSpace: "nowrap",
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      <FadeUp delay={30}>
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            padding: "0 110px",
            marginTop: 54,
          }}
        >
          Notebooks, PC de escritorio y equipos de oficina.
        </p>
      </FadeUp>
    </AbsoluteFill>
  );
};

/* ──────────────────────── Escena 6 · Cómo funciona ──────────────────────── */

export const Pasos: React.FC = () => (
  <AbsoluteFill style={{ background: C.sand }}>
    <Pad>
      <Kicker>Cómo funciona</Kicker>
      <div style={{ marginTop: 18, marginBottom: 56 }}>
        <SectionTitle delay={8}>
          Tres pasos, <span style={{ fontWeight: 300 }}>sin vueltas</span>
        </SectionTitle>
      </div>

      <div style={{ display: "flex", gap: 26, alignItems: "stretch" }}>
        {PASOS.map((p, i) => (
          <FadeUp key={p.n} delay={20 + i * 10} style={{ flex: 1 }}>
            <div
              style={{
                background: C.white,
                borderRadius: 20,
                padding: "38px 34px",
                height: "100%",
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: C.coralSoft,
                  border: "1px solid rgba(224,123,60,0.35)",
                  color: C.coralDark,
                  fontSize: 22,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  marginTop: 24,
                  color: C.indigo,
                  lineHeight: 1.2,
                }}
              >
                {p.titulo}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "#7a6f66",
                  marginTop: 12,
                  lineHeight: 1.55,
                }}
              >
                {p.desc}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Pad>
  </AbsoluteFill>
);

/* ───────────────────────── Escena 7 · Cierre ───────────────────────── */

/** Globo de mensaje genérico para los botones de contacto. */
const IconoChat: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.3-.6L3 21l1.8-5a8.2 8.2 0 0 1-.8-3.5 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 7.4z"
      stroke={C.white}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = (frame % 60) / 60;

  // Fundido a negro al final, para que el video no corte de golpe.
  const salida = interpolate(frame, [175, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.indigo,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(224,123,60,0.16) 0%, rgba(224,123,60,0) 60%)",
        }}
      />

      <FadeUp delay={2} distance={16}>
        <LogoLockup size={70} pulse={pulse} />
      </FadeUp>

      <FadeUp delay={14}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            color: C.white,
            marginTop: 46,
            letterSpacing: "-0.025em",
            textAlign: "center",
          }}
        >
          El diagnóstico es <span style={{ color: C.coral }}>gratis</span>
        </div>
      </FadeUp>

      <FadeUp delay={26}>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.62)",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Escríbenos por WhatsApp y te respondemos de inmediato
        </div>
      </FadeUp>

      <div style={{ display: "flex", gap: 30, marginTop: 52 }}>
        {CONTACTO.fonos.map((f, i) => (
          <FadeUp key={f} delay={36 + i * 6} distance={16}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: C.coral,
                color: C.white,
                fontSize: 32,
                fontWeight: 700,
                borderRadius: 14,
                padding: "20px 36px",
              }}
            >
              <IconoChat />
              {f}
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={50}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: C.white,
            marginTop: 46,
            letterSpacing: "0.02em",
          }}
        >
          {CONTACTO.web}
        </div>
      </FadeUp>

      <FadeUp delay={58}>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            marginTop: 18,
          }}
        >
          Garantía de 30 días en todos los trabajos · Chile
        </div>
      </FadeUp>

      <AbsoluteFill style={{ background: "#000", opacity: salida }} />
    </AbsoluteFill>
  );
};
