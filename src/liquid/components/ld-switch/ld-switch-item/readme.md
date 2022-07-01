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

| Property             | Attribute     | Description                                                            | Type      | Default     |
| -------------------- | ------------- | ---------------------------------------------------------------------- | --------- | ----------- |
| `autofocus`          | `autofocus`   | Automatically focus the form control when the page is loaded.          | `boolean` | `false`     |
| `checked`            | `checked`     | Indicates whether the radio button is selected.                        | `boolean` | `false`     |
| `disabled`           | `disabled`    | Disabled state of the radio.                                           | `boolean` | `undefined` |
| `form`               | `form`        | Associates the control with a form element.                            | `string`  | `undefined` |
| `label` _(required)_ | `label`       | The label of the switch item                                           | `string`  | `undefined` |
| `ldTabindex`         | `ld-tabindex` | Tab index of the input.                                                | `number`  | `undefined` |
| `name`               | `name`        | Used to specify the name of the control.                               | `string`  | `undefined` |
| `readonly`           | `readonly`    | The value is not editable.                                             | `boolean` | `undefined` |
| `required`           | `required`    | Set this property to `true` in order to mark the checkbox as required. | `boolean` | `undefined` |
| `value` _(required)_ | `value`       | The input value.                                                       | `string`  | `undefined` |


## Events

| Event                | Description                                                       | Type                   |
| -------------------- | ----------------------------------------------------------------- | ---------------------- |
| `ldswitchitemchange` | Emitted when the input value changed and the element loses focus. | `CustomEvent<string>`  |
| `ldswitchiteminput`  | Emitted when the input value changed.                             | `CustomEvent<boolean>` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the radio button.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"root"` |             |


----------------------------------------------

 
