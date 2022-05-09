---
eleventyNavigation:
  key: Modal
  parent: Components
layout: layout.njk
title: Modal
permalink: components/ld-modal/
tags:
  - dialog
  - alert
  - popup
  - popover
  - lightbox
---

# ld-modal

<link rel="stylesheet" href="css_components/ld-modal.css">
<link rel="stylesheet" href="css_components/ld-typo.css">
<link rel="stylesheet" href="css_components/ld-button.css">

The `ld-modal` component represents a dismissible modal dialog box.

The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element acts as the foundation for both, the Web Component version and the CSS component version of the component. The `ld-modal` Web Component wraps a `<dialog>` element and enhances its functionality which otherwise is not natively implemented, such as by emitting additional events and handling clicks on the dialog backdrop.

## Examples

Here is a minimalistic example of a modal dialog:

{% example %}
<ld-modal>
  <ld-typo style="text-align: center">
    I'm a modal dialog.
  </ld-typo>
</ld-modal>

<ld-button onclick="event.target.previousElementSibling.showModal()">Open Modal</ld-button>

<!-- CSS component -->

<dialog class="ld-modal">
  <header class="ld-modal__header">
    <button
      class="ld-modal__x"
      aria-label="Dismiss"
      onclick="this.closest('dialog').close()"
    ></button>
  </header>
  <div class="ld-modal__content">
    <p class="ld-typo" style="text-align: center">
      I'm a modal dialog.
    </p>
  </div>
</dialog>

<button class="ld-button" onclick="event.target.previousElementSibling.showModal()">Open Modal</button>
{% endexample %}

### With header and footer

You have two additional slots to your disposal for altering the modal header and footer which are both positioned fixed at top and bottom of the dialog element.

{% example %}
<ld-modal>
  <ld-typo slot="header">Hello</ld-typo>
  <ld-typo style="text-align: center">
    I'm a modal dialog.
  </ld-typo>
  <ld-button slot="footer" style="width: 8rem" mode="ghost" onclick="this.closest('ld-modal').close()">Cancel</ld-button>
  <ld-button slot="footer" style="width: 8rem" onclick="this.closest('ld-modal').close()">Submit</ld-button>
</ld-modal>

<ld-button onclick="event.target.previousElementSibling.showModal()">Open Modal</ld-button>

<!-- CSS component -->

<dialog class="ld-modal">
  <header class="ld-modal__header">
    <p class="ld-typo">Hello</p>
    <button
      class="ld-modal__x"
      aria-label="Dismiss"
      onclick="this.closest('dialog').close()"
    ></button>
  </header>
  <div class="ld-modal__content">
    <p class="ld-typo" style="text-align: center">
      I'm a modal dialog.
    </p>
  </div>
  <footer class="ld-modal__footer">
    <button class="ld-button ld-button--ghost" style="width: 8rem" onclick="this.closest('dialog').close()">Cancel</button>
    <button class="ld-button" style="width: 8rem" onclick="this.closest('dialog').close()">Submit</button>
  </footer>
</dialog>

<button class="ld-button" onclick="event.target.previousElementSibling.showModal()">Open Modal</button>
{% endexample %}

### Non-cancelable

{% example %}
<ld-modal cancelable="false">
  <ld-typo slot="header">Hello</ld-typo>
  <ld-typo style="text-align: center">
    I'm a modal dialog.
  </ld-typo>
  <ld-button slot="footer" style="width: 8rem" onclick="this.closest('ld-modal').close()">Submit</ld-button>
</ld-modal>

<ld-button onclick="event.target.previousElementSibling.showModal()">Open Modal</ld-button>

<!-- CSS component -->

<dialog class="ld-modal" oncancel="event.preventDefault()">
  <header class="ld-modal__header">
    <p class="ld-typo">Hello</p>
  </header>
  <div class="ld-modal__content">
    <p class="ld-typo" style="text-align: center">
      I'm a modal dialog.
    </p>
  </div>
  <footer class="ld-modal__footer">
    <button class="ld-button" style="width: 8rem" onclick="this.closest('dialog').close()">Submit</button>
  </footer>
</dialog>

<button class="ld-button" onclick="event.target.previousElementSibling.showModal()">Open Modal</button>
{% endexample %}

### With blurry backdrop

{% example %}
<ld-modal blurry-backdrop>
  <ld-typo style="text-align: center">
    I'm a modal dialog.
  </ld-typo>
</ld-modal>

<ld-button onclick="event.target.previousElementSibling.showModal()">Open Modal</ld-button>

<!-- CSS component -->

<dialog class="ld-modal ld-modal--blurry-backdrop">
  <header class="ld-modal__header">
    <button
      class="ld-modal__x"
      aria-label="Dismiss"
      onclick="this.closest('dialog').close()"
    ></button>
  </header>
  <div class="ld-modal__content">
    <p class="ld-typo" style="text-align: center">
      I'm a modal dialog.
    </p>
  </div>
</dialog>

<button class="ld-button" onclick="event.target.previousElementSibling.showModal()">Open Modal</button>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                       | Type               | Default     |
| ---------------- | ----------------- | --------------------------------------------------------------------------------- | ------------------ | ----------- |
| `blurryBackdrop` | `blurry-backdrop` | Use a blurry backdrop.                                                            | `boolean`          | `false`     |
| `cancelable`     | `cancelable`      | The modal is cancelable by default. However, you can change this using this prop. | `boolean`          | `true`      |
| `key`            | `key`             | for tracking the node's identity when working with lists                          | `string \| number` | `undefined` |
| `open`           | `open`            | Indicates that the modal dialog is active and can be interacted with.             | `boolean`          | `undefined` |
| `ref`            | `ref`             | reference to component                                                            | `any`              | `undefined` |


## Events

| Event            | Description                                        | Type               |
| ---------------- | -------------------------------------------------- | ------------------ |
| `ldmodalclosed`  | Emitted when modal has closed (after transition).  | `CustomEvent<any>` |
| `ldmodalclosing` | Emitted when modal is closing (before transition). | `CustomEvent<any>` |
| `ldmodalopened`  | Emitted when modal has opened (after transition).  | `CustomEvent<any>` |
| `ldmodalopening` | Emitted when modal is opening (before transition). | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`

Closes the modal dialog.

#### Returns

Type: `Promise<void>`



### `showModal() => Promise<void>`

Opens the modal dialog.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"content"` |             |
| `"footer"`  |             |
| `"header"`  |             |


----------------------------------------------

 
