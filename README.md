# Liquid

[![Join us on GitHub discussions](https://img.shields.io/badge/Join%20us-on%20GitHub%20discussions-blue?style=flat&color=0F69AF)](https://github.com/emdgroup-liquid/liquid/discussions)
[![Join us on Teams](https://img.shields.io/badge/Join%20us-on%20Teams-blue?style=flat&color=503291)](https://teams.microsoft.com/l/channel/19%3ab5381a933c6c413ea0ae41c3b424acd8%40thread.skype/Liquid%2520Design%2520System?groupId=babb6c18-c13f-43ef-baf2-ce1617f228cd&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat&color=B93679)](https://github.com/semantic-release/semantic-release)

> ⚠️  **Important**: Liquid is currently in its early development stage and subject to major changes.

Liquid is a UI component library based on the [Liquid Design System](https://lds.merck.design/), focusing on accessibility and interoperability. It's built with [Stencil.js](https://stenciljs.com) and contains, inter alia, CSS components and Web Components, bundled in several bundle formats, which you can use in a wide veriaty of plattforms and projects.

## Install

### Import and register web components

We recommend importing and registering liquid web components in a central place respectively the entry file of your application.

There are two options to choose from when importing and registering liquid web components. Depending on your needs you should choose one or the other.

> **Note**: In the following examples we assume a server-side rendering environment, so we make sure that client-side code runs only on client-side. 
#### self-lazy-loading bundle

The _self-lazy-loading bundle_ is a tree shakable bundle, which includes all liquid components as well as polyfills. You just import it once, then it automatically loads components lazily whenever they are used in your app.

```js
import { defineCustomElements } from '@emdgroup-liquid/liquid'

if (typeof window !== 'undefined') defineCustomElements()
```

#### custom-elements bundle

The _custom-elements bundle_ is a tree-shakable bundle that does not apply polyfills, nor define any custom element automatically. Using this bundle may be preferred for projects that will handle bundling, lazy-loading and defining the custom elements themselves.

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/custom-elements'

if (typeof window !== 'undefined') {
  import('@emdgroup-liquid/liquid/dist/custom-elements').then((module) => {
    const { LdButton } = module
    customElements.define('ld-button', LdButton)
  })
}
```

Learn more about the differences in the [Stencil docs](https://stenciljs.com/docs/distribution#how-is-this-different-than-dist-custom-elements-bundle-output-target).

### Import stylesheets

We recommend importing liquid stylesheets in a central place respectively the entry file of your application.

There are two options to choose from when importing stylesheets from liquid. Depending on your needs you should choose one or the other.

1. If you are using [PurgeCSS](https://purgecss.com/) you can import all styles from liquid and let PurgeCSS remove unused classes from your bundle, no matter if you are using web components or CSS components from liquid:

```js
import '@emdgroup-liquid/liquid/dist/css/liquid.css'
```

2. If you are not using PurgeCSS, or anything similar, you should import only what you need in order to keep your bundle small. 
When using liquid you will always need to import a CSS file containing global styles (shared CSS custom properties, shared utils, font imports...). If you are using CSS components (as opposed to web components), you will also need to import the CSS of the components you are using. An example:

```js
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import '@emdgroup-liquid/liquid/dist/css/ld-button.css'
```

### Type checking and intellisense

liquid comes with Typescript type definitions and hense allows for type checking and intellisense. Both is currently supported in JSX and plain HTML only and an additional setup step is required.

#### With JSX

Typescript checks expressions in JSX. Since it does not “know about” liquid web components, it will “complain” as soon as it “sees” one with an error message like the following:

> Property 'ld-button' does not exist on type 'JSX.IntrinsicElements'

In order to let Typescript “know about” liquid's web components, you'll have to decalare a JSX namespace including all liquid components:

```ts
import { JSX as LocalJSX } from '@emdgroup-liquid/liquid/dist/loader'
import { HTMLAttributes } from 'react' // or from 'vue'

type LiquidElements<T> = {
  [P in keyof T]?: T[P] &
  Omit<HTMLAttributes, 'className'> & {
    class?: string
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends LiquidElements<LocalJSX.IntrinsicElements> {}
  }
}
```

Learn more about JSX in Typescript in the [Typescript docs](https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking).

#### With vanilla HTML

Type checking is not yet supported in vanilla HTML, but intellisense can be enabled in Visual Studio Code by adding the [custom data](https://code.visualstudio.com/api/extension-guides/custom-data-extension) setting to `.vscode/settings.json` in the root directory of your project:

```json
{
  "html.customData": [
    "./node_modules/@emdgroup-liquid/liquid/dist/web-components.html-data.json"
  ]
}
```

The format of the referenced JSON file, which includes type information about each web component, doesn't follow a common standard, but is Visual Studio Code specific. Discussions on a standard, which eventually will lead to support in more editors, is (at the time of writing) [still ongoing](https://github.com/WICG/webcomponents/issues/776). Probably due to the fact that there is no standard yet, VS Code extensions are not yet making use of the custom data feature. Hense intellisense is not yet working in Vue templates, Svelte markup etc.

[Some efforts](https://youtrack.jetbrains.com/issue/WEB-39620) are also being made to enable intellisense for web components in Intellij editors, but we are not there yet.

## Server-side rendering

Most of the examples above where given with SSR in mind. Custom elements should be defined on client-side only. Make sure you implement a condition which checks for the environment such as the following ones:

```js
if (typeof window !== 'undefined') { defineCustomElements() } // i.e. in Gatsby or
if (process.browser) { defineCustomElements() } // i.e. in Next.js
```

If you run into warnings or errors mentioning **hydration** or some sort of client-server missmatch, it has most likely to do with code being executed on server-side which should be executed on client-side only.

For instance in [Next.js](https://nextjs.org/), even after conditionally defining custom elements on client-side only, you may run into the following warning, when adding event handlers to liquid components:

> Warning: Extra attributes from the server

You can work around this issue by conditionally passing handlers to the component: 
```jsx
<ld-button onClick={process.browser ? handleClick : undefined}>click me</ld-button>
```

For convenience, you can create a conditional object which holds all your handlers on client-side and then reference your handlers via that object:

```js
const methods = process.browser ? {
  handleClick: () => { /* ... */ }
} : {}
```

```jsx
<ld-button onClick={methods.handleClick}>click me</ld-button>
```

Please note that the issue described above is Next.js specific, so you'll have to handle it in your app, if you are using Next.js.