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
<ld-select placeholder="Pick a fruit">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana">Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry">Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach">Peach</ld-option>
  <ld-option value="grape">Grape</ld-option>
  <ld-option value="fuyu persimmon">Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear">Pear</ld-option>
  <ld-option value="pineapple">Pineapple</ld-option>
  <ld-option value="plum">Plum</ld-option>
</ld-select>
{% endexample %}

### Multiple select mode

{% example %}
<ld-select placeholder="Pick a fruit" multiple>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana">Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry">Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach">Peach</ld-option>
  <ld-option value="grape">Grape</ld-option>
  <ld-option value="fuyu persimmon">Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear">Pear</ld-option>
  <ld-option value="pineapple">Pineapple</ld-option>
  <ld-option value="plum">Plum</ld-option>
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
