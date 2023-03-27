---
eleventyNavigation:
  key: Menuitem Group
  parent: Context Menu
layout: layout.njk
title: Menuitem Group
permalink: components/ld-context-menu/ld-menuitem-group/
---

# ld-menuitem-group

The `ld-menuitem-group` component is a subcomponent for `ld-context-menu`.

Please refer to the [`ld-context-menu` documentation](components/ld-context-menu) for usage examples.

---

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                              | Type               | Default     |
| ----------- | ------------ | -------------------------------------------------------- | ------------------ | ----------- |
| `ariaLabel` | `aria-label` | Label for the menu item group.                           | `string`           | `undefined` |
| `key`       | `key`        | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`       | `ref`        | reference to component                                   | `any`              | `undefined` |


## Shadow Parts

| Part         | Description                            |
| ------------ | -------------------------------------- |
| `"list"`     | `ul` element wrapping the default slot |
| `"listitem"` | `li` element wrapping the `ul` element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
