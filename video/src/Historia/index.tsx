import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { Hero } from "../PingCero/Hero";
import { LogoLockup } from "../PingCero/Logo";
import { C } from "../PingCero/theme";
import { FadeUp } from "../PingCero/ui";
import { Corte, s } from "./Corte";
import { useFormato } from "./formato";
import { Etiqueta, Firma, Placa, Titular } from "./Toma";
import { Toma as TomaTipo, TOMAS } from "./tomas";

export const DURACION_HISTORIA = s(90);

export const Historia: React.FC = () => (
  <AbsoluteFill style={{ background: "#07080D" }}>
    {/* ══════════ ACTO 1 · PROBLEMA (0–20 s) ══════════ */}

    <Corte desde={0} hasta={6.5}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorSucio} duracion={d} zoom={[1, 1.13]}>
          <Titular delay={18}>
            ¿Tu notebook <span style={{ color: C.coral }}>anda lenta</span>?
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={6.5} hasta={13}>
      {(d) => (
        <Placa toma={TOMAS.glitch} duracion={d} zoom={[1.06, 1]}>
          <Titular delay={14}>
            ¿Se calienta, se cuelga,
            <br />
            <span style={{ color: C.coral }}>se apaga sola</span>?
          </Titular>
        </Placa>
      )}
    </Corte>

    {/* El clip del notebook cierra el acto: la pantalla se enciende con el
        logo y ese encendido es el paso del problema a la solución. */}
    <Corte desde={13} hasta={20}>
      {() => (
        <AbsoluteFill>
          <Hero />
          <Titular posicion="centro" delay={10} salida={s(3.6)}>
            No siempre hay que <span style={{ color: C.coral }}>comprar otro</span>.
          </Titular>
        </AbsoluteFill>
      )}
    </Corte>

    {/* ══════════ ACTO 2 · SOLUCIÓN (20–50 s) ══════════ */}

    <Corte desde={20} hasta={25} entrada={28}>
      {(d) => (
        <Placa toma={TOMAS.taller} duracion={d} zoom={[1.08, 1]} oscurecer={0.45}>
          <Titular kicker="Ping Cero" delay={20}>
            Servicio técnico
            <br />
            de computación
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={25} hasta={31}>
      {(d) => (
        <Placa
          toma={TOMAS.manosReparando}
          duracion={d}
          zoom={[1.02, 1.1]}
          paneo={[30, -30]}
        >
          <Titular kicker="Lo que hacemos" delay={16}>
            Reparación
          </Titular>
        </Placa>
      )}
    </Corte>

    {/* Antes → después, corte seco: es el par que más vende. */}
    <Corte desde={31} hasta={32.4}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorSucio} duracion={d} zoom={[1.13, 1.16]}>
          <Etiqueta>Antes</Etiqueta>
        </Placa>
      )}
    </Corte>

    <Corte desde={32.4} hasta={35.6}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorLimpio} duracion={d} zoom={[1.16, 1.04]}>
          <Etiqueta>Después</Etiqueta>
          <Titular delay={12}>Limpieza</Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={35.6} hasta={39.6}>
      {(d) => (
        <Placa toma={TOMAS.pastaTermica} duracion={d} zoom={[1.04, 1.12]}>
          <Titular delay={12}>Mantención</Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={39.6} hasta={43.6}>
      {(d) => (
        <Placa toma={TOMAS.router} duracion={d} zoom={[1.1, 1.01]}>
          <Titular delay={12}>Redes y WiFi</Titular>
        </Placa>
      )}
    </Corte>

    {/* Los sellos van sobre fondo de marca, sin foto: después de seis tomas
        seguidas, un respiro plano hace que el mensaje pese más. */}
    <Corte desde={43.6} hasta={50} entrada={16}>
      {() => (
        <AbsoluteFill
          style={{
            background: `linear-gradient(150deg, ${C.indigo} 0%, #0E1128 100%)`,
          }}
        >
          <AbsoluteFill
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(224,123,60,0.16) 0%, rgba(224,123,60,0) 62%)",
            }}
          />
          <Sellos />
        </AbsoluteFill>
      )}
    </Corte>

    {/* ══════════ ACTO 3 · SERVICIOS (50–75 s) ══════════ */}

    <Corte desde={50} hasta={63.5}>
      {(d) => (
        <>
          <FondoServicios toma={TOMAS.taller} duracion={d} />
          <Precios />
        </>
      )}
    </Corte>

    <Corte desde={63.5} hasta={75} entrada={14}>
      {(d) => (
        <>
          <FondoServicios toma={TOMAS.oficina} duracion={d} />
          <YTambien />
        </>
      )}
    </Corte>

    {/* ══════════ ACTO 4 · CIERRE (75–90 s) ══════════ */}

    <Corte desde={75} hasta={78.5}>
      {(d) => (
        <Placa toma={TOMAS.entrega} duracion={d} zoom={[1.06, 1]}>
          <Titular delay={10}>
            Te lo devolvemos <span style={{ color: C.coral }}>andando</span>
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={78.5} hasta={81.5}>
      {(d) => (
        <Placa toma={TOMAS.celular} duracion={d} zoom={[1, 1.08]}>
          <Titular delay={8}>Escríbenos por WhatsApp</Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={81.5} hasta={90} entrada={18}>
      {() => <CierreFinal />}
    </Corte>

    {/* Firma discreta durante los actos 2 y 3. */}
    <Sequence from={s(20)} durationInFrames={s(55)} layout="none">
      <Firma />
    </Sequence>
  </AbsoluteFill>
);

/* ───────────────────────── Bloques de texto ───────────────────────── */

const Sellos: React.FC = () => {
  const { v } = useFormato();
  return (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      padding: v("0 110px", "0 70px"),
    }}
  >
    <FadeUp delay={6}>
      <div
        style={{
          fontSize: v(82, 66),
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Diagnóstico <span style={{ color: C.coral }}>gratis</span>
      </div>
    </FadeUp>
    <FadeUp delay={20}>
      <div
        style={{
          fontSize: v(34, 26),
          fontWeight: 500,
          color: "rgba(255,255,255,0.72)",
          textAlign: "center",
        }}
      >
        Garantía de 30 días · Respuesta inmediata · Ingenieros del rubro
      </div>
    </FadeUp>
  </AbsoluteFill>
  );
};

/**
 * Fondo del acto 3: la foto queda bien atrás —oscurecida y con un velo indigo—
 * para que los precios se lean sin pelear con la imagen.
 */
const FondoServicios: React.FC<{ toma: TomaTipo; duracion: number }> = ({
  toma,
  duracion,
}) => (
  <AbsoluteFill style={{ background: C.indigo }}>
    <AbsoluteFill style={{ opacity: 0.4 }}>
      <Placa toma={toma} duracion={duracion} zoom={[1.04, 1.14]} oscurecer={0} />
    </AbsoluteFill>
    <AbsoluteFill style={{ background: "rgba(26,30,66,0.78)" }} />
  </AbsoluteFill>
);

const FILAS = [
  { nombre: "Limpieza física + pasta térmica", precio: "$20.000 – $35.000" },
  { nombre: "Instalación de SSD / ampliación de RAM", precio: "$15.000 – $25.000" },
  { nombre: "Configuración de redes y WiFi", precio: "$30.000 – $60.000" },
];

const Precios: React.FC = () => {
  const { v } = useFormato();
  return (
  <AbsoluteFill
    style={{ padding: v("0 130px", "0 70px"), justifyContent: "center" }}
  >
    <FadeUp delay={6}>
      <div
        style={{
          fontSize: v(26, 22),
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.coral,
          marginBottom: 18,
        }}
      >
        Servicios y precios
      </div>
    </FadeUp>

    <FadeUp delay={14}>
      <div
        style={{
          fontSize: v(68, 52),
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.03em",
          marginBottom: v(54, 40),
        }}
      >
        Tarifas claras, <span style={{ fontWeight: 300 }}>sin sorpresas</span>
      </div>
    </FadeUp>

    {FILAS.map((f, i) => (
      <FadeUp key={f.nombre} delay={30 + i * 22} distance={24}>
        {/* En vertical no cabe nombre y precio en la misma línea: el precio
            baja y queda debajo, que además le da más peso. */}
        <div
          style={{
            display: "flex",
            flexDirection: v("row", "column"),
            alignItems: v("center", "flex-start"),
            justifyContent: "space-between",
            gap: v(40, 6),
            borderTop: "1px solid rgba(255,255,255,0.16)",
            padding: v("26px 4px", "22px 4px"),
          }}
        >
          <span
            style={{ fontSize: v(40, 34), fontWeight: 600, color: C.white }}
          >
            {f.nombre}
          </span>
          <span
            style={{
              fontSize: v(42, 40),
              fontWeight: 800,
              color: C.coral,
              whiteSpace: "nowrap",
            }}
          >
            {f.precio}
          </span>
        </div>
      </FadeUp>
    ))}
  </AbsoluteFill>
  );
};

const OTROS = [
  "Formateo + respaldo",
  "Virus y malware",
  "Armado de PC",
  "Redes de oficina",
  "Empresas y servidores",
];

const YTambien: React.FC = () => {
  const { v } = useFormato();
  return (
  <AbsoluteFill
    style={{
      padding: v("0 130px", "0 70px"),
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <FadeUp delay={4}>
      <div
        style={{
          fontSize: v(60, 46),
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Y también <span style={{ fontWeight: 300 }}>hacemos</span>
      </div>
    </FadeUp>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        justifyContent: "center",
        marginTop: v(48, 38),
        maxWidth: v(1400, 900),
      }}
    >
      {OTROS.map((o, i) => (
        <FadeUp key={o} delay={16 + i * 7} distance={18}>
          <div
            style={{
              border: "1px solid rgba(224,123,60,0.45)",
              background: "rgba(224,123,60,0.1)",
              borderRadius: 999,
              padding: v("18px 34px", "14px 24px"),
              fontSize: v(30, 25),
              fontWeight: 600,
              color: C.white,
            }}
          >
            {o}
          </div>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={62}>
      <div
        style={{
          fontSize: v(22, 19),
          color: "rgba(255,255,255,0.5)",
          marginTop: v(52, 40),
          textAlign: "center",
          maxWidth: v(1100, 880),
          lineHeight: 1.6,
        }}
      >
        Valores referenciales: se confirman tras el diagnóstico, según el estado
        real del equipo. No incluyen repuestos.
      </div>
    </FadeUp>
  </AbsoluteFill>
  );
};

const CierreFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { v } = useFormato();
  const pulse = (frame % 60) / 60;
  const negro = interpolate(frame, [s(7), s(8.5)], [0, 1], {
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
            "radial-gradient(ellipse at 50% 52%, rgba(224,123,60,0.18) 0%, rgba(224,123,60,0) 60%)",
        }}
      />

      <FadeUp delay={2} distance={16}>
        <LogoLockup size={v(82, 62)} pulse={pulse} />
      </FadeUp>

      <FadeUp delay={16}>
        <div
          style={{
            fontSize: v(58, 46),
            fontWeight: 300,
            color: C.white,
            marginTop: 40,
            letterSpacing: "-0.02em",
          }}
        >
          Soporte <span style={{ fontWeight: 800 }}>sin demora</span>
        </div>
      </FadeUp>

      <div
        style={{
          display: "flex",
          flexDirection: v("row", "column"),
          gap: v(26, 18),
          marginTop: v(52, 44),
        }}
      >
        {["+56 9 2827 4749", "+56 9 5369 9695"].map((f, i) => (
          <FadeUp key={f} delay={30 + i * 7} distance={16}>
            <div
              style={{
                background: C.coral,
                color: C.white,
                fontSize: v(34, 32),
                fontWeight: 700,
                borderRadius: 14,
                padding: v("22px 40px", "20px 44px"),
                textAlign: "center",
              }}
            >
              {f}
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={46}>
        <div
          style={{
            fontSize: v(34, 30),
            fontWeight: 600,
            color: C.white,
            marginTop: v(44, 38),
            letterSpacing: "0.02em",
          }}
        >
          pingcero.cl
        </div>
      </FadeUp>

      <AbsoluteFill style={{ background: "#000", opacity: negro }} />
    </AbsoluteFill>
  );
};
