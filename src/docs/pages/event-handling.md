---
eleventyNavigation:
  key: Event handling
  parent: Introduction
  order: 7
layout: layout.njk
title: Event handling
permalink: introduction/event-handling/
---


# Event handling

Liquid Oxygen aims to stick to the browser standards where possible. That is why we try to use as few custom events as possible. This is especially the case for components that are mainly meant to just "skin" native HTML elements with a Liquid Oxygen look, like `ld-input`. But Web Components are a bit tricky here: There are many events, especially the ones that are the result of a direct user interaction, like `click`, `focusin/focusout` that bubble just fine from inside a Web Component's shadow DOM into the light DOM. But others, like the `change` event, don't. The difference between those events is that the former are defined as [composed events](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed), while the latter are not.

We try to dispatch non-composed events by manually creating them on the Web Component's host elements, but they do not behave 1:1 like their native equivalents. This results in unexpected behavior, for example React "swallowing" `change` events that are created in such a way and event handlers set with the `onChange` prop not being invoked.

Because of that, Liquid Oxygen components dispatch custom events that are named like the native events they are meant to replace, but prefixed with "ld". So form components like `ld-input`, for example, dispatch an `ldchange` event. Which custom events are available is documented in the "Events" section of each component's documentation page.

## Examples

These examples show how to use the custom "ld"-prefixed events with Vanilla JS and React.

### Vanilla JS

```html
<ld-input id="example" />

<script>
const handleLdchange = () => {
  console.log('changed!')
}

document.getElementById("example").addEventListener('ldchange', handleLdchange)
</script>
```

### React

```jsx
const MyApp = () => {
  const handleLdchange = React.useCallback(() => {
    console.log('changed!')
  }, [])

  return <ld-input onLdchange={handleLdchange} />
}
```

> **Note:** React usually triggers event handlers set with the `onChange` prop differently than browsers actually handle `change` events. Event handlers set with the `onChange` prop usually are invoked everytime the element's value changes in React, while by definition the `change` event is only dispatched after the element loses focus.<br/><br/>Liquid Oxygen components stick to that browser default behavior and only dispatch the `ldchange`/`change` events after an element loses focus. Thus, you cannot expect an event handler set neither via `onLdchange` nor `onChange` to be invoked everytime the value changes. If you want that, the `input` event is exactly what you're looking for, so please use the `onInput` prop in these cases, instead. (There is no custom `ldinput` event, as the `input` event is a composed native event that bubbles into the light DOM.)

<docs-page-nav prev-href="introduction/server-side-rendering/" next-title="Form validation" next-href="introduction/form-validation/"></docs-page-nav>
