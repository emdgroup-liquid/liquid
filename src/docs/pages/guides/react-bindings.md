---
eleventyNavigation:
  key: React bindings
  parent: Guides
  order: 7
layout: layout.njk
title: React bindings
permalink: guides/react-bindings/
---


# React bindings

Setting event listeners via `on<EventName>`-prop on Liquid Oxygen Web Components does not work properly in React. For this reason, we provide special React bindings for Liquid Oxygen. They allow you to set event listeners via props just like you are used to do in React without having to use `reference`.

Instead of using the Web Component directly, simply import the React binding and use it as you would use any other React component.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/react'

export default () => (
  <LdButton>Click me</LdButton>
)
```

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

<docs-page-nav prev-href="guides/form-validation/" next-title="Tailwind CSS integration" next-href="guides/tailwindcss-integration/"></docs-page-nav>
