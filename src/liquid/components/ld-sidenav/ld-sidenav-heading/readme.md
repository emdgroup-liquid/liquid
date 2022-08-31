---
eleventyNavigation:
  key: Sidenav Heading
  parent: Sidenav
layout: layout.njk
title: Sidenav Heading
permalink: components/ld-sidenav/ld-sidenav-heading/
---

# ld-sidenav-heading

The `ld-sidenav-heading` component is a subcomponent for `ld-sidenav`.

Please refer to the [`ld-sidenav` documentation](components/ld-sidenav/#ld-sidenav-heading) for usage examples.

---

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"typo"` |             |


## Dependencies

### Depends on

- [ld-typo](../../ld-typo)

### Graph
```mermaid
graph TD;
  ld-sidenav-heading --> ld-typo
  style ld-sidenav-heading fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
