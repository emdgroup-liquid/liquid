---
eleventyNavigation:
  key: Label
  parent: Components
layout: layout.njk
title: Label
permalink: components/ld-label/
---

<link rel="stylesheet" href="css_components/ld-label.css">
<link rel="stylesheet" href="css_components/ld-input.css">
<link rel="stylesheet" href="css_components/ld-input-message.css">
<link rel="stylesheet" href="css_components/ld-icon.css">
<link rel="stylesheet" href="css_components/ld-toggle.css">
<link rel="stylesheet" href="css_components/ld-checkbox.css">

# ld-label

This component is meant to be used in conjunction with form input components, such as the [`ld-input`](components/ld-input/) component, and the [`ld-input-message`](components/ld-input-message/) component.

## Example

{% example %}
<ld-label>Email Address</ld-label>

<!-- CSS component -->

<label class="ld-label">Email Address</label>
{% endexample %}

### Size

The default size is small. You can use a slightly bigger label (size medium) by applying the `size="m"` property.

{% example %}
<ld-label size="m">
  Email Address
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--m">
  Email Address
</label>
{% endexample %}

### Position

How the label positions its child elements depends both on its `position` prop and the type of the input element that it wrapps. For instance, if the component contains an [`ld-input-message`](components/ld-input-message/) component, it gets horizontally aligned with larger input elements such as the [`ld-input`](components/ld-input/) or the [`ld-select`](components/ld-select/) component, but not with narrower input elements such as [`ld-checkbox`](components/ld-checkbox/) or a [`ld-toggle`](components/ld-toggle/) component.

#### Top (default position)

{% example %}
<ld-label>
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<ld-label>
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>This field is required.</ld-input-message>
</ld-label>

<ld-label>
  Auto-update
  <ld-toggle></ld-toggle>
  <ld-input-message mode="info">Recommended.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>

<label class="ld-label">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    This field is required.
  </span>
</label>

<label class="ld-label">
  Auto-update
  <div class="ld-toggle">
    <input type="checkbox" />
    <span class="ld-toggle__knob"></span>
  </div>
  <span class="ld-input-message ld-input-message--info">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    Recommended.
  </span>
</label>
{% endexample %}

#### Left

{% example %}
<ld-label position="left" size="m">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<ld-label position="left" size="m" align-message>
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>This field is required.</ld-input-message>
</ld-label>

<ld-label position="left" size="m">
  Auto-update
  <ld-toggle></ld-toggle>
  <ld-input-message mode="info">Recommended.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--left ld-label--m">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>

<label class="ld-label ld-label--left ld-label--m ld-label--align-message">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    This field is required.
  </span>
</label>

<label class="ld-label ld-label--left ld-label--m">
  Auto-update
  <div class="ld-toggle">
    <input type="checkbox" />
    <span class="ld-toggle__knob"></span>
  </div>
  <span class="ld-input-message ld-input-message--info">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    Recommended.
  </span>
</label>
{% endexample %}

#### Right

{% example %}
<ld-label position="right" size="m">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<ld-label position="right" size="m" align-message>
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>This field is required.</ld-input-message>
</ld-label>

<ld-label position="right" size="m">
  Auto-update
  <ld-toggle></ld-toggle>
  <ld-input-message mode="info">Recommended.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right ld-label--m">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>

<label class="ld-label ld-label--right ld-label--m ld-label--align-message">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    This field is required.
  </span>
</label>

<label class="ld-label ld-label--right ld-label--m">
  Auto-update
  <div class="ld-toggle">
    <input type="checkbox" />
    <span class="ld-toggle__knob"></span>
  </div>
  <span class="ld-input-message ld-input-message--info">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="var(--ld-thm-warning)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-col-neutral-900)"/>
      <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-col-neutral-900)"/>
    </svg>
    Recommended.
  </span>
</label>
{% endexample %}

### Align message with input

When positioning the label left or right, you may want to position the `ld-input-message` right under the input field that is wrapped by the `ld-label`. You can do set the `align-message`-attribute to achieve this behavior. With this attribute set (and the label being positioned left or right), the `ld-input-message` will also never grow underneath the label.

{% example %}
<ld-label position="left" size="m">
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>I do not align with the input.</ld-input-message>
</ld-label>

<ld-label position="left" size="m" align-message>
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>I align with the input.</ld-input-message>
</ld-label>

<ld-label position="right" size="m" align-message>
  Email Address
  <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
  <ld-input-message>I never grow underneath the label, even though I am very long.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--left ld-label--m">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    I do not align with the input.
  </span>
</label>

<label class="ld-label ld-label--left ld-label--m ld-label--align-message">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    I align with the input.
  </span>
</label>

<label class="ld-label ld-label--right ld-label--m ld-label--align-message">
  Email Address
  <div class="ld-input ld-input--invalid">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
  <span class="ld-input-message ld-input-message--error">
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    I never grow underneath the label, even though I am very long.
  </span>
</label>
{% endexample %}

### HTML Content

HTML content describing the labeled element should be wrapped in a single HTML element (e.g. a `span`):

{% example %}
<ld-label position="right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <ld-checkbox></ld-checkbox>
</ld-label>

<ld-label position="right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <ld-checkbox invalid></ld-checkbox>
  <ld-input-message>Please confirm that you love to code.</ld-input-message>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <div class="ld-checkbox">
    <input type="checkbox">
    <svg
      class="ld-checkbox__check"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
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

<label class="ld-label ld-label--right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <div class="ld-checkbox ld-checkbox--invalid">
    <input type="checkbox">
    <svg
      class="ld-checkbox__check"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
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
    <svg class="ld-input-message__icon ld-icon ld-icon--sm" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
      <path d="M4.66675 4.66699L9.33341 9.33366" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66675 9.33301L9.33341 4.66634" stroke="var(--ld-col-wht)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Please confirm that you love to code.
  </span>
</label>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                              | Type                | Default     |
| -------------- | --------------- | -------------------------------------------------------- | ------------------- | ----------- |
| `alignMessage` | `align-message` | Align input message with input position.                 | `boolean`           | `undefined` |
| `key`          | `key`           | for tracking the node's identity when working with lists | `string \| number`  | `undefined` |
| `position`     | `position`      | Relative position to labeled element. Default is top.    | `"left" \| "right"` | `undefined` |
| `ref`          | `ref`           | reference to component                                   | `any`               | `undefined` |
| `size`         | `size`          | Size of the label. Default is small.                     | `"m"`               | `undefined` |


## Shadow Parts

| Part    | Description          |
| ------- | -------------------- |
| `"tag"` | Actual label element |


----------------------------------------------

 
