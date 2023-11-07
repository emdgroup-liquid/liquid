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

In default mode, files to be uploaded can be chosen in multiple steps but upload can only be started once on start upload click.

{% example '{ "opened": true }' %}
<ld-file-upload></ld-file-upload>

<!-- React component -->
<LdFileUpload />

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
  file: File
}`) or an array of upload items. For each event, the states need to be changed using methods.

Unless the width of the component is specified, it will adjust to the available space depending on its content.

{% example '{ "opened": false }' %}
<ld-file-upload>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      /* console.log('ldchoosefiles', ev.detail) */
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      /* console.log('ldfileuploadready', ev.detail) */
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        /* console.log(item) */
        newItem = uploadItems[item]
        /* console.log(newItem) */
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

<!-- <LdFileUpload
onLdchoosefiles={async (ev) => {
uploadItems = ev.detail
ldUpload.updateUploadItems(uploadItems)
}}

onLdfileuploadready={async (ev) => {
uploadItems = ev.detail
uploadingItems = []
for (let item in uploadItems) {
newItem = uploadItems[item]
newItem.state = 'uploading'
uploadingItems.push(newItem)
ldUpload.updateUploadItem(newItem)
}
}}

onLduploaditempause={async (ev) => {
uploadItem = ev.detail
uploadItem.state = 'paused'
ldUpload.updateUploadItem(uploadItem)
}}

onLduploaditemcontinue={async (ev) => {
uploadItem = ev.detail
uploadItem.state = 'uploading'
ldUpload.updateUploadItem(uploadItem)
}}

onLduploaditemremove={async (ev) => {
uploadItem = ev.detail
uploadItem.state = 'cancelled'
ldUpload.updateUploadItem(uploadItem)
}}

onLduploaditemdelete={async (ev) => {
uploadItem = ev.detail
ldUpload.deleteUploadItem(uploadItem)
}}

onLduploaditemdeleteall={async (ev) => {
ldUpload.deleteUploadItems()
}}

onLdfileuploadpausealluploads={async (ev) => {
uploadItems = ev.detail
for (let item in uploadItems) {
newItem = uploadItems[item]
newItem.state = 'paused'
ldUpload.updateUploadItem(newItem)
}}}

onLdfileuploadcontinueuploads={async (ev) => {
uploadItems = ev.detail
for (let item in uploadItems) {
newItem = uploadItems[item]
newItem.state = 'uploading'
ldUpload.updateUploadItem(newItem)
}
}}

/> -->

<!-- CSS component -->

{% endexample %}

#### Upload with XMLHttpRequest

Files to be uploaded can be accessed through the `file` property of the UploadItem objects emitted on `ldfileuploadready`. XMLHttpRequest can be used to update the upload progress in the component.

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple show-progress style="width: 30rem">
</ld-file-upload>

<!-- style="width: 30rem, height: 50rem"> -->

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      // uploadingItems = []
      for (let item in uploadItems) {
        console.log("item in uploadItems:", item)
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        // uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
        file = uploadItems[item].file
        console.log("file:", file)

        const xhr = new XMLHttpRequest()
        const success = await new Promise((resolve) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              console.log("upload progress:", event.loaded / event.total)
              // uploadProgress.value = event.loaded / event.total
              newItem = uploadItems[item]
              newItem.progress = event.loaded / event.total * 100
              ldUpload.updateUploadItem(newItem)
            }
          });
          xhr.addEventListener("loadend", () => {
            // console.log("xhr.response:", xhr.response)
            resolve(xhr.readyState === 4 && xhr.status === 200)
          })
          ldUpload.addEventListener('lduploaditemremove', async (ev) => {
            uploadItem = ev.detail
            /* ldUpload.deleteUploadItem(uploadItem) */
            if (uploadItem.fileName == uploadItems[item].fileName) {
              newItem = uploadItems[item]
              newItem.state = 'cancelled'
              ldUpload.updateUploadItem(newItem)
              xhr.abort(ev.detail.file)
            }
            // uploadItem.state = 'cancelled'
            // ldUpload.updateUploadItem(uploadItem)
            // xhr.abort(ev.detail.file)
          })
          // ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
          //   uploadItem = ev.detail
          //   if (uploadItem.fileName == uploadItems[item].fileName) {
          //     // location.replace("https://liquid.merck.design/liquid/")
          //     window.open("https://liquid.merck.design/liquid/")
          //   }
          // })
          xhr.open("PUT", "https://httpbin.org/put", true)
          xhr.setRequestHeader("Content-Type", "application/octet-stream")
          xhr.send(file)
        })
        console.log("success:", success)
        // success2 = Math.floor(Math.random() * 2) == 1 ? true : false
        if (success) {
          newItem = uploadItems[item]
        newItem.state = 'uploaded'
        ldUpload.updateUploadItem(newItem)
        } else if (uploadItems[item].state != 'cancelled') {
          newItem = uploadItems[item]
        newItem.state = "upload failed"
        ldUpload.updateUploadItem(newItem)
        }
      }
    })

    ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
      uploadItem = ev.detail
      // location.replace("https://liquid.merck.design/liquid/")
      window.open("https://liquid.merck.design/liquid/")
    })

    ldUpload.addEventListener('lduploaditemretry', async (ev) => {
      uploadItem = ev.detail
      uploadItems = []
      uploadItems.push(uploadItem)
      event = new CustomEvent('ldfileuploadready', { detail: uploadItems });
      ldUpload.dispatchEvent(event)
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

#### Upload with XMLHttpRequest with random success

This is just for testing. Upload success is overwritten with a random true/false value to test the retry feature.

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple show-progress style="width: 30rem">
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      // uploadingItems = []
      for (let item in uploadItems) {
        console.log("item in uploadItems:", item)
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        // uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
        file = uploadItems[item].file
        console.log("file:", file)

        const xhr = new XMLHttpRequest()
        const success = await new Promise((resolve) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              console.log("upload progress:", event.loaded / event.total)
              // uploadProgress.value = event.loaded / event.total
              newItem = uploadItems[item]
              newItem.progress = event.loaded / event.total * 100
              ldUpload.updateUploadItem(newItem)
            }
          });
          xhr.addEventListener("loadend", () => {
            // console.log("xhr.response:", xhr.response)
            resolve(xhr.readyState === 4 && xhr.status === 200)
          })
          ldUpload.addEventListener('lduploaditemremove', async (ev) => {
            uploadItem = ev.detail
            /* ldUpload.deleteUploadItem(uploadItem) */
            if (uploadItem.fileName == uploadItems[item].fileName) {
              newItem = uploadItems[item]
              newItem.state = 'cancelled'
              ldUpload.updateUploadItem(newItem)
              xhr.abort(ev.detail.file)
            }
            // uploadItem.state = 'cancelled'
            // ldUpload.updateUploadItem(uploadItem)
            // xhr.abort(ev.detail.file)
          })
          // ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
          //   uploadItem = ev.detail
          //   if (uploadItem.fileName == uploadItems[item].fileName) {
          //     // location.replace("https://liquid.merck.design/liquid/")
          //     window.open("https://liquid.merck.design/liquid/")
          //   }
          // })
          xhr.open("PUT", "https://httpbin.org/put", true)
          xhr.setRequestHeader("Content-Type", "application/octet-stream")
          xhr.send(file)
        })
        console.log("success:", success)
        success2 = Math.floor(Math.random() * 2) == 1 ? true : false
        if (success2) {
          newItem = uploadItems[item]
        newItem.state = 'uploaded'
        ldUpload.updateUploadItem(newItem)
        } else if (uploadItems[item].state != 'cancelled') {
          newItem = uploadItems[item]
        newItem.state = "upload failed"
        ldUpload.updateUploadItem(newItem)
        }
      }
    })

    ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
      uploadItem = ev.detail
      // location.replace("https://liquid.merck.design/liquid/")
      window.open("https://liquid.merck.design/liquid/")
    })

    ldUpload.addEventListener('lduploaditemretry', async (ev) => {
      uploadItem = ev.detail
      uploadItems = []
      uploadItems.push(uploadItem)
      event = new CustomEvent('ldfileuploadready', { detail: uploadItems });
      ldUpload.dispatchEvent(event)
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

    // ldUpload.addEventListener('lduploaditemremove', async (ev) => {
    //   uploadItem = ev.detail
    //   /* ldUpload.deleteUploadItem(uploadItem) */
    //   uploadItem.state = 'cancelled'
    //   ldUpload.updateUploadItem(uploadItem)
    //   xhr.abort(ev.detail.file)
    // })

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

#### Upload with XMLHttpRequest, starting upload immediately

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple show-progress start-upload style="width: 30rem">
</ld-file-upload>

<!-- style="width: 30rem, height: 50rem"> -->

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      // uploadingItems = []
      for (let item in uploadItems) {
        console.log("item in uploadItems:", item)
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        // uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
        file = uploadItems[item].file
        console.log("file:", file)

        const xhr = new XMLHttpRequest()
        const success = await new Promise((resolve) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              console.log("upload progress:", event.loaded / event.total)
              // uploadProgress.value = event.loaded / event.total
              newItem = uploadItems[item]
              newItem.progress = event.loaded / event.total * 100
              ldUpload.updateUploadItem(newItem)
            }
          });
          xhr.addEventListener("loadend", () => {
            // console.log("xhr.response:", xhr.response)
            resolve(xhr.readyState === 4 && xhr.status === 200)
          })
          ldUpload.addEventListener('lduploaditemremove', async (ev) => {
            uploadItem = ev.detail
            /* ldUpload.deleteUploadItem(uploadItem) */
            if (uploadItem.fileName == uploadItems[item].fileName) {
              newItem = uploadItems[item]
              newItem.state = 'cancelled'
              ldUpload.updateUploadItem(newItem)
              xhr.abort(ev.detail.file)
            }
            // uploadItem.state = 'cancelled'
            // ldUpload.updateUploadItem(uploadItem)
            // xhr.abort(ev.detail.file)
          })
          // ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
          //   uploadItem = ev.detail
          //   if (uploadItem.fileName == uploadItems[item].fileName) {
          //     // location.replace("https://liquid.merck.design/liquid/")
          //     window.open("https://liquid.merck.design/liquid/")
          //   }
          // })
          xhr.open("PUT", "https://httpbin.org/put", true)
          xhr.setRequestHeader("Content-Type", "application/octet-stream")
          xhr.send(file)
        })
        console.log("success:", success)
        // success2 = Math.floor(Math.random() * 2) == 1 ? true : false
        if (success) {
          newItem = uploadItems[item]
        newItem.state = 'uploaded'
        ldUpload.updateUploadItem(newItem)
        } else if (uploadItems[item].state != 'cancelled') {
          newItem = uploadItems[item]
        newItem.state = "upload failed"
        ldUpload.updateUploadItem(newItem)
        }
      }
    })

    ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
      uploadItem = ev.detail
      // location.replace("https://liquid.merck.design/liquid/")
      window.open("https://liquid.merck.design/liquid/")
    })

    ldUpload.addEventListener('lduploaditemretry', async (ev) => {
      uploadItem = ev.detail
      uploadItems = []
      uploadItems.push(uploadItem)
      event = new CustomEvent('ldfileuploadready', { detail: uploadItems });
      ldUpload.dispatchEvent(event)
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

    // ldUpload.addEventListener('lduploaditemremove', async (ev) => {
    //   uploadItem = ev.detail
    //   /* ldUpload.deleteUploadItem(uploadItem) */
    //   uploadItem.state = 'cancelled'
    //   ldUpload.updateUploadItem(uploadItem)
    //   xhr.abort(ev.detail.file)
    // })

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

#### Upload with XMLHttpRequest with circular progress

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple show-progress circular-progress style="width: 30rem">
</ld-file-upload>

<!-- style="width: 30rem, height: 50rem"> -->

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      // uploadingItems = []
      for (let item in uploadItems) {
        console.log("item in uploadItems:", item)
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        // uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
        file = uploadItems[item].file
        console.log("file:", file)

        const xhr = new XMLHttpRequest()
        const success = await new Promise((resolve) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              console.log("upload progress:", event.loaded / event.total)
              // uploadProgress.value = event.loaded / event.total
              newItem = uploadItems[item]
              newItem.progress = event.loaded / event.total * 100
              ldUpload.updateUploadItem(newItem)
            }
          });
          xhr.addEventListener("loadend", () => {
            // console.log("xhr.response:", xhr.response)
            resolve(xhr.readyState === 4 && xhr.status === 200)
          })
          ldUpload.addEventListener('lduploaditemremove', async (ev) => {
            uploadItem = ev.detail
            /* ldUpload.deleteUploadItem(uploadItem) */
            if (uploadItem.fileName == uploadItems[item].fileName) {
              newItem = uploadItems[item]
              newItem.state = 'cancelled'
              ldUpload.updateUploadItem(newItem)
              xhr.abort(ev.detail.file)
            }
            // uploadItem.state = 'cancelled'
            // ldUpload.updateUploadItem(uploadItem)
            // xhr.abort(ev.detail.file)
          })
          // ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
          //   uploadItem = ev.detail
          //   if (uploadItem.fileName == uploadItems[item].fileName) {
          //     // location.replace("https://liquid.merck.design/liquid/")
          //     window.open("https://liquid.merck.design/liquid/")
          //   }
          // })
          xhr.open("PUT", "https://httpbin.org/put", true)
          xhr.setRequestHeader("Content-Type", "application/octet-stream")
          xhr.send(file)
        })
        console.log("success:", success)
        // success2 = Math.floor(Math.random() * 2) == 1 ? true : false
        if (success) {
          newItem = uploadItems[item]
        newItem.state = 'uploaded'
        ldUpload.updateUploadItem(newItem)
        } else if (uploadItems[item].state != 'cancelled') {
          newItem = uploadItems[item]
        newItem.state = "upload failed"
        ldUpload.updateUploadItem(newItem)
        }
      }
    })

    ldUpload.addEventListener('lduploaditemdownload', async (ev) => {
      uploadItem = ev.detail
      // location.replace("https://liquid.merck.design/liquid/")
      window.open("https://liquid.merck.design/liquid/")
    })

    ldUpload.addEventListener('lduploaditemretry', async (ev) => {
      uploadItem = ev.detail
      uploadItems = []
      uploadItems.push(uploadItem)
      event = new CustomEvent('ldfileuploadready', { detail: uploadItems });
      ldUpload.dispatchEvent(event)
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

    // ldUpload.addEventListener('lduploaditemremove', async (ev) => {
    //   uploadItem = ev.detail
    //   /* ldUpload.deleteUploadItem(uploadItem) */
    //   uploadItem.state = 'cancelled'
    //   ldUpload.updateUploadItem(uploadItem)
    //   xhr.abort(ev.detail.file)
    // })

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

#### Fake Upload

Fake upload, just for testing. Can be removed from the documentation.

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple>
</ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      console.log('ldfileuploadready', ev.detail)
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        uploadingItems.push(newItem)
        ldUpload.updateUploadItem(newItem)
      }

      const files = ev.detail[0].file
      console.log('files', files)

      /* for (let file in ev.detail) {
        var files = []
        files.append(file.file)
      } */

      const data = new FormData()
      /* data.append('userfile', files[0]) */
      /* data.append('userfile', files) */
      /* for (let file in ev.detail) {
        console.log('file.file', file.file)
        console.log('file.file.name', file.file.name)
        data.append('userfile', file.file, file.file.name)
      } */
      console.log('ev.detail.length', ev.detail.length)
      for (let i = 0; i < ev.detail.length; i++) {
        console.log('ev.detail[i].file', ev.detail[i].file)
        console.log('ev.detail[i].file.name', ev.detail[i].file.name)
        data.append('userfile', ev.detail[i].file, ev.detail[i].file.name)
      }

      for (const value of data.values()) {
        console.log('data values', value);
        }

      console.log('data', data)
      const requestOptions = {
        method: 'POST',
        body: data,
      }
      const delay = ms => new Promise(res => setTimeout(res, ms));
      try {
        await fetch(/* 'https://api.escuelajs.co/api/v1/files/upload' */ 'https://v2.convertapi.com/upload' , {
          method: 'POST',
          body: data,
        })
        console.log('File uploaded')
        // Fake progress, th file is being uploaded but the progress simulated here does not represent the actual progress
        for (const value of data.values()) {
          await delay(1000)
          updatedItem = uploadItems.find((item) => item.fileName === value.name)
          updatedItem.state = 'uploaded'
          updatedItem.progress = 100
          uploadingItems.push(updatedItem)
          ldUpload.updateUploadItem(updatedItem)
          }
      } catch (err) {
        console.log('File could not be uploaded')
      }

      /* const requestOptions = {
        method: 'GET',
        body: data,
      } */
      /* try {
        await fetch(`https://api.escuelajs.co/api/v1/files/${ev.detail[0].file.name}` , {
          method: 'GET',
          body: data,
        })
      } catch (err) {
        console.log('File not found on server')
      } */
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

Mode in which only a circular progress representation of the total upload progress is shown instead of seperade progess items for all files.

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

      // const files = ev.detail[0].file
      // console.log('files', files)

      // const data = new FormData()

      // console.log('ev.detail.length', ev.detail.length)
      // for (let i = 0; i < ev.detail.length; i++) {
      //   console.log('ev.detail[i].file', ev.detail[i].file)
      //   console.log('ev.detail[i].file.name', ev.detail[i].file.name)
      //   data.append('userfile', ev.detail[i].file, ev.detail[i].file.name)
      // }

      // for (const value of data.values()) {
      //   console.log('data values', value);
      //   }

      // console.log('data', data)
      // const requestOptions = {
      //   method: 'POST',
      //   body: data,
      // }
      // const delay = ms => new Promise(res => setTimeout(res, ms));
      // try {
      //   await fetch(/* 'https://api.escuelajs.co/api/v1/files/upload' */ 'https://v2.convertapi.com/upload' , {
      //     method: 'POST',
      //     body: data,
      //   })
      //   console.log('File uploaded')
      //   // for (const value of data.values()) {
      //   //   await delay(5000)
      //   //   updatedItem = uploadItems.find((item) => item.fileName === value.name)
      //   //   updatedItem.state = 'uploaded'
      //   //   updatedItem.progress = 100
      //   //   uploadingItems.push(updatedItem)
      //   //   ldUpload.updateUploadItem(updatedItem)
      //   //   }
      // } catch (err) {
      //   console.log('File could not be uploaded')
      // }
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

#### Circular progress with max size

{% example '{ "opened": false }' %}
<ld-file-upload select-multiple circular-progress max-size=500>
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

In `start-upload` mode, upload of files will start immediately after the files are chosen.

{% example '{ "opened": false }' %}
<ld-file-upload start-upload></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      /* console.log('ldchoosefiles', ev.detail) */
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      /* console.log('ldfileuploadready', ev.detail) */
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        /* console.log(item) */
        newItem = uploadItems[item]
        /* console.log(newItem) */
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

#### Start upload immediately after choosing files with max size

{% example '{ "opened": false }' %}
<ld-file-upload start-upload max-size=500></ld-file-upload>

<script>
  ;(() => {
    const ldUpload = document.currentScript.previousElementSibling

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      /* console.log('ldchoosefiles', ev.detail) */
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      /* console.log('ldfileuploadready', ev.detail) */
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        /* console.log(item) */
        newItem = uploadItems[item]
        /* console.log(newItem) */
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

### Allow pause

In `allow-pause` mode, the upload of all files can be paused (and continued) on pause all files click.

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

In `show-progress` mode, a progress bar representing the upload progress of a file will be shown.

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

#### Max size with custom text

{% example '{ "opened": false }' %}
<ld-file-upload max-size=500 label-upload-constraints='File size must be smaller than $maxSize'>
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

Custom icons for specific file types can be added to the icons slot.

{% example '{ "opened": false }' %}
<ld-file-upload>

<ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg'></ld-icon>
<img slot='icons' src='{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg' data-upload-icon='image/jpeg' />

<!-- <ld-icon data-upload-icon='text/rtf' name='placeholder'></ld-icon> -->
<!-- <img slot='icons' src='{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg' data-upload-icon='text/rtf' /> -->
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

### German

Example for changing the language of the component to German by using the test labels.

{% example '{ "opened": false }' %}
<ld-file-upload max-size=500
label-drag-instructions="Dateien hierher ziehen oder auswählen"
label-upload-constraints="max. Dateigröße: $maxSize"
label-select-file="Dateien auswählen"
label-upload-file="Dateien hochladen"
label-upload-state="Upload Status:"
label-upload-count="$filesUploaded von $filesTotal Dateien wurden hochgeladen."
label-upload-percentage="$uploadProgress % hochgeladen."
label-start-upload="Upload beginnen"
label-uploading="Dateien werden hochgeladen"
label-upload-completed="Upload abgeschlossen"
label-delete-all-files="Alle Dateien löschen"
label-pause-all-uploads="Alle Uploads pausieren"
label-continue-paused-uploads="Pausierte Uploads fortführen"
label-error-header="Ein Fehler ist aufgetreten"
label-file-already-chosen-error="$duplicateFiles können nicht ausgewählt werden, da Dateien mit den gleichen Namen bereits ausgewählt wurden. Um diese Dateien dennoch hochzuladen müssen die Dateien mit den gleichen Namen entfernt werden."
label-max-size-exceeded-error="$filesExceedingMaxSize können nicht ausgewählt werden, da die Dateien die maximale Dateigröße überschreiten."
label-c-p-upload-count="$filesUploading Dateien werden hochgeladen"
label-c-p-uploaded-size="$uploadedSize hochgeladen..."
label-c-p-cancel="Abbrechen"
label-tooltip-remove="Entfernen"
label-tooltip-download="Herunterladen"
label-tooltip-retry="Erneut versuchen"
label-tooltip-delete="Löschen">
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

### Examples with mock files

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

<ld-button>Click</ld-button>

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
          file: undefined,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
          file: undefined,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
          file: undefined,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
          file: undefined,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
          file: undefined,
        },
        {
          state: 'paused',
          fileName: 'file6.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
          file: undefined,
        },
        {
          state: 'cancelled',
          fileName: 'file7.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
          file: undefined,
        },
        {
          state: 'uploaded',
          fileName: 'filefilefilefilefilefilefilefilefilefilefilefilefilefile.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 50,
          file: undefined,
        },
      ]
      const ldFileUpload = button.previousElementSibling.previousElementSibling
      // event = new CustomEvent('ldfileuploadready', { detail: fileList });
      // ldFileUpload.dispatchEvent(event)
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

<ld-button>Click</ld-button>

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
          file: undefined,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
          file: undefined,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
          file: undefined,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
          file: undefined,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
          file: undefined,
        },
      ]
      event = new CustomEvent('ldchoosefiles', { detail: fileList });
      ldFileUpload.dispatchEvent(event)
      event = new CustomEvent('ldfileuploadready', { detail: fileList });
      ldFileUpload.dispatchEvent(event)
      // ldFileUpload.updateUploadItems(fileList)

      // for (let i = 0; i <= 100; i++) {
      //   ldFileUpload.updateUploadItem({state: 'uploading',
      //     fileName: 'file3.pdf',
      //     fileSize: 100000,
      //     fileType: 'pdf',
      //     progress: i,})
      // }
    })

    ldFileUpload.addEventListener('lduploaditempause', async (ev) => {
      uploadItem = ev.detail
      uploadItem.state = 'pending'
      ldFileUpload.updateUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('lduploaditemremove', async (ev) => {
      uploadItem = ev.detail
      ldFileUpload.deleteUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('lduploaditemdelete', async (ev) => {
      uploadItem = ev.detail
      ldFileUpload.deleteUploadItem(uploadItem)
    })

    ldFileUpload.addEventListener('ldfileuploaddeleteall', async (ev) => {
      ldFileUpload.deleteUploadItems()
    })

    ldFileUpload.addEventListener('ldfileuploadcanceluploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'pending'
        ldFileUpload.updateUploadItem(newItem)
      }
    })

    ldFileUpload.addEventListener('ldfileuploadcontinueuploads', async (ev) => {
      uploadItems = ev.detail
      for (let item in uploadItems) {
        newItem = uploadItems[item]
        newItem.state = 'uploading'
        ldFileUpload.updateUploadItem(newItem)
      }
    })
  })()
</script>

<!-- React component -->

<!-- CSS component -->

{% endexample %}

#### Default example with mock files

{% example '{ "opened": false }' %}
<ld-file-upload>
</ld-file-upload>

<ld-button>Click</ld-button>

<script>
  ;(() => {
    const button = document.currentScript.previousElementSibling
    const ldUpload = button.previousElementSibling
    button.addEventListener('click', async (ev) => {
      console.log('click', ev.detail)
      const fileList = [
        {
          state: 'uploading',
          fileName: 'file1.png',
          fileSize: 100000,
          fileType: 'png',
          progress: 50,
          file: undefined,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
          file: undefined,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
          file: undefined,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
          file: undefined,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
          file: undefined,
        },
      ]
      event = new CustomEvent('ldchoosefiles', { detail: fileList });
      ldUpload.dispatchEvent(event)
      event = new CustomEvent('ldfileuploadready', { detail: fileList });
      ldUpload.dispatchEvent(event)
    })

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        newItem = uploadItems[item]
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

#### Circular progress example with mock files

{% example '{ "opened": false }' %}
<ld-file-upload circular-progress>
</ld-file-upload>

<ld-button>Click</ld-button>

<script>
  ;(() => {
    const button = document.currentScript.previousElementSibling
    const ldUpload = button.previousElementSibling
    button.addEventListener('click', async (ev) => {
      console.log('click', ev.detail)
      const fileList = [
        {
          state: 'uploading',
          fileName: 'file1.png',
          fileSize: 100000,
          fileType: 'png',
          progress: 50,
          file: undefined,
        },
        {
          state: 'uploading',
          fileName: 'file2.png',
          fileSize: 200000,
          fileType: 'png',
          progress: 3,
          file: undefined,
        },
        {
          state: 'pending',
          fileName: 'file3.pdf',
          fileSize: 100000,
          fileType: 'pdf',
          progress: 0,
          file: undefined,
        },
        {
          state: 'uploaded',
          fileName: 'file4.jpeg',
          fileSize: 100000,
          fileType: 'image/jpeg',
          progress: 100,
          file: undefined,
        },
        {
          state: 'upload failed',
          fileName: 'file5.txt',
          fileSize: 100000,
          fileType: 'txt',
          progress: 75,
          file: undefined,
        },
      ]
      event = new CustomEvent('ldchoosefiles', { detail: fileList });
      ldUpload.dispatchEvent(event)
      event = new CustomEvent('ldfileuploadready', { detail: fileList });
      ldUpload.dispatchEvent(event)
    })

    ldUpload.addEventListener('ldchoosefiles', async (ev) => {
      uploadItems = ev.detail
      ldUpload.updateUploadItems(uploadItems)
    })

    ldUpload.addEventListener('ldfileuploadready', async (ev) => {
      uploadItems = ev.detail
      uploadingItems = []
      for (let item in uploadItems) {
        newItem = uploadItems[item]
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

<!-- Auto Generated Below -->


## Overview

File upload:
  - listen for files chosen event (from ld-choose-file.tsx) with file list
    -> emit upload ready event (if startUpload prop is set to true)
  - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
  - The upload ready event contains the file list as its payload

## Properties

| Property                      | Attribute                         | Description                                                                                                      | Type      | Default                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `allowPause`                  | `allow-pause`                     | allowPause defines whether the user will be able to pause uploads.                                               | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                  |
| `circularProgress`            | `circular-progress`               | circularProgress defines whether only the circular progress indicator will be shown during upload.               | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                  |
| `dirname`                     | `dirname`                         | Name of form field to use for sending the element's directionality in form submission.                           | `string`  | `undefined`                                                                                                                                                                                                                                                                                                                                                              |
| `form`                        | `form`                            | Associates the control with a form element.                                                                      | `string`  | `undefined`                                                                                                                                                                                                                                                                                                                                                              |
| `labelCPCancel`               | `label-c-p-cancel`                | Label to be used for the cancel button in circular progress mode.                                                | `string`  | ``Cancel``                                                                                                                                                                                                                                                                                                                                                               |
| `labelCPUploadCount`          | `label-c-p-upload-count`          | Label to be used to count th uploaded files in circular progress mode.                                           | `string`  | ``Uploading $filesUploading file${     this.selectMultiple ? 's' : ''   }``                                                                                                                                                                                                                                                                                              |
| `labelCPUploadedSize`         | `label-c-p-uploaded-size`         | Label to be used to show the total uploaded file size in circular progress mode.                                 | `string`  | ``$uploadedSize uploaded...``                                                                                                                                                                                                                                                                                                                                            |
| `labelContinuePausedUploads`  | `label-continue-paused-uploads`   | Label to be used for the continue paused uploads button.                                                         | `string`  | ``Continue paused uploads``                                                                                                                                                                                                                                                                                                                                              |
| `labelDeleteAllFiles`         | `label-delete-all-files`          | Label to be used for the delete all files button.                                                                | `string`  | ``Delete all files``                                                                                                                                                                                                                                                                                                                                                     |
| `labelDragInstructions`       | `label-drag-instructions`         | Label to be used as a header with instructions for drag and drop or file upload.                                 | `string`  | ``Drag your file${     this.selectMultiple ? '(s)' : ''   } here or browse``                                                                                                                                                                                                                                                                                             |
| `labelErrorHeader`            | `label-error-header`              | Label to be used for the header of error messages.                                                               | `string`  | ``An error occurred``                                                                                                                                                                                                                                                                                                                                                    |
| `labelFileAlreadyChosenError` | `label-file-already-chosen-error` | Label to be used for the error message that is shown if a file that has already been chosen is selected again.   | `string`  | ``$duplicateFiles cannot be chosen since ${     this.cannotBeChosen.length > 1       ? 'cannot be chosen since files with the same names have been chosen already. To upload these files please remove the files with the same names.'       : 'a file with the same name has been chosen already. To upload this file please remove the file with the same name.'   }`` |
| `labelMaxSizeExceededError`   | `label-max-size-exceeded-error`   | Label to be used for the error message that is shown if chosen file exceeds the maximum file size.               | `string`  | ``$filesExceedingMaxSize cannot be chosen since ${     this.exceedMaxSize.length > 1       ? 'the files exceed the maximum file size.'       : 'the file exceeds the maximum file size.'   }``                                                                                                                                                                           |
| `labelPauseAllUploads`        | `label-pause-all-uploads`         | Label to be used for the pause all uploads button.                                                               | `string`  | ``Pause all uploads``                                                                                                                                                                                                                                                                                                                                                    |
| `labelSelectFile`             | `label-select-file`               | Label to be used for the select files button.                                                                    | `string`  | ``Select ${this.selectMultiple ? '' : 'a'} file${     this.selectMultiple ? '(s)' : ''   }``                                                                                                                                                                                                                                                                             |
| `labelStartUpload`            | `label-start-upload`              | Label to be used for the start upload button.                                                                    | `string`  | ``Start upload``                                                                                                                                                                                                                                                                                                                                                         |
| `labelTooltipDelete`          | `label-tooltip-delete`            | Label to be used for the tooltip of the delete button.                                                           | `string`  | ``Delete``                                                                                                                                                                                                                                                                                                                                                               |
| `labelTooltipDownload`        | `label-tooltip-download`          | Label to be used for the tooltip of the download button.                                                         | `string`  | ``Download``                                                                                                                                                                                                                                                                                                                                                             |
| `labelTooltipRemove`          | `label-tooltip-remove`            | Label to be used for the tooltip of the remove button.                                                           | `string`  | ``Remove``                                                                                                                                                                                                                                                                                                                                                               |
| `labelTooltipRetry`           | `label-tooltip-retry`             | Label to be used for the tooltip of the retry button.                                                            | `string`  | ``Retry``                                                                                                                                                                                                                                                                                                                                                                |
| `labelUploadCompleted`        | `label-upload-completed`          | Label to be used for the (disabled) upload completed button.                                                     | `string`  | ``Upload completed``                                                                                                                                                                                                                                                                                                                                                     |
| `labelUploadConstraints`      | `label-upload-constraints`        | Label to be used to describe upload constraints like the maximum file size.                                      | `string`  | ``${     this.maxSize !== undefined ? 'max. $maxSize file size' : ''   }``                                                                                                                                                                                                                                                                                               |
| `labelUploadCount`            | `label-upload-count`              | Label to be used to count the amount of files that have been uploaded.                                           | `string`  | ``$filesUploaded of $filesTotal file${     this.selectMultiple ? 's' : ''   } uploaded.``                                                                                                                                                                                                                                                                                |
| `labelUploadFile`             | `label-upload-file`               | Label to be used for the upload files button.                                                                    | `string`  | ``Upload ${this.selectMultiple ? '' : 'a'} file${     this.selectMultiple ? '(s)' : ''   }``                                                                                                                                                                                                                                                                             |
| `labelUploadPercentage`       | `label-upload-percentage`         | Label to be used to show the total upload percentage.                                                            | `string`  | ``$uploadProgress % uploaded.``                                                                                                                                                                                                                                                                                                                                          |
| `labelUploadState`            | `label-upload-state`              | Label to be used for the upload state header.                                                                    | `string`  | ``Upload state:``                                                                                                                                                                                                                                                                                                                                                        |
| `labelUploading`              | `label-uploading`                 | Label to be used for the (disabled) uploading button.                                                            | `string`  | ``Uploading``                                                                                                                                                                                                                                                                                                                                                            |
| `maxSize`                     | `max-size`                        | TODO: is used to display and validate maximum file size in Bytes                                                 | `number`  | `undefined`                                                                                                                                                                                                                                                                                                                                                              |
| `name`                        | `name`                            | Used to specify the name of the control.                                                                         | `string`  | `undefined`                                                                                                                                                                                                                                                                                                                                                              |
| `ref`                         | `ref`                             | reference to component                                                                                           | `any`     | `undefined`                                                                                                                                                                                                                                                                                                                                                              |
| `selectMultiple`              | `select-multiple`                 | selectMultiple defines whether selection of multiple input files is allowed.                                     | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                  |
| `showProgress`                | `show-progress`                   | showTotalProgress defines whether the progress of uploading files will be shown, or only an uploading indicator. | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                  |
| `startUpload`                 | `start-upload`                    | startUpload defines whether upload starts immediately after choosing files or after confirmation.                | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                  |
| `value`                       | `value`                           | The input value.                                                                                                 | `string`  | `undefined`                                                                                                                                                                                                                                                                                                                                                              |


## Events

| Event                         | Description                                                                                               | Type                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- |
| `ldchoosefiles`               | Emitted after choosing files.                                                                             | `CustomEvent<UploadItem[]>` |
| `ldfileuploadcontinueuploads` | Emitted on continue all uploads click.                                                                    | `CustomEvent<UploadItem[]>` |
| `ldfileuploaddeleteall`       | Emitted on delete all files click.                                                                        | `CustomEvent<UploadItem[]>` |
| `ldfileuploadpausealluploads` | Emitted on pause all uploads click.                                                                       | `CustomEvent<UploadItem[]>` |
| `ldfileuploadready`           | Emitted on start upload click or after choosing files, if upload starts immediately after choosing files. | `CustomEvent<UploadItem[]>` |


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
- [ld-notice](../ld-notice)
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
  ld-file-upload --> ld-notice
  ld-file-upload --> ld-sr-only
  ld-file-upload --> ld-circular-progress
  ld-file-upload --> ld-typo
  ld-file-upload --> ld-button
  ld-file-upload --> ld-input-message
  ld-file-upload --> ld-upload-progress
  ld-choose-file --> ld-typo
  ld-choose-file --> ld-button
  ld-notice --> ld-icon
  ld-notice --> ld-typo
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
