---
eleventyNavigation:
  key: Select
  parent: Components
layout: layout.njk
title: Select
permalink: components/ld-select/
tags:
  - select
  - dropdown
---

<link rel="stylesheet" href="css_components/ld-select.css">
<link rel="stylesheet" href="css_components/ld-icon.css">
<link rel="stylesheet" href="css_components/ld-input-message.css">
<link rel="stylesheet" href="css_components/ld-label.css">

# ld-select

The `ld-select` component represents a control that provides a menu of options. This control can be used in forms to accept a selection of these options from the user.

The feature set of the `ld-select` Web Component differs from its CSS Component counterpart. While the first offers more display and input modes, the latter is a lightweight alternative, which only styles the native HTML select element.

## Examples

### Single select mode

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit">
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

<!-- CSS component -->

<div class='ld-select'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>
{% endexample %}

#### Prevent deselection

You can prevent a state with no options selected after initial selection in single select mode.

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" prevent-deselection>
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
<ld-select placeholder="Pick some fruits" name="fruits" multiple>
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

#### Width

You may have noticed, that in multiple mode the component grows horizontally with the number of selected options. You can prevent this behaviour by either applying a `width` or a `max-width` style on the `ld-select` element:

{% example %}
<style>
.my-select-width {
  width: 14rem;
}
.my-select-max-width {
  max-width: 24rem;
}
</style>

<ld-select class="my-select-width" placeholder="Pick some fruits" name="fruits" multiple>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry" selected>Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach" selected>Peach</ld-option>
  <ld-option value="grape" selected>Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear" selected>Pear</ld-option>
  <ld-option value="pineapple" selected>Pineapple</ld-option>
  <ld-option value="plum" selected>Plum</ld-option>
</ld-select>

<ld-select class="my-select-max-width" placeholder="Pick some fruits" name="fruits" multiple>
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry" selected>Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach" selected>Peach</ld-option>
  <ld-option value="grape" selected>Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear" selected>Pear</ld-option>
  <ld-option value="pineapple" selected>Pineapple</ld-option>
  <ld-option value="plum" selected>Plum</ld-option>
</ld-select>
{% endexample %}

#### Max rows

If you have limited vertical space (this may especially be the case on mobile devices), you can define a maximum of available rows of the select trigger element, which displays the current selection. 

{% example %}
<ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="1" style="width: 14rem">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry" selected>Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach" selected>Peach</ld-option>
  <ld-option value="grape" selected>Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear" selected>Pear</ld-option>
  <ld-option value="pineapple" selected>Pineapple</ld-option>
  <ld-option value="plum" selected>Plum</ld-option>
</ld-select>

<ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="2" style="max-width: 24rem">
  <ld-option value="apple">Apple</ld-option>
  <ld-option value="banana" selected>Banana</ld-option>
  <ld-option value="strawberry" selected>Strawberry</ld-option>
  <ld-option value="watermelon" disabled>Watermelon</ld-option>
  <ld-option value="honeymelon">Honeymelon</ld-option>
  <ld-option value="rasberry">Rasberry</ld-option>
  <ld-option value="cherry" selected>Cherry</ld-option>
  <ld-option value="blueberry">Blueberry</ld-option>
  <ld-option value="peach" selected>Peach</ld-option>
  <ld-option value="grape" selected>Grape</ld-option>
  <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
  <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
  <ld-option value="pear" selected>Pear</ld-option>
  <ld-option value="pineapple" selected>Pineapple</ld-option>
  <ld-option value="plum" selected>Plum</ld-option>
</ld-select>
{% endexample %}

### Disabled

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" disabled>
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple disabled>
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

<ld-select placeholder="Pick a fruit" name="fruit" disabled>
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple disabled>
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

<!-- CSS component -->

<div class='ld-select'>
  <select name="fruits" disabled>
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>
{% endexample %}

**If you want the select to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple aria-disabled="true">
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

<ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple aria-disabled="true">
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

<!-- CSS component -->

<div class='ld-select'>
  <select name="fruits" aria-disabled="true">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>
{% endexample %}

> **Note**: When aria-disabled is applied on the Web Component, it will prevent user interaction. With the CSS Component version on the other hand, after applying aria-disabled on the select element, you will need to take care of preventing its default behaviour yourself.

### Invalid

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" invalid>
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple invalid>
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

<!-- CSS component -->

<div class='ld-select ld-select--invalid'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>
{% endexample %}

### Detached

In detached mode the component positions the popper element with a small vertical offset, effectively rendering a small gap between trigger button and popper element.

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" mode="detached">
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

In inline mode, while the popper element has a minimum width, the component's trigger button width is defined by its content. Though you can still apply a `width` or `min-width` style on the trigger button, if you need to.

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" mode="inline">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple mode="inline">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple mode="inline" style="width: 6.9375rem" max-rows="1">
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

In ghost mode the component works the same way as it does in inline mode while additionally rendering the background of the trigger button transparently. This mode is **not** combinable with the multiple select mode, because otherwise too many elements would potentially "loosely fly around" without any container establishing a connection between the elements.

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" mode="ghost">
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

### Size

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" size="sm">
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

<ld-select placeholder="Pick a fruit" name="fruit">
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

<ld-select placeholder="Pick a fruit" name="fruit" size="lg">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple size="sm">
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple>
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

<ld-select placeholder="Pick some fruits" name="fruits" multiple size="lg">
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

<!-- CSS component -->

<div class='ld-select ld-select--sm'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>

<div class='ld-select'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>

<div class='ld-select ld-select--lg'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
</div>
{% endexample %}

### With custom trigger button icon

For both, the ld-select Web Component and the CSS Component, you can use a custom trigger button icon in place of the default caret. If you want to apply theme colors, with the icon reacting to pseudo classes such as `:hover`, `:active` and `:focus`, use [`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword) on your icon.

{% example %}
<ld-select placeholder="Pick a fruit" name="fruit" size="sm">
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
  <ld-icon slot="icon" name="placeholder"></ld-icon>
</ld-select>

<ld-select placeholder="Pick a fruit" name="fruit">
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
  <ld-icon slot="icon" name="placeholder"></ld-icon>
</ld-select>

<ld-select placeholder="Pick a fruit" name="fruit" size="lg">
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
  <ld-icon slot="icon" name="placeholder"></ld-icon>
</ld-select>

<!-- CSS component -->

<div class='ld-select ld-select--sm'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg class="ld-icon" role="presentation" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
  </svg>
</div>

<div class='ld-select'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg class="ld-icon" role="presentation" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
  </svg>
</div>

<div class='ld-select ld-select--lg'>
  <select name="fruits">
    <option value="">Pick a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="strawberry">Strawberry</option>
    <option value="watermelon" disabled>Watermelon</option>
    <option value="honeymelon">Honeymelon</option>
    <option value="rasberry">Rasberry</option>
    <option value="cherry">Cherry</option>
    <option value="blueberry">Blueberry</option>
    <option value="peach">Peach</option>
    <option value="grape">Grape</option>
    <option value="fuyu persimmon">Fuyu Persimmon</option>
    <option value="monstera deliciosa">Monstera Deliciosa</option>
    <option value="pear">Pear</option>
    <option value="pineapple">Pineapple</option>
    <option value="plum">Plum</option>
  </select>
  <svg class="ld-icon" role="presentation" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
  </svg>
</div>
{% endexample %}

### With label

{% example %}
<ld-label>
  Favorite fruit
  <ld-select placeholder="Pick a fruit" name="fruit">
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
</ld-label>

<!-- CSS component -->

<label class="ld-label">
  Favorite fruit
  <div class='ld-select'>
    <select name="fruits">
      <option value="">Pick a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="strawberry">Strawberry</option>
      <option value="watermelon" disabled>Watermelon</option>
      <option value="honeymelon">Honeymelon</option>
      <option value="rasberry">Rasberry</option>
      <option value="cherry">Cherry</option>
      <option value="blueberry">Blueberry</option>
      <option value="peach">Peach</option>
      <option value="grape">Grape</option>
      <option value="fuyu persimmon">Fuyu Persimmon</option>
      <option value="monstera deliciosa">Monstera Deliciosa</option>
      <option value="pear">Pear</option>
      <option value="pineapple">Pineapple</option>
      <option value="plum">Plum</option>
    </select>
    <svg
      role="presentation"
      class="ld-select__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M3 6l5 4 5-4"
      />
    </svg>
  </div>
</label>
{% endexample %}

### With label and input message

{% example %}
<ld-label>
  Favorite fruit
  <ld-select placeholder="Pick a fruit" name="fruit">
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
    <ld-option value="monstera deliciosa" selected>Monstera Deliciosa</ld-option>
    <ld-option value="pear">Pear</ld-option>
    <ld-option value="pineapple">Pineapple</ld-option>
    <ld-option value="plum">Plum</ld-option>
  </ld-select>
  <ld-input-message mode="info">Not available today.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label">
  Favorite fruit
  <div class='ld-select'>
    <select name="fruits">
      <option value="">Pick a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="strawberry">Strawberry</option>
      <option value="watermelon" disabled>Watermelon</option>
      <option value="honeymelon">Honeymelon</option>
      <option value="rasberry">Rasberry</option>
      <option value="cherry">Cherry</option>
      <option value="blueberry">Blueberry</option>
      <option value="peach">Peach</option>
      <option value="grape">Grape</option>
      <option value="fuyu persimmon">Fuyu Persimmon</option>
      <option value="monstera deliciosa" selected>Monstera Deliciosa</option>
      <option value="pear">Pear</option>
      <option value="pineapple">Pineapple</option>
      <option value="plum">Plum</option>
    </select>
    <svg
      role="presentation"
      class="ld-select__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M3 6l5 4 5-4"
      />
    </svg>
  </div>
  <span class="ld-input-message ld-input-message--info">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    Not available today.
  </span>
</label>
{% endexample %}

### Input validation

The `ld-select` Web Component provides a low level API for integrating it with the form validation solution of your choice. It allows you to listen for `focus`, `change`, `input` and `blur` events and setting error / info messages via the [`ld-input-message`](components/ld-input-message/) component. The following is an example on how you could implement input validation with vanilla JS:

{% example %}
<style>
#example-form {
  display: grid;
  gap: 1rem;
  width: 100%;
}
#example-form > * {
  align-self: flex-end;
  flex: 1 0 auto;
}
#example-form ld-button {
  margin-bottom: 1.7rem;
}
@media (min-width: 52rem) {
  #example-form {
    grid-template-columns: 1fr auto;
  }
}
#example-form ld-input-message {
  visibility: hidden;
}
</style>
<form id="example-form" novalidate>
  <ld-label>
    Fruits*
    <ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="1">
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
    <ld-input-message visible="false">Pick at least 3 fruits.</ld-input-message>
  </ld-label>
  <ld-button>Submit</ld-button>
</form>
<script>
  const form = document.querySelector('#example-form')
  const select = document.querySelector('#example-form ld-select')
  const errorMessage = document.querySelector('#example-form ld-input-message')
  const submitButton = document.querySelector('#example-form ld-button')
  let selectDirty = false
  function validateInput() {
    if (selectDirty && (!form.fruits || !form.fruits.length || form.fruits.length < 3)) {
      select.setAttribute('invalid', 'true')
      errorMessage.style.visibility = 'inherit'
      return false
    }
    select.removeAttribute('invalid')
    errorMessage.style.visibility = 'hidden'
    return true
  }
  select.addEventListener('change', ev => {
    validateInput()
  })
  select.addEventListener('blur', ev => {
    selectDirty = true
    validateInput()
  })
  form.addEventListener('submit', ev => {
    ev.preventDefault()
    selectDirty = true
    const isValid = validateInput()
    setTimeout(() => {
      if (isValid) {
        window.alert('Form submitted.')
      } else {
        window.alert('Form is invalid.')
      }
    }, 100)
  })
</script>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                                                                    | Type                                | Default     |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------- |
| `autofocus`          | `autofocus`           | This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the autofocus attribute. | `boolean`                           | `false`     |
| `disabled`           | `disabled`            | Disabled state of the component.                                                                                                                                               | `boolean`                           | `undefined` |
| `form`               | `form`                | The form element to associate the select with (its form owner).                                                                                                                | `string`                            | `undefined` |
| `invalid`            | `invalid`             | Set this property to `true` in order to mark the select visually as invalid.                                                                                                   | `boolean`                           | `undefined` |
| `key`                | `key`                 | for tracking the node's identity when working with lists                                                                                                                       | `string \| number`                  | `undefined` |
| `ldTabindex`         | `ld-tabindex`         | Tab index of the trigger button.                                                                                                                                               | `number`                            | `0`         |
| `maxRows`            | `max-rows`            | Constrains the height of the trigger button by replacing overflowing selection with a "+X more" indicator.                                                                     | `number`                            | `undefined` |
| `mode`               | `mode`                | Display mode.                                                                                                                                                                  | `"detached" \| "ghost" \| "inline"` | `undefined` |
| `multiple`           | `multiple`            | Multiselect mode.                                                                                                                                                              | `boolean`                           | `undefined` |
| `name`               | `name`                | Used to specify the name of the control.                                                                                                                                       | `string`                            | `undefined` |
| `placeholder`        | `placeholder`         | Used as trigger button label in multiselect mode and in single select mode if nothing is selected.                                                                             | `string`                            | `undefined` |
| `popperClass`        | `popper-class`        | Attached as CSS class to the select popper element.                                                                                                                            | `string`                            | `undefined` |
| `preventDeselection` | `prevent-deselection` | Prevents a state with no options selected after initial selection in single select mode.                                                                                       | `boolean`                           | `undefined` |
| `ref`                | `ref`                 | reference to component                                                                                                                                                         | `any`                               | `undefined` |
| `required`           | `required`            | A Boolean attribute indicating that an option with a non-empty string value must be selected.                                                                                  | `boolean`                           | `undefined` |
| `size`               | `size`                | Size of the select trigger button.                                                                                                                                             | `"lg" \| "sm"`                      | `undefined` |
| `tetherOptions`      | `tether-options`      | Stringified tether options object to be merged with the default options.                                                                                                       | `string`                            | `'{}'`      |


## Events

| Event      | Description                                                                                            | Type                    |
| ---------- | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| `blur`     | Emitted with an array of selected values when the select component looses focus.                       | `CustomEvent<string[]>` |
| `change`   | Emitted with an array of selected values when an alteration to the selection is committed by the user. | `CustomEvent<string[]>` |
| `focus`    | Emitted with an array of selected values when the select component gets focus.                         | `CustomEvent<string[]>` |
| `focusout` | Emitted with an array of selected values when the select component looses focus.                       | `CustomEvent<string[]>` |
| `input`    | Emitted with an array of selected values when an alteration to the selection is committed by the user. | `CustomEvent<string[]>` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the trigger button.

#### Returns

Type: `Promise<void>`




## Slots

| Slot     | Description                                    |
| -------- | ---------------------------------------------- |
|          | the default slot contains the select options   |
| `"icon"` | replaces caret with custom trigger button icon |


## Shadow Parts

| Part                     | Description |
| ------------------------ | ----------- |
| `"btn-clear"`            |             |
| `"btn-clear-single"`     |             |
| `"btn-trigger"`          |             |
| `"focusable"`            |             |
| `"icon-clear"`           |             |
| `"icon-clear-single"`    |             |
| `"options-container"`    |             |
| `"root"`                 |             |
| `"select"`               |             |
| `"selection-label-bg"`   |             |
| `"selection-label-text"` |             |
| `"selection-list"`       |             |
| `"selection-list-item"`  |             |
| `"slot-container"`       |             |
| `"trigger-icon"`         |             |
| `"trigger-text"`         |             |
| `"trigger-text-wrapper"` |             |


## Dependencies

### Depends on

- ld-select-popper

### Graph
```mermaid
graph TD;
  ld-select --> ld-select-popper
  style ld-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
