---
eleventyNavigation:
  key: Vue
  parent: Getting started
  order: 2
layout: layout.njk
title: Vue
permalink: introduction/getting-started/vue/
---

# Vue

Liquid Oxygen comes with [Vue](https://vuejs.org/) bindings for all Web Components. Although the rendered components are still Web Components, the bindings improve the developer experience by providing a more familiar API and a better integration with Vue.

On this page, you'll find detailed instructions on how to integrate Liquid Oxygen into your Vue project and how to use the components.

## Prerequisites

Liquid Oxygen is easy to integrate into an existing Vue project. We assume you already have a project set up. If not, you can create a new project with [Vite](https://vitejs.dev/).

```sh
npm create vite@latest your-project-name -- --template vue-ts
```

For more information about this command and Vite, please refer to the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).<br />Although this guide assumes your project is using Typescript, all examples should also be applicable to JavaScript projects.

## Install

Add Liquid Oxygen to your project with the package manager of your choice.

```sh
npm install @emdgroup-liquid/liquid
```

<ld-notice>
  Liquid Oxygen works with any package manager (e.g. <code>npm</code>, <code>yarn</code> or <code>pnpm</code>). For simplicity, we use <code>npm</code> in this guide.
</ld-notice>

### Import stylesheet

All Web Components are loaded togehter with their styles embedded. Therefore we only need to import the global stylesheet for Liquid Oxygen.

Add the following code to your `App.vue` file (or any similar file which is loaded for every page).

```html
<!-- App.vue -->
<script setup lang="ts">
  import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
</script>
```

## Usage

When adding Liquid Oxygen components to a Vue project, it is crucial to use the Vue bindings. All components are imported from `@emdgroup-liquid/liquid/dist/vue`. The bindings significantly improve Vue compatibility and your developer experience.

Let's have a look at how to add a [LdButton](components/ld-button/) to your project. This example also includes a [LdIcon](components/ld-icon/) as it helps you to check if Liquid Oxygen assets are loaded correctly.

```html
<!-- SampleComponent.vue -->
<script setup lang="ts">
  import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/vue'
</script>

<template>
  <ld-button>
    Click me!
    <ld-icon name="energy" />
  </ld-button>
</template>
```

When you put this component on a page, you should see a blue button with the text "Click me!" and a lightning bolt icon.

### Manually defining custom elements

When you look at the example above you may notice that we didn't have to define any custom elements anywhere. This is because the React output target includes the define custom elements logic and all custom elements get registered with the Custom Elements Registry as soon as imported (the [Stencil `includeDefineCustomElements` option](https://stenciljs.com/docs/vue#includedefinecustomelements) is set to `true`).

In some cases this convenience feature is not desireable, such as when bundling Liquid Oxygen components within your own library, or when you want to have more control over when your custom elements get registered. For this reason Liquid Oxygen exposes a React output target entry which does __not__ include the `defineCustomElements` utility.

Here is how you would implement the example above, using the React output target, that doesn not include the `defineCustomElements` helper method.

```html
<!-- SampleComponent.vue -->
<script setup lang="ts">
  import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/vue-define-excluded'
</script>

<template>
  <ld-button>
    Click me!
    <ld-icon name="energy" />
  </ld-button>
</template>
```

Now you can register the components manually in two ways.

1. You can use the `defineCustomElements` utility.

```tsx
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
defineCustomElements()
```

2. You can register each element individually.

```tsx
import { LdButton as LdButtonCE } from '@emdgroup-liquid/liquid/dist/components/ld-button'
import { LdIcon as LdIconCE } from "@emdgroup-liquid/liquid/dist/components/ld-icon"

customElements.get('ld-button') || customElements.define('ld-button', LdButtonCE)
customElements.get('ld-icon') || customElements.define('ld-icon', LdIconCE)
```

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add a click handler.

```html
<!-- SampleComponent.vue -->
<script setup lang="ts">
  import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/vue'
</script>
<script lang="ts">
  export default {
    methods: {
      say(message: string) {
        alert(message)
      },
    },
  }
</script>

<template>
  <ld-button @click="say('Clicked!')">
    Click me!
    <ld-icon name="energy" />
  </ld-button>
</template>
```

Please notice the `@` notation of the `@click` prop. This is the expected [Vue convention](https://vuejs.org/guide/essentials/event-handling.html), which differs from the native `onclick` attribute ([see related documentation](https://html.spec.whatwg.org/dev/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects)). As we do not explicitly document these events, you need to apply this convention yourself. Typescript and your code editor's IntelliSense will assist you with that.

<ld-notice mode="warning">
  While type checking and intellisense work well when using Visual Studio Code in combination with the <a href="https://github.com/johnsoncodehk/volar" rel="noreferrer noopener" target="_blank">Volar plugin</a>, we found that JetBrains' bundled <a href="https://plugins.jetbrains.com/plugin/9442-vue-js" rel="noreferrer noopener" target="_blank">Vue plugin</a> is not yet capable of providing equivalent features.
</ld-notice>

## Sandboxes

This guide shows you how to get started with Liquid Oxygen in your Vue project. Additionally, we provide several sandbox applications showing how to use Liquid Oxygen in various environments:

- [Liquid + Vue + Nuxt](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-nuxt-tailwind)
- [Liquid + Vue + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-vue-tailwind)

If you run into issues integrating Liquid Oxygen, please [get in touch with us](https://github.com/emdgroup-liquid/liquid/discussions).

<docs-page-nav prev-href="introduction/getting-started/" next-title="Guides" next-href="guides/"></docs-page-nav>
