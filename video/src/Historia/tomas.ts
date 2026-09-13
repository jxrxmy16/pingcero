/**
 * Catálogo de tomas del video de 90 s.
 *
 * Cada toma apunta a un archivo dentro de `public/tomas/`. Cuando una imagen
 * todavía no existe, `disponible: false` hace que en su lugar salga una placa
 * con el número y el nombre de la toma: así el video se puede ver completo y
 * con los tiempos reales aunque falte material.
 *
 * Para sumar una imagen nueva:
 *   1. Guárdala en `public/tomas/` con el nombre que dice `archivo`.
 *   2. Cambia `disponible` a true.
 * No hay que tocar nada más: el montaje ya la está esperando.
 */

export type Toma = {
  /** Número con el que la nombraste en tu guion. */
  n: number;
  archivo: string;
  titulo: string;
  disponible: boolean;
  /**
   * Punto de interés horizontal, para el recorte vertical (9:16). Sin esto,
   * el recorte va al centro y parte al sujeto por la mitad.
   */
  foco?: string;
  /**
   * Corrección de color. Las imágenes que vienen frías (luz de laboratorio,
   * guantes azules) se templan para que peguen con el coral de la marca.
   */
  templar?: boolean;
};

export const TOMAS: Record<string, Toma> = {
  manosReparando: {
    n: 1,
    archivo: "tomas/01-manos-reparando.jpg",
    foco: "64% 50%",
    titulo: "Manos reparando",
    disponible: true,
  },
  ventiladorSucio: {
    n: 2,
    archivo: "tomas/02-ventilador-sucio.jpg",
    foco: "56% 50%",
    titulo: "Ventilador sucio",
    disponible: true,
  },
  ventiladorLimpio: {
    n: 3,
    archivo: "tomas/03-ventilador-limpio.jpg",
    foco: "56% 50%",
    titulo: "Ventilador limpio",
    disponible: true,
  },
  pastaTermica: {
    n: 4,
    archivo: "tomas/04-pasta-termica.jpg",
    titulo: "Pasta térmica",
    disponible: true,
    templar: true,
  },
  ssdRam: {
    n: 5,
    archivo: "tomas/05-ssd-ram.jpg",
    titulo: "Instalación de SSD / RAM",
    disponible: false,
  },
  flatLay: {
    n: 6,
    archivo: "tomas/06-flat-lay-pc.jpg",
    titulo: "Componentes de PC",
    disponible: false,
  },
  glitch: {
    n: 9,
    archivo: "tomas/09-glitch-virus.jpg",
    foco: "44% 50%",
    titulo: "Pantalla con fallas",
    disponible: true,
  },
  entrega: {
    n: 10,
    archivo: "tomas/10-entrega.jpg",
    titulo: "Entrega al cliente",
    disponible: true,
  },
  celular: {
    n: 11,
    archivo: "tomas/11-celular.jpg",
    foco: "46% 50%",
    titulo: "Cliente escribiendo",
    disponible: true,
  },
  taller: {
    n: 12,
    archivo: "tomas/12-taller.jpg",
    foco: "66% 50%",
    titulo: "El taller",
    disponible: true,
  },
  fondoAbstracto: {
    n: 13,
    archivo: "tomas/13-fondo-abstracto.jpg",
    titulo: "Fondo abstracto",
    disponible: false,
  },
  oficina: {
    n: 14,
    archivo: "tomas/14-oficina.jpg",
    foco: "58% 50%",
    titulo: "Oficina pyme",
    disponible: true,
  },
  router: {
    n: 15,
    archivo: "tomas/15-router-redes.jpg",
    foco: "42% 50%",
    titulo: "Redes y WiFi",
    disponible: true,
  },
};
