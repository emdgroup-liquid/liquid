---
eleventyNavigation:
  key: Tailwind CSS integration
  parent: Introduction
  order: 7
layout: layout.njk
title: Tailwind CSS integration
permalink: introduction/tailwindcss-integration/
---


# Tailwind CSS Integration

Liquid bundles a [Tailwind CSS preset](https://tailwindcss.com/docs/presets) which you can use as a base for your own Tailwind CSS configuration:

```js
// tailwind.config.js
const liquidPreset = require('@emdgroup-liquid/liquid/dist/css/tailwind-preset.js')

module.exports = {
  presets: [liquidPreset],
}
```

## Disabling Tailwind’s default configuration

Liquid's Tailwind preset extends Tailwind's [default configuration](https://unpkg.com/browse/tailwindcss@%5E2/stubs/defaultConfig.stub.js) by default. If you want Liquid's preset to **not** extend Tailwind's default configuration, include an empty `presets` key in the preset: 

```js
// tailwind.config.js
const liquidPreset = require('@emdgroup-liquid/liquid/dist/css/tailwind-preset.js')
liquidPreset.presets = []

module.exports = {
  presets: [liquidPreset],
}
```

> **Note**: Not extending Tailwind's default configuration is the same as completely removing Tailwinds default CSS utility classes.

## Accessing Liquid’s design tokens

Maybe you don't want to use the preset and want to build your own config from scratch. Or you are using something other than Tailwind for the same purpose. In such cases you might want to access Liquid's design tokens (colors, spacings etc.) as "raw data". You can do so by importing the bundled design token file under `@emdgroup-liquid/liquid/dist/css/design-tokens.json`.

<docs-page-nav prev-href="introduction/server-side-rendering/" next-title="Sandbox applications" next-href="introduction/sandbox-applications/"></docs-page-nav>