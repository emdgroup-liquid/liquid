---
eleventyNavigation:
  key: Component assets
  parent: Liquid
  order: 3
layout: layout.njk
title: CSS vs. Web Components
permalink: liquid/component-assets/
---

# Component assets

Some Liquid Web Components include assets which need to be loaded during runtime. Depending on how you bundle your client side resources, you may need to tweak your bundler so that it puts Liquid's assets into the right place and "tell" Liquid where to look for the assets.

## Tweaking the bundler and adjusting the assets path

Suppose you have a [Next.js](https://nextjs.org/) application which requires you to put all statically served assets into a folder called `public` in the root directory of your project. You can copy over all Liquid assets into that folder by tweeking the webpack config as follows:

```js
// next.config.js
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  webpack: (config) => {
    config.plugins.push(new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets',
          to: path.join(__dirname, 'public/assets'),
        }
      ]
    }))
    return config
  },
}
```

Now all you need to do is "tell" the Liquid components where they have to load their assets from by using [`setAssetPath`](https://github.com/ionic-team/stencil/blob/f09abe6455887025d508e645e7c8c024a5c42fa2/src/declarations/stencil-public-runtime.ts#L290):

```tsx
// _app.tsx
import { defineCustomElements, setAssetPath } from '@emdgroup-liquid/liquid'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    setAssetPath(location.origin)
    defineCustomElements()
  }, []);

  return <Component {...pageProps} />
}
```

<docs-page-nav prev-href="liquid/css-vs-web-components/" next-title="Type checking and intellisense" next-href="liquid/type-checking-and-intellisense/"></docs-page-nav>