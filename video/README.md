# Video de Ping Cero

Proyecto de Remotion. Los textos, precios y teléfonos salen de
`src/PingCero/data.ts`: ahí se cambian una vez y quedan corregidos en todas
las composiciones.

## Composiciones

| id | Formato | Dura | Para qué sirve |
|---|---|---|---|
| `ClipRedes` | 1080×1920 | 30 s | Clip con fotos. Reels, TikTok, Shorts, estado de WhatsApp. |
| `ClipRedesHorizontal` | 1920×1080 | 30 s | El mismo clip para YouTube y Facebook. |
| `ClipLimpieza` | 1080×1920 | 30 s | Clip ilustrado: el PC viejo y la limpieza, en vector plano. Sin fotos. |
| `ClipLimpiezaHorizontal` | 1920×1080 | 30 s | El clip ilustrado en horizontal. |
| `PingCeroHistoria` | 1920×1080 | 90 s | La historia completa en cuatro actos. |
| `PingCeroHistoriaVertical` | 1080×1920 | 90 s | La historia completa, en vertical. |

> Las dos composiciones de 90 s usan `public/hero-laptop-30fps.mp4`, que no está
> versionado (el `.gitignore` deja fuera los `.mp4` por peso). En un clon nuevo
> hay que copiar ese archivo a mano antes de renderizarlas. Las de 30 s no lo
> usan: se renderizan con lo que está en el repo.

## Renderizar

```console
npm install
npx remotion render ClipLimpieza out/pingcero-limpieza-vertical-9x16.mp4
npx remotion render ClipRedes out/pingcero-redes-vertical-9x16.mp4
```

Los dos clips de 30 s cuentan lo mismo con lenguajes distintos —uno con
fotografías y otro ilustrado— para poder alternar publicaciones sin que se vean
repetidas.

Para verlo y moverlo en el navegador:

```console
npm run dev
```

## Antes de subir un cambio

```console
npm run lint
```

Hace `eslint` y `tsc` juntos.

## Tipografía

Plus Jakarta Sans se sirve desde `public/fuentes/`, no desde Google Fonts, para
que el render no dependa de la red. Están los dos subconjuntos que necesita el
español (latin y latin-ext) en archivo variable: cubren los pesos 200 a 800.

---

# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
