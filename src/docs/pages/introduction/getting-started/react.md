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

## Cookbook

### React Router

[React Router](https://reactrouter.com/) is a widely used library for routing in client-side react applications. This recipe shows you how to integrate Liquid Oxygen navigation components with React Router. Although the recipe is based on React Router, interacting with other libraries should look quite similar.

Liquid Oxygen provides some sophisticated components for navigation. This recipe uses the following:

- [LdSidenav](/components/ld-sidenav/) is the recommended navigation solution for most applications using Liquid Oxygen. It is flexible, responsive and provides multiple levels of navigation.
- [LdBreadcrumbs](/components/ld-breadcrumbs/) component is a simple way to display the current location in your application.

As this recipe focuses on how to put together Liquid Oxygen and React Router, we'll only highlight the relevant parts of the code. We assume you already have a basic React Router setup in place. If not, please refer to the [React Router documentation](https://reactrouter.com/en/start/tutorial).

Let's get started with routing. We cannot use the `<Link>` component provided by React Router within LdSidenavNavitem, therefore we use the [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) hook to navigate to a different route.

```tsx
// Sidebar.tsx
//...
const navigate = useNavigate()

const handleLink = useCallback(
  (e: React.MouseEvent) => {
    e.preventDefault()
    const href = (e.target as HTMLLdSidenavNavitemElement).href
    if (href) {
      navigate(href)
    }
  },
  [navigate]
)

return (
  // ...
  <LdSidenavNavitem
    href={`/mathematical-foundations/discrete-mathematics`}
    onClick={handleLink}
  >
    Discrete Mathematics
  </LdSidenavNavitem>
  // ...
)
// ...
```

The `href` prop of `LdSidenavNavitem` tells the component to add `LdLink` which renders a proper anchor tag. This is important for accessibility. As this would already work to navigate but bypass the client-side navigation of React Router, we also add a click handler. The click handler uses the `navigate` function from the `useNavigate` hook to navigate to the specified href. `preventDefault()` is called to prevent the default behavior of the anchor tag.

`LdSidenav` provides visual indicators for an active item. We can use the `pathname` property of the `useLocation()` hook provided by React Router to determine the active route and set `selected` accordingly.

```tsx
// Sidebar.tsx
//...
const { pathname } = useLocation()

return (
  // ...
  <LdSidenavNavitem
    href={`/mathematical-foundations/discrete-mathematics`}
    onClick={handleLink}
    selected={pathname === '/mathematical-foundations/discrete-mathematics'} // Depending on your routes, you'll need a more sophisicated evaluation here
  >
    Discrete Mathematics
  </LdSidenavNavitem>
  // ...
)
// ...
```

Using the same hooks, you can generate breadcrumbs from `pathname`. It's on you to resolve the path to human readable lables.

```tsx
// Breadcrumbs.tsx
// ...
const navigate = useNavigate()
const { pathname } = useLocation()
const crumbs = useResolvedCrumbs(pathname) // This is up to you 😉

const handleLink = useCallback(
  (e: React.MouseEvent) => {
    e.preventDefault()
    const href = (e.target as HTMLLdCrumbElement).href
    if (href) {
      navigate(href)
    }
  },
  [navigate]
)

return (
  <LdBreadcrumbs>
    {crumbs.map((crumb) => (
      <LdCrumb key={crumb.label} onClick={handleLink} href={crumb.href}>
        {crumb.label}
      </LdCrumb>
    ))}
  </LdBreadcrumbs>
)
// ...
```

Similar to `LdSidenavNavitem`, `LdCrumb` uses `LdLink` to render an anchor tag. Therefore, we need to add a click handler again to navigate to the specified href.

## Sandboxes

This guide shows you how to get started with Liquid Oxygen in your React project. Additionally, we provide several sandbox applications showing how to use Liquid Oxygen in various environments:

- [Liquid + React + Vite](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind)
- [Liquid + React + CRA](https://codesandbox.io/p/github/emdgroup-liquid/liquid-sandbox-cra-tailwind/main)
- [Liquid + React + Next.js](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-next-tailwind)

If you run into issues integrating Liquid Oxygen, please [get in touch with us](https://github.com/emdgroup-liquid/liquid/discussions).

<docs-page-nav prev-href="introduction/getting-started/" next-title="Guides" next-href="guides/"></docs-page-nav>
