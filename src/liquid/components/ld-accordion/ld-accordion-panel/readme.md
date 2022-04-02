---
eleventyNavigation:
  key: Accordion Panel
  parent: Accordion
layout: layout.njk
title: Accordion Panel
permalink: components/ld-accordion/ld-accordion-panel/
---

# ld-accordion-panel

The `ld-accordion-panel` component is a subcomponent for `ld-accordion`.

Please refer to the [`ld-accordion` documentation](components/ld-accordion) for usage examples.

---

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Events

| Event                        | Description                                   | Type                  |
| ---------------------------- | --------------------------------------------- | --------------------- |
| `ldaccordionmaxheightchange` | Emitted on accordion panel max-height change. | `CustomEvent<number>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"content"` |             |


## Dependencies

### Used by

 - [ld-sidenav-accordion](../../ld-sidenav/ld-sidenav-accordion)

### Graph
```mermaid
graph TD;
  ld-sidenav-accordion --> ld-accordion-panel
  style ld-accordion-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
