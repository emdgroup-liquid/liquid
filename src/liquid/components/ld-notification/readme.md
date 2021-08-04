---
eleventyNavigation:
  key: Notification
  parent: Components
layout: layout.njk
title: Notification
permalink: components/ld-notification/
---

# ld-notification

Use the `ld-notification` component in your application to display popup notifications.

---

## How it works

Add the component to your application, preferably close after the opening `<body>` tag. The component is invisible as long as no new notifications are triggered. It listens to three [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) on the `window`: the `ldNotification` the `ldNotificationDismiss` and the `ldNotificationClear` event. As soon as one of those events reaches the `window`, the component either queues and displays new notifications or removes queued notifications from its queue. The content and type of each notification is set via the `event.detail` property. Here is an example on how you can trigger a notification  containing an error message:

```js
dispatchEvent(new CustomEvent('ldNotification', {
  detail: {
    content: 'Something went wrong.',
    type: 'error',
  }
}))
```

> **Note**: You should not use more than one `ld-notification` component in your app. It wouldn't make much sense to have multiple components managing notification queues and displaying them independently, would it?

## Examples

The examples below illustrate how you can trigger notifications using different parameters:

{% example "html", true %}
<style>
.notification-form {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-end;
  grid-gap: 1rem;
  width: calc(100% - 2 * var(--ld-sp-24));
}
</style>

<ld-notification></ld-notification>

<form class="notification-form" id="form-info">
  <ld-label>
    Info message
    <ld-input id="input-info" value="I have an info for you."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-warn">
  <ld-label>
    Alert message
    <ld-input id="input-warn" value="I warn you!"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-info-custom-timeout">
  <ld-label>
    Info message which times out after 10 seconds
    <ld-input id="input-info-custom-timeout" value="I'll take my time."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-info-no-timeout">
  <ld-label>
    Info message which doesn't time out
    <ld-input id="input-info-no-timeout" value="I'm here to stay!"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-error">
  <ld-label>
    Error message
    <ld-input id="input-error" value="Ooops."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<script>
const formInfo = document.getElementById('form-info')
const inputInfo = document.getElementById('input-info')
formInfo.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotification', {
    detail: {
      content: inputInfo.value || '',
      type: 'info',
    }
  }))
})

const formWarn = document.getElementById('form-warn')
const inputWarn = document.getElementById('input-warn')
formWarn.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotification', {
    detail: {
      content: inputWarn.value || '',
      type: 'warn',
    }
  }))
})

const formInfoCustomTimeout = document.getElementById('form-info-custom-timeout')
const inputInfoCustomTimeout = document.getElementById('input-info-custom-timeout')
formInfoCustomTimeout.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotification', {
    detail: {
      content: inputInfoCustomTimeout.value || '',
      type: 'info',
      timeout: 10000,
    }
  }))
})

const formInfoNoTimeout = document.getElementById('form-info-no-timeout')
const inputInfoNoTimeout = document.getElementById('input-info-no-timeout')
formInfoNoTimeout.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotification', {
    detail: {
      content: inputInfoNoTimeout.value || '',
      type: 'info',
      timeout: 0,
    }
  }))
})

const formError = document.getElementById('form-error')
const inputError = document.getElementById('input-error')
formError.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotification', {
    detail: {
      content: inputError.value || '',
      type: 'error',
    }
  }))
})
</script>
{% endexample %}

<!-- Auto Generated Below -->


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
