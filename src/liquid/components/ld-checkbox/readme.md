---
eleventyNavigation:
  key: Checkbox
  parent: Components
layout: layout.njk
title: Checkbox
permalink: components/ld-checkbox/
---

<link rel="stylesheet" href="css_components/ld-checkbox.css">
<link rel="stylesheet" href="css_components/ld-label.css">
<link rel="stylesheet" href="css_components/ld-input-message.css">
<link rel="stylesheet" href="css_components/ld-icon.css">

# ld-checkbox

A checkbox allows the user to select and deselect single values.

This component can be used in conjunction with the [`ld-label`](components/ld-label/) and the [`ld-input-message`](components/ld-input-message/) component.

---

## Examples

### Primary

{% example %}
<ld-checkbox></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

### Disabled

{% example %}
<ld-checkbox disabled></ld-checkbox>

<ld-checkbox disabled checked></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox">
  <input type="checkbox" disabled checked>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

**If you want the checkbox to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-checkbox aria-disabled="true"></ld-checkbox>

<ld-checkbox aria-disabled="true" checked></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox">
  <input
    type="checkbox"
    aria-disabled="true"
    id="focusable-disabled-checkbox-1">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox">
  <input
    type="checkbox"
    aria-disabled="true"
    checked
    id="focusable-disabled-checkbox-2">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<!-- Example code for input prevention on aria-disabled checkbox elements -->
<script>
  const inputs = document.querySelectorAll('#focusable-disabled-checkbox-1, #focusable-disabled-checkbox-2')
  Array.from(inputs).forEach(input => {
    input.addEventListener('click', (ev) => {
      ev.preventDefault()
    })
  })
</script>
{% endexample %}

> **Note:** When `aria-disabled` is applied on the checkbox, the component will try to prevent user interaction using an internal click event handler, calling `preventDefault()` on the click event. With the CSS component version on the other hand, you will need to take care of preventing the default behaviour of the checkbox yourself.

### Indeterminate

If the `indeterminate` attribute is present on the `ld-checkbox` component, the checkbox's value is neither `true` nor `false`, but is instead _indeterminate_, meaning that its state cannot be determined or stated in pure binary terms. This may happen, for instance, if the state of the checkbox depends on multiple other checkboxes, and those checkboxes have different values. However, the control is never a true tri-state control, even if the element's indeterminate attribute is set to true. The indeterminate IDL attribute only gives the appearance of a third state.

> **Note**: When using the CSS Component you need to take care of setting the indeterminate **prop** on the input element with JavaScript.  

{% example 'html', false, false, 'light' %}
<ld-checkbox indeterminate></ld-checkbox>

<ld-checkbox indeterminate disabled></ld-checkbox>

<!-- CSS component -->

<div id="example-indeterminate-1" class="ld-checkbox">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div id="example-indeterminate-2" class="ld-checkbox">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<script>
document.querySelectorAll('#example-indeterminate-1 input, #example-indeterminate-2 input')
  .forEach(input => input.indeterminate = true)
</script>

{% endexample %}

### Dark

> **Note**: Dark tone checkboxes should only be used on white backgrounds.

{% example 'html', false, false, 'light' %}
<ld-checkbox tone="dark"></ld-checkbox>

<ld-checkbox tone="dark" disabled></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox ld-checkbox--dark">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox ld-checkbox--dark">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

### Highlight

{% example %}
<ld-checkbox mode="highlight"></ld-checkbox>

<ld-checkbox mode="highlight" disabled></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox ld-checkbox--highlight">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox ld-checkbox--highlight">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

### Invalid

{% example %}
<ld-checkbox invalid></ld-checkbox>

<ld-checkbox invalid disabled></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox ld-checkbox--invalid">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox ld-checkbox--invalid">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

### Danger

The checkbox in mode "danger" looks and behaves the same as a checkbox with the [`invalid`](components/ld-checkbox/#invalid) property. The only difference lies in the semantics of the properties, which helps to understand the context when reading the code. 

{% example %}
<ld-checkbox mode="danger"></ld-checkbox>

<ld-checkbox mode="danger" disabled></ld-checkbox>

<!-- CSS component -->

<div class="ld-checkbox ld-checkbox--danger">
  <input type="checkbox">
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>

<div class="ld-checkbox ld-checkbox--danger">
  <input type="checkbox" disabled>
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
</div>
{% endexample %}

### With label

{% example %}
<ld-label position="right" size="m">
  I have read the terms of service.*
  <ld-checkbox></ld-checkbox>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right ld-label--m">
  I have read the terms of service.*
  <div class="ld-checkbox">
    <input type="checkbox" required>
    <svg
      class="ld-checkbox__check"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L5.40795 10L2 6.63964"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div class="ld-checkbox__box"></div>
  </div>
</label>
{% endexample %}

Please reffer to the [ld-label](components/ld-label/) docs for more information on the label component.

### With label and input message

{% example %}
<div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); width: 100%">
  <ld-label position="right" size="m">
    I have read the terms of service.*
    <ld-checkbox invalid required></ld-checkbox>
    <ld-input-message>To proceed, you must except the terms of service.</ld-input-message>
  </ld-label>

  <ld-label position="right" size="m">
    I'd like to receive a weekly newsletter.
    <ld-checkbox></ld-checkbox>
    <ld-input-message mode="info">You may unsubscribe at any given time.</ld-input-message>
  </ld-label>
</div>

<!-- CSS component -->

<div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); width: 100%">
  <label class="ld-label ld-label--right ld-label--m">
    I have read the terms of service.*
    <div class="ld-checkbox ld-checkbox--invalid">
      <input type="checkbox" required>
      <svg
        class="ld-checkbox__check"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L5.40795 10L2 6.63964"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="ld-checkbox__box"></div>
    </div>
    <span class="ld-input-message ld-input-message--error">
      <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
        <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      To proceed, you must except the terms of service.
    </span>
  </label>
  
  <label class="ld-label ld-label--right ld-label--m">
    I'd like to receive a weekly newsletter.
    <div class="ld-checkbox">
      <input type="checkbox">
      <svg
        class="ld-checkbox__check"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L5.40795 10L2 6.63964"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="ld-checkbox__box"></div>
    </div>
    <span class="ld-input-message">
      <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
        <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
      </svg>
      You may unsubscribe at any given time.
    </span>
  </label>
</div>
{% endexample %}

### Input validation

The `ld-checkbox` Web Component provides a low level API for integrating the component with the form validation solution of your choice. It allows you to listen for `focus`, `input` and `blur` events and setting error / info messages via the [`ld-input-message`](components/ld-input-message/) component. The following is an example on how you could implement input validation with vanilla JS:

{% example %}
<style>
#example-form {
  display: grid;
  gap: 1rem;
  width: 100%;
}
#example-form > * {
  align-self: flex-start;
  flex: 1 0 auto;
}
@media (min-width: 52rem) {
  #example-form {
    grid-auto-flow: column;
  }
}
#example-form ld-label:first-of-type ld-input-message {
  visibility: hidden;
}
</style>
<form id="example-form" novalidate>
  <ld-label position="right" size="m">
    I have read the terms of service.*
    <ld-checkbox id="example-form-terms" name="terms" required></ld-checkbox>
    <ld-input-message id="example-form-terms-message" visible="false">To proceed, you must except the terms of service.</ld-input-message>
  </ld-label>
  <ld-label position="right" size="m">
    I'd like to receive a weekly newsletter.
    <ld-checkbox id="newsletter" name="newsletter"></ld-checkbox>
    <ld-input-message mode="info">You may unsubscribe at any given time.</ld-input-message>
  </ld-label>
  <ld-button>Submit</ld-button>
</form>
<script>
  const form = document.querySelector('#example-form')
  const termsConfirmation = document.querySelector('#example-form-terms')
  const termsErrorMessage = document.querySelector('#example-form-terms-message')
  const submitButton = document.querySelector('#example-form ld-button')
  function validateInput() {
    if (!form.terms.checked) {
      termsConfirmation.setAttribute('invalid', 'true')
      termsErrorMessage.style.visibility = 'inherit'
      return false
    }
    termsConfirmation.removeAttribute('invalid')
    termsErrorMessage.style.visibility = 'hidden'
    return true
  }
  termsConfirmation.addEventListener('input', ev => {
    validateInput()
  })
  termsConfirmation.addEventListener('blur', ev => {
    validateInput()
  })
  form.addEventListener('submit', ev => {
    ev.preventDefault()
    const isTermsConfirmationValid = validateInput()
    setTimeout(() => {
      if (isTermsConfirmationValid) {
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

| Property        | Attribute       | Description                                                                                                                                                                          | Type                      | Default     |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ----------- |
| `autocomplete`  | `autocomplete`  | Hint for form autofill feature.                                                                                                                                                      | `string`                  | `undefined` |
| `autofocus`     | `autofocus`     | Automatically focus the form control when the page is loaded.                                                                                                                        | `boolean`                 | `undefined` |
| `checked`       | `checked`       | Indicates whether the checkbox is checked.                                                                                                                                           | `boolean`                 | `undefined` |
| `disabled`      | `disabled`      | Disabled state of the checkbox.                                                                                                                                                      | `boolean`                 | `undefined` |
| `form`          | `form`          | Associates the control with a form element.                                                                                                                                          | `string`                  | `undefined` |
| `indeterminate` | `indeterminate` | Set this property to `true` to indicate that the checkbox's value is neither true nor false. The prop is removed automatically as soon as the checkbox is clicked (if not disabled). | `boolean`                 | `undefined` |
| `invalid`       | `invalid`       | Set this property to `true` in order to mark the checkbox visually as invalid.                                                                                                       | `boolean`                 | `undefined` |
| `key`           | `key`           | for tracking the node's identity when working with lists                                                                                                                             | `string \| number`        | `undefined` |
| `mode`          | `mode`          | Display mode.                                                                                                                                                                        | `"danger" \| "highlight"` | `undefined` |
| `name`          | `name`          | Used to specify the name of the control.                                                                                                                                             | `string`                  | `undefined` |
| `readonly`      | `readonly`      | The value is not editable.                                                                                                                                                           | `boolean`                 | `undefined` |
| `ref`           | `ref`           | reference to component                                                                                                                                                               | `any`                     | `undefined` |
| `required`      | `required`      | Set this property to `true` in order to mark the checkbox as required.                                                                                                               | `boolean`                 | `undefined` |
| `tone`          | `tone`          | Checkbox tone. Use `'dark'` on white backgrounds. Default is a light tone.                                                                                                           | `"dark"`                  | `undefined` |
| `value`         | `value`         | The input value.                                                                                                                                                                     | `string`                  | `undefined` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the checkbox

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part      | Description          |
| --------- | -------------------- |
| `"box"`   |                      |
| `"check"` |                      |
| `"input"` | Actual input element |
| `"root"`  |                      |


## Dependencies

### Used by

 - ld-option-internal

### Graph
```mermaid
graph TD;
  ld-option-internal --> ld-checkbox
  style ld-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
