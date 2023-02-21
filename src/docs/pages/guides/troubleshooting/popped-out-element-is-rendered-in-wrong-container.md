---
eleventyNavigation:
  key: Popped-out element is rendered in wrong container
  parent: Troubleshooting
  order: 11
layout: layout.njk
title: Popped-out element is rendered in wrong container
permalink: guides/troubleshooting/popped-out-element-is-rendered-in-wrong-container/
---

# Popped-out element is rendered in wrong container

## Problem

Some components have a popper element that needs to stay above every other element when popped out. The [ld-select](components/ld-select/) component and the [ld-tooltip](components/ld-tooltip/) component are two examples of such components. By default, this is achieved by rendering the popped-out element as a direct child of the `body` element.

However, in some cases this default behavior can be problematic. For instance:

- When using the component within the [ld-modal](components/ld-modal/) component, the browser may render the dialog element above the popped-out element.
- When using a UI library, such as React or Vue, your application may have been mounted on an element within the `body` element. **This may result in event handlers not being called**, because the event listeners may be attached to the root element of the application and not the `body` element.
- When you want the popped-out element to be rendered within a container with specific dimensions and overflow settings.

## Solution

All components, which have a popper element, can be configured to pop out within a specific element using the `tetherOptions` property, which expects an object of options, including the `bodyElement` option. Use this option to specify the container, which shall become the parent element for the popped-out element. Please refer to the [Tether documentation](https://tetherjs.dev/) for more information on available options.

Here is an example on how you can specify the application root element as the `bodyElement` in a React application:

```jsx
export default function App() {
  const tetherOptions = {
    bodyElement: document.getElementById('root')
  }
  return (
    <>
      <LdTooltip tetherOptions={tetherOptions} triggerType="click">
        <LdButton slot="trigger">File context menu</LdButton>
        <LdButton onClick={/* ... */}>Copy URL</LdButton>
        <LdButton onClick={/* ... */}>Download</LdButton>
      </LdTooltip>
    </>
  )
}
```

This example demonstrates how you can specify the `bodyElement` when using the [ld-modal](components/ld-modal/) component:

```jsx
export default function App() {
  const modalRef = useRef(null)
  const tetherOptions = {
    bodyElement: modalRef.current,
    constraints: [{ to: 'scrollParent' }],
  }
  const [open, setOpen] = useState(false)
  return (
    <>
      <LdModal
        onLdmodalclosed={() => setOpen(false)}
        open={open}
        ref={modalRef}
      >
        <LdTypo slot="header">We make a fruit salat!</LdTypo>
        <LdSelect
          name="fruit"
          placeholder="Pick a fruit"
          tetherOptions={tetherOptions}
        >
          <LdOption value="apple">Apple</LdOption>
          <LdOption value="banana">Banana</LdOption>
        </LdSelect>
      </LdModal>
      <LdButton
        onClick={() => {
          setOpen(true)
        }}
      >
        Open Modal
      </LdButton>
    </>
  )
}
```

<docs-page-nav prev-href="guides/sandbox-applications/" next-title="FAQ" next-href="guides/faq/"></docs-page-nav>