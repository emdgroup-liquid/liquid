---
eleventyNavigation:
  key: Tab List
  parent: Tabs
layout: layout.njk
title: Tab List
permalink: components/ld-tabs/ld-tablist/
---

# ld-tablist

The `ld-tablist` component is a subcomponent for `ld-tabs`.

Please refer to the [`ld-tabs` documentation](components/ld-tabs) for usage examples.

---


<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                              | Type                                     | Default     |
| --------- | --------- | -------------------------------------------------------- | ---------------------------------------- | ----------- |
| `key`     | `key`     | for tracking the node's identity when working with lists | `string \| number`                       | `undefined` |
| `mode`    | `mode`    | Display mode.                                            | `"brand-color" \| "ghost"`               | `undefined` |
| `ref`     | `ref`     | reference to component                                   | `any`                                    | `undefined` |
| `rounded` | `rounded` | Sets border radii.                                       | `"all" \| "all-lg" \| "top" \| "top-lg"` | `undefined` |
| `size`    | `size`    | Size of the tabs.                                        | `"lg" \| "sm"`                           | `undefined` |


## Shadow Parts

| Part                 | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `"arrow"`            | Both arrow button elements                             |
| `"arrow-icon"`       | Both arrow icon SVGs                                   |
| `"arrow-icon-left"`  | Left arrow icon SVG                                    |
| `"arrow-icon-right"` | Right arrow icon SVG                                   |
| `"arrow-left"`       | Left arrow button element                              |
| `"arrow-right"`      | Right arrow button element                             |
| `"scroll-container"` | Container wrapping the slot                            |
| `"wrapper"`          | Container wrapping the arrows and the scroll-container |


----------------------------------------------

 
