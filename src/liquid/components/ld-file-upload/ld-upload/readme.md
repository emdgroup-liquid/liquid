---
eleventyNavigation:
  key: Upload
  parent: File Upload
layout: layout.njk
title: Upload
permalink: components/ld-file-upload/ld-file-upload/
---

<link rel="stylesheet" href="css_components/ld-upload.css">
<link rel="stylesheet" href="css_components/ld-choose-file.css">
<link rel="stylesheet" href="css_components/ld-upload-progress.css">
<link rel="stylesheet" href="css_components/ld-upload-item.css">

# ld-upload

The `ld-upload` component can be used to upload files.

## Examples

### Default

{% example '{ "opened": true }' %}
<ld-upload></ld-upload>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Shadow Parts

| Part     | Description                            |
| -------- | -------------------------------------- |
| `"list"` | `ul` element wrapping the default slot |


## Dependencies

### Depends on

- [ld-choose-file](../ld-choose-file)
- [ld-upload-progress](../ld-upload-progress)

### Graph
```mermaid
graph TD;
  ld-upload --> ld-choose-file
  ld-upload --> ld-upload-progress
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-input
  ld-upload-progress --> ld-upload-item
  ld-upload-item --> ld-card
  ld-upload-item --> ld-icon
  ld-upload-item --> ld-typo
  ld-upload-item --> ld-button
  ld-upload-item --> ld-sr-only
  ld-upload-item --> ld-progress
  style ld-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
