---
eleventyNavigation:
  key: Component assets
  parent: Guides
  order: 2
layout: layout.njk
title: Component assets
permalink: guides/component-assets/
---

# Component assets

Some Liquid Web Components include assets which need to be loaded during runtime. Depending on how you bundle your client side resources, you may need to tweak your bundler so that it puts Liquid's assets into the right place and "tell" Liquid where to look for the assets.

## Tweaking the bundler and adjusting the assets path

Suppose you are using [Vite](https://vitejs.dev/) which by default requires you to put statically served assets into a folder called [`public`](https://vitejs.dev/guide/assets.html#the-public-directory) in the root directory of your project. You can copy over all Liquid assets into that folder by tweeking the Vite config as follows:

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

Now all you need to do is "tell" the Liquid components where they have to load their assets from. You have two options here.

1. Specify the asset path using a metadata element in the document head section:
  ```html
  <meta data-ld-asset-path="/">
  ```

2. Specify the asset path by setting the `__LD_ASSET_PATH__` variable on the `window` object:
  ```tsx
  // if-clause only required in server-side rendering context
  if (typeof window !== "undefined") {
    window.__LD_ASSET_PATH__ = window.location.origin + '/path/to/your/assets/';
  }
  ```

For more examples check out our [sandbox apps](guides/sandbox-applications/).

<docs-page-nav prev-href="guides/css-vs-web-components/" next-title="Type checking and intellisense" next-href="guides/type-checking-and-intellisense/"></docs-page-nav>
