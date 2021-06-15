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

{% example %}
<ld-select>
  <ld-option value="">Pick a fruit</ld-option>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana">Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
</ld-select>

<script>
function change() {
  const newItem = document.createElement("ld-option")
  newItem.innerText = 'Orange'
  document.getElementById('popper').appendChild(newItem)
}
</script>
<button onclick="change()">change</button>
{% endexample %}



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------- | --------- | ----------- |
| `label`    | `label`    | Used as trigger button label in multiselect mode. | `string`  | `undefined` |
| `multiple` | `multiple` | Multiselect mode.                                 | `boolean` | `false`     |
| `name`     | `name`     | Used to specify the name of the control.          | `string`  | `undefined` |


## Slots

| Slot       | Description             |
| ---------- | ----------------------- |
| `"popper"` | the select popper slot  |
| `"select"` | the select trigger slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
