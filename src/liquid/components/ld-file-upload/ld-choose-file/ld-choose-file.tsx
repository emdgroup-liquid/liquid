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

  private getFile = async (ev) => {
    const files = (ev.target as HTMLLdInputElement).files
    if (!files || !files.length) return

    console.log(files)

    this.ldchoosefiles.emit(files)

    // this.readFile(files)
  }

  // TODO: remove, I think we don't need this.
  /* private readFile = async (files: FileList) => {
    const file = files[0]
    if (
      file.size <= this.maxSize &&
      this.uploadFiles.some(
        (uploadedfile) => uploadedfile.fileName === file.name
      )
    ) {
      this.uploadFiles.push({
        state: 'pending',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    }
    console.log(this.uploadFiles)
  } */

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
      </Host>
    )
  }
}
