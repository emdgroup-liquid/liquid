---
eleventyNavigation:
  key: React bindings
  parent: Introduction
  order: 7
layout: layout.njk
title: React bindings
permalink: introduction/react-bindings/
---


# React Bindings

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

<docs-page-nav prev-href="introduction/server-side-rendering/" next-title="Tailwind CSS integration" next-href="introduction/tailwindcss-integration/"></docs-page-nav>
