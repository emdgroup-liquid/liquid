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
  If you are using React, please refer to respective <a href="introduction/getting-started/react/">React guide</a>. Similarly, if you are using Vue, please refer to the <a href="introduction/getting-started/vue/">Vue guide</a>.
</ld-notice>

## Prerequisites

Liquid Oxygen is easy to integrate into an existing frontend project. We assume you already have a project set up. If not, you can create a new project with [Vite](https://vitejs.dev/).

```sh
npm create vite@latest your-project-name -- --template vanilla-ts
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

### Import and register Web Components

The Web Components need to be registered before they can be used. Liquid Oxygen provides the `defineCustomElements` function to register all Liquid Oxygen components. The script loads components lazily only when used in your application. This reduces your bundle size and only loads required code at runtime.

Add following code to your `main.ts` file or any similar file which is loaded for every page.

```js
// main.ts
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
defineCustomElements()
```

#### Avoid lazy loading

If your project requires immediate loading of components, you can use Liquid Oxygen Web Components imported from `@emdgroup-liquid/liquid/dist/components/*`. These components are loaded and automatically registered when imported. This behavior is particularly useful when you are using a bundler like [Vite](https://vitejs.dev/) or [Webpack](https://webpack.js.org/).

Import the Web Component individually whenever you use it in your application.

```js
//main.ts
import '@emdgroup-liquid/liquid/dist/components/ld-button'
import '@emdgroup-liquid/liquid/dist/components/ld-icon'
```

<!-- Learn more about the differences in the [Stencil docs](https://stenciljs.com/docs/output-targets). -->

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

Liquid Oxygen also provides a css file containing all styles. Using this file is convenient, but will increase your bundle size significantly. You can use [PurgeCSS](https://purgecss.com/) or something similar, which removes unused CSS classes from your bundle. This is useful, no matter if you are using Web Components or CSS components.

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.css'
```

## Usage

Add Liquid Oxygen Web Components to your page just as any other element. You can find detailed documentation of each component in the [components section](components/).

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
```

```html
<body>
  <ld-button>
    Click me!
    <ld-icon name="bulb"></ld-icon>
  </ld-button>
</body>
```

Many components are also available as CSS components. These components do not require JavaScript and are useful as lightweight alternatives to Web Components. The respective documentation of a component indicates if it is available as a CSS component.

Following code block shows the same button as in the previous example as a CSS component.

```js
// main.ts
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import '@emdgroup-liquid/liquid/dist/css/ld-button.css'
import '@emdgroup-liquid/liquid/dist/css/ld-icon.css'
```

```html
<body>
  <button class="ld-button">Click me</button>
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m6.246 5.8722 7.2016-1.261c.7301-.1328 1.1947-.8297 1.0619-1.5266-.1327-.7301-.7965-1.1947-1.5266-1.062l-7.2014 1.261c-.697.0997-1.1947.7966-1.062 1.5267.1328.8628.9624 1.1615 1.5266 1.062Zm11.4162 3.551L5.8147 11.4807c-.7301.1328-1.1947.8297-1.062 1.5266.0664.3651.2987.6969.5642.8629l2.7213 2.2566c.1659 1.1616.365 2.0576.4978 2.655.531 1.9912 1.2942 3.0863 3.5841 3.0863s3.0863-1.062 3.5841-3.0863c.28-1.2133.478-2.3937.6401-3.4837.0984-.662-.4755-1.2269-1.1371-1.126l-4.5473.6937-1.5266-1.2611 9.0267-1.593c.7301-.1327 1.1947-.8296 1.062-1.5266-.1327-.73-.8297-1.1947-1.5598-1.062Zm2.2235-3.186c-.1327-.73-.7964-1.1946-1.5265-1.0619L5.0846 7.5316c-.7301.1327-1.1947.8296-1.062 1.5265.1991 1.062 1.1615 1.1284 1.5266 1.062l13.2746-2.3562c.6969-.1328 1.1947-.8297 1.0619-1.5266Z"
        fill="currentcolor"
      />
    </svg>
  </span>
</body>
```

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add an event listener.

```js
// main.ts
document.getElementById('button').addEventListener('click', () => {
  console.log('Button clicked')
})
```

```html
<body>
  <ld-button id="button">Click me</ld-button>
</body>
```

## Sandboxes

This guide shows how to get started with Liquid Oxygen without using a framework like React. Providing more context, we created several sandbox applications showing how Liquid Oxygen works in these environments:

- [Liquid + CDN](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-cdn)
- [Liquid + Vite + JavaScript](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-vite-vanilla)

If you run into issues integrating Liquid Oxygen, please [get in touch with us](https://github.com/emdgroup-liquid/liquid/discussions).

<docs-page-nav prev-href="introduction/why-liquid-oxygen/" next-title="Guides" next-href="guides/"></docs-page-nav>
