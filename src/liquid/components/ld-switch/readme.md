---
eleventyNavigation:
  key: Switch
  parent: Components
layout: layout.njk
title: Switch
permalink: components/ld-switch/
tags:
  - toggle
  - radio group
---

<link rel="stylesheet" href="css_components/ld-switch.css">
<link rel="stylesheet" href="css_components/ld-switch-item.css">
<link rel="stylesheet" href="css_components/ld-icon.css">

# ld-switch

A switch is a collection of two or more items that behaves similar to a radio button group or toggle. It can have a single or no item selected at a time.

---

## Default
 
{% example %}
<ld-switch legend="Dress" name="food-type-web-component-default" required>
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch">
  <legend>Dress</legend> 
  <label class="ld-switch-item">
    <input name="food-type-css-component-default" 
           type="radio" 
           value="water" 
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-default"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>
{% endexample %}

## Fit content

By default all switch items take up the same amout of horizontal space. However, you can make each switch item take up as little space as its content requires by applying the `fit-content` prop.

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-fit-content" fit-content>
  <ld-switch-item value="diamorphine" checked>Diamorphine</ld-switch-item>
  <ld-switch-item value="alcohol">Lysergic acid diethylamide</ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch ld-switch--fit-content">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-fit-content"
           type="radio"
           value="diamorphine"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Diamorphine</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-fit-content"
           type="radio"
           value="lsd" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Lysergic acid diethylamide</span>
    </span>
  </label>
</fieldset>
{% endexample %}

## Size

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-size-sm" size="sm">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch>

<ld-switch legend="Dress" name="food-type-web-component-size-md" size="md">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch>

<ld-switch legend="Dress" name="food-type-web-component-size-lg" size="lg">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch ld-switch--sm">
  <legend>Dress</legend> 
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-sm" type="radio" value="water" checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-sm" type="radio" value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>

<fieldset class="ld-switch">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-md" type="radio" value="water" checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-md" type="radio" value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>

<fieldset class="ld-switch ld-switch--lg">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-lg"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-size-lg"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>
{% endexample %}

## With icon

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-icon-sm" size="sm">
  <ld-switch-item value="water" checked>
    Water
    <ld-icon slot="icon-end" name="placeholder" size="sm"></ld-icon>
  </ld-switch-item>
  <ld-switch-item value="alcohol">
    Alcohol
    <ld-icon slot="icon-end" name="placeholder" size="sm"></ld-icon>
  </ld-switch-item>
</ld-switch>

<ld-switch legend="Dress" name="food-type-web-component-icon-md" size="md">
  <ld-switch-item value="water" checked>
    <ld-icon slot="icon-start" name="placeholder" aria-label="Text"></ld-icon>
  </ld-switch-item>
  <ld-switch-item value="alcohol">
    <ld-icon slot="icon-start" name="placeholder" aria-label="Text"></ld-icon>
  </ld-switch-item>
</ld-switch>

<ld-switch legend="Dress" name="food-type-web-component-icon-lg" size="lg">
  <ld-switch-item value="water" checked>
    <ld-icon slot="icon-start" name="placeholder" size="lg"></ld-icon>
    Water
  </ld-switch-item>
  <ld-switch-item value="alcohol">
    <ld-icon slot="icon-start" name="placeholder" size="lg"></ld-icon>
    Alcohol
  </ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch ld-switch--sm">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-sm"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
      <span class="ld-icon ld-icon--sm">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-sm"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
      <span class="ld-icon ld-icon--sm">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
    </span>
  </label>
</fieldset>

<fieldset class="ld-switch">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-md"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-md"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
    </span>
  </label>
</fieldset>

<fieldset class="ld-switch ld-switch--lg">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-lg"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-icon ld-icon--lg">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-icon-lg"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-icon ld-icon--lg">
        <svg viewBox="0 0 24 24" fill="none">
          <title>Text</title>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
        </svg>
      </span>
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>
{% endexample %}

## Brand color

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-switch legend="Dress" name="food-type-web-component-brand-color" brand-color>
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<fieldset class="ld-switch ld-switch--brand-color">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-brand-color"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-brand-color"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>
{% endexample %} 

## Disabled 

### All elements

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-disabled" disabled>
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<fieldset class="ld-switch">
  <legend>Dress</legend> 
  <label class="ld-switch-item">
    <input name="food-type-css-component-disabled"
           type="radio"
           value="water"
           disabled
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-disabled"
           type="radio"
           value="alcohol"
           disabled />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>
{% endexample %}

**If you want the switch to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-aria-disabled" aria-disabled="true">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-aria-disabled"
           type="radio"
           value="water"
           aria-disabled="true"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-aria-disabled"
           type="radio"
           value="alcohol"
           aria-disabled="true" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
</fieldset>

<!-- Example code for input prevention on aria-disabled switch -->
<script>
const inputs = document.querySelectorAll('input[name="food-type-css-component-aria-disabled"]')
Array.from(inputs).forEach(input => {
  input.addEventListener('click', (ev) => {
    ev.preventDefault()
  })
})
</script>
{% endexample %}

### Single element

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-single-element-disabled">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item> 
  <ld-switch-item value="vampire" disabled>Vampire</ld-switch-item>
</ld-switch> 

<!-- CSS component -->

<fieldset class="ld-switch">
  <legend>Dress</legend> 
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-disabled"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-disabled"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-disabled"
           type="radio"
           value="vampire"
           disabled />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Vampire</span>
    </span>
  </label>
</fieldset>
{% endexample %}

If you want to disable a single switch item but **keep it focusable**, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-switch legend="Dress" name="food-type-web-component-single-element-aria-disabled">
  <ld-switch-item value="water" checked>Water</ld-switch-item>
  <ld-switch-item value="alcohol">Alcohol</ld-switch-item>
  <ld-switch-item value="vampire" aria-disabled="true">Vampire</ld-switch-item>
</ld-switch>

<!-- CSS component -->

<fieldset class="ld-switch">
  <legend>Dress</legend>
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-aria-disabled"
           type="radio"
           value="water"
           checked />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Water</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-aria-disabled"
           type="radio"
           value="alcohol" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Alcohol</span>
    </span>
  </label>
  <label class="ld-switch-item">
    <input name="food-type-css-component-single-element-aria-disabled"
           type="radio"
           value="vampire"
           aria-disabled="true" />
    <span class="ld-switch-item__content">
      <span class="ld-switch-item__label">Vampire</span>
    </span>
  </label>
</fieldset>

<!-- Example code for input prevention on aria-disabled switch items -->
<script>
const all = Array.from(document.querySelectorAll('input[name="food-type-css-component-single-element-aria-disabled"]'))
const enabled = all.filter(input => !input.ariaDisabled)
const disabled = all.filter(input => input.ariaDisabled)
let current = enabled.find(input => input.checked)
enabled.forEach(input => {
  input.addEventListener('change', (ev) => {
    if (ev.target.checked) current = ev.target
  })
})
disabled.forEach(input => {
  input.addEventListener('change', (ev) => {
    current.checked = true
  })
})
</script>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                            | Type                   | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------- | ---------------------- | ----------- |
| `ariaDisabled` | `aria-disabled` | Alternative disabled state that keeps element focusable                | `string`               | `undefined` |
| `autofocus`    | `autofocus`     | Automatically focus the form control when the page is loaded.          | `boolean`              | `undefined` |
| `brandColor`   | `brand-color`   | Defines switch custom color                                            | `boolean`              | `undefined` |
| `disabled`     | `disabled`      | Disabled state of the switch.                                          | `boolean`              | `undefined` |
| `fitContent`   | `fit-content`   | Make each switch item take up as little space as its content requires. | `boolean`              | `false`     |
| `form`         | `form`          | Associates the control with a form element.                            | `string`               | `undefined` |
| `key`          | `key`           | for tracking the node's identity when working with lists               | `string \| number`     | `undefined` |
| `ldTabindex`   | `ld-tabindex`   | Tab index of the input.                                                | `number`               | `undefined` |
| `legend`       | `legend`        | Defines a description of the contents of the switch component.         | `string`               | `undefined` |
| `name`         | `name`          | Used to specify the name of the control.                               | `string`               | `undefined` |
| `readonly`     | `readonly`      | The value is not editable.                                             | `boolean`              | `undefined` |
| `ref`          | `ref`           | reference to component                                                 | `any`                  | `undefined` |
| `required`     | `required`      | Set this property to `true` in order to mark the switch as required.   | `boolean`              | `undefined` |
| `size`         | `size`          | Size of the switch.                                                    | `"lg" \| "md" \| "sm"` | `undefined` |


## Events

| Event            | Description                                         | Type                  |
| ---------------- | --------------------------------------------------- | --------------------- |
| `ldswitchchange` | Emitted with the value of the selected switch item. | `CustomEvent<string>` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the radio button.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part         | Description                                        |
| ------------ | -------------------------------------------------- |
| `"fieldset"` | Container wrapping the legent element and the slot |
| `"legend"`   | The legend element                                 |


----------------------------------------------

 
