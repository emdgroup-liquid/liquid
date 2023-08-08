---
eleventyNavigation:
  key: Server-side rendering
  parent: Guides
  order: 4
layout: layout.njk
title: Server-side rendering
permalink: guides/server-side-rendering/
tags:
  - SSR
  - RSC
  - Next.js
---


# Server-side rendering

Custom elements should be defined on client-side only. There are a couple of things you can do to ensure this.

You can implement a condition which checks for the environment such as the following one:

```js
if (typeof window !== 'undefined') {
  window.__LD_ASSET_PATH__ = '/'
  const { defineCustomElements } = await import(
    '@emdgroup-liquid/liquid/dist/loader'
  )
  defineCustomElements()
}
```

You can also use lifecycle hooks, if available, for running code on the client side only. For instance, in React based applications you can use the [effect hook](https://reactjs.org/docs/hooks-effect.html):

```js
useEffect(()=>{
  window.__LD_ASSET_PATH__ = '/'
  const { defineCustomElements } = await import(
    '@emdgroup-liquid/liquid/dist/loader'
  )
  defineCustomElements()
}, [])
```

For working examples check out our [sandbox apps](guides/sandbox-applications/).

## Hydrate App

The hydrate app is a Stencil output target which generates a module that can be used on a NodeJS server to hydrate HTML and implement server side rendering (SSR). You can import the hydrate app as follows:

```js
import { hydrateDocument } from '@emdgroup-liquid/liquid/hydrate'
```

Please refer to the [Stencil Hydrate App documentation](https://stenciljs.com/docs/hydrate-app) and our [Next.js sandbox app](https://github.com/emdgroup-liquid/liquid-sandbox-next-tailwind/) for details on how to use the hydrate app.

## React Server Components

[Liquid Oxygen React bindings](introduction/getting-started/react/) use client side hooks and therefore cannot be used as React Server Components (RSC). There are three ways to work around this issue:

1. You can make use of Liquid Oxygen CSS components.
2. You can wrap Liquid Oxygen React components in client side components (which use the `"use client"` directive).
3. You can use the non-wrapped Liquid Oxygen Web Components (without React bindings) in your RSC. In this case you may want to review our docs on [type checking and intellisense](guides/type-checking-and-intellisense/).

Our [Next.js sandbox app](https://github.com/emdgroup-liquid/liquid-sandbox-next-tailwind/) covers most of the options described above.

<docs-page-nav prev-href="guides/type-checking-and-intellisense/" next-title="Event handling" next-href="guides/event-handling/"></docs-page-nav>
