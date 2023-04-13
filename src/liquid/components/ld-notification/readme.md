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

Add the component to your application, preferably close after the opening `<body>` tag. The component is invisible as long as no new notifications are triggered. It listens to three [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) on the `window`: the `ldNotificationAdd` the `ldNotificationDismiss` and the `ldNotificationClear` event. As soon as one of those events reaches the `window`, the component either queues and displays new notifications or removes queued notifications from its queue. The content and type of each notification is set via the `event.detail` property. Here is an example on how you can trigger a notification containing an alert message:

```js
dispatchEvent(new CustomEvent('ldNotificationAdd', {
  detail: {
    content: 'Something went wrong.',
    type: 'alert',
  }
}))
```

<ld-notice headline="Note" mode="warning">
  You should not use more than one <code>ld-notification</code> component in your app. It wouldn't make much sense to have multiple components managing notification queues and displaying them independently, would it?
</ld-notice>

## Accessibility

Each notification item that appears on the screen has either the ARIA role `status` or `alert`, so that assistive technology should announce the notification content to the user.

Keep in mind that focus is not explicitly changed when a notification appears. This means that users with visual disabilities may have problems navigating to a notification. This is especially the case for notifications which time out. And even more for notifications containing interaction elements, such as confirmation buttons and the like. Thus, we recommend that you avoid using notifications for critical information that users need to act on immediately. In summary, notifications may be difficult for users with low vision or low dexterity to access because they

- Disappear automatically
- Can’t be easily accessed with the keyboard
- Might appear outside the proximity of the user’s current focus

For more information on this topic, please read the [WCAG Understanding SC 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html) docs.

### Notifications with interactive content

Make sure that users can accomplish the interaction in the notification another way, since an interaction element within a notification may be difficult to access for some users.

If you really do want to include an interaction element within a notification, [make sure the notification doesn't time out](components/ld-notification/#preventing-a-timeout) so that the user has enough time to navigate to and interact with the notification.

## Notification hierarchy

Notifications of type `'alert'` take precedence of notifications of type `'info'` and `'warn'`, which means that if a notification of type `'info'` or `'warn'` is fired after a notification of type `'alert'` and the notification of type `'alert'` has not been dismissed yet, the potentially less important notifications get placed behind the notification of type `'alert'`. Other than that most recent notifications take precedence of older notifications, pushing the older ones back in the queue and resetting and pausing their timeouts.

## Notification timeout

While notifications with type `'alert'` do not time out by default, notifications of type `'info'` and `'warn'` have a default timeout of **six seconds** after which they disappear automatically. You can customize the timeout for each notification type by attaching a timeout value of your choice to the appropriate property on the event detail object:

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

The `ld-notification` component will sanitize the HTML string before rendering it to prevent XSS attacks using the [DOMPurify](https://github.com/cure53/DOMPurify) package. You can change the config passed to DOMPurify according to your needs by providing your own config with the `sanitizeConfig` prop.

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

## Theming

Notifications of type `'info'` can be themed by wrapping `ld-notification` in a [theme container](components/ld-theme/). 

## Examples

The examples below illustrate how you can trigger notifications using different parameters:

{% example '{ "stacked": true, "styles": { "overflow": "visible", "will-change": "initial" } }' %}
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
    <ld-input name="message" value="I have an info for you."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-warn">
  <ld-label>
    Warning
    <ld-input name="message" value="I warn you!"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-info-custom-timeout">
  <ld-label>
    Info message which times out after 10 seconds
    <ld-input name="message" value="I'll take my time."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-info-no-timeout">
  <ld-label>
    Info message which doesn't time out
    <ld-input name="message" value="I'm here to stay!"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form class="notification-form" id="form-alert">
  <ld-label>
    alert message
    <ld-input name="message" value="Ooops."></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<ld-button id="button-dismiss" type="button">Dismiss current notification</ld-button>

<ld-button id="button-clear" type="button">Clear all notifications</ld-button>

<script>
const formInfo = document.getElementById('form-info')
formInfo.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: ev.currentTarget.message.value || '',
      type: 'info',
    }
  }))
})

const formWarn = document.getElementById('form-warn')
formWarn.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: ev.currentTarget.message.value || '',
      type: 'warn',
    }
  }))
})

const formInfoCustomTimeout = document.getElementById('form-info-custom-timeout')
formInfoCustomTimeout.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: ev.currentTarget.message.value || '',
      type: 'info',
      timeout: 10000,
    }
  }))
})

const formInfoNoTimeout = document.getElementById('form-info-no-timeout')
formInfoNoTimeout.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: ev.currentTarget.message.value || '',
      type: 'info',
      timeout: 0,
    }
  }))
})

const formAlert = document.getElementById('form-alert')
formAlert.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationAdd', {
    detail: {
      content: ev.currentTarget.message.value || '',
      type: 'alert',
    }
  }))
})

const buttonDismiss = document.getElementById('button-dismiss')
buttonDismiss.addEventListener('click', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationDismiss'))
})

const buttonClear = document.getElementById('button-clear')
buttonClear.addEventListener('click', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldNotificationClear'))
})
</script>

<!-- React component -->

const notificationFormStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'flex-end',
  gridGap: '1rem',
  width: 'calc(100% - 2 * var(--ld-sp-24))',
}

return (
  <>
    <LdNotification placement="bottom" />

    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        dispatchEvent(
          new CustomEvent('ldNotificationAdd', {
            detail: {
              content: ev.currentTarget.message.value || '',
              type: 'info',
            },
          })
        )
      }}
      style={notificationFormStyles}
    >
      <LdLabel>
        Info message
        <LdInput name="message" value="I have an info for you." />
      </LdLabel>
      <LdButton type="submit">Submit</LdButton>
    </form>

    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        dispatchEvent(
          new CustomEvent('ldNotificationAdd', {
            detail: {
              content: ev.currentTarget.message.value || '',
              type: 'warn',
            },
          })
        )
      }}
      style={notificationFormStyles}
    >
      <LdLabel>
        Warning
        <LdInput name="message" value="I warn you!" />
      </LdLabel>
      <LdButton type="submit">Submit</LdButton>
    </form>

    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        dispatchEvent(
          new CustomEvent('ldNotificationAdd', {
            detail: {
              content: ev.currentTarget.message.value || '',
              type: 'info',
              timeout: 10000,
            },
          })
        )
      }}
      style={notificationFormStyles}
    >
      <LdLabel>
        Info message which times out after 10 seconds
        <LdInput name="message" value="I'll take my time." />
      </LdLabel>
      <LdButton type="submit">Submit</LdButton>
    </form>

    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        dispatchEvent(
          new CustomEvent('ldNotificationAdd', {
            detail: {
              content: ev.currentTarget.message.value || '',
              type: 'info',
              timeout: 0,
            },
          })
        )
      }}
      style={notificationFormStyles}
    >
      <LdLabel>
        Info message which doesn't time out
        <LdInput name="message" value="I'm here to stay!" />
      </LdLabel>
      <LdButton type="submit">Submit</LdButton>
    </form>

    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        dispatchEvent(
          new CustomEvent('ldNotificationAdd', {
            detail: {
              content: ev.currentTarget.message.value || '',
              type: 'alert',
            },
          })
        )
      }}
      style={notificationFormStyles}
    >
      <LdLabel>
        alert message
        <LdInput name="message" value="Ooops." />
      </LdLabel>
      <LdButton type="submit">Submit</LdButton>
    </form>

    <LdButton
      onClick={(ev) => {
        ev.preventDefault()
        dispatchEvent(new CustomEvent('ldNotificationDismiss'))
      }}
      type="button"
    >
      Dismiss current notification
    </LdButton>

    <LdButton
      onClick={(ev) => {
        ev.preventDefault()
        dispatchEvent(new CustomEvent('ldNotificationClear'))
      }}
      type="button"
    >
      Clear all notifications
    </LdButton>
  </>
)
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                       | Type                       | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `placement`      | `placement`       | Notification placement within the screen.                                                                                                                                                         | `"bottom" \| "top"`        | `'top'`     |
| `sanitizeConfig` | `sanitize-config` | Sanitize config passed to DOMPurify's sanitize method. If passed as string, the component will try to parse the string as JSON. See https://github.com/cure53/DOMPurify#can-i-configure-dompurify | `SanitizeConfig \| string` | `undefined` |


## Shadow Parts

| Part                 | Description |
| -------------------- | ----------- |
| `"btn-dismiss"`      |             |
| `"btn-dismiss-icon"` |             |
| `"content"`          |             |
| `"focusable"`        |             |
| `"item"`             |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
