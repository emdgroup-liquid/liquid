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

By default, the input field stretches to the maximum width of its wrapping label, which in turn stretches to the width of its content (the computed width of the `ld-input-message` component). So, if you want to set certain constraints on the width of the all three components, you can do so by setting the constraint on the wrapping element – the `ld-label` component.

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

### Example vanilla JS form validation

{% example %}
<style>
#example-form {
  display: flex;
  flex-wrap: wrap;
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
@media (max-width: 52rem) {
  #example-form > * {
    width: 100%;
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
  async function validateInput(ldInput, ldInputMessage) {
    const value = await ldInput.getValue()
    if (!value) {
      ldInput.setAttribute('invalid', 'true')
      ldInputMessage.setAttribute('covert', 'false')
    } else {
      ldInput.removeAttribute('invalid')
      ldInputMessage.setAttribute('covert', 'true')
    }
  }
  username.addEventListener('input', ev => {
    validateInput(username, usernameErrorMessage)
  })
  username.addEventListener('blur', ev => {
    validateInput(username, usernameErrorMessage)
  })
  password.addEventListener('blur', ev => {
    validateInput(password, passwordErrorMessage)
  })
  password.addEventListener('input', ev => {
    validateInput(password, passwordErrorMessage)
  })
</script>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                        | Type                | Default     |
| --------- | --------- | ---------------------------------------------------------------------------------- | ------------------- | ----------- |
| `invalid` | `invalid` | Set this property to `true` in order to mark the field visually as invalid.        | `boolean`           | `undefined` |
| `mode`    | `mode`    | Input mode. Use `'dark'` on white backgrounds, use `'light'` on other backgrounds. | `"dark" \| "light"` | `'dark'`    |


## Methods

### `getValue() => Promise<string>`

Returns input value.

#### Returns

Type: `Promise<string>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
