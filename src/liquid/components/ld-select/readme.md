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
<ld-select placeholder="Pick a fruit" name="fruit" invalid mode="detached">
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
{% endexample %}

### Ghost

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

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                        | Type                                | Default     |
| -------------------- | --------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `disabled`           | `disabled`            | Disabled state of the component.                                                                   | `boolean`                           | `false`     |
| `invalid`            | `invalid`             | Set this property to `true` in order to mark the select visually as invalid.                       | `boolean`                           | `false`     |
| `mode`               | `mode`                | Display mode.                                                                                      | `"detached" \| "ghost" \| "inline"` | `undefined` |
| `multiple`           | `multiple`            | Multiselect mode.                                                                                  | `boolean`                           | `false`     |
| `name`               | `name`                | Used to specify the name of the control.                                                           | `string`                            | `undefined` |
| `placeholder`        | `placeholder`         | Used as trigger button label in multiselect mode and in single select mode if nothing is selected. | `string`                            | `undefined` |
| `popperClass`        | `popper-class`        | Attached as CSS class to the select popper element.                                                | `string`                            | `undefined` |
| `preventDeselection` | `prevent-deselection` | Prevents a state with no options selected after initial selection in single select mode.           | `boolean`                           | `false`     |
| `size`               | `size`                | Size of the select trigger button.                                                                 | `"lg" \| "sm"`                      | `undefined` |
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
