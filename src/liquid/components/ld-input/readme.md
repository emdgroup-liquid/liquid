---
eleventyNavigation:
  key: Input
  parent: Components
layout: layout.njk
title: Input
permalink: liquid/components/ld-input/
---

# ld-input

---

## Web component

{% example %}
<ld-input placeholder="Placeholder"></ld-input>
<ld-input value="Value"></ld-input>
{% endexample %}

### Disabled

{% example %}
<ld-input placeholder="Placeholder" disabled></ld-input>
<ld-input disabled value="Value"></ld-input>
{% endexample %}

**If you want the input to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-input placeholder="Placeholder" aria-disabled="true"></ld-input>
<ld-input aria-disabled="true" value="Value"></ld-input>
{% endexample %}

> **Note:** When `aria-disabled` is applied on the input, the component will try to prevent user input  by resetting the input to its previous value on each input event.

### Light mode

{% example %}
<ld-input mode="light" placeholder="Placeholder"></ld-input>
<ld-input mode="light" value="Value"></ld-input>
{% endexample %}

### Light mode, disabled

{% example %}
<ld-input mode="light" disabled placeholder="Placeholder"></ld-input>
<ld-input mode="light" disabled value="Value"></ld-input>
{% endexample %}

### With label

{% example %}
<ld-label>
  Email Address
  <ld-input placeholder="jane.doe@example.com"></ld-input>
</ld-label>
{% endexample %}

Please reffer to the [ld-label](/liquid/components/ld-label/) docs for more information on the label component.

### With label and input message

{% example %}
<div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); width: 100%;">
  <ld-label>
    Email Address
    <ld-input invalid placeholder="jane.doe@example.com" value="yolo"></ld-input>
    <ld-input-message>The email address is invalid.</ld-input-message>
  </ld-label>

  <ld-label>
    Password
    <ld-input type="password" value="asdf1234" type password></ld-input>
    <ld-input-message mode="info">Use at least one special character (~!@#$%^&*_-+=|\(){}[]:;<>,.?/)</ld-input-message>
  </ld-label>
</div>
{% endexample %}

#### On input message width and placement

By default, the input field stretches to the maximum width of its wrapping label, which in turn stretches to the width of its content (the computed width of the `ld-input-message` component). So, if you want to set certain constraints on the width of all three components, you can do so by setting the constraint on the wrapping element – the `ld-label` component.

{% example %}
<ld-label>
  Email Address
  <ld-input placeholder="jane.doe@example.com"></ld-input>
  <ld-input-message mode="info">This info message is extremely long and makes all three components (the label, the input and itself) grow horizontaly.</ld-input-message>
</ld-label>

<ld-label style="max-width: 20rem">
  Email Address
  <ld-input placeholder="jane.doe@example.com"></ld-input>
  <ld-input-message mode="info">This info message is also extremely long, but since the label has a max width, all three components (the label, the input and itself) can take only the maximum width of the label.</ld-input-message>
</ld-label>
{% endexample %}

When displaying input messages conditionally (i.e. an error message becomes visible as soon as an input has been interacted with, but the value is still invalid) you should try to position UI elements in a way that prevents [layout shifts](https://web.dev/cls/). For instance, you can “reserve space” for your messages and then make them appear in the reserved space without pushing other content to the bottom (i.e. using `position: absolute` or some “flexy” layout). Needless to say, results look best if you keep the messages short.

### With type search

{% example %}
<ld-input placeholder="Search" type="search"></ld-input>
{% endexample %}

### With slotted elements

You can use [slots](#slots) in order to add static or interactive elements, such as icons or buttons into the input component.

#### With icon

{% example %}
<ld-input placeholder="Placeholder">
  <ld-icon name="placeholder" size="sm" slot="end"></ld-icon>
</ld-input>
  <ld-input placeholder="Placeholder">
<ld-icon name="placeholder" size="sm" slot="start"></ld-icon>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-icon name="placeholder" size="sm" slot="start"></ld-icon>
  <ld-icon name="placeholder" size="sm" slot="end"></ld-icon>
</ld-input>
<ld-input placeholder="Placeholder" disabled>
  <ld-icon name="placeholder" size="sm" slot="end"></ld-icon>
</ld-input>
{% endexample %}

#### With button

{% example %}
<ld-input placeholder="Placeholder">
  <ld-button mode="ghost" slot="end">
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-button mode="ghost" slot="start">
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-button mode="ghost" slot="start">
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
  <ld-button mode="ghost" slot="end">
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-button slot="end">
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-button slot="end">
    search <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder">
  <ld-button size="sm" slot="end">
    search <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder" disabled>
  <ld-button mode="ghost" slot="end" disabled>
    <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
<ld-input placeholder="Placeholder" disabled>
  <ld-button size="sm" slot="end" disabled>
    search <ld-icon name="placeholder" size="sm"></ld-icon>
  </ld-button>
</ld-input>
{% endexample %}

#### With custom component

{% example %}
<ld-input placeholder="Placeholder">
  <span slot="end">🤓</span>
</ld-input>
{% endexample %}

### Input validation

The `ld-input` component does not provide any properties or methods for validating the input value internally. Instead, it provides a low level API for integrating the component with the form validation solution of your choice. It allows you to listen for `focus`, `input` and `blur` events and setting error / info messages via the [`ld-input-message`](/liquid/components/ld-input-message/) component. The following is an example on how you could implement form validation with vanilla JS:

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
  margin-bottom: 1.6rem;
}
@media (min-width: 52rem) {
  #example-form {
    grid-auto-flow: column;
  }
}
#example-form ld-input-message {
  visibility: hidden;
}
#example-form ld-input-message[covert="false"] {
  visibility: inherit;
}
</style>
<form id="example-form" novalidate>
  <ld-label>
    Login*
    <ld-input required placeholder="login"></ld-input>
    <ld-input-message visible="false">This field is required.</ld-input-message>
  </ld-label>
  <ld-label>
    Password*
    <ld-input required placeholder="password" type="password"></ld-input>
    <ld-input-message visible="false">This field is required.</ld-input-message>
  </ld-label>
  <ld-button>Submit</ld-button>
</form>
<script>
  const form = document.getElementById('example-form')
  const username = document.querySelector('#example-form ld-label:first-of-type ld-input')
  const usernameErrorMessage = document.querySelector('#example-form ld-label:first-of-type ld-input-message')
  const password = document.querySelector('#example-form ld-label:last-of-type ld-input')
  const passwordErrorMessage = document.querySelector('#example-form ld-label:last-of-type ld-input-message')
  const submitButton = document.querySelector('#example-form ld-button')
  function validateInput(ldInput, ldInputMessage) {
    value = ldInput.value
    if (!value) {
      ldInput.setAttribute('invalid', 'true')
      ldInputMessage.setAttribute('covert', 'false')
      return false
    }
    ldInput.removeAttribute('invalid')
    ldInputMessage.setAttribute('covert', 'true')
    return true
  }
  username.addEventListener('input', ev => {
    validateInput(username, usernameErrorMessage)
  })
  username.addEventListener('blur', ev => {
    validateInput(username, usernameErrorMessage)
  })
  password.addEventListener('input', ev => {
    validateInput(password, passwordErrorMessage)
  })
  password.addEventListener('blur', ev => {
    validateInput(password, passwordErrorMessage)
  })
  submitButton.addEventListener('click', ev => {
    ev.preventDefault()
    const isUsernameValid = validateInput(username, usernameErrorMessage)
    const isPasswordValid = validateInput(password, passwordErrorMessage)
    setTimeout(() => {
      if (isUsernameValid && isPasswordValid) {
        window.alert('Form submitted.')
      } else {
        window.alert('Form is invalid.')
      }
    }, 10)
  })
</script>
{% endexample %}

## CSS component

If you'd rather like to use the CSS component, inspect and copy the markup and CSS classes from the examples above (you might want to replace the wrapping `ld-` element with a `div`, while keeping the CSS classes). You will be able to achieve pretty much the same result. Here are some examples:

{% example %}
<div class="ld-input ld-input--dark">
  <input placeholder="Placeholder">
</div>

<div class="ld-input ld-input--dark">
  <input placeholder="Placeholder">
  <span class="ld-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Text</title>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</div>

<div class="ld-input ld-input--dark" disabled>
  <input placeholder="Placeholder" disabled>
  <span class="ld-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Text</title>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</div>

<label class="ld-label" style="width: 20rem">
  Email Address
  <div class="ld-input ld-input--dark ld-input--invalid ld-input--dirty">
    <input placeholder="jane.doe@example.com">
  </div>
  <span class="hydrated">
    <span class="ld-input-message ld-input-message--error">
      <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Error</title>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#E61E50"/>
        <path d="M4.66675 4.66699L9.33341 9.33366" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.66675 9.33301L9.33341 4.66634" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span aria-live="assertive"><span>The email address is invalid.</span></span>
    </span>
  </span>
</label>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                        | Type                | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------- | ------------------- | ----------- |
| `invalid`     | `invalid`     | Set this property to `true` in order to mark the field visually as invalid.        | `boolean`           | `undefined` |
| `mode`        | `mode`        | Input mode. Use `'dark'` on white backgrounds, use `'light'` on other backgrounds. | `"dark" \| "light"` | `'dark'`    |
| `placeholder` | `placeholder` | The input placeholder.                                                             | `string`            | `undefined` |
| `type`        | `type`        | The input type.                                                                    | `string`            | `undefined` |
| `value`       | `value`       | The input value.                                                                   | `string`            | `undefined` |


## Slots

| Slot      | Description                                                                                                                                                                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"end"`   | The purpose of this slot is to add icons or buttons to the input, __justifying the item to the start of the component__. Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component. If you choose to place something different into the slot, you will probably need to adjust some styles on the slotted item in order to make it fit right. |
| `"start"` | The purpose of this slot is to add icons or buttons to the input, __justifying the item to the end of the component__. Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component. If you choose to place something different into the slot, you will probably need to adjust some styles on the slotted item in order to make it fit right.   |


## Dependencies

### Used by

 - docs-search

### Graph
```mermaid
graph TD;
  docs-search --> ld-input
  style ld-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
