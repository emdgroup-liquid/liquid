---
eleventyNavigation:
  key: Radio Button
  parent: Components
layout: layout.njk
title: Radio Button
permalink: components/ld-radio/
---

<link rel="stylesheet" href="css_components/ld-radio.css">
<link rel="stylesheet" href="css_components/ld-label.css">
<link rel="stylesheet" href="css_components/ld-input-message.css">
<link rel="stylesheet" href="css_components/ld-icon.css">

# ld-radio

The `ld-radio` component is meant to be used in **radio groups** — collections of radio buttons describing a set of related options (i.e. using a [`fieldset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) and a [`legend`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend)). Only one radio button in a given group can be selected at the same time.

This component can be used in conjunction with the [`ld-label`](components/ld-label/) and the [`ld-input-message`](components/ld-input-message/) component.

---

## Examples

### Primary

{% example %}
<ld-radio name="example-1"></ld-radio>
<ld-radio name="example-1" checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio">
  <input type="radio" name="example-1-css">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio">
  <input type="radio" name="example-1-css" checked>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

### Disabled

{% example %}
<ld-radio name="example-2" disabled></ld-radio>
<ld-radio name="example-2" disabled checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio">
  <input type="radio" disabled name="example-2-css">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio">
  <input type="radio" disabled name="example-2-css" checked>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

**If you want the checkbox to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-radio name="example-3" aria-disabled="true"></ld-radio>
<ld-radio name="example-3" aria-disabled="true" checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio">
  <input
    type="radio"
    aria-disabled="true"
    name="example-3-css"
    id="focusable-disabled-radio-1">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio">
  <input
    type="radio"
    aria-disabled="true"
    name="example-3-css"
    checked
    id="focusable-disabled-radio-2">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>

<!-- Example code for input prevention on aria-disabled checkbox elements -->
<script>
  const inputs = document.querySelectorAll('#focusable-disabled-radio-1, #focusable-disabled-radio-2')
  Array.from(inputs).forEach(input => {
    input.addEventListener('click', (ev) => {
      ev.preventDefault()
    })
  })
</script>
{% endexample %}

<ld-notice headline="Note" mode="warning">
  When <code>aria-disabled</code> is applied on the radio button, the component will try to prevent user interaction using an internal click event handler, calling <code>preventDefault()</code> on the click event. With the CSS component version on the other hand, you will need to take care of preventing the default behaviour of the radio button yourself.
</ld-notice>

### Dark

<ld-notice headline="Note" mode="warning">
  Dark tone checkboxes should only be used on white backgrounds.
</ld-notice>

{% example '{ "background": "light" }' %}
<ld-radio name="example-4" tone="dark"></ld-radio>
<ld-radio name="example-4" tone="dark" checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio ld-radio--dark">
  <input type="radio" name="example-4-css">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio ld-radio--dark">
  <input type="radio" name="example-4-css" checked>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

### Highlight

{% example %}
<ld-radio name="example-5" mode="highlight"></ld-radio>
<ld-radio name="example-5" mode="highlight" checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio ld-radio--highlight">
  <input type="radio" name="example-5-css">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio ld-radio--highlight">
  <input type="radio" name="example-5-css" checked>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

### Invalid

An invalid state for a radio inputs inside a group makes sense, if for instance a selection is required, but no value is selected.

{% example %}
<ld-radio name="example-6" invalid required></ld-radio>
<ld-radio name="example-6" invalid required></ld-radio>

<!-- CSS component -->

<div class="ld-radio ld-radio--invalid">
  <input type="radio" name="example-6-css" required>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio ld-radio--invalid">
  <input type="radio" name="example-6-css" required>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

### Danger

The radio button in mode "danger" looks and behaves the same as a radio button with the [`invalid`](components/ld-radio/#invalid) property. The only difference lies in the semantics of the properties, which helps to understand the context when reading the code.

{% example %}
<ld-radio name="example-7" mode="danger"></ld-radio>
<ld-radio name="example-7" mode="danger" checked></ld-radio>

<!-- CSS component -->

<div class="ld-radio ld-radio--highlight ld-radio--danger">
  <input type="radio" name="example-7-css">
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
<div class="ld-radio ld-radio--highlight ld-radio--danger">
  <input type="radio" name="example-7-css" checked>
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
</div>
{% endexample %}

### With label

{% example %}
<ld-label position="right" size="m">
  Orange
  <ld-radio name="example-8" value="orange"></ld-radio>
</ld-label>

<ld-label position="right" size="m">
  Banana
  <ld-radio name="example-8" value="banana"></ld-radio>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right ld-label--m">
  Orange
  <div class="ld-radio">
    <input type="radio" name="example-8-css" value="orange">
    <div class="ld-radio__dot"></div>
    <div class="ld-radio__box"></div>
  </div>
</label>

<label class="ld-label ld-label--right ld-label--m">
  Banana
  <div class="ld-radio">
    <input type="radio" name="example-8-css" value="banana">
    <div class="ld-radio__dot"></div>
    <div class="ld-radio__box"></div>
  </div>
</label>
{% endexample %}

Please reffer to the [ld-label](components/ld-label/) docs for more information on the label component.

### With label and input message

{% example %}
<ld-label position="right" size="m">
  Orange
  <ld-radio name="example-9"></ld-radio>
  <ld-input-message mode="info">You'll join the orange team.</ld-input-message>
</ld-label>

<ld-label position="right" size="m">
  Banana
  <ld-radio name="example-9"></ld-radio>
  <ld-input-message mode="info">You'll join the banana team.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right ld-label--m">
  Orange
  <div class="ld-radio">
    <input type="radio" name="example-9-css">
    <div class="ld-radio__dot"></div>
    <div class="ld-radio__box"></div>
  </div>
  <span class="ld-input-message">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    You'll join the orange team.
  </span>
</label>

<label class="ld-label ld-label--right ld-label--m">
  Banana
  <div class="ld-radio">
    <input type="radio" name="example-9-css">
    <div class="ld-radio__dot"></div>
    <div class="ld-radio__box"></div>
  </div>
  <span class="ld-input-message">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    You'll join the banana team.
  </span>
</label>
{% endexample %}

### Input validation

The `ld-radio` Web Component provides a low level API for integrating the component with the form validation solution of your choice. It allows you to listen for `focus`, `input` and `blur` events.

<ld-notice headline="Note" mode="warning">
  You can find examples for different kinds of input validation in the <a href="introduction/form-validation/">Form validation</a> documentation. Please also be aware of differences in event handling compared to native elements that come with Web Components. Details can be found in our <a href="introduction/event-handling/">Event handling</a> documentation.
</ld-notice>

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                 | Type                      | Default     |
| ------------ | ------------- | --------------------------------------------------------------------------- | ------------------------- | ----------- |
| `autofocus`  | `autofocus`   | Automatically focus the form control when the page is loaded.               | `boolean`                 | `false`     |
| `checked`    | `checked`     | Indicates whether the radio button is selected.                             | `boolean`                 | `false`     |
| `disabled`   | `disabled`    | Disabled state of the radio.                                                | `boolean`                 | `undefined` |
| `form`       | `form`        | Associates the control with a form element.                                 | `string`                  | `undefined` |
| `invalid`    | `invalid`     | Set this property to `true` in order to mark the radio visually as invalid. | `boolean`                 | `undefined` |
| `key`        | `key`         | for tracking the node's identity when working with lists                    | `string \| number`        | `undefined` |
| `ldTabindex` | `ld-tabindex` | Tab index of the input.                                                     | `number`                  | `undefined` |
| `mode`       | `mode`        | Display mode.                                                               | `"danger" \| "highlight"` | `undefined` |
| `name`       | `name`        | Used to specify the name of the control.                                    | `string`                  | `undefined` |
| `readonly`   | `readonly`    | The value is not editable.                                                  | `boolean`                 | `undefined` |
| `ref`        | `ref`         | reference to component                                                      | `any`                     | `undefined` |
| `required`   | `required`    | Set this property to `true` in order to mark the checkbox as required.      | `boolean`                 | `undefined` |
| `tone`       | `tone`        | radio tone. Use `'dark'` on white backgrounds. Default is a light tone.     | `"dark"`                  | `undefined` |
| `value`      | `value`       | The input value.                                                            | `string`                  | `undefined` |


## Events

| Event      | Description                                                       | Type                   |
| ---------- | ----------------------------------------------------------------- | ---------------------- |
| `ldchange` | Emitted when the input value changed and the element loses focus. | `CustomEvent<boolean>` |
| `ldinput`  | Emitted when the input value changed.                             | `CustomEvent<boolean>` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the radio button.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part      | Description          |
| --------- | -------------------- |
| `"box"`   |                      |
| `"dot"`   |                      |
| `"input"` | Actual input element |
| `"root"`  |                      |


----------------------------------------------

 
