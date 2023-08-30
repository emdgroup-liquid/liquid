---
eleventyNavigation:
  key: Upload Item
  parent: File Upload
layout: layout.njk
title: Upload Item
permalink: components/ld-file-upload/ld-upload-item/
---

# ld-upload-item

The `ld-upload-item` component is a subcomponent for `ld-file-upload` / `ld-upload-progress` and is meant to be used in the slot of the [`ld-upload-progress`](../ld-upload-progress) component.

## Examples

### Default / Pending

{% example '{ "opened": false }' %}
<ld-upload-item file-name='Liquid' file-size='1.28'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

#### Show progress

{% example '{ "opened": false }' %}
<ld-upload-item show-progress file-name='Liquid' file-size='1.28'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Paused

{% example '{ "opened": false }' %}
<ld-upload-item allow-pause state='paused' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

#### Show progress

{% example '{ "opened": false }' %}
<ld-upload-item show-progress state='paused' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Cancelled

{% example '{ "opened": false }' %}
<ld-upload-item state='cancelled' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Uploading

{% example '{ "opened": false }' %}
<ld-upload-item state='uploading' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

#### Allow pause

{% example '{ "opened": false }' %}
<ld-upload-item allow-pause state='uploading' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Uploading interactive

{% example '{ "opened": false }' %}
<ld-upload-item show-progress state='uploading' file-name='Liquid' file-size='1.28' progress='25'></ld-upload-item>
<ld-slider value="25" max="100" width="14rem"></ld-slider>

<script>
  void function() {
    const slider = document.currentScript.previousElementSibling
    const progress = slider.previousElementSibling
    slider.addEventListener('ldchange', ev => {
      const val = ev.detail[0]
      progress.progress = val
    })
  }()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Uploaded

{% example '{ "opened": false }' %}
<ld-upload-item state='uploaded' file-name='Liquid' file-size='1.28'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Upload failed

{% example '{ "opened": false }' %}
<ld-upload-item state='upload failed' file-name='Liquid' file-size='1.28'></ld-upload-item>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                     | Type                                                                                   | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| `allowPause`   | `allow-pause`   | allowPause defines whether the user will be able to pause uploads.                                              | `boolean`                                                                              | `undefined` |
| `fileName`     | `file-name`     | Name of the uploaded file.                                                                                      | `string`                                                                               | `undefined` |
| `fileSize`     | `file-size`     | Size of the uploaded file in bytes.                                                                             | `number`                                                                               | `undefined` |
| `fileType`     | `file-type`     | Type of the uploaded file.                                                                                      | `string`                                                                               | `undefined` |
| `ldTabindex`   | `ld-tabindex`   | Tab index of the progress item.                                                                                 | `number`                                                                               | `undefined` |
| `progress`     | `progress`      | Upload progress in percent.                                                                                     | `number`                                                                               | `0`         |
| `ref`          | `ref`           | reference to component                                                                                          | `any`                                                                                  | `undefined` |
| `showProgress` | `show-progress` | showTotalProgress defines whether the total progress of all upoading files will be shown in the progress button | `boolean`                                                                              | `false`     |
| `state`        | `state`         | State of the file.                                                                                              | `"cancelled" \| "paused" \| "pending" \| "upload failed" \| "uploaded" \| "uploading"` | `'pending'` |


## Dependencies

### Used by

 - [ld-upload-progress](../ld-upload-progress)

### Depends on

- [ld-icon](../../ld-icon)
- [ld-typo](../../ld-typo)
- [ld-tooltip](../../ld-tooltip)
- [ld-button](../../ld-button)
- [ld-sr-only](../../ld-sr-only)
- [ld-progress](../../ld-progress)
- [ld-loading](../../ld-loading)
- [ld-input-message](../../ld-input-message)

### Graph
```mermaid
graph TD;
  ld-upload-item --> ld-icon
  ld-upload-item --> ld-typo
  ld-upload-item --> ld-tooltip
  ld-upload-item --> ld-button
  ld-upload-item --> ld-sr-only
  ld-upload-item --> ld-progress
  ld-upload-item --> ld-loading
  ld-upload-item --> ld-input-message
  ld-tooltip --> ld-sr-only
  ld-tooltip --> ld-tooltip-popper
  ld-input-message --> ld-icon
  ld-upload-progress --> ld-upload-item
  style ld-upload-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
