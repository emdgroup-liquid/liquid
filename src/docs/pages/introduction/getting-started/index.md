---
eleventyNavigation:
  key: Getting started
  parent: Introduction
  order: 2
layout: layout.njk
title: Getting started
permalink: introduction/getting-started/
---

# Getting Started

This guide will help you to integrate Liquid Oxygen into your project.

<ld-notice>
  If you are using React, please refer to the <a href="introduction/getting-started/react/">React guide</a>, which helps you step by step to get started with Liquid Oxygen in your React project.
</ld-notice>

## Prerequisites

Liquid Oxygen is easy to integrate into an existing frontend project. We assume you already have a project set up. If not, you can create a new project with [Vite](https://vitejs.dev/).

```sh
npm create vite@latest your-project-name -- --template vanilla-ts
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

Add following code to your `main.ts` file or any similar file which is loaded for every page.

```js
// main.ts
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
defineCustomElements()
```

<!-- TODO: dist-custom-elements seems to be pretty tricky at the moment and I first need to clarify the usage and caveats to be able to document it properly. -->
<!-- #### dist-custom-elements

If your application uses a bundler (e.g. vite, webpack) and does not benefit from lazy loading, you can improve your runtime performance by importing the components from `@emdgroup-liquid/liquid/dist/components/` individually. For additional context please have a look at [dist-custom-elements](https://stenciljs.com/docs/custom-elements) in the Stencil docs.

As you must add every component individually, we recommend to create a file which registers all components at once. This file can then be imported in your `App.tsx` file.

```tsx
// App.tsx
import { LdButton } from '@emdgroup-liquid/liquid/dist/components/ld-button'

customElements.define('ld-button', LdButton)
``` -->

<!-- ## Import and register Web Components

There are multiple options to choose from when importing and registering Liquid Web Components:

### self-lazy-loading bundle

The [self-lazy-loading bundle](https://stenciljs.com/docs/distribution) is a tree shakable bundle, which includes all Liquid components as well as polyfills. You just import it once, then it automatically loads components lazily whenever they are used in your app.

```js
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'

defineCustomElements()
```

### dist-custom-elements

The [dist-custom-elements](https://stenciljs.com/docs/custom-elements) output target is used to generate custom elements in a more optimized way for tree shaking. The generated output consists of ES Modules which helps bundlers to parse and optimize the code.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/components/ld-button'

customElements.define('ld-button', LdButton)
```

<ld-notice mode="warning">
  Please be aware that when using <a href="guides/react-bindings/">React bindings</a> you must use the <a href="introduction/getting-started/#self-lazy-loading-bundle">self-lazy-loading bundle</a>.
</ld-notice>

Learn more about the differences in the [Stencil docs](https://stenciljs.com/docs/output-targets). -->

### Import stylesheets

We recommend importing Liquid Oxygen stylesheets in a central place respectively the entry file of your application.

#### Web Components

As Liquid Oxygen Web Components embed their styles, it is sufficient to import the global styles:

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
```

#### CSS Components

For the CSS Components, you also need to import the global styles and the styles of the components you are using:

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import '@emdgroup-liquid/liquid/dist/css/ld-button.css'
```

#### PurgeCSS

Liquid Oxygen provides a css file containing all styles. Using this file is convenient, but will increase your bundle size significantly. You can use [PurgeCSS](https://purgecss.com/) or something similar, which removes unused CSS classes from your bundle. This is useful, no matter if you are using Web Components or CSS components.

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

Add the following code to your `main.ts` file (or any similar file which is loaded for every page).

```js
// main.ts
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

Add Liquid Oxygen Web Components to your page just as any other element. You can find detailed documentation of each component in the [components section](components/).

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

...

<body>
  <ld-button>
    Click me!
    <ld-icon name="bulb"></ld-icon>
  </ld-button>
</body>
```

Many components are also available as CSS components. These components do not require javascript and are useful as lightweight alternatives to Web Components. The respective documentation of a component indicates if it is available as a CSS component.

Following code block shows the same button as in the previous example as a CSS component.

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import '@emdgroup-liquid/liquid/dist/css/ld-button.css'
import '@emdgroup-liquid/liquid/dist/css/ld-icon.css'

...

<body>
  <button class="ld-button">Click me</button>
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6.246 5.8722 7.2016-1.261c.7301-.1328 1.1947-.8297 1.0619-1.5266-.1327-.7301-.7965-1.1947-1.5266-1.062l-7.2014 1.261c-.697.0997-1.1947.7966-1.062 1.5267.1328.8628.9624 1.1615 1.5266 1.062Zm11.4162 3.551L5.8147 11.4807c-.7301.1328-1.1947.8297-1.062 1.5266.0664.3651.2987.6969.5642.8629l2.7213 2.2566c.1659 1.1616.365 2.0576.4978 2.655.531 1.9912 1.2942 3.0863 3.5841 3.0863s3.0863-1.062 3.5841-3.0863c.28-1.2133.478-2.3937.6401-3.4837.0984-.662-.4755-1.2269-1.1371-1.126l-4.5473.6937-1.5266-1.2611 9.0267-1.593c.7301-.1327 1.1947-.8296 1.062-1.5266-.1327-.73-.8297-1.1947-1.5598-1.062Zm2.2235-3.186c-.1327-.73-.7964-1.1946-1.5265-1.0619L5.0846 7.5316c-.7301.1327-1.1947.8296-1.062 1.5265.1991 1.062 1.1615 1.1284 1.5266 1.062l13.2746-2.3562c.6969-.1328 1.1947-.8297 1.0619-1.5266Z" fill="currentcolor"/></svg>
  </span>
</body>
```

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add an event listener.

```js
// main.ts
<body>
  <ld-button id="button">Click me</ld-button>
</body>

document.querySelector <
  HTMLDivElement >
  '#button'.addEventListener('click', () => {
    console.log('Button clicked')
  })
```

## Sandboxes

This guide shows how to get started with Liquid Oxygen without using a framework like React. Providing more context, we created several sandbox applications showing how Liquid Oxygen works in these environments:

- [Liquid + CDN](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-cdn)
- [Liquid + Vite + Javascript](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-vite-vanilla)

You are using React? Check out the [React guide](introduction/getting-started/react/).

<docs-page-nav prev-href="introduction/why-liquid-oxygen/" next-title="React" next-href="introduction/getting-started/react/"></docs-page-nav>
