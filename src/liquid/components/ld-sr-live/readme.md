---
eleventyNavigation:
  key: Screen Reader Live
  parent: Components
layout: layout.njk
title: Screen Reader Live
permalink: components/ld-sr-live/
---

# ld-sr-live

Use the `ld-sr-live` component in your application to **conviniently trigger info and alert messages for screen readers**.

---

## How it works

Add the component to your application, preferably close after the opening `<body>` tag. The component is invisible as it uses the [`ld-sr-only` class](components/ld-sr-only/). It listens to two [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) on the `window`, the `ldSrLiveInfo` and the `ldSrLiveAlert` event. As soon as one of those events reaches the `window`, the component updates the content of one of two contained [`aria-live` reagions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), either the one with `role="status"` or the one with `role="alert"`, depending on the event. For the content it uses the value of `event.detail`. The "politeness setting" is set to `polite`, meaning that the screen reader delays new messages until it has finished announcing the current ones. Here is an example on how you can trigger an event including an info message that will be spoken by a screen reader:

```js
dispatchEvent(new CustomEvent('ldSrLiveInfo', {
  detail: 'Session expired. You have been logged out.'
}))
```

> **Note**: You should not use more than one `ld-sr-live` component in your app. It acts like a speaker to whome you give a bunch of sentences to speak, and it wouldn't make much sense to have multiple speakers talking at the same time, would it? Technically a screen reader would not speak more than one sentence at a time anyway, no matter how many `aria-live` regions you use. Though you can of course use additional `aria-live` regions, if it makes sense for your application.

## Example

You can test the component in the following example (obviously you'll need to turn on a screen reader of your choice in order to hear the announcements):

{% example %}
<style>
#form-info,
#form-alert {
  display: grid;
  grid-auto-flow: column;
  align-items: flex-end;
  grid-gap: 1rem;
}
</style>

<ld-sr-live></ld-sr-live>

<form id="form-info">
  <ld-label>
    Info message
    <ld-input id="input-info"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<form id="form-alert">
  <ld-label>
    Alert message
    <ld-input id="input-alert"></ld-input>
  </ld-label>
  <ld-button type="submit">Submit</ld-button>
</form>

<script>
const formInfo = document.getElementById('form-info')
const inputInfo = document.getElementById('input-info')
formInfo.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldSrLiveInfo', {
    detail: inputInfo.value || ''
  }))
})

const formAlert = document.getElementById('form-alert')
const inputAlert = document.getElementById('input-alert')
formAlert.addEventListener('submit', ev => {
  ev.preventDefault()
  dispatchEvent(new CustomEvent('ldSrLiveAlert', {
    detail: inputAlert.value || ''
  }))
})
</script>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description            | Type  | Default     |
| -------- | --------- | ---------------------- | ----- | ----------- |
| `ref`    | `ref`     | reference to component | `any` | `undefined` |


----------------------------------------------

 
