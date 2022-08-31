---
eleventyNavigation:
  key: Switch Item
  parent: Switch
layout: layout.njk
title: Switch Item
permalink: components/ld-switch/ld-switch-item/
---

# ld-switch-item

The `ld-switch-item` component is a subcomponent for `ld-switch`.

Please refer to the [`ld-switch` documentation](components/ld-switch) for usage examples.


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                              | Type               | Default     |
| -------------- | --------------- | -------------------------------------------------------- | ------------------ | ----------- |
| `ariaDisabled` | `aria-disabled` | Alternative disabled state that keeps element focusable  | `string`           | `undefined` |
| `checked`      | `checked`       | Indicates whether the switch item is selected.           | `boolean`          | `false`     |
| `disabled`     | `disabled`      | Disabled state of the switch item.                       | `boolean`          | `undefined` |
| `key`          | `key`           | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`          | `ref`           | reference to component                                   | `any`              | `undefined` |
| `value`        | `value`         | The input value.                                         | `string`           | `undefined` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the switch item.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part              | Description                                   |
| ----------------- | --------------------------------------------- |
| `"content"`       | content container element                     |
| `"input"`         | the form input element                        |
| `"label"`         | text label container containing the main slot |
| `"label-element"` | wrapping label element                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
