import { useVideoConfig } from "remotion";

/**
 * El mismo montaje se renderiza en 1920×1080 (web, YouTube) y en 1080×1920
 * (Instagram, TikTok, estado de WhatsApp). En vez de duplicar las escenas,
 * cada componente pide acá el valor que corresponde al formato en el que se
 * está renderizando.
 *
 *   const { v } = useFormato();
 *   fontSize: v(72, 58)   // 72 en horizontal, 58 en vertical
 */
export const useFormato = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;

  return {
    vertical,
    ancho: width,
    alto: height,
    /** Elige entre el valor horizontal y el vertical. */
    v: <T,>(horizontal: T, enVertical: T): T =>
      vertical ? enVertical : horizontal,
  };
};
