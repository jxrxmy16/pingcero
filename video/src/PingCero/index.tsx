import React from "react";
import { AbsoluteFill } from "remotion";
import { SERVICIOS_A, SERVICIOS_B } from "./data";
import { Hero } from "./Hero";
import { Cierre, Marca, Marcas, Pasos, Servicios } from "./scenes";
import { C, SCENES, sceneStart } from "./theme";
import { Scene } from "./ui";

/** Posición y largo de cada escena, calculados desde SCENES en theme.ts. */
const at = (i: number) => ({
  from: sceneStart(i),
  durationInFrames: SCENES[i].duration,
});

export const Presentacion: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene {...at(0)} background="#0A0A0C">
      <Hero />
    </Scene>

    <Scene {...at(1)} background={C.indigo}>
      <Marca />
    </Scene>

    <Scene {...at(2)} background={C.cream}>
      <Servicios items={SERVICIOS_A} encabezado />
    </Scene>

    <Scene {...at(3)} background={C.cream}>
      <Servicios
        items={SERVICIOS_B}
        nota="Valores referenciales: se confirman tras el diagnóstico, según el estado real del equipo. No incluyen repuestos, que se cotizan por separado. Atención a domicilio con recargo por traslado según comuna."
      />
    </Scene>

    <Scene {...at(4)} background={C.indigo}>
      <Marcas />
    </Scene>

    <Scene {...at(5)} background={C.sand}>
      <Pasos />
    </Scene>

    <Scene {...at(6)} background={C.indigo}>
      <Cierre />
    </Scene>
  </AbsoluteFill>
);
