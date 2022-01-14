---
eleventyNavigation:
  key: Component assets
  parent: Introduction
  order: 4
layout: layout.njk
title: Component assets
permalink: introduction/component-assets/
---

# Component assets

Some Liquid Web Components include assets which need to be loaded during runtime. Depending on how you bundle your client side resources, you may need to tweak your bundler so that it puts Liquid's assets into the right place and "tell" Liquid where to look for the assets.

## Tweaking the bundler and adjusting the assets path

Suppose you have a [Vue.js](https://vuejs.org/) application which requires you to put all statically served assets into a folder called `public` in the root directory of your project. You can copy over all Liquid assets into that folder by tweeking the rollup config as follows:

```js
// vite.config.js
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets/*',
          dest: 'public/assets',
        },
      ],
      hook: 'buildStart',
    }),
    // ...
  ],
  // ...
})
```

Now all you need to do is "tell" the Liquid components where they have to load their assets from by using [`setAssetPath`](https://github.com/ionic-team/stencil/blob/f09abe6455887025d508e645e7c8c024a5c42fa2/src/declarations/stencil-public-runtime.ts#L290):

```tsx
// main.ts
import { setAssetPath } from '@emdgroup-liquid/liquid/dist/components'

setAssetPath(window.location.origin)
```

> `setAssetPath` does not work for React bindings. Please take a look at the [React bindings docs](introduction/react-bindings#setting-the-asset-path) for an alternative approach.

For more examples check out our [sandbox apps](introduction/sandbox-applications/).

<docs-page-nav prev-href="introduction/css-vs-web-components/" next-title="Type checking and intellisense" next-href="introduction/type-checking-and-intellisense/"></docs-page-nav>
