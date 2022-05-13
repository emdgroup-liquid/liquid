---
eleventyNavigation:
  key: Button
  parent: Components
layout: layout.njk
title: Button
permalink: components/ld-button/
---

<link rel="stylesheet" href="css_components/ld-button.css">
<link rel="stylesheet" href="css_components/ld-icon.css">

# ld-button

Buttons allow a user to trigger events on the user interface. A button's text should express what the button does.
Icon-buttons without visual text should either contain a [screen-reader-only](components/ld-sr-only/) text, have an `aria-label`, a `title` element within the svg icon or an `alt` text on an image icon within the button.

---

## Examples

### Primary

{% example %}
<ld-button>Text</ld-button>

<!-- CSS component -->

<button class="ld-button">Text</button>
{% endexample %}

### Disabled

{% example %}
<ld-button id="disabled-button-1" disabled>Text</ld-button>
<script>
  document.getElementById('disabled-button-1').addEventListener('click', () => { window.alert('click') })
  // The event handler won't be called.
</script>

<!-- CSS component -->

<button id="disabled-button-2" class="ld-button" disabled>Text</button>
<script>
  document.getElementById('disabled-button-2').addEventListener('click', () => { window.alert('click') })
  // The event handler won't be called.
</script>
{% endexample %}

The `disabled` attribute applies both attributes, `disabled` and `aria-disabled="true"` on the rendered component.
Although `aria-disabled="true"` is not necessary on a `button` element (or any other HTML control which supports the disabled attribute natively), it is applied just in case you use an [anchor button](components/ld-button/#anchor-button).

**If you want the button to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-button id="disabled-button-3" aria-disabled="true">Text</ld-button>
<script>
  document.getElementById('disabled-button-3').addEventListener('click', () => { window.alert('click') })
  // The event handler won't be called.
</script>

<!-- CSS component -->

<button id="disabled-button-4" class="ld-button" aria-disabled="true">
  Text
</button>
<script>
  // When using the CSS component, you will need to prevent the default behaviour of the button yourself.
  document.getElementById('disabled-button-4').addEventListener('click', (ev) => {
    console.info('preventing default behaviour')
    ev.preventDefault()
    ev.stopImmediatePropagation()
  })
</script>

{% endexample %}

<ld-notice headline="Note" mode="warning">
  When <code>aria-disabled</code> is applied on the button, either explicitly or implicitly, the component will try to prevent user interaction using an internal click event handler, calling <code>preventDefault()</code> and <code>stopImmediatePropagation()</code> on the click event. With the CSS component version on the other hand, you will need to take care of preventing the default behaviour of the button yourself. 
</ld-notice>

### Secondary

{% example %}
<ld-button mode="secondary">Text</ld-button>

<ld-button mode="secondary" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--secondary">Text</button>

<button class="ld-button ld-button--secondary" disabled>Text</button>
{% endexample %}

### Ghost

{% example %}
<ld-button mode="ghost">Text</ld-button>

<ld-button mode="ghost" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--ghost">Text</button>

<button class="ld-button ld-button--ghost" disabled>Text</button>
{% endexample %}

### On brand color

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-button brand-color>Text</ld-button>

<ld-button brand-color disabled>Text</ld-button>

<ld-button mode="secondary" brand-color>Text</ld-button>

<ld-button mode="secondary" brand-color disabled>Text</ld-button>

<ld-button mode="ghost" brand-color>Text</ld-button>

<ld-button mode="ghost" brand-color disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--brand-color">Text</button>

<button class="ld-button ld-button--brand-color" disabled>Text</button>

<button class="ld-button ld-button--secondary ld-button--brand-color">Text</button>

<button class="ld-button ld-button--secondary ld-button--brand-color" disabled>Text</button>

<button class="ld-button ld-button--ghost ld-button--brand-color">Text</button>

<button class="ld-button ld-button--ghost ld-button--brand-color" disabled>Text</button>
{% endexample %}

### Highlight

{% example %}
<ld-button mode="highlight">Text</ld-button>

<ld-button mode="highlight" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--highlight">Text</button>

<button class="ld-button ld-button--highlight" disabled>Text</button>
{% endexample %}

### Danger

{% example %}
<ld-button mode="danger">Text</ld-button>

<ld-button mode="danger" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--danger">Text</button>

<button class="ld-button ld-button--danger" disabled>Text</button>
{% endexample %}

### Size

{% example %}
<ld-button size="sm">Text</ld-button>

<ld-button>Text</ld-button>

<ld-button size="lg">Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--sm">Text</button>

<button class="ld-button">Text</button>

<button class="ld-button ld-button--lg">Text</button>
{% endexample %}

### With icon

{% example %}
<ld-button size="sm">
  <ld-icon name="placeholder" size="sm" aria-label="Text"></ld-icon>
</ld-button>

<ld-button>
  <ld-icon name="placeholder" aria-label="Text"></ld-icon>
</ld-button>

<ld-button size="lg">
  <ld-icon name="placeholder" size="lg" aria-label="Text"></ld-icon>
</ld-button>

<ld-button mode="highlight" size="sm">
  <ld-icon name="placeholder" size="sm"></ld-icon>
  Text
</ld-button>

<ld-button mode="danger">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<ld-button mode="secondary" size="lg">
  <ld-icon name="placeholder" size="lg"></ld-icon>
  Text
</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--sm">
  <span class="ld-icon ld-icon--sm">
    <svg viewBox="0 0 24 24" fill="none">
      <title>Text</title>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button class="ld-button">
  <span class="ld-icon">
    <svg viewBox="0 0 24 24" fill="none">
      <title>Text</title>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button class="ld-button ld-button--lg">
  <span class="ld-icon ld-icon--lg">
    <svg viewBox="0 0 24 24" fill="none">
      <title>Text</title>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button class="ld-button ld-button--highlight ld-button--sm">
  <span class="ld-icon ld-icon--sm" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
  Text
</button>

<button class="ld-button ld-button--danger">
  Text
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button class="ld-button ld-button--secondary ld-button--lg">
    <span class="ld-icon ld-icon--lg" role="presentation">
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
    Text
</button>
{% endexample %}

### With custom width

To give a button a custom width, simply assign the `width` or `min-width` CSS properties to the element, use other techniques (`grid`, `flex` etc.) on the wrapping element or apply utility classes (i.e. from [Tailwind](https://tailwindcss.com/), if that's your tool of choice) on the element.

{% example %}
<ld-button style="width: 18rem">Text</ld-button>

<div style="display: inline-grid; width: 18rem">
  <ld-button>Text</ld-button>
</div>

<!-- CSS component -->

<button class="ld-button" style="width: 18rem">Text</button>

<div style="display: inline-grid; width: 18rem">
  <button class="ld-button">Text</button>
</div>
{% endexample %}

### Justify content

{% example %}
<ld-button style="width: 8rem" justify-content="center">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<ld-button style="width: 8rem" justify-content="start">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<ld-button style="width: 8rem" justify-content="end">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<ld-button style="width: 8rem" justify-content="between">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<!-- CSS component -->

<button style="width: 8rem" class="ld-button">
  Text
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-button--justify-start">
  Text
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-button--justify-end">
  Text
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-button--justify-between">
  Text
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>
{% endexample %}

### Multi-line

<ld-notice headline="Note" mode="warning">
  You shouldn't use a button with too much text in it! Instead, put the description in a label outside the button.
</ld-notice>

You can align the text inside the button using the `align-text` propperty.

{% example %}
<ld-button>
  Almost before we knew it, we had left the ground.
  A shining crescent far beneath the flying vessel.
  Then came the night of the first falling star.
</ld-button>

<ld-button align-text="left">
  <ld-icon name="placeholder"></ld-icon>
  Almost before we knew it, we had left the ground. 
  A shining crescent far beneath the flying vessel. 
  Then came the night of the first falling star.
</ld-button>

<ld-button align-text="right">
  Almost before we knew it, we had left the ground. 
  A shining crescent far beneath the flying vessel. 
  Then came the night of the first falling star.
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<!-- CSS component -->

<button class="ld-button">
  Almost before we knew it, we had left the ground. 
  A shining crescent far beneath the flying vessel. 
  Then came the night of the first falling star.
</button>

<button class="ld-button ld-button--align-text-left">
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
  Almost before we knew it, we had left the ground. 
  A shining crescent far beneath the flying vessel. 
  Then came the night of the first falling star.
</button>

<button class="ld-button ld-button--align-text-right">
  Almost before we knew it, we had left the ground. 
  A shining crescent far beneath the flying vessel. 
  Then came the night of the first falling star.
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
</button>
{% endexample %}

### Anchor button

{% example '{ "opened": true }' %}
<ld-button href="#" target="_blank">Text</ld-button>

<!-- CSS component -->

<a class="ld-button" href="#" target="_blank" rel="noreferrer noopener">Text</a>
{% endexample %}

<ld-notice headline="Note" mode="warning">
  When using <code>target="_blank"</code>, a <code>rel</code> attribute with the value <code>noreferrer noopener</code> is applied automatically. Just in case. If you are using the CSS component version of the button, you will need to take care of this yourself. See <a href="https://web.dev/external-anchors-use-rel-noopener/" rel="noreferrer noopener" target="_blank">https://web.dev/external-anchors-use-rel-noopener/</a>
</ld-notice>

### Progress button

{% example '{ "opened": true }' %}
<ld-button progress="0.75">Text</ld-button>

<ld-button progress="pending">Text</ld-button>

<ld-button progress="pending" mode="highlight">Text</ld-button>

<ld-button progress="pending" mode="danger">Text</ld-button>

<ld-button progress="pending" mode="secondary">Text</ld-button>

<ld-button progress="pending" mode="ghost">Text</ld-button>

<!-- CSS component -->

<button class="ld-button" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
</button>

<button class="ld-button" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress ld-button__progress--pending"></span>
</button>

<button class="ld-button ld-button--highlight" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress ld-button__progress--pending"></span>
</button>

<button class="ld-button ld-button--danger" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress ld-button__progress--pending"></span>
</button>

<button class="ld-button ld-button--secondary" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress ld-button__progress--pending"></span>
</button>

<button class="ld-button ld-button--ghost" aria-busy="true" aria-live="polite">
  Text
  <span class="ld-button__progress ld-button__progress--pending"></span>
</button>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                           | Type                                                                           | Default     |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------- |
| `alignText`      | `align-text`      | Align text.                                                                                                                                                                                                           | `"left" \| "right"`                                                            | `undefined` |
| `autofocus`      | `autofocus`       | Automatically focus the form control when the page is loaded.                                                                                                                                                         | `boolean`                                                                      | `false`     |
| `brandColor`     | `brand-color`     | Style the button so that it looks good on the current theme's primary color.                                                                                                                                          | `boolean`                                                                      | `undefined` |
| `disabled`       | `disabled`        | Disabled state of the button.                                                                                                                                                                                         | `boolean`                                                                      | `undefined` |
| `form`           | `form`            | Associates the control with a form element.                                                                                                                                                                           | `string`                                                                       | `undefined` |
| `formaction`     | `formaction`      | Overrides the `action` attribute of the button's form owner.                                                                                                                                                          | `"application/x-www-form-urlencoded" \| "multipart/form-data" \| "text/plain"` | `undefined` |
| `formenctype`    | `formenctype`     | Overrides the `enctype` attribute of the button's form owner.                                                                                                                                                         | `string`                                                                       | `undefined` |
| `formmethod`     | `formmethod`      | Overrides the `method` attribute of the button's form owner.                                                                                                                                                          | `"get" \| "post"`                                                              | `undefined` |
| `formnovalidate` | `formnovalidate`  | Overrides the `novalidate` attribute of the button's form owner.                                                                                                                                                      | `boolean`                                                                      | `undefined` |
| `formtarget`     | `formtarget`      | Overrides the `target` attribute of the button's form owner.                                                                                                                                                          | `"_blank" \| "_parent" \| "_self" \| "_top"`                                   | `undefined` |
| `href`           | `href`            | Transforms the button to an anchor element. See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) for more information on the `href` attribute.                                       | `string`                                                                       | `undefined` |
| `justifyContent` | `justify-content` | Justify content.                                                                                                                                                                                                      | `"between" \| "end" \| "start"`                                                | `undefined` |
| `key`            | `key`             | for tracking the node's identity when working with lists                                                                                                                                                              | `string \| number`                                                             | `undefined` |
| `ldTabindex`     | `ld-tabindex`     | Tab index of the button.                                                                                                                                                                                              | `number`                                                                       | `undefined` |
| `mode`           | `mode`            | Display mode.                                                                                                                                                                                                         | `"danger" \| "ghost" \| "highlight" \| "secondary"`                            | `undefined` |
| `name`           | `name`            | Used to specify the name of the control.                                                                                                                                                                              | `string`                                                                       | `undefined` |
| `progress`       | `progress`        | Displays a progress bar at the bottom of the button.                                                                                                                                                                  | `"pending" \| number`                                                          | `undefined` |
| `ref`            | `ref`             | reference to component                                                                                                                                                                                                | `any`                                                                          | `undefined` |
| `size`           | `size`            | Size of the button.                                                                                                                                                                                                   | `"lg" \| "sm"`                                                                 | `undefined` |
| `target`         | `target`          | The `target` attributed can be used in conjunction with the `href` attribute. See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for more information on the `target` attribute. | `"_blank" \| "_parent" \| "_self" \| "_top"`                                   | `undefined` |
| `type`           | `type`            | Specifies the default behavior of the button.                                                                                                                                                                         | `"button" \| "reset" \| "submit"`                                              | `'submit'`  |
| `value`          | `value`           | Defines the value associated with the button’s `name` when it’s submitted with the form data.                                                                                                                         | `string`                                                                       | `undefined` |


## Methods

### `focusInner() => Promise<void>`

Sets focus on the button

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description                     |
| ---------------- | ------------------------------- |
| `"button"`       | Actual button or anchor element |
| `"progress-bar"` | Progress bar                    |


## Dependencies

### Used by

 - [ld-pagination](../ld-pagination)

### Graph
```mermaid
graph TD;
  ld-pagination --> ld-button
  style ld-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
