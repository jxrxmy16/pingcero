import "./index.css";
import { Composition } from "remotion";
import { Presentacion } from "./PingCero";
import { TOTAL_FRAMES } from "./PingCero/theme";
import { DURACION_HISTORIA, Historia } from "./Historia";
import { ClipLimpieza, DURACION_LIMPIEZA } from "./Limpieza";
import { ClipRedes, DURACION_CLIP } from "./Redes";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video de presentación de Ping Cero.
          Render:  npx remotion render PingCero */}
      <Composition
        id="PingCero"
        component={Presentacion}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Video de 90 s en cuatro actos, con las tomas generadas.
          Render:  npx remotion render PingCeroHistoria */}
      <Composition
        id="PingCeroHistoria"
        component={Historia}
        durationInFrames={DURACION_HISTORIA}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Misma historia en 9:16 para Instagram, TikTok y estado de WhatsApp.
          Render:  npx remotion render PingCeroHistoriaVertical */}
      <Composition
        id="PingCeroHistoriaVertical"
        component={Historia}
        durationInFrames={DURACION_HISTORIA}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Clip de 30 s para redes sociales. Es el que se publica primero:
          vertical, se entiende sin audio y no depende del clip del notebook.
          Render:  npx remotion render ClipRedes */}
      <Composition
        id="ClipRedes"
        component={ClipRedes}
        durationInFrames={DURACION_CLIP}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* El mismo clip en 16:9, para YouTube y para la portada de Facebook.
          Render:  npx remotion render ClipRedesHorizontal */}
      <Composition
        id="ClipRedesHorizontal"
        component={ClipRedes}
        durationInFrames={DURACION_CLIP}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Clip ilustrado de 30 s: el PC viejo y la limpieza, en vector plano.
          No usa fotos, así que se puede publicar alternado con ClipRedes.
          Render:  npx remotion render ClipLimpieza */}
      <Composition
        id="ClipLimpieza"
        component={ClipLimpieza}
        durationInFrames={DURACION_LIMPIEZA}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="ClipLimpiezaHorizontal"
        component={ClipLimpieza}
        durationInFrames={DURACION_LIMPIEZA}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ── Composiciones de ejemplo que trae la plantilla ── */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
