---
eleventyNavigation:
  key: React bindings
  parent: Introduction
  order: 9
layout: layout.njk
title: React bindings
permalink: introduction/react-bindings/
---


# React bindings

Setting event listeners via `on<EventName>`-prop on Liquid Oxygen Web Components does not work properly in React. For this reason, we provide special React bindings for Liquid Oxygen. They allow you to set event listeners via prop just like you are used to do in React without having to use `reference`.

All you need to do is to import and use the React binding of a Liquid Oxygen component instead of using the web component directly.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/react'

export default ({ buttonProps }) => (
  {/* ... */}
  <LdButton {...buttonProps} />
  {/* ... */}
)
```

## Custom Elements are defined automatically

A positive side-effect of using React bindings is, that you do not need to call the `defineCustomElements` method manually, as the React bindings automatically take care of that.

For more details on React integration read the [Stencil documentation](https://stenciljs.com/docs/react).

## Setting the asset path

When using React bindings, you do not need to use the `setAssetPath` function to define the asset path for components like `ld-icon`. All you need to do is define a global variable on the `window` object to "tell" the Liquid components where they have to load their assets from:

```js
  // if-clause only required when your code might also be executed
  // on the server-side like with Next.js
  if (typeof window !== "undefined") {
    window.__LD_ASSET_PATH__ = window.location.origin + '/path/to/your/assets/';
  }
```

<docs-page-nav prev-href="introduction/form-validation/" next-title="Tailwind CSS integration" next-href="introduction/tailwindcss-integration/"></docs-page-nav>
