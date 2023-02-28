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

Some components (e.g. `ld-icon`) require static assets during runtime.

By default, Liquid Oxygen components will fetch these assets via [jsDelivr](https://www.jsdelivr.com/). JsDelivr is a free CDN for open source projects. However, as we cannot guarantee the availability and performance of this CDN, we recommend bundling the assets with your application.

Copy the assets from the Liquid Oxygen package to your application. We recommend including copying these assets in your build process, which ensures that the assets are always up to date.

<ld-notice>
  You should add the copied assets (e.g. <code>public/liquid/assets/*</code>) to your <code>.gitignore</code> file.
</ld-notice>

For the following example, we assume you are using [Vite](https://vitejs.dev/). By default, Vite uses the `public` folder for static assets. To include the Liquid Oxygen assets in your output bundle, you can copy them to this folder.

First, install the `rollup-plugin-copy` plugin. This plugin allows you to copy files and folders while building.

```sh
npm install rollup-plugin-copy -D
```

Now include the copy plugin in your Vite config. Add the following code to your `vite.config.ts` file. This will copy the Liquid Oxygen assets from the 'node_modules' folder to the 'public' folder, so Vite will bundle them.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets/*',
          dest: 'public/liquid/assets',
        },
      ],
      hook: 'buildStart',
    }),
    // ...other plugins e.g. react()
  ],
  // ...other config options
})
```

You need to "tell" Liquid Oxygen where to find the assets. The components will look for the `__LD_ASSET_PATH__` variable in the `window` object. The path should point to the `liquid/` folder.

You have 2 options:

1. Specify the asset path using a metadata element in the document head section:
  ```html
  // index.html
  <meta data-ld-asset-path="/">
  ```

2. Specify the asset path by setting the `__LD_ASSET_PATH__` variable on the `window` object:
  ```tsx
  // main.tsx
  // if-clause only required in server-side rendering context
  if (typeof window !== "undefined") {
    window.__LD_ASSET_PATH__ = window.location.origin
  }
  ```

Once the asset path is set and the assets are availe on runtime, all components can automatically load their assets.

If this example does not suit your environment, please refer to our sandbox apps for more details and alternative bundlers:

- [Liquid + React + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind?file=vite.config.ts)<br />This sandbox is quite similar to the example above.
- [Liquid + React + CRA](https://codesandbox.io/p/github/emdgroup-liquid/liquid-sandbox-cra-tailwind/main?file=%2Fpackage.json)<br />The Sandbox uses Create React App which does not allow to adjust the Webpack config. In this case we added a postinstall script to copy the assets to the public folder.
- [Liquid + React + Next.js](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-next-tailwind?file=next.config.js)<br />Next.js uses Webpack under the hood. The sandbox shows how to add a custom Webpack config `next.config.js` to copy the assets to the public folder.

<docs-page-nav prev-href="guides/css-vs-web-components/" next-title="Type checking and intellisense" next-href="guides/type-checking-and-intellisense/"></docs-page-nav>
