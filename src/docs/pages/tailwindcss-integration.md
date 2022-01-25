---
eleventyNavigation:
  key: Tailwind CSS integration
  parent: Introduction
  order: 10
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

## Previewing the Tailwind config

After you have configured Tailwind with Liquid's preset, you may want to use the awesome [Tailwind Config Viewer](https://www.npmjs.com/package/tailwind-config-viewer) as a dev dependency in your project in order to learn which Tailwind utility classes are available to you.

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

<docs-page-nav prev-href="introduction/react-bindings/" next-title="Design tokens" next-href="introduction/design-tokens/"></docs-page-nav>
