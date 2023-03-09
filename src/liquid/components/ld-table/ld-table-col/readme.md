---
eleventyNavigation:
  key: Table Column
  parent: Table
layout: layout.njk
title: Table Column
permalink: components/ld-table/ld-table-col/
---

# ld-table-col

The `ld-table-col` component is a subcomponent for `ld-table`.

Please refer to the [`ld-table` documentation](components/ld-table/) for usage examples.

---

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                              | Type               | Default     |
| -------- | --------- | ------------------------------------------------------------------------ | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists                 | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                                   | `any`              | `undefined` |
| `span`   | `span`    | indicating the number of consecutive columns the colgroup element spans. | `number`           | `undefined` |


## Shadow Parts

| Part    | Description            |
| ------- | ---------------------- |
| `"col"` | the actual col element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
