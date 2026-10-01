import { continueRender, delayRender, staticFile } from "remotion";

/**
 * La tipografía se sirve desde el propio repo, no desde Google Fonts.
 *
 * Si la fuente viaja por red, el render depende de que haya internet: sin
 * salida —o detrás de un proxy con su propio certificado— Chrome no la baja y
 * el render se cae antes de dibujar el primer frame. Son dos archivos variables
 * de ~25 KB que cubren todos los pesos que usa la marca (300 a 800).
 *
 * Si algún día hace falta otro peso, no hay que bajar nada más: el archivo es
 * variable, el rango 200-800 ya está declarado.
 */
const FAMILIA = "Plus Jakarta Sans";

/** Los dos subconjuntos que necesita el español, con el rango que trae Google. */
const SUBCONJUNTOS = [
  {
    archivo: "fuentes/plus-jakarta-sans-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    archivo: "fuentes/plus-jakarta-sans-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
];

if (typeof FontFace !== "undefined") {
  for (const sub of SUBCONJUNTOS) {
    const espera = delayRender(`Cargando ${FAMILIA}`);
    const cara = new FontFace(
      FAMILIA,
      `url(${staticFile(sub.archivo)}) format("woff2")`,
      { weight: "200 800", unicodeRange: sub.unicodeRange, display: "block" },
    );

    cara.load().then(
      (cargada) => {
        document.fonts.add(cargada);
        continueRender(espera);
      },
      // Si un archivo faltara, el video sale con la fuente de respaldo en vez
      // de quedarse esperando para siempre.
      () => continueRender(espera),
    );
  }
}

/** Fuente de marca, con respaldos por si el archivo no cargara. */
export const FONT = `"${FAMILIA}", "Segoe UI", -apple-system, Arial, sans-serif`;

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
