/**
 * Contenido tomado tal cual de catalogo.html / catalogo_ping_cero.pdf.
 * Si cambian los precios, se cambian acá y el video queda actualizado.
 */

export type Servicio = {
  nombre: string;
  desc: string;
  precio: string;
  nota?: string;
  gratis?: boolean;
  empresa?: boolean;
};

export const SERVICIOS_A: Servicio[] = [
  {
    nombre: "Diagnóstico de equipo",
    desc: "Revisión completa para identificar la falla",
    precio: "GRATIS",
    gratis: true,
  },
  {
    nombre: "Formateo + respaldo + instalación de sistema",
    desc: "Respaldamos tus datos antes de formatear",
    precio: "$25.000 – $40.000",
  },
  {
    nombre: "Limpieza física + cambio de pasta térmica",
    desc: "Baja temperaturas y mejora el rendimiento",
    precio: "$20.000 – $35.000",
  },
  {
    nombre: "Mantención general (software + hardware)",
    desc: "Optimización completa del equipo",
    precio: "$25.000 – $45.000",
  },
  {
    nombre: "Eliminación de virus y malware",
    desc: "Limpieza y protección del sistema",
    precio: "$20.000 – $35.000",
  },
];

export const SERVICIOS_B: Servicio[] = [
  {
    nombre: "Instalación de SSD / ampliación de RAM",
    desc: "Mano de obra · repuesto aparte",
    precio: "$15.000 – $25.000",
    nota: "+ repuesto",
  },
  {
    nombre: "Armado de PC a pedido",
    desc: "Mano de obra · según componentes",
    precio: "$40.000 – $70.000",
  },
  {
    nombre: "Configuración de redes y WiFi",
    desc: "Hogar u oficina",
    precio: "$30.000 – $60.000",
  },
  {
    nombre: "Empresas · Mantención de equipos y servidores",
    desc: "Planes preventivos y soporte para oficinas",
    precio: "A medida",
    empresa: true,
  },
];

export const MARCAS = [
  "HP", "Lenovo", "Dell", "Asus", "Acer", "Apple", "MSI", "Samsung",
  "Toshiba", "Intel", "AMD", "Nvidia", "Razer", "Logitech", "Huawei", "Gigabyte",
];

export const PASOS = [
  {
    n: "01",
    titulo: "Nos contactas",
    desc: "Escríbenos por WhatsApp y cuéntanos qué le pasa a tu equipo. Te respondemos de inmediato.",
  },
  {
    n: "02",
    titulo: "Lo revisamos",
    desc: "Hacemos el diagnóstico y te decimos qué tiene y cuánto vale. Sin sorpresas ni cobros ocultos.",
  },
  {
    n: "03",
    titulo: "Te lo devolvemos andando",
    desc: "Reparamos el equipo y te lo entregamos funcionando, con garantía en el trabajo.",
  },
];

export const SELLOS = [
  "Diagnóstico gratis",
  "Garantía 30 días",
  "Respuesta inmediata",
  "Ingenieros del rubro",
];

export const CONTACTO = {
  web: "pingcero.cl",
  fonos: ["+56 9 2827 4749", "+56 9 5369 9695"],
};
