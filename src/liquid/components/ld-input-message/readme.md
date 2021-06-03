---
eleventyNavigation:
  key: Input Message
  parent: Components
layout: layout.njk
title: Input Message
permalink: components/ld-input-message/
---

# ld-input-message

This component is meant to be used in conjunction with the [`ld-input`](/components/ld-input/) and the [`ld-label`](/components/ld-label/) component. Please reffer to the [`ld-input`](/components/ld-input/) docs for further usage examples.

> **Note**: If you choose to use the CSS component and plan to conditionally show the message, such as when an input field becomes invalid after user interaction, you will need to make sure that screen readers or other assistive technology become aware of a message as soon as it becomes visible. You might want to use [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) for this matter.

## Examples

### As error message

{% example %}
<ld-input-message>This field is required.</ld-input-message>

<!-- CSS component -->

<span class="ld-input-message ld-input-message--error">
  <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Error</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#E61E50"/>
    <path d="M4.66675 4.66699L9.33341 9.33366" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4.66675 9.33301L9.33341 4.66634" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  This field is required.
</span>
{% endexample %}

### As info message

{% example %}
<ld-input-message mode="info">This field will destroy itself on form submission.</ld-input-message>

<!-- CSS component -->

<span class="ld-input-message ld-input-message--info">
  <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Info</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#FFC832"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="#091734"/>
    <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="#091734"/>
  </svg>
  This field will destroy itself on form submission.
</span>
{% endexample %}

### As success message

{% example %}
<ld-input-message mode="valid">That's correct!</ld-input-message>

<!-- CSS component -->

<span class="ld-input-message ld-input-message--info">
  <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Valid</title>
    <rect x="1" y="1" width="14" height="14" rx="7" fill="#01884C"/>
    <path d="M11.1111 6.13333L7.00937 9.86666L4.88887 7.77577" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  That's correct!
</span>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Type                           | Default   |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | --------- |
| `covert` | `covert`  | This property does **not** change the visual appearance of the input message. Set this property to `true` if the message is hidden initially and change it to `false` as soon as you make the message visible again. It changes the `aria-hidden` attribute on the slot which is wrapped by an element that has an `aria-live` attribute with the value `assertive`. This means that the slot is wrapped by a so called “live region”, which is conveyed to screen readers and other assistive technology. The value “assertive” emphasizes the importance of the message and causes screen readers to interrupt their current tasks to read aloud this message. Thus the message is read aloud before the next element that received the focus is announced to the user. | `boolean`                      | `false`   |
| `mode`   | `mode`    | Input message mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"error" \| "info" \| "valid"` | `'error'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
