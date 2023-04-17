---
eleventyNavigation:
  key: Server-side rendering
  parent: Guides
  order: 4
layout: layout.njk
title: Server-side rendering
permalink: guides/server-side-rendering/
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

<docs-page-nav prev-href="guides/type-checking-and-intellisense/" next-title="Event handling" next-href="guides/event-handling/"></docs-page-nav>
