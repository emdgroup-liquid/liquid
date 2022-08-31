---
eleventyNavigation:
  key: Sidenav Back
  parent: Sidenav
layout: layout.njk
title: Sidenav Back
permalink: components/ld-sidenav/ld-sidenav-back/
---

# ld-sidenav-back

The `ld-sidenav-back` component is a subcomponent for `ld-sidenav`.

Please refer to the [`ld-sidenav` documentation](components/ld-sidenav/#ld-sidenav-back) for usage examples.

---

## CSS Variables

| Variable                             | Description                                        |
|--------------------------------------|----------------------------------------------------|
| `--ld-sidenav-back-border-radius`    | Border radius of the `ld-sidenav-back` component.  |
| `--ld-sidenav-back-icon-size`        | Back icon size of the `ld-sidenav-back` component. |

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                              | Type               | Default     |
| ----------- | ------------ | -------------------------------------------------------- | ------------------ | ----------- |
| `backLabel` | `back-label` | Used as aria-label for the back button                   | `string`           | `'Back'`    |
| `key`       | `key`        | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`       | `ref`        | reference to component                                   | `any`              | `undefined` |


## Events

| Event           | Description       | Type               |
| --------------- | ----------------- | ------------------ |
| `ldSidenavBack` | Emitted on click. | `CustomEvent<any>` |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"back"`           |             |
| `"bg"`             |             |
| `"btn-back"`       |             |
| `"focusable"`      |             |
| `"icon"`           |             |
| `"icon-container"` |             |
| `"label"`          |             |
| `"slot-container"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
