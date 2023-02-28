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

For more information about this command and Vite, please refer to the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).<br />Although this guide assumes your project is using typescript, all examples should also be applicable to javascript projects.

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
// App.vue
<script setup lang="ts">
  import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
</script>
```

## Usage

When adding Liquid Oxygen components to a Vue project, it is crucial to use the Vue bindings. All components are imported from `@emdgroup-liquid/liquid/dist/vue`. The bindings significantly improve Vue compatibility and your developer experience.

Let's have a look at how to add a [LdButton](components/ld-button/) to your project. This examnple also includes a [LdIcon](components/ld-icon/) as it helps you to check if Liquid Oxygen assets are loaded correctly.

```html
// SampleComponent.vue
<script lang="ts">
import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/vue'
<script>

<template>
  <LdButton>
    Click me!
    <LdIcon name="energy" />
  </LdButton>
</template>
```

When you put this component on a page, you should see a blue button with the text "Click me!" and a lightning bolt icon.

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add a click handler.

```html
// SampleComponent.vue
<script lang="ts">
  import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/vue'
  function say(message: string) {
    alert(message)
  }
<script>

<template>
  <LdButton @click="say('Clicked!')">
    Click me!
    <LdIcon name="energy" />
  </LdButton>
</template>
```

Please notice the @ notation of the `@click` prop. This is the expected [Vue convention](https://vuejs.org/guide/essentials/event-handling.html) but differs from the native `onclick` attribute and [documentation](https://www.w3schools.com/tags/ref_eventattributes.asp). As we do not explicitly document these events, you need to apply this convention yourself. Typescript and your code editor's IntelliSense will assist you with that.


## Sandboxes

This guide shows you how to get started with Liquid Oxygen in your Vue project. Additionally, we provide several sandbox applications showing how to use Liquid Oxygen in various environments:

- [Liquid + Vue + Nuxt](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-nuxt-tailwind)
- [Liquid + Vue + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-vue-tailwind)

If you still struggle integrating Liquid Oxygen, feel free to [get in touch with us](https://teams.microsoft.com/l/channel/19%3aeae3b35b0cbf42659e45c2b5592e0c0e%40thread.tacv2/General?groupId=88f23881-53e2-4a99-ad5c-8188c1087bbf&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9).

<docs-page-nav prev-href="introduction/getting-started/" next-title="Guides" next-href="guides/"></docs-page-nav>
