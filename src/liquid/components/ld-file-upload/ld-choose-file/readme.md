---
eleventyNavigation:
  key: Choose File
  parent: File Upload
layout: layout.njk
title: Choose File
permalink: components/ld-file-upload/ld-choose-file/
---

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


## Overview

TODO: emit files chosen event with file list, that's it.

## Properties

| Property      | Attribute  | Description                                              | Type                                                                                                                                              | Default     |
| ------------- | ---------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `key`         | `key`      | for tracking the node's identity when working with lists | `string \| number`                                                                                                                                | `undefined` |
| `maxSize`     | `max-size` | Max. file size in bytes                                  | `number`                                                                                                                                          | `1572864`   |
| `ref`         | `ref`      | reference to component                                   | `any`                                                                                                                                             | `undefined` |
| `uploadFiles` | --         | Chosen Files                                             | `{ state: "pending" \| "uploading" \| "uploaded" \| "upload failed"; fileName: string; fileSize: number; fileType: string; progress: number; }[]` | `[]`        |


## Events

| Event           | Description | Type                    |
| --------------- | ----------- | ----------------------- |
| `ldchoosefiles` |             | `CustomEvent<FileList>` |


## Shadow Parts

| Part     | Description                            |
| -------- | -------------------------------------- |
| `"list"` | `ul` element wrapping the default slot |


## Dependencies

### Used by

 - [ld-file-upload](..)

### Depends on

- [ld-typo](../../ld-typo)
- [ld-button](../../ld-button)

### Graph
```mermaid
graph TD;
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-button
  ld-file-upload --> ld-choose-file
  style ld-choose-file fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
