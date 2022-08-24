---
eleventyNavigation:
  key: Troubleshooting
  parent: Guides
  order: 11
layout: layout.njk
title: Troubleshooting
permalink: guides/troubleshooting/
---

# Troubleshooting

Below we collect tips which may help you troubleshoot known issues.

---

## Popped-out element is rendered outside application root

**Problem**

Some components have a popper element that needs to stay above every other element when popped out. The [ld-select](components/ld-select/) component and the [ld-tooltip](components/ld-tooltip/) component are two examples of such components. By default, this is achieved by rendering the popped-out element as a direct child of the `body` element.

However, especially when using a UI library, such as React or Vue, this default behavior can be problematic, because your application may have been mounted on an element within the `body` element. __This may result in event handlers not being called__, because the event listeners may be attached to the root element of the application and not the `body` element.

**Solution**

All components, which have a popper element, can be configured to pop out within a specific element. Here is an example on how you can do this in a React application:

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

<docs-page-nav prev-href="guides/sandbox-applications/" next-title="FAQ" next-href="guides/faq/"></docs-page-nav>
