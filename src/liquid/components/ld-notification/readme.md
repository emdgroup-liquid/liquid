---
eleventyNavigation:
  key: Notification
  parent: Components
layout: layout.njk
title: Notification
permalink: components/ld-notification/
---

# ld-notification

> **Note**: 🚧 This component is work in progress.

Use the `ld-notification` component in your application to display popup notifications.

---

## How it works

Add the component to your application, preferably close after the opening `<body>` tag. The component is invisible as long as no new notifications are triggered. It listens to three [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) on the `window`: the `ldNotificationAdd` the `ldNotificationDismiss` and the `ldNotificationClear` event. As soon as one of those events reaches the `window`, the component either queues and displays new notifications or removes queued notifications from its queue. The content and type of each notification is set via the `event.detail` property. Here is an example on how you can trigger a notification containing an alert message:

```js
dispatchEvent(new CustomEvent('ldNotificationAdd', {
  detail: {
    content: 'Something went wrong.',
    type: 'alert',
  }
}))
```

> **Note**: You should not use more than one `ld-notification` component in your app. It wouldn't make much sense to have multiple components managing notification queues and displaying them independently, would it?

## Accessibility

Each notification item that appears on the screen has either the ARIA role `status` or `alert`, so that assistive technology should announce the notification content to the user.

Keep in mind that focus is not explicitly changed when a notification appears. This means that users with visual disabilities may have problems navigating to a notification. This is especially the case for notifications which time out. And even more for notifications containing interaction elements, such as confirmation buttons etc. Thus, we recommend you avoid using notifications for critical information that users need to act on immediately. In summary, notifications may be difficult for users with low vision or low dexterity to access because they

- Disappear automatically
- Can’t be easily accessed with the keyboard
- Might appear outside the proximity of the user’s current focus

### Notifications with interactive content

Make sure that users can accomplish the interaction in the notification another way, since an interaction element within a notification may be difficult to access for some users.

If you really do want to include an interaction element within a notification, [make sure the notification doesn't time out](components/ld-notification/#preventing-a-timeout) so that the user has enough time to navigate to and interact with the notification.

## Notification hierarchy

Notifications of type `'alert'` take precedence of notifications of type `'info'` and `'warn'`, which means that if a notification of type `'info'` or `'warn'` is fired after a notification of type `'alert'` and the notification of type `'alert'` has not been dismissed yet, the potentially less important notifications gets placed behind the notification of type `'alert'`. Other than that most recent notifications take precedence of older notifications, pushing the older ones back in the queue and resetting and pausing their timeouts.

## Notification timeout

While notifications with type `'alert'` do not time out, notifications of type `'info'` and `'warn'` have a default timeout of **six seconds** after which they disappear automatically. You can customize this timeout by attaching a timeout value of your choice to the appropriate property on the event detail object: 

```js
dispatchEvent(new CustomEvent('ldNotificationAdd', {
  detail: {
    content: 'Here is a message for you.',
    type: 'info',
    timeout: 8000, // in milliseconds
  }
}))
```

### Preventing a timeout

If you want to prevent a notification of type `'info'` and `'warn'` from timing out, use the timeout value `0`:

```js
dispatchEvent(new CustomEvent('ldNotificationAdd', {
  detail: {
    content: 'Here is a message for you.',
    type: 'info',
    timeout: 0, // notification will not time out
  }
}))
```

### Timeout handling for queued notifications

If a notification gets queued behind another notification, its timeout is reset to its initial value and on pause.

## Notification content

The examples above used simple text as content for the notification. But you can also use an HTML string containing links and other components:

 ```js
dispatchEvent(new CustomEvent('ldNotificationAdd', {
  detail: {
    content: '<ld-icon name="placeholder"></ld-icon> A notification with an icon.',
    type: 'info',
  }
}))
```

### Redundant notifications handling

If a notification event is triggered containing the same content and type as another notification which already is queued for notification display, the event is ignored. If you still need to trigger another notification with the same content, you can append a zero-space character to your content.

## Dismissing notificaitons

While the user can dismiss the currently displayed notification by pressing the cross button on the notification, there also exist ways to programmatically dismiss notifications.

### Dismissing current notificaiton

You can dismiss the current notification programmatically by dispatching the `ldNotificationDismiss` event on the `window`:

```js
dispatchEvent(new CustomEvent('ldNotificationDismiss'))
```

### Clearing all notifications

You can dismiss all notifications programmatically by dispatching the `ldNotificationClear` event on the `window`:

```js
dispatchEvent(new CustomEvent('ldNotificationClear'))
```

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

<ld-notification placement="bottom"></ld-notification>

<form class="notification-form" id="form-info">
  <ld-label>
    Info message
    <ld-input id="input-info" value="I have an info for you."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-warn">
  <ld-label>
    Warning
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

<form class="notification-form" id="form-alert">
  <ld-label>
    alert message
    <ld-input id="input-alert" value="Ooops."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form id="form-dismiss">
  <ld-button type="submit">Dismiss current notification</ld-button>
</form>

<form id="form-clear">
  <ld-button type="submit">Clear all notifications</ld-button>
</form>

<script>
const formInfo = document.getElementById('form-info')
const inputInfo = document.getElementById('input-info')
formInfo.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
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
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
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
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
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
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: inputInfoNoTimeout.value || '',
      type: 'info',
      timeout: 0,
    }
  }))
})

const formAlert = document.getElementById('form-alert')
const inputAlert = document.getElementById('input-alert')
formAlert.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: inputAlert.value || '',
      type: 'alert',
    }
  }))
})

const formDismiss = document.getElementById('form-dismiss')
formDismiss.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationDismiss'))
})

const formClear = document.getElementById('form-clear')
formClear.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationClear'))
})
</script>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                               | Type                | Default |
| ----------- | ----------- | ----------------------------------------- | ------------------- | ------- |
| `placement` | `placement` | Notification placement within the screen. | `"bottom" \| "top"` | `'top'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
