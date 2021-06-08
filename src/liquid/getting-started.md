---
eleventyNavigation:
  key: Getting started
  parent: Liquid
  order: 1
layout: layout.njk
title: Getting started
permalink: liquid/getting-started/
---

# Getting Started

## Import and register Web Components

We recommend importing and registering Liquid Web Components in a central place respectively the entry file of your application.

There are two options to choose from when importing and registering Liquid Web Components. Depending on your needs you should choose one or the other.

### self-lazy-loading bundle

The _self-lazy-loading bundle_ is a tree shakable bundle, which includes all Liquid components as well as polyfills. You just import it once, then it automatically loads components lazily whenever they are used in your app.

```js
import { defineCustomElements } from '@emdgroup-liquid/liquid'

defineCustomElements()
```

### custom-elements bundle

The _custom-elements bundle_ is a tree-shakable bundle that does not apply polyfills, nor define any custom element automatically. Using this bundle may be preferred for projects that will handle bundling, lazy-loading and defining the custom elements themselves.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/custom-elements'

customElements.define('ld-button', LdButton)
```

Learn more about the differences in the [Stencil docs](https://stenciljs.com/docs/distribution#how-is-this-different-than-dist-custom-elements-bundle-output-target).

## Import stylesheets

We recommend importing Liquid stylesheets in a central place respectively the entry file of your application.

There are two options to choose from when importing stylesheets from Liquid. Depending on your needs you should choose one or the other.

1. If you are using [PurgeCSS](https://purgecss.com/) you can import all styles from Liquid and let PurgeCSS remove unused classes from your bundle, no matter if you are using Web Components or CSS Components from liquid:

```js
import '@emdgroup-liquid/liquid/dist/css/liquid.css'
```

2. If you are not using [PurgeCSS](https://purgecss.com/), or anything similar, you should import only what you need in order to keep your bundle small.
   When using Liquid you will always need to import a CSS file containing global styles (shared CSS custom properties, shared utils, font imports...). If you are using CSS Components (as opposed to Web Components), you will also need to import the CSS of the components you are using. An example:

```js
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import '@emdgroup-liquid/liquid/dist/css/ld-button.css'
```

<docs-page-nav prev-href="/" next-title="Type checking and intellisense" next-href="/liquid/type-checking-and-intellisense/"></docs-page-nav>