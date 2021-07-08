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
<ld-select placeholder="Pick some fruits" multiple>
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

### Disabled

{% example %}
<ld-select placeholder="Pick a fruit" disabled>
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

<ld-select placeholder="Pick some fruits" multiple disabled>
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

<ld-select placeholder="Pick a fruit" disabled>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
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

<ld-select placeholder="Pick some fruits" multiple disabled>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach">Peach</ld-option>
  <ld-option value="grape">Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear">Pear</ld-option>
  <ld-option value="pineapple">Pineapple</ld-option>
  <ld-option value="plum">Plum</ld-option>
</ld-select>
{% endexample %}

**If you want the select to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-select placeholder="Pick a fruit" aria-disabled="true">
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

<ld-select placeholder="Pick some fruits" multiple aria-disabled="true">
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

<ld-select placeholder="Pick a fruit" aria-disabled="true">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
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

<ld-select placeholder="Pick some fruits" multiple aria-disabled="true">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry">Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach">Peach</ld-option>
  <ld-option value="grape">Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear">Pear</ld-option>
  <ld-option value="pineapple">Pineapple</ld-option>
  <ld-option value="plum">Plum</ld-option>
</ld-select>
{% endexample %}


### Detached

{% example %}
<ld-select placeholder="Pick a fruit" mode="detached">
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

### Inline

{% example %}
<ld-select placeholder="Pick a fruit" mode="inline">
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

### Ghost

{% example %}
<ld-select placeholder="Pick a fruit" mode="ghost">
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

| Property             | Attribute             | Description                                                                                        | Type                                | Default     |
| -------------------- | --------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `disabled`           | `disabled`            | Disabled state of the component.                                                                   | `boolean`                           | `false`     |
| `mode`               | `mode`                | Display mode.                                                                                      | `"detached" \| "ghost" \| "inline"` | `undefined` |
| `multiple`           | `multiple`            | Multiselect mode.                                                                                  | `boolean`                           | `false`     |
| `name`               | `name`                | Used to specify the name of the control.                                                           | `string`                            | `undefined` |
| `placeholder`        | `placeholder`         | Used as trigger button label in multiselect mode and in single select mode if nothing is selected. | `string`                            | `undefined` |
| `popperClass`        | `popper-class`        | Attached as CSS class to the select popper element.                                                | `string`                            | `undefined` |
| `preventDeselection` | `prevent-deselection` | Prevents a state with no options selected after initial selection in single select mode.           | `boolean`                           | `false`     |
| `tetherOptions`      | `tether-options`      | Stringified tether options object to be merged with the default options.                           | `string`                            | `'{}'`      |


## Events

| Event    | Description                                                                                            | Type                    |
| -------- | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| `blur`   | Emitted with an array of selected values when the select component looses focus.                       | `CustomEvent<string[]>` |
| `change` | Emitted with an array of selected values when an alteration to the selection is committed by the user. | `CustomEvent<string[]>` |
| `input`  | Emitted with an array of selected values when an alteration to the selection is committed by the user. | `CustomEvent<string[]>` |


## Slots

| Slot     | Description                                    |
| -------- | ---------------------------------------------- |
|          | the default slot contains the select options   |
| `"icon"` | replaces caret with custom trigger button icon |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
