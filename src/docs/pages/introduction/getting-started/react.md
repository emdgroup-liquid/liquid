---
eleventyNavigation:
  key: React
  parent: Getting started
  order: 1
layout: layout.njk
title: React
permalink: introduction/getting-started/react/
---

# React

Liquid Oxygen comes with React bindings for all Web Components. Although the rendered components are still Web Components, the bindings improve the developer experience by providing a more familiar API and a better integration with React.

On this page, you'll find detailed instructions on how to integrate Liquid Oxygen into your React project and how to use the components.

## Prerequisites

Liquid Oxygen is easy to integrate into an existing React project. We assume you already have a React project set up. If not, you can create a new project with [Vite](https://vitejs.dev/).

```sh
npm create vite@latest your-project-name -- --template react-ts
```

For more information about this command and Vite, please refer to the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).<br />Although this guide assumes your project is using typescript, all examples should also be applicable to javascript projects.

## Install

Add Liquid Oxygen to your project with the package manager of your choice.

```sh
npm install @emdgroup-liquid/liquid
```

<ld-notice>
  Liquid Oxygen works with any package manager (e.g. <code>npm</code>, <code>yarn</code> or <code>pnpm</code>). For simplicity, we will use <code>npm</code> in this guide.
</ld-notice>

### Import and register Web Components

The Web Components need to be registered before they can be used. Liquid Oxygen provides the `defineCustomElements` function to register all Liquid Oxygen components. The script loads components lazily only when used in your application. This reduces your bundle size and only loads required code at runtime.

Add the following code to your `App.tsx` file (or any similar file which is loaded for every page).

```tsx
// App.tsx
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
defineCustomElements()
```

### Import stylesheet

All Web Components are loaded togehter with their styles embedded. Therefore we only need to import the global stylesheet for Liquid Oxygen.

Add the following code to your `App.tsx` file (or any similar file which is loaded for every page).

```tsx
// App.tsx
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
```

### Component assets

Some components require static assets during runtime. Although the Liquid Oxygen package includes all assets, you have to add these assets to your output bundle. We recommend to include copying these assets in your build process, which ensures that the assets are always up to date.

<ld-notice>
  You should add the copied assets (e.g. <code>public/liquid/assets/*</code>) to your <code>.gitignore</code> file.
</ld-notice>

For the following example, we assume you are using [Vite](https://vitejs.dev/). By default, Vite uses the `public` folder for static assets. To include the Liquid Oxygen assets in your output bundle, you can copy them to this folder.

First, install the `rollup-plugin-copy` plugin. This plugin allows you to copy files and folders while building.

```sh
npm install rollup-plugin-copy -D
```

Now include the copy plugin in your Vite config. Add the following code to your `vite.config.ts` file. This will copy the Liquid Oxygen assets from the 'node_modules' folder to the 'public' folder, so Vite will bundle them.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets/*',
          dest: 'public/liquid/assets',
        },
      ],
      hook: 'buildStart',
    }),
    // ...other plugins e.g. react()
  ],
  // ...other config options
})
```

You need to "tell" Liquid Oxygen where to find the assets. The components will look for the `__LD_ASSET_PATH__` variable in the `window` object. The path should point to the `liquid/` folder.

Add the following code to your `App.tsx` file (or any similar file which is loaded for every page).

```tsx
// App.tsx
// if-clause only required in server-side rendering context
if (typeof window !== 'undefined') {
  // @ts-ignore: Property '__LD_ASSET_PATH__' does not exist on type 'Window & typeof globalThis'.ts(2339)
  window.__LD_ASSET_PATH__ = '/liquid/'
}
```

Once the asset path is set and the assets are availe on runtime, all components can automatically load their assets.

If this example does not suit your environment, please refer to our sandbox apps for more details and alternative bundlers:

- [Liquid + React + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind?file=vite.config.ts)<br />This sandbox is quite similar to the example above.
- [Liquid + React + CRA](https://codesandbox.io/p/github/emdgroup-liquid/liquid-sandbox-cra-tailwind/main?file=%2Fpackage.json)<br />The Sandbox uses Create React App which does not allow to adjust the Webpack config. In this case we added a postinstall script to copy the assets to the public folder.
- [Liquid + React + Next.js](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-next-tailwind?file=next.config.js)<br />Next.js uses Webpack under the hood. The sandbox shows how to add a custom Webpack config `next.config.js` to copy the assets to the public folder.

## Usage

When adding Liquid Oxygen components to a React project, it is crucial to use the React bindings. All components are imported from `@emdgroup-liquid/liquid/dist/react`. The bindings significantly improve JSX compatibility and your developer experience.

Let's have a look at how to add a [LdButton](components/ld-button/) to your project. This examnple also includes a [LdIcon](components/ld-icon/) as it helps you to check if Liquid Oxygen assets are loaded correctly.

```tsx
// SampleComponent.tsx
import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/react'

export function SampleComponent() {
  return (
    <LdButton>
      Click me!
      <LdIcon name="energy" />
    </LdButton>
  )
}
```

When you put this component on a page, you should see a blue button with the text "Click me!" and a lightning bolt icon.

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add a click handler.

```tsx
// SampleComponent.tsx
import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/react'

export function SampleComponent() {
  return (
    <LdButton onClick={() => alert('Clicked!')}>
      Click me!
      <LdIcon name="energy" />
    </LdButton>
  )
}
```

Please notice the camel case notation of the `onClick` prop. This is the expected [React convention](https://reactjs.org/docs/handling-events.html) but differs from the native `onclick` attribute and [documentation](https://www.w3schools.com/tags/ref_eventattributes.asp). As we do not explicitly document these events, you need to apply this convention yourself. Typescript and your code editor's IntelliSense will assist you with that.

There are a few cases where native events of Web Components do not behave as expected by React. In these cases, Liquid Oxygen provides custom events prefixed with `ld` and documented on the respective component pages.

<ld-notice>
  LdInput <code>onChange</code> event invokes when the component loses focus (and the value changed). This is the standard browser behavior but differs from the native React <code>onChange</code> event. Use the <code>onInput</code> event in cases you want to handle user input immediately while typing. Find additional information in the <a href="guides/event-handling/">Event handling guide</a>.
</ld-notice>

## Sandboxes

This guide shows you how to get started with Liquid Oxygen in your React project. Additionally, we provide several sandbox applications showing how to use Liquid Oxygen in various environments:

- [Liquid + React + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind)
- [Liquid + React + CRA](https://codesandbox.io/p/github/emdgroup-liquid/liquid-sandbox-cra-tailwind/main)
- [Liquid + React + Next.js](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-next-tailwind)

If you still struggle integrating Liquid Oxygen, feel free to [get in touch with us](https://teams.microsoft.com/l/channel/19%3aeae3b35b0cbf42659e45c2b5592e0c0e%40thread.tacv2/General?groupId=88f23881-53e2-4a99-ad5c-8188c1087bbf&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9).

<docs-page-nav prev-href="introduction/getting-started/" next-title="Guides" next-href="guides/"></docs-page-nav>
