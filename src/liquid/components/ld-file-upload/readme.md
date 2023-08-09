---
eleventyNavigation:
  key: File Upload
  parent: Components
layout: layout.njk
title: File Upload
permalink: components/ld-file-upload/
---

# ld-file-upload

File upload allows the user to upload files.

## Examples

### Default

{% example '{ "opened": true }' %}
<ld-file-upload icons='{"pdf": "documents"}'></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling
    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
    })
  })()
</script>

<button>Click</button>

<script>
  ;(() => {
    const button = document.currentScript.previousElementSibling
    button.addEventListener('click', async (ev) => {
      console.log('click', ev.detail)
      const fileList = [
        {
          state: 'uploading',
          fileName: 'file1.png',
          fileSize: 100000,
          fileType: 'png',
          progress: 50,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
        },
      ]
      const ldFileUpload = button.previousElementSibling.previousElementSibling
      ldFileUpload.updateUploadItems(fileList)
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

{% example '{ "opened": true }' %}
<ld-file-upload start-upload></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling
    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      // uploadingItems = ev.detail.forEach((item) => item.state = 'uploading')
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
      }
      console.log(uploadingItems)
      ldUpload.updateUploadItems(uploadingItems)

      /* ldUpload.updateUploadItem({state: 'uploading',
          fileName: 'testfile.rtf',
          fileSize: 100000,
          fileType: 'rtf',
          progress: 20,}) */
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

{% example '{ "opened": true }' %}
<ld-file-upload start-upload></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling
    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
    })
  })()
</script>

<button>Click</button>

<script>
  ;(() => {
    const button = document.currentScript.previousElementSibling
    button.addEventListener('click', async (ev) => {
      console.log('click', ev.detail)
      const fileList = [
        {
          state: 'uploading',
          fileName: 'file1.png',
          fileSize: 100000,
          fileType: 'png',
          progress: 50,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
        },
      ]
      const ldFileUpload = button.previousElementSibling.previousElementSibling
      ldFileUpload.updateUploadItems(fileList)

      for (let i = 0; i <= 100; i++) {
        ldFileUpload.updateUploadItem({state: 'uploading',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: i,})
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

<!-- Auto Generated Below -->


## Overview

TODO:
  - listen for files chosen event (from ld-choose-file.tsx) with file list
    -> emit upload ready event (if startUpload prop is set to true)
  - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
  - The upload ready event contains the file list as its payload
  - Keep a state of files chosen and pass them as a prop (uploadItems) to ld-upload-progress.tsx
  - Implement callback methods, which accept a file list (name, progress, state etc.) and update the upload items

## Properties

| Property      | Attribute      | Description                                                                                       | Type                                                                                                 | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `dirname`     | `dirname`      | Name of form field to use for sending the element's directionality in form submission.            | `string`                                                                                             | `undefined` |
| `form`        | `form`         | Associates the control with a form element.                                                       | `string`                                                                                             | `undefined` |
| `icons`       | `icons`        | Maps file types to icon path                                                                      | `string \| { pdf?: string; zip?: string; jpeg?: string; txt?: string; png?: string; rtf?: string; }` | `undefined` |
| `key`         | `key`          | for tracking the node's identity when working with lists                                          | `string \| number`                                                                                   | `undefined` |
| `maxSize`     | `max-size`     | TODO: is used to display and validate maximum file size                                           | `number`                                                                                             | `undefined` |
| `name`        | `name`         | Used to specify the name of the control.                                                          | `string`                                                                                             | `undefined` |
| `ref`         | `ref`          | reference to component                                                                            | `any`                                                                                                | `undefined` |
| `startUpload` | `start-upload` | startUpload defines whether upload starts immediately after choosing files or after confirmation. | `boolean`                                                                                            | `false`     |
| `value`       | `value`        | The input value.                                                                                  | `string`                                                                                             | `undefined` |


## Events

| Event               | Description | Type                        |
| ------------------- | ----------- | --------------------------- |
| `ldchoosefiles`     |             | `CustomEvent<FileList>`     |
| `ldfileuploadready` |             | `CustomEvent<UploadItem[]>` |


## Methods

### `updateUploadItem(uploadItem: UploadItem) => Promise<void>`

Accepts a file from component consumer (name, progress, state etc.)
and updates the upload item state.

#### Returns

Type: `Promise<void>`



### `updateUploadItems(uploadItems: UploadItem[]) => Promise<void>`

Accepts a file list from component consumer (name, progress, state etc.)
and updates the upload items state.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part     | Description                            |
| -------- | -------------------------------------- |
| `"list"` | `ul` element wrapping the default slot |


## Dependencies

### Depends on

- [ld-choose-file](ld-choose-file)
- [ld-upload-progress](ld-upload-progress)
- [ld-button](../ld-button)

### Graph
```mermaid
graph TD;
  ld-file-upload --> ld-choose-file
  ld-file-upload --> ld-upload-progress
  ld-file-upload --> ld-button
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-button
  ld-upload-progress --> ld-upload-item
  ld-upload-item --> ld-icon
  ld-upload-item --> ld-typo
  ld-upload-item --> ld-button
  ld-upload-item --> ld-sr-only
  ld-upload-item --> ld-progress
  style ld-file-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
