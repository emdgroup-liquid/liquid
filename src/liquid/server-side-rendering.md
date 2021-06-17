---
eleventyNavigation:
  key: Server-side rendering
  parent: Liquid
  order: 4
layout: layout.njk
title: Server-side rendering
permalink: liquid/server-side-rendering/
---


# Server-side rendering

Custom elements should be defined on client-side only. There are a couple of things you can do to ensure this.

You can implement a condition which checks for the environment such as the following one:

```js
import { defineCustomElements } from '@emdgroup-liquid/liquid'

if (typeof window !== 'undefined') {
  defineCustomElements()
}
```

You can also import the components you use on client side only, if you want to leverage code splitting and lazy loading:

```js
if (typeof window !== 'undefined') {
  import('@emdgroup-liquid/liquid/dist/custom-elements').then((liquid) => {
    const { LdButton } = liquid
    customElements.define('ld-button', LdButton)
  })
}
```

If you have lifecycle hooks to your disposal for running code on the client side only, you should use these. For instance, in React based applications you can use the [effect hook](https://reactjs.org/docs/hooks-effect.html) for this purpose:

```js
useEffect(()=>{
  defineCustomElements()
}, [])
```

<docs-page-nav prev-href="/liquid/type-checking-and-intellisense/"></docs-page-nav>