---
eleventyNavigation:
  key: Choose File
  parent: File Upload
layout: layout.njk
title: Choose File
permalink: components/ld-file-upload/ld-choose-file/
---

<link rel="stylesheet" href="css_components/ld-choose-file.css">
<link rel="stylesheet" href="css_components/ld-upload-progress.css">
<link rel="stylesheet" href="css_components/ld-upload-item.css">
<link rel="stylesheet" href="css_components/ld-icon.css">
<link rel="stylesheet" href="css_components/ld-button.css">

# ld-choose-file

The `ld-choose-file` component is used internally for the `ld-file-upload`. It is the visual part of the drag and drop area.

## Examples

### Default

{% example '{ "opened": true }' %}
<ld-choose-file></ld-choose-file>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                       | Type                                                                                                                            | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `key`         | `key`          | for tracking the node's identity when working with lists                                          | `string \| number`                                                                                                              | `undefined` |
| `maxSize`     | `max-size`     | Max. file size in bytes                                                                           | `number`                                                                                                                        | `1572864`   |
| `ref`         | `ref`          | reference to component                                                                            | `any`                                                                                                                           | `undefined` |
| `startUpload` | `start-upload` | startUpload defines whether upload starts immediately after choosing files or after confirmation. | `boolean`                                                                                                                       | `false`     |
| `uploadFiles` | --             | Chosen Files                                                                                      | `{ state: "pending" \| "uploading" \| "uploaded" \| "upload failed"; fileName: string; fileSize: number; progress: number; }[]` | `[]`        |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `ldchoosefile` |             | `CustomEvent<any>` |


## Shadow Parts

| Part     | Description                            |
| -------- | -------------------------------------- |
| `"list"` | `ul` element wrapping the default slot |


## Dependencies

### Used by

 - [ld-file-upload](..)
 - [ld-upload](../ld-upload)

### Depends on

- [ld-typo](../../ld-typo)
- [ld-input](../../ld-input)

### Graph
```mermaid
graph TD;
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-input
  ld-file-upload --> ld-choose-file
  ld-upload --> ld-choose-file
  style ld-choose-file fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
