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

Custom elements should be defined on client-side only. Make sure you implement a condition which checks for the environment such as the following ones:

```js
import { defineCustomElements } from '@emdgroup-liquid/liquid'

if (typeof window !== 'undefined') defineCustomElements()
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

## Known issues and workarounds

If you run into warnings or errors mentioning **hydration** or some sort of client-server missmatch, it has most likely to do with code being executed on server-side which should be executed on client-side only.

For instance in [Next.js](https://nextjs.org/), even after conditionally defining custom elements on client-side only, you may run into a warning such as this one:

> Warning: Extra attributes from the server `yada-yada`

Or this one:

> Did not expect server HTML to contain a `<some-element>` in `<ld-something>`.

You can work around most of such issues by delaying the `defineCustomElements` call until the next event loop by wrapping it in a `setTimeout`:

```js
if (typeof window !== 'undefined') {
  setTimeout(() => {
    defineCustomElements()
  })
}
```
