---
eleventyNavigation:
  key: React
  parent: Getting started
  order: 1
layout: layout.njk
title: React
permalink: introduction/getting-started/react/
---

# React

Liquid Oxygen comes with [React](https://reactjs.org/) bindings for all Web Components. Although the rendered components are still Web Components, the bindings improve the developer experience by providing a more familiar API and a better integration with React.

On this page, you'll find detailed instructions on how to integrate Liquid Oxygen into your React project and how to use the components.

## Prerequisites

Liquid Oxygen is easy to integrate into an existing React project. We assume you already have a project set up. If not, you can create a new project with [Vite](https://vitejs.dev/).

```sh
npm create vite@latest your-project-name -- --template react-ts
```

For more information about this command and Vite, please refer to the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).<br />Although this guide assumes your project is using Typescript, all examples should also be applicable to JavaScript projects.

## Install

Add Liquid Oxygen to your project with the package manager of your choice.

```sh
npm install @emdgroup-liquid/liquid
```

<ld-notice>
  Liquid Oxygen works with any package manager (e.g. <code>npm</code>, <code>yarn</code> or <code>pnpm</code>). For simplicity, we use <code>npm</code> in this guide.
</ld-notice>

<!-- ### Import and register Web Components

The Web Components need to be registered before they can be used. Liquid Oxygen provides the `defineCustomElements` function to register all Liquid Oxygen components. The script loads components lazily only when used in your application. This reduces your bundle size and only loads required code at runtime.

Add the following code to your `App.tsx` file (or any similar file which is loaded for every page).

```tsx
// App.tsx
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
defineCustomElements()
``` -->

### Import stylesheet

All Web Components are loaded togehter with their styles embedded. Therefore we only need to import the global stylesheet for Liquid Oxygen.

Add the following code to your `App.tsx` file (or any similar file which is loaded for every page).

```tsx
// App.tsx
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
```

## Usage

When adding Liquid Oxygen components to a React project, it is crucial to use the React bindings. All components are imported from `@emdgroup-liquid/liquid/dist/react`. The bindings significantly improve JSX compatibility and your developer experience.

Let's have a look at how to add a [LdButton](components/ld-button/) to your project. This examnple also includes a [LdIcon](components/ld-icon/) as it helps you to check if Liquid Oxygen assets are loaded correctly.

```tsx
// SampleComponent.tsx
import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/react'

export function SampleComponent() {
  return (
    <LdButton>
      Click me!
      <LdIcon name="energy" />
    </LdButton>
  )
}
```

When you put this component on a page, you should see a blue button with the text "Click me!" and a lightning bolt icon.

### Events

Liquid Oxygen components aim to work similarly to native HTML elements as much as possible. In most cases, you can expect the same events and behavior from a Liquid Oxygen component and its native equivalent. Custom events are documented on the respective component pages.

Let's take our button from above and add a click handler.

```tsx
// SampleComponent.tsx
import { LdButton, LdIcon } from '@emdgroup-liquid/liquid/dist/react'

export function SampleComponent() {
  return (
    <LdButton onClick={() => alert('Clicked!')}>
      Click me!
      <LdIcon name="energy" />
    </LdButton>
  )
}
```

Please notice the camel case notation of the `onClick` prop. This is the expected [React convention](https://reactjs.org/docs/handling-events.html), which differs from the native `onclick` attribute ([see related documentation](https://html.spec.whatwg.org/dev/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects)). As we do not explicitly document these events, you need to apply this convention yourself. Typescript and your code editor's IntelliSense will assist you with that.

There are a few cases where native events of Web Components do not behave as expected by React. In these cases, Liquid Oxygen provides custom events prefixed with `ld` and documented on the respective component pages.

<ld-notice>
  LdInput <code>onChange</code> event invokes when the component loses focus (and the value changed). This is the standard browser behavior but differs from the native React <code>onChange</code> event. Use the <code>onInput</code> event in cases you want to handle user input immediately while typing. Find additional information in the <a href="guides/event-handling/">Event handling guide</a>.
</ld-notice>

## Sandboxes

This guide shows you how to get started with Liquid Oxygen in your React project. Additionally, we provide several sandbox applications showing how to use Liquid Oxygen in various environments:

- [Liquid + React + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind)
- [Liquid + React + CRA](https://codesandbox.io/p/github/emdgroup-liquid/liquid-sandbox-cra-tailwind/main)
- [Liquid + React + Next.js](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-next-tailwind)

If you run into issues integrating Liquid Oxygen, please [get in touch with us](https://github.com/emdgroup-liquid/liquid/discussions).

<docs-page-nav prev-href="introduction/getting-started/" next-title="Guides" next-href="guides/"></docs-page-nav>
