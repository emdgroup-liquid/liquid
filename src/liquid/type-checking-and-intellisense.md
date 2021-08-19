---
eleventyNavigation:
  key: Type checking and intellisense
  parent: Liquid
  order: 4
layout: layout.njk
title: Type checking and intellisense
permalink: liquid/type-checking-and-intellisense/
---

# Type checking and intellisense

Liquid comes with Typescript type definitions and hense allows for type checking and intellisense. Both is currently supported in JSX and plain HTML only and an additional setup step is required.

## With JSX

Typescript checks expressions in JSX. Since it does not “know about” Liquid Web Components, it will “complain” as soon as it “sees” one with an error message like the following:

> Property 'ld-button' does not exist on type 'JSX.IntrinsicElements'

In order to let Typescript “know about” Liquid Web Components, you'll have to decalare a JSX namespace including all Liquid components:

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

## With vanilla HTML

Type checking is not yet supported in vanilla HTML, but intellisense can be enabled in Visual Studio Code by adding the [custom data](https://code.visualstudio.com/api/extension-guides/custom-data-extension) setting to `.vscode/settings.json` in the root directory of your project:

```json
{
  "html.customData": [
    "./node_modules/@emdgroup-liquid/liquid/dist/web-components.html-data.json"
  ]
}
```

The format of the referenced JSON file, which includes type information about each Web Component, doesn't follow a common standard, but is Visual Studio Code specific. Discussions on a standard, which eventually will lead to support in more editors, is (at the time of writing) [still ongoing](https://github.com/WICG/webcomponents/issues/776). Probably due to the fact that there is no standard yet, VS Code extensions are not yet making use of the custom data feature. Hense intellisense is not yet working in Vue templates, Svelte markup etc.

[Some efforts](https://youtrack.jetbrains.com/issue/WEB-39620) are also being made to enable intellisense for Web Components in Intellij editors, but we are not there yet.

<docs-page-nav prev-href="liquid/component-assets/" next-title="Server-side rendering" next-href="liquid/server-side-rendering/"></docs-page-nav>