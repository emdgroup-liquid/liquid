import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * TODO: emit files chosen event with file list, that's it.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 */
@Component({
  tag: 'ld-choose-file',
  styleUrl: 'ld-choose-file.css',
  shadow: true,
})
export class LdChooseFile {
  @Element() el: HTMLLdChooseFileElement
  /* private uploadProgressRef: HTMLLdUploadProgressElement */

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** Max. file size in bytes */
  @Prop() maxSize?: number = 1572864

  /** Chosen Files */
  @Prop() uploadFiles: {
    state: 'pending' | 'uploading' | 'uploaded' | 'upload failed'
    fileName: string
    fileSize: number
    progress: number
  }[] = []

  @State() highlighted? = false

  @Event() ldchoosefiles: EventEmitter<FileList>

  private updateProgress() {
    // console.log(this.el.querySelector('ld-upload-progress').uploadItems)
    // console.log(this.uploadProgressRef.uploadItems)
    // this.el.querySelector('ld-upload-progress').uploadItems = this.uploadFiles
    // this.uploadProgressRef.uploadItems = this.uploadFiles
    if (this.uploadFiles && this.el.querySelector('ld-upload-progress')) {
      console.log(this.el.querySelector('ld-upload-progress').uploadItems)
      this.el.querySelector('ld-upload-progress').uploadItems = this.uploadFiles
      /* this.el
        .querySelector('ld-upload-progress')
        .setAttribute('upload-items', this.uploadFiles) */
    } /* else {
      this.el
        .querySelector('ld-upload-progress')
        .removeAttribute('upload-items')
    } */
  }

  private getFile = async (ev) => {
    const files = (ev.target as HTMLLdInputElement).files
    if (!files || !files.length) return

    console.log(files)

    this.readFile(files)
  }

  // TODO: remove, I think we don't need this.
  private readFile = async (files: FileList) => {
    // Read the file on the client side.
    const fileReader = new FileReader()
    console.log(fileReader)
    fileReader.readAsDataURL(files[0])
    const file = files[0]
    if (file.size > this.maxSize) {
      fileReader.abort()
    }
    if (
      this.uploadFiles.some(
        (uploadedfile) => uploadedfile.fileName === file.name
      )
    ) {
      fileReader.abort()
    }
    fileReader.onabort = () => {
      this.uploadFiles.push({
        state: 'upload failed',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    }
    fileReader.onerror = () => {
      // Handle error...
      this.uploadFiles.push({
        state: 'upload failed',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    }
    fileReader.onloadend = () => {
      // Use file data...
      this.uploadFiles.push({
        state: 'pending',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    }

    console.log(this.uploadFiles)
    this.updateProgress()

    // Or post the file to the server.
    /* const data = new FormData()
    data.append('userfile', files[0])
    const requestOptions = {
      method: 'POST',
      body: data,
    }
    try {
      await fetch('/api/user/profile/file', {
        method: 'POST',
        body: data,
      })
      // success!
    } catch (err) {
      // Handle error...
    } */
  }

  private handleDragEnter = (ev: DragEvent) => {
    /* console.log(ev) */
    ev.preventDefault()
    ev.stopPropagation()
    this.highlighted = true
  }

  private handleDragOver = (ev: DragEvent) => {
    /* console.log(ev) */
    ev.preventDefault()
    ev.stopPropagation()
    this.highlighted = true
  }

  private handleDragLeave = (ev: DragEvent) => {
    /* console.log(ev) */
    ev.preventDefault()
    ev.stopPropagation()
    this.highlighted = false
  }

  // TODO: we need to hande choose as well, not only drop.
  private handleDrop = (ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    console.log(ev)
    this.highlighted = false

    /* noch Fehler abfangen falls kein File gedropped wurde? */
    /* const itemList = ev.dataTransfer.items
    if (!itemList) {
      const fileList = ev.dataTransfer.files
    } */

    const fileList = ev.dataTransfer.files
    console.info('fileList', fileList)

    this.ldchoosefiles.emit(fileList)

    // this.readFile(fileList)

    /* const dt = ev.dataTransfer
    let files = dt.files

    files = [...files]
    files.forEach(
      (this.uploads = [
        ...this.uploads,
        <drop-element file={file}></drop-element>,
      ])
    ) */

    /* if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      ;[...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile()
          console.log(`… file[${i}].name = ${file.name}`)
        }
      })
    } else {
      // Use DataTransfer interface to access the file(s)
      ;[...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`)
      })
    } */
  }

  componentDidLoad() {
    this.updateProgress()
  }

  render() {
    const cl = getClassNames(['ld-choose-file'])

    return (
      <Host class={cl}>
        <div
          class="ld-choose-file__drag-area"
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          {this.highlighted ? (
            <ld-typo variant="h5">Drop file(s)</ld-typo>
          ) : (
            <ld-typo variant="h5">Drag your file(s) here or browse</ld-typo>
          )}
          <ld-typo>max. 1.5 mb file size</ld-typo>

          {/*
            TODO:
              - move into drop area
              - set drop area position relative
              - set input position absolute, inset 0, opacity 0
          */}
          <ld-input
            placeholder="Upload a file"
            type="file"
            onLdchange={this.getFile}
          ></ld-input>
        </div>
        {/* <ld-upload-progress
          start-upload="false"
          ref={(el: HTMLLdUploadProgressElement) =>
            (this.uploadProgressRef = el)
          }
        ></ld-upload-progress> */}
      </Host>
    )
  }
}
