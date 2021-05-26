---
eleventyNavigation:
  key: Button
  parent: Components
layout: layout.njk
title: Button
permalink: liquid/components/ld-button/
---

# Button

Buttons are used for triggering important user actions. A button text should be speaking in the sense of the user’s understanding, rather than in the system’s language.
Icon-buttons without visual text should contain a screen-reader-only text.

---

## Examples

### Primary

{% example %}
<ld-button>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### Disabled

{% example %}
<ld-button disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive" disabled>
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

The `disabled` attribute applies both attributes, `disabled` and `aria-disabled="true"` on the rendered component.
Although `aria-disabled="true"` is not necessary on a `button` element (or any other HTML control which supports the disabled attribute natively), it is applied just in case you use an [anchor button](#anchor-button).

**If you want the button to stay focusable** even if it is disabled, use `aria-disabled` in place of `disabled`:

{% example %}
<ld-button id="disabled-button" aria-disabled="true">Text</ld-button>
<script>
  document.getElementById('disabled-button').addEventListener('click', () => { window.alert('click') })
  // The event handler won't be called.
</script>

<!-- CSS component -->

<button id="disabled-button-2" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive" aria-disabled="true">
  <span class="ld-button__content">Text</span>
</button>
<script>
  // When using the CSS component, you will need to prevent the default behaviour of the button yourself.
  document.getElementById('disabled-button-2').addEventListener('click', (ev) => {
    console.info('preventing default behaviour')
    ev.preventDefault()
    ev.stopImmediatePropagation()
  })
</script>

{% endexample %}

> **Note:** When `aria-disabled` is applied on the button, either explicitly or implicitly, the component will try to prevent user interaction using an internal click event handler calling `preventDefault()` and `stopImmediatePropagation()` on the click event. With the CSS component version on the other hand, you will need to take care of preventing the default behaviour of the button yourself. 

### Highlighted

{% example %}
<ld-button mode="highlight">Text</ld-button>

<ld-button mode="highlight" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--highlight">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-button--highlight" disabled>
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### Secondary

{% example %}
<ld-button mode="secondary">Text</ld-button>

<ld-button mode="secondary" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--secondary">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-button--secondary" disabled>
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### Ghost

{% example %}
<ld-button mode="ghost">Text</ld-button>

<ld-button mode="ghost" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--ghost">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-button--ghost" disabled>
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### Danger

{% example %}
<ld-button mode="danger">Text</ld-button>

<ld-button mode="danger" disabled>Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-button--danger">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-button--danger" disabled>
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### Different sizes

{% example %}
<ld-button size="sm">Text</ld-button>

<ld-button>Text</ld-button>

<ld-button size="lg">Text</ld-button>

<!-- CSS component -->

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--sm">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">Text</span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--lg">
  <span class="ld-button__content">Text</span>
</button>
{% endexample %}

### With icon

{% example %}
<ld-button size="sm">
  <ld-icon name="placeholder"></ld-icon>
  <ld-sr-only>Text</ld-sr-only>
</ld-button>

<ld-button>
  <ld-icon name="placeholder"></ld-icon>
  <ld-sr-only>Text</ld-sr-only>
</ld-button>

<ld-button size="lg">
  <ld-icon name="placeholder"></ld-icon>
  <ld-sr-only>Text</ld-sr-only>
</ld-button>

<ld-button mode="highlight" size="sm">
  <ld-icon name="placeholder"></ld-icon>
  Text
</ld-button>

<ld-button mode="danger">
  Text
  <ld-icon name="placeholder"></ld-icon>
</ld-button>

<ld-button mode="secondary" size="lg">
  <ld-icon name="placeholder"></ld-icon>
  Text
</ld-button>

<!-- CSS component -->

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--sm">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--lg">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button class="ld-button ld-button--highlight ld-button--sm">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
    Text
  </span>
</button>

<button class="ld-button ld-button--danger">
  <span class="ld-button__content">
    Text
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button class="ld-button ld-button--secondary ld-button--lg">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
    Text
  </span>
</button>
{% endexample %}

### With custom width

To give a button a custom width, simply assign the `width` or `min-width` CSS properties to the element, use other techniques (`grid`, `flex` etc.) on the wrapping element or apply utility classes (i.e. from [Tailwind](https://tailwindcss.com/), if that's your tool of choice) on the element. In the following examples we use inline styles:

{% example %}
<ld-button style="width: 18rem">
  Text
</ld-button>

<ld-button style="width: 18rem">
  <ld-icon name="placeholder"></ld-icon>
  Text
</ld-button>

<!-- CSS component -->

<button style="width: 18rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">Text</span>
</button>

<button style="width: 18rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
    Text
  </span>
</button>
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

<button style="width: 8rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">
    Text
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--justify-start">
  <span class="ld-button__content">
    Text
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--justify-end">
  <span class="ld-button__content">
    Text
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>

<button style="width: 8rem" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--justify-between">
  <span class="ld-button__content">
    Text
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>
{% endexample %}

### Multi-line

> **Note**: You shouldn't use a button with too much text in it! Instead, put the description in a label outside the button.

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

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
  <span class="ld-button__content">
    Almost before we knew it, we had left the ground. 
    A shining crescent far beneath the flying vessel. 
    Then came the night of the first falling star.
  </span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--align-text-left">
  <span class="ld-button__content">
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
    Almost before we knew it, we had left the ground. 
    A shining crescent far beneath the flying vessel. 
    Then came the night of the first falling star.
  </span>
</button>

<button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive ld-button--align-text-right">
  <span class="ld-button__content">
    Almost before we knew it, we had left the ground. 
    A shining crescent far beneath the flying vessel. 
    Then came the night of the first falling star.
    <span class="ld-icon" role="presentation">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  </span>
</button>
{% endexample %}

### Anchor button

{% example 'html', false, true %}
<ld-button href="#" target="_blank">
  Text
</ld-button>

<!-- CSS component -->

<a class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive" href="#" target="_blank" rel="noreferrer noopener"><span class="ld-button__content">
  Text
</span></a>
{% endexample %}

> __Note:__ When using `target="_blank"` a `rel` attribute with the value `noreferrer noopener` is applied automatically. Just in case. If you are using the CSS component version of the button, you will need to take care of this yourself. See [https://web.dev/external-anchors-use-rel-noopener/](https://web.dev/external-anchors-use-rel-noopener/)


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                           | Type                                                | Default     |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------- |
| `alignText`      | `align-text`      | Align text.                                                                                                                                                                                                           | `"left" \| "right"`                                 | `undefined` |
| `disabled`       | `disabled`        | Disabled state of the button.                                                                                                                                                                                         | `boolean`                                           | `false`     |
| `href`           | `href`            | Transforms the button to an anchor element. See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) for more information on the `href` attribute.                                       | `string`                                            | `undefined` |
| `justifyContent` | `justify-content` | Justify content.                                                                                                                                                                                                      | `"between" \| "end" \| "start"`                     | `undefined` |
| `mode`           | `mode`            | Highlight mode.                                                                                                                                                                                                       | `"danger" \| "ghost" \| "highlight" \| "secondary"` | `undefined` |
| `size`           | `size`            | Size of the button.                                                                                                                                                                                                   | `"lg" \| "sm"`                                      | `undefined` |
| `target`         | `target`          | The `target` attributed can be used in conjunction with the `href` attribute. See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for more information on the `target` attribute. | `"_blank" \| "_parent" \| "_self" \| "_top"`        | `undefined` |


## Dependencies

### Used by

 - docs-copy-to-cb
 - docs-edit-on-github
 - docs-toggle-code

### Graph
```mermaid
graph TD;
  docs-copy-to-cb --> ld-button
  docs-edit-on-github --> ld-button
  docs-toggle-code --> ld-button
  style ld-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
