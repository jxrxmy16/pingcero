import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

/** Fuente de marca, con respaldos por si no hay red al renderizar. */
export const FONT = `${fontFamily}, "Segoe UI", -apple-system, Arial, sans-serif`;

/** Paleta oficial (misma que pingcero-final.html y el catálogo). */
export const C = {
  coral: "#E07B3C",
  coralDark: "#C86A2A",
  coralSoft: "#FEF0E6",
  indigo: "#1A1E42",
  cream: "#FAF8F3",
  sand: "#F0E8DC",
  muted: "#A0948A",
  border: "#EDE7DF",
  mint: "#10B981",
  white: "#FFFFFF",
} as const;

/** Duración de cada escena, en frames a 30fps. */
export const SCENES = [
  { id: "hero", duration: 240 },
  { id: "marca", duration: 180 },
  { id: "servicios1", duration: 225 },
  { id: "servicios2", duration: 240 },
  { id: "marcas", duration: 150 },
  { id: "pasos", duration: 225 },
  { id: "cta", duration: 210 },
] as const;

/** Frames que se solapan entre escenas para el fundido cruzado. */
export const OVERLAP = 12;

export const sceneStart = (index: number) =>
  SCENES.slice(0, index).reduce((acc, s) => acc + s.duration, 0) -
  OVERLAP * index;

export const TOTAL_FRAMES =
  SCENES.reduce((acc, s) => acc + s.duration, 0) - OVERLAP * (SCENES.length - 1);
