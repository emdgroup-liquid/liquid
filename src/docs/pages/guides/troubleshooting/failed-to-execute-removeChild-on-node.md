---
eleventyNavigation:
  key: Failed to execute removeChild on Node
  parent: Troubleshooting
  order: 12
layout: layout.njk
title: Failed to execute removeChild on Node
permalink: guides/troubleshooting/failed-to-execute-removeChild-on-node/
---

# Failed to execute removeChild on Node

## Problem

Some components have a popper element which displays the slotted elements in a portal (a different place in the DOM). The [ld-context-menu](components/ld-context-menu/) component and the [ld-tooltip](components/ld-tooltip/) component are examples of such components. In order to keep all event listeners attached and working, the components move the original element including all the attached event listeners to the popper element.

In some cases this behavior can be problematic. For instance: If you are using a UI library which renders elements based on state (such as React or Vue) and have a conditionally rendered element as a direct child of a component that moves the `Node` to a different place in the DOM, you may run into the error:

> _Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node._

## Solution

The current workaround is to wrap the conditionally rendered element in another element.

<ld-badge icon="attention" style="--ld-badge-bg-col: var(--ld-thm-error); margin: 0 var(--ld-sp-6) 0 var(--ld-sp-2); transform: scale(1.2)" size="lg"></ld-badge> __Does not work:__

```jsx
export default function App() {
  const tetherOptions = {
    bodyElement: document.getElementById('root')
  }
  const [checked, setChecked] = useState(true)
  return (
    <>
      <LdButton onClick={() => { setChecked(!checked) }}>Toggle checked</LdButton>
      <LdTooltip arrow tetherOptions={tetherOptions as any} triggerType="click">
        {checked && <span>🤓</span>}
      </LdTooltip>
    </>
  );
}
```

<ld-badge icon="checkmark" style="--ld-badge-bg-col: var(--ld-thm-success); margin: 0 var(--ld-sp-6) 0 var(--ld-sp-2); transform: scale(1.2)" size="lg"></ld-badge> __Works:__

```jsx
export default function App() {
  const tetherOptions = {
    bodyElement: document.getElementById('root')
  }
  const [checked, setChecked] = useState(true)
  return (
    <>
      <LdButton onClick={() => { setChecked(!checked) }}>Toggle checked</LdButton>
      <LdTooltip arrow tetherOptions={tetherOptions as any} triggerType="click">
        <div>
          {checked && <span>🤓</span>}
        </div>
      </LdTooltip>
    </>
  );
}
```

<docs-page-nav prev-href="guides/sandbox-applications/" next-title="FAQ" next-href="guides/faq/"></docs-page-nav>