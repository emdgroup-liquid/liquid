---
eleventyNavigation:
  key: Select
  parent: Components
layout: layout.njk
title: Select
permalink: components/ld-select/
---

# ld-select

> 🚧 **Attention**: This component is work in progress. 🚧

## Examples

### Single select mode

{% example %}
<ld-select placeholder="Pick a fruit" style="width: 12rem;">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana">Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
</ld-select>
{% endexample %}

### Multiple select mode

{% example %}
<ld-select placeholder="Pick a fruit" multiple style="width: 12rem;">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana">Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
</ld-select>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                        | Type      | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `multiple`    | `multiple`    | Multiselect mode.                                                                                  | `boolean` | `false`     |
| `name`        | `name`        | Used to specify the name of the control.                                                           | `string`  | `undefined` |
| `placeholder` | `placeholder` | Used as trigger button label in multiselect mode and in single select mode if nothing is selected. | `string`  | `undefined` |


## Slots

| Slot       | Description             |
| ---------- | ----------------------- |
| `"popper"` | the select popper slot  |
| `"select"` | the select trigger slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
