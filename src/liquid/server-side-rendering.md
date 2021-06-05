---
eleventyNavigation:
  key: Server-side Rendering
  parent: Liquid
  order: 3
layout: layout.njk
title: Server-side Rendering
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

## Known issues

If you run into warnings or errors mentioning **hydration** or some sort of client-server missmatch, it has most likely to do with code being executed on server-side which should be executed on client-side only.

For instance in [Next.js](https://nextjs.org/), even after conditionally defining custom elements on client-side only, you may run into the following warning, when adding event handlers to Liquid components:

> Warning: Extra attributes from the server

You can work around this issue by conditionally passing handlers to the component:
```jsx
<ld-button onClick={typeof window === 'undefined' ? undefined : handleClick}>click me</ld-button>
```

For convenience, you can create a conditional object which holds all your handlers on client-side and then reference your handlers via that object:

```jsx
const methods = typeof window === 'undefined' ? {} : {
  handleClick: () => { /* ... */ }
}
return (
  <ld-button onClick={methods.handleClick}>click me</ld-button>
)
```

<docs-page-nav prev-title="Type checking and intellisense" prev-href="/liquid/type-checking-and-intellisense/"></docs-page-nav>