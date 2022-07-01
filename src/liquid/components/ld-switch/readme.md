---
eleventyNavigation:
  key: Switch
  parent: Components
layout: layout.njk
title: Switch
permalink: components/ld-switch/
---

<link rel="stylesheet" href="css_components/ld-switch.css">
<link rel="stylesheet" href="css_components/ld-switch-item.css">

# ld-switch

A switch that can have a single entry checked at any one time.

---

## Examples

### Primary 
{% example %}
<ld-switch label="Food Type" name="foodType">
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<div class="ld-switch">
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts">
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %} 

### Size

#### Small
{% example %}
<ld-switch label="Food Type" name="foodType" size="sm">
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<div class="ld-switch ld-switch--sm"> 
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts">
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %} 

#### Medium (default)
{% example %}
<ld-switch label="Food Type" name="foodType" size="md">
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->
<div class="ld-switch"> 
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts">
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %}

#### Large
{% example %}
<ld-switch label="Food Type" name="foodType" size="lg">
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->
<div class="ld-switch ld-switch--lg"> 
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts">
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %}

### Brand color
{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-switch label="Food Type" name="foodType" brand-color>
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<div class="ld-switch ld-switch--brand-color">
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts">
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %} 

### Disabled 

#### All elements
{% example %}
<ld-switch label="Food Type" name="foodType" disabled>
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
  <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<div class="ld-switch">
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits" disabled>
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables" disabled>
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts" disabled>
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %}

#### Single element
{% example %}
<ld-switch label="Food Type" name="foodType">
  <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
  <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item> 
  <ld-switch-item label="Nuts" value="nuts" disabled></ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<div class="ld-switch">
  <fieldset>
    <legend>Food Type</legend> 
    <div class="ld-switch_item-container">
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="fruits">
          <span class="ld-switch-item__faux">Fruits</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="vegetables">
          <span class="ld-switch-item__faux">Vegetables</span>
        </label>
      </div>
      <div class="ld-switch-item">
        <label>
          <input name="foodType" type="radio" value="nuts" disabled>
          <span class="ld-switch-item__faux">Nuts</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description                                                          | Type                   | Default     |
| -------------------- | --------------- | -------------------------------------------------------------------- | ---------------------- | ----------- |
| `ariaDisabled`       | `aria-disabled` | Alternative disabled state that keeps element focusable              | `string`               | `undefined` |
| `autofocus`          | `autofocus`     | Automatically focus the form control when the page is loaded.        | `boolean`              | `false`     |
| `brandColor`         | `brand-color`   | Defines switch custom color                                          | `boolean`              | `undefined` |
| `disabled`           | `disabled`      | Disabled state of the switch.                                        | `boolean`              | `undefined` |
| `form`               | `form`          | Associates the control with a form element.                          | `string`               | `undefined` |
| `key`                | `key`           | for tracking the node's identity when working with lists             | `string \| number`     | `undefined` |
| `label` _(required)_ | `label`         | Defines a description of the contents of the switch component.       | `string`               | `undefined` |
| `name` _(required)_  | `name`          | Used to specify the name of the control.                             | `string`               | `undefined` |
| `readonly`           | `readonly`      | The value is not editable.                                           | `boolean`              | `undefined` |
| `ref`                | `ref`           | reference to component                                               | `any`                  | `undefined` |
| `required`           | `required`      | Set this property to `true` in order to mark the switch as required. | `boolean`              | `undefined` |
| `size`               | `size`          | Size of the switch.                                                  | `"lg" \| "md" \| "sm"` | `undefined` |


## Events

| Event            | Description                                         | Type                  |
| ---------------- | --------------------------------------------------- | --------------------- |
| `ldswitchchange` | Emitted with the value of the selected switch item. | `CustomEvent<string>` |


## Shadow Parts

| Part                      | Description                 |
| ------------------------- | --------------------------- |
| `"fieldset"`              |                             |
| `"switch_item-container"` | Container wrapping the slot |


----------------------------------------------

 
