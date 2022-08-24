---
eleventyNavigation:
  key: Form validation
  parent: Guides
  order: 6
layout: layout.njk
title: Form validation
permalink: guides/form-validation/
---


# Form validation

Liquid Oxygen aims to make integrating form components with forms and form validation libraries as easy as possible. There are mainly three possible ways of accessing the values of form-related components:

- Integrating the Web Components with an associated `<form>` element and accessing their values using the `FormData` of the form
- Directly accessing the props of a Web Component
- Using the `detail` attribute of a custom event dispatched by the Web Component

## Form association

There are two ways of associating a form-related Web Component with an existing `<form>` element:

```js
// Using the form prop
<form id="registrationForm" />
<ld-input form="registrationForm" name="firstName" />

// or wrapping it with a form element
<form>
  <ld-input name="firstName" />
</form>
```

<ld-notice mode="warning">
  To make the Web Component accessible via the <code>FormData</code> of the <code>&lt;form&gt;</code> element, the <code>name</code> prop of the component has to be set.
</ld-notice>

If a form-related component is associated with a form in one of the above ways, the component's current value can be accessed using the form itself like it would be the case for a native `<input>` element.

### Example

{% example '{ "opened": true }' %}
<form name="registrationForm1" style="display:flex;align-items:center">
  <ld-label>
    First Name*
    <ld-input name="firstName" placeholder="Jane Doe" required></ld-input>
    <ld-input-message style="visibility:hidden">This field is required.</ld-input-message>
  </ld-label>
  <ld-button style="margin:-0.3rem 0 0 1rem">Submit</ld-button>
</form>

<script>
  const form = document.registrationForm1
  const inputField1 = form.querySelector('ld-input')
  const inputMessage1 = form.querySelector('ld-input-message')

  function validateInput1() {
    const formData = new FormData(form)

    if (!formData.get('firstName')) {
      inputField1.invalid = true
      inputMessage1.style.visibility = 'inherit'
      return false
    }

    inputField1.invalid = false
    inputMessage1.style.visibility = 'hidden'
    return true
  }

  inputField1.addEventListener('input', validateInput1)

  inputField1.addEventListener('blur', validateInput1)

  function getValues() {
    const formData = new FormData(form)
    let values = '';

    formData.forEach((value, key) => {
      values += `
${key}: ${value}`
    })

    return values
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    const isValid = validateInput1()
    const values = getValues()

    // setTimeout is used in order to let the style update before showing the alert.
    // You can probably dismiss the timeout, if you're using a UI framework like React or Vue.
    setTimeout(() => {
      if (isValid) {
        window.alert(`Form submitted. FormData:${values}`)
      } else {
        window.alert('Form is invalid.')
      }
    }, 100)
  })
</script>
{% endexample %}

## Accessing props

Accessing props works just as it would with native input elements. The props, which allow you to access component-specific values, are documented in each component's documentation page.

### Example

{% example '{ "opened": true }' %}
<div style="display:flex;align-items:center">
  <ld-label>
    Gender*
    <ld-select id="gender2" name="gender" required>
      <ld-option value="m">male</ld-option>
      <ld-option value="f">female</ld-option>
      <ld-option value="d">diverse</ld-option>
    </ld-select>
    <ld-input-message id="msg2" style="visibility:hidden">This field is required.</ld-input-message>
  </ld-label>
  <ld-button id="btn2" style="margin:-0.3rem 0 0 1rem">Submit</ld-button>
</div>

<script>
  const selectField2 = document.getElementById('gender2')
  const inputMessage2 = document.getElementById('msg2')
  const button2 = document.getElementById('btn2')

  function validateSelect2(input) {
    if (!input.selected.length) {
      input.invalid = true
      inputMessage2.style.visibility = 'inherit'
      return false
    }

    input.invalid = false
    inputMessage2.style.visibility = 'hidden'
    return true
  }

  selectField2.addEventListener('input', event => {
    validateSelect2(event.target)
  })

  selectField2.addEventListener('blur', event => {
    validateSelect2(event.target)
  })

  button2.addEventListener('click', event => {
    const isValid = validateSelect2(selectField2)

    // setTimeout is used in order to let the style update before showing the alert.
    // You can probably dismiss the timeout, if you're using a UI framework like React or Vue.
    setTimeout(() => {
      if (isValid) {
        window.alert(`Form submitted with:
${selectField2.name}: ${selectField2.selected[0].value} (${selectField2.selected[0].text})`)
      } else {
        window.alert('Form is invalid.')
      }
    }, 100)
  })
</script>
{% endexample %}

## Using event details

Custom events dispatched by Liquid Oxygen Web Components contain the relevant information about the component's state in their `detail` attribute. It's an easy way of accessing the current value of an input without having to access the props of the component itself.

### Example

{% example '{ "opened": true }' %}
<div style="display:flex;align-items:center">
  <ld-label>
    First Name*
    <ld-input id="name3" name="firstName" placeholder="Jane Doe" required></ld-input>
    <ld-input-message id="msg3" style="visibility:hidden">This field is required.</ld-input-message>
  </ld-label>
  <ld-button id="btn3" style="margin:-0.3rem 0 0 1rem">Submit</ld-button>
</div>

<script>
  const inputField3 = document.getElementById('name3')
  const inputMessage3 = document.getElementById('msg3')
  const button3 = document.getElementById('btn3')
  let currentValue

  function validateInput3() {
    if (!currentValue) {
      inputField3.invalid = true
      inputMessage3.style.visibility = 'inherit'
      return false
    }

    inputField3.invalid = false
    inputMessage3.style.visibility = 'hidden'
    return true
  }

  inputField3.addEventListener('ldchange', event => {
    currentValue = event.detail
    validateInput3()
  })

  inputField3.addEventListener('blur', event => {
    validateInput3()
  })

  button3.addEventListener('click', event => {
    const isValid = validateInput3()

    // setTimeout is used in order to let the style update before showing the alert.
    // You can probably dismiss the timeout, if you're using a UI framework like React or Vue.
    setTimeout(() => {
      if (isValid) {
        window.alert(`Form submitted with:
firstName: ${currentValue}`)
      } else {
        window.alert('Form is invalid.')
      }
    }, 100)
  })
</script>
{% endexample %}

<docs-page-nav prev-href="guides/event-handling/" next-title="React bindings" next-href="guides/react-bindings/"></docs-page-nav>
