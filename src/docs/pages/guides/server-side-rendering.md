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
import { LdButton } from '@emdgroup-liquid/liquid/dist/components/ld-button'

if (typeof window !== 'undefined') {
  customElements.define('ld-button', LdButton)
}
```

You can also import the components you use on client side only, if you want to leverage code splitting and lazy loading:

```js
if (typeof window !== 'undefined') {
  const { setAssetPath } = await import('@emdgroup-liquid/liquid/dist/components')
  const modules = await Promise.all([
    import('@emdgroup-liquid/liquid/dist/components/ld-button'),
    import('@emdgroup-liquid/liquid/dist/components/ld-checkbox'),
  ])
  window.__LD_ASSET_PATH__ = window.location.origin
  modules.forEach((module) => {
    module.defineCustomElement()
  })
}
```

If you have lifecycle hooks to your disposal for running code on the client side only, you should use these. For instance, in React based applications you can use the [effect hook](https://reactjs.org/docs/hooks-effect.html) for this purpose:

```js
useEffect(()=>{
  window.__LD_ASSET_PATH__ = window.location.origin
}, [])
```

For working examples check out our [sandbox apps](guides/sandbox-applications/).

<docs-page-nav prev-href="guides/type-checking-and-intellisense/" next-title="Event handling" next-href="guides/event-handling/"></docs-page-nav>
