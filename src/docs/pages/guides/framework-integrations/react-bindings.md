---
eleventyNavigation:
  key: React bindings
  parent: Framework integrations
  order: 1
layout: layout.njk
title: React bindings
permalink: guides/framework-integrations/react-bindings/
---

# React bindings

Setting event handlers via `on<EventName>`-prop on Liquid Oxygen Web Components does not work properly in React. For this reason, we provide special React bindings for Liquid Oxygen. They allow you to set event handlers via props just like you are used to do in React without having to use `reference`.

Instead of using the Web Component directly, simply import the React binding and use it as you would use any other React component.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/react'

export default () => (
  <LdButton>Click me</LdButton>
)
```

For more details on React integration check out our [sandbox apps](guides/sandbox-applications/) or read the [Stencil documentation](https://stenciljs.com/docs/react).
