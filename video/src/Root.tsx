import "./index.css";
import { Composition } from "remotion";
import { Presentacion } from "./PingCero";
import { TOTAL_FRAMES } from "./PingCero/theme";
import { DURACION_HISTORIA, Historia } from "./Historia";
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
