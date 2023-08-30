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
<ld-file-upload></ld-file-upload>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

#### State management:

State management such as changing the upload state or progress of a file has to be done by the user. Every event emits a an upload item (`UploadItem = {
  state:
    | 'pending'
    | 'paused'
    | 'cancelled'
    | 'uploading'
    | 'uploaded'
    | 'upload failed'
  fileName: string
  fileSize: number
  fileType: string
  progress: number
}`) or an array of upload items. For each event, the states need to be changed using methods.

{% example '{ "opened": false }' %}
<ld-file-upload>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Circular progress

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple circular-progress>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Start upload immediately after choosing files

{% example '{ "opened": false }' %}
<ld-file-upload start-upload></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling
    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
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
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Allow pause

{% example '{ "opened": false }' %}
<ld-file-upload allow-pause>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Show progress

{% example '{ "opened": false }' %}
<ld-file-upload show-progress>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Select multiple

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Max size

{% example '{ "opened": false }' %}
<ld-file-upload max-size=500>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Custom icons

{% example '{ "opened": false }' %}
<ld-file-upload>

<ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg'></ld-icon>

<!-- <ld-icon data-upload-icon='text/rtf' name='placeholder'></ld-icon> -->
<img slot='icons' src='{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg' data-upload-icon='text/rtf' />
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Combined examples

{% example '{ "opened": false }' %}
<ld-file-upload allow-pause select-multiple icons='{"rtf": "{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg"}'>

<ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg'></ld-icon>

<!-- <ld-icon data-upload-icon='text/rtf' name='placeholder'></ld-icon> -->
<img slot='icons' src='{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg' data-upload-icon='text/rtf' />
</ld-file-upload>

<!-- style="width: 30rem" -->

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      console.log('ldchoosefiles', ev.detail)
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        console.log(item)
        newItem = uploadItems[item]
        console.log(newItem)
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'paused'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemcontinue', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'uploading'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      /* ldUpload.deleteUploadItem(uploadItem) */
      uploadItem.state = 'cancelled'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldUpload.addEventListener('ldfileuploadpausealluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'paused'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

### Examples with dummy files

{% example '{ "opened": false }' %}
<ld-file-upload circular-progress allow-pause=false show-progress icons='{"pdf": "documents"}'></ld-file-upload>

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
        {
          state: 'paused',
          fileName: 'file6.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
        },
        {
          state: 'cancelled',
          fileName: 'file7.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
        },
        {
          state: 'uploaded',
          fileName: 'filefilefilefilefilefilefilefilefilefilefilefilefilefile.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
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

{% example '{ "opened": false }' %}
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
    const ldFileUpload = button.previousElementSibling.previousElementSibling
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
      ldFileUpload.updateUploadItems(fileList)

      for (let i = 0; i <= 100; i++) {
        ldFileUpload.updateUploadItem({state: 'uploading',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: i,})
      }
    })

    ldFileUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'pending'
      ldUpload.updateUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldUpload.deleteUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldUpload.deleteUploadItems()
    })

    ldFileUpload.addEventListener('ldfileuploadcanceluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'pending'
        ldUpload.updateUploadItem(newItem)
      }
    })

    ldFileUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldUpload.updateUploadItem(newItem)
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

| Property           | Attribute           | Description                                                                                                      | Type      | Default     |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `allowPause`       | `allow-pause`       | allowPause defines whether the user will be able to pause uploads.                                               | `boolean` | `false`     |
| `circularProgress` | `circular-progress` | circularProgress defines whether only the circular progress indicator will be shown during upload.               | `boolean` | `false`     |
| `dirname`          | `dirname`           | Name of form field to use for sending the element's directionality in form submission.                           | `string`  | `undefined` |
| `form`             | `form`              | Associates the control with a form element.                                                                      | `string`  | `undefined` |
| `maxSize`          | `max-size`          | TODO: is used to display and validate maximum file size in Bytes                                                 | `number`  | `undefined` |
| `name`             | `name`              | Used to specify the name of the control.                                                                         | `string`  | `undefined` |
| `ref`              | `ref`               | reference to component                                                                                           | `any`     | `undefined` |
| `selectMultiple`   | `select-multiple`   | selectMultiple defines whether selection of multiple input files is allowed.                                     | `boolean` | `false`     |
| `showProgress`     | `show-progress`     | showTotalProgress defines whether the progress of uploading files will be shown, or only an uploading indicator. | `boolean` | `false`     |
| `startUpload`      | `start-upload`      | startUpload defines whether upload starts immediately after choosing files or after confirmation.                | `boolean` | `false`     |
| `value`            | `value`             | The input value.                                                                                                 | `string`  | `undefined` |


## Events

| Event                         | Description | Type                        |
| ----------------------------- | ----------- | --------------------------- |
| `ldchoosefiles`               |             | `CustomEvent<UploadItem[]>` |
| `ldfileuploadcontinueuploads` |             | `CustomEvent<any>`          |
| `ldfileuploaddeleteall`       |             | `CustomEvent<any>`          |
| `ldfileuploadpausealluploads` |             | `CustomEvent<any>`          |
| `ldfileuploadready`           |             | `CustomEvent<UploadItem[]>` |


## Methods

### `deleteUploadItem(uploadItem: UploadItem) => Promise<void>`

Accepts a file from component consumer (name, progress, state etc.)
and deletes the upload items.

#### Returns

Type: `Promise<void>`



### `deleteUploadItems() => Promise<void>`

Accepts a file list from component consumer (name, progress, state etc.)
and deletes the upload items.

#### Returns

Type: `Promise<void>`



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




## Dependencies

### Depends on

- [ld-choose-file](ld-choose-file)
- [ld-sr-only](../ld-sr-only)
- [ld-circular-progress](../ld-circular-progress)
- [ld-typo](../ld-typo)
- [ld-button](../ld-button)
- [ld-input-message](../ld-input-message)
- [ld-upload-progress](ld-upload-progress)

### Graph
```mermaid
graph TD;
  ld-file-upload --> ld-choose-file
  ld-file-upload --> ld-sr-only
  ld-file-upload --> ld-circular-progress
  ld-file-upload --> ld-typo
  ld-file-upload --> ld-button
  ld-file-upload --> ld-input-message
  ld-file-upload --> ld-upload-progress
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-button
  ld-input-message --> ld-icon
  ld-upload-progress --> ld-upload-item
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
  style ld-file-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
