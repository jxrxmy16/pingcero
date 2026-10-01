import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Corte, s } from "../Historia/Corte";
import { useFormato } from "../Historia/formato";
import { Etiqueta, Firma, Placa, Titular } from "../Historia/Toma";
import { TOMAS } from "../Historia/tomas";
import { LogoLockup } from "../PingCero/Logo";
import { CONTACTO, SERVICIOS_A, SERVICIOS_B } from "../PingCero/data";
import { C } from "../PingCero/theme";
import { FadeUp } from "../PingCero/ui";

/**
 * Clip de 30 s para redes sociales.
 *
 * Es la versión corta de la historia de 90 s, con tres diferencias que importan
 * en redes y que no son de estilo sino de funcionamiento:
 *
 * 1. **El gancho está en el segundo 1**, no en el 3. En Reels y TikTok el scroll
 *    se decide antes de que termine la primera frase.
 * 2. **Se entiende sin audio.** Todo el mensaje está en pantalla; la música, cuando
 *    exista, suma pero no sostiene.
 * 3. **No usa el clip del notebook** (`hero-laptop-30fps.mp4`), así que se renderiza
 *    con lo que está versionado en el repo. Solo fotos de `public/tomas/`.
 *
 * El final queda en la placa de contacto, sin fundido a negro: en redes el video
 * se repite en bucle y unos frames negros se leen como que algo falló.
 */
export const DURACION_CLIP = s(30);

/** Los precios salen de data.ts; acá no se escribe ninguna cifra a mano. */
const SERVICIOS = [...SERVICIOS_A, ...SERVICIOS_B];
const precio = (empiezaCon: string) =>
  SERVICIOS.find((x) => x.nombre.startsWith(empiezaCon))?.precio ?? "Consultar";

export const ClipRedes: React.FC = () => (
  <AbsoluteFill style={{ background: "#07080D" }}>
    {/* ───── Gancho (0–6,3 s) ───── */}

    {/* delay=4 son 0,13 s: el texto ya está cuando el pulgar decide. */}
    <Corte desde={0} hasta={3.3}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorSucio} duracion={d} zoom={[1, 1.1]}>
          <Titular delay={4}>
            ¿Tu notebook <span style={{ color: C.coral }}>anda lenta</span>?
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={3.3} hasta={6.3}>
      {(d) => (
        <Placa toma={TOMAS.glitch} duracion={d} zoom={[1.06, 1]}>
          <Titular delay={6}>
            ¿Se calienta, se cuelga,
            <br />
            <span style={{ color: C.coral }}>se apaga sola</span>?
          </Titular>
        </Placa>
      )}
    </Corte>

    {/* ───── Quiénes somos (6,3–12,3 s) ───── */}

    <Corte desde={6.3} hasta={9.3} entrada={14}>
      {(d) => (
        <Placa toma={TOMAS.taller} duracion={d} zoom={[1.08, 1]} oscurecer={0.45}>
          <Titular kicker="Ping Cero" delay={8}>
            No siempre hay que
            <br />
            <span style={{ color: C.coral }}>comprar otro</span>.
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={9.3} hasta={12.3}>
      {(d) => (
        <Placa
          toma={TOMAS.manosReparando}
          duracion={d}
          zoom={[1.02, 1.1]}
          paneo={[24, -24]}
        >
          <Titular kicker="Lo que hacemos" delay={8}>
            Reparación
            <br />
            y mantención
          </Titular>
        </Placa>
      )}
    </Corte>

    {/* ───── Antes / después: el par que más vende (12,3–16,7 s) ───── */}

    <Corte desde={12.3} hasta={13.7}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorSucio} duracion={d} zoom={[1.1, 1.14]}>
          <Etiqueta>Antes</Etiqueta>
        </Placa>
      )}
    </Corte>

    <Corte desde={13.7} hasta={16.7}>
      {(d) => (
        <Placa toma={TOMAS.ventiladorLimpio} duracion={d} zoom={[1.14, 1.02]}>
          <Etiqueta>Después</Etiqueta>
          <Titular delay={10}>Limpieza</Titular>
        </Placa>
      )}
    </Corte>

    {/* ───── Precios (16,7–22,4 s) ───── */}

    <Corte desde={16.7} hasta={19.7}>
      {(d) => (
        <Placa toma={TOMAS.pastaTermica} duracion={d} zoom={[1.04, 1.12]}>
          <Precio
            nombre="Limpieza física + pasta térmica"
            valor={precio("Limpieza física")}
          />
        </Placa>
      )}
    </Corte>

    <Corte desde={19.7} hasta={22.4}>
      {(d) => (
        <Placa toma={TOMAS.router} duracion={d} zoom={[1.1, 1.01]}>
          <Precio
            nombre="Configuración de redes y WiFi"
            valor={precio("Configuración de redes")}
          />
        </Placa>
      )}
    </Corte>

    {/* ───── La oferta, sobre fondo de marca (22,4–24,6 s) ─────
        Después de seis tomas seguidas, un plano sin foto hace que
        "gratis" pese más de lo que pesaría encima de una imagen. */}

    <Corte desde={22.4} hasta={24.6} entrada={10}>
      {() => <Gratis />}
    </Corte>

    {/* ───── Cierre (24,6–30 s) ───── */}

    <Corte desde={24.6} hasta={26.9}>
      {(d) => (
        <Placa toma={TOMAS.entrega} duracion={d} zoom={[1.06, 1]}>
          <Titular delay={6}>
            Te lo devolvemos <span style={{ color: C.coral }}>andando</span>
          </Titular>
        </Placa>
      )}
    </Corte>

    <Corte desde={26.9} hasta={30} entrada={12}>
      {() => <Cierre />}
    </Corte>

    {/* Marca de agua mientras hay fotos en pantalla. */}
    <Corte desde={6.3} hasta={24.6}>
      {() => <Firma />}
    </Corte>
  </AbsoluteFill>
);

/* ───────────────────────────── Bloques ───────────────────────────── */

/**
 * Precio sobre la toma. El nombre del servicio va chico arriba y la cifra
 * grande abajo: en un celular la cifra es lo único que se alcanza a leer
 * en tres segundos, así que es lo que tiene que resaltar.
 */
const Precio: React.FC<{ nombre: string; valor: string }> = ({
  nombre,
  valor,
}) => {
  const { v } = useFormato();
  return (
    <AbsoluteFill
      style={{
        padding: v("0 110px 96px", "0 70px 210px"),
        justifyContent: "flex-end",
      }}
    >
      <FadeUp delay={6} distance={22}>
        <div
          style={{
            fontSize: v(38, 32),
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            maxWidth: v(1100, 880),
            lineHeight: 1.25,
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          {nombre}
        </div>
      </FadeUp>

      <FadeUp delay={16} distance={26}>
        <div
          style={{
            fontSize: v(76, 60),
            fontWeight: 800,
            color: C.coral,
            letterSpacing: "-0.03em",
            marginTop: 10,
            whiteSpace: "nowrap",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          {valor}
        </div>
      </FadeUp>

      <FadeUp delay={30} distance={14}>
        <div
          style={{
            fontSize: v(21, 19),
            color: "rgba(255,255,255,0.58)",
            marginTop: 12,
            maxWidth: v(900, 820),
            lineHeight: 1.5,
          }}
        >
          Valor referencial · se confirma tras el diagnóstico
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

const Gratis: React.FC = () => {
  const { v } = useFormato();
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${C.indigo} 0%, #0E1128 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(224,123,60,0.18) 0%, rgba(224,123,60,0) 62%)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: v("0 110px", "0 70px"),
        }}
      >
        <FadeUp delay={2}>
          <div
            style={{
              fontSize: v(86, 68),
              fontWeight: 800,
              color: C.white,
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            Diagnóstico <span style={{ color: C.coral }}>gratis</span>
          </div>
        </FadeUp>
        <FadeUp delay={14}>
          <div
            style={{
              fontSize: v(32, 26),
              fontWeight: 500,
              color: "rgba(255,255,255,0.74)",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Garantía de 30 días · Respuesta inmediata
            <br />
            Ingenieros del rubro
          </div>
        </FadeUp>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { v } = useFormato();
  const pulse = (frame % 60) / 60;

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

      <FadeUp delay={0} distance={16}>
        <LogoLockup size={v(82, 64)} pulse={pulse} />
      </FadeUp>

      <FadeUp delay={10}>
        <div
          style={{
            fontSize: v(54, 42),
            fontWeight: 300,
            color: C.white,
            marginTop: 34,
            letterSpacing: "-0.02em",
          }}
        >
          Soporte <span style={{ fontWeight: 800 }}>sin demora</span>
        </div>
      </FadeUp>

      <FadeUp delay={20} distance={14}>
        <div
          style={{
            fontSize: v(26, 23),
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.coral,
            marginTop: v(40, 34),
          }}
        >
          Escríbenos por WhatsApp
        </div>
      </FadeUp>

      <div
        style={{
          display: "flex",
          flexDirection: v("row", "column"),
          gap: v(24, 16),
          marginTop: v(26, 22),
        }}
      >
        {CONTACTO.fonos.map((f, i) => (
          <FadeUp key={f} delay={28 + i * 7} distance={16}>
            <div
              style={{
                background: C.coral,
                color: C.white,
                fontSize: v(34, 32),
                fontWeight: 700,
                borderRadius: 14,
                padding: v("20px 38px", "18px 42px"),
                textAlign: "center",
              }}
            >
              {f}
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={44}>
        <div
          style={{
            fontSize: v(32, 28),
            fontWeight: 600,
            color: C.white,
            marginTop: v(40, 34),
            letterSpacing: "0.02em",
          }}
        >
          {CONTACTO.web}
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};
