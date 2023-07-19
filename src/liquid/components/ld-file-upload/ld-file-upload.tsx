import {
  Component,
  h,
  Host,
  Element,
  Method,
  State,
  Event,
  EventEmitter,
  Prop,
} from '@stencil/core'

export type UploadItem = {
  state: 'pending' | 'uploading' | 'uploaded' | 'upload failed'
  fileName: string
  fileSize: number
  progress: number
}

/**
 * TODO:
 *   - listen for files chosen event (from ld-choose-file.tsx) with file list
 *     -> emit upload ready event (if startUpload prop is set to true)
 *   - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
 *   - The upload ready event contains the file list as its payload
 *   - Keep a state of files chosen and pass them as a prop (uploadItems) to ld-upload-progress.tsx
 *   - Implement callback methods, which accept a file list (name, progress, state etc.) and update the upload items
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 */
@Component({
  tag: 'ld-file-upload',
  styleUrl: 'ld-file-upload.css',
  shadow: true,
})
export class LdFileUpload {
  @Element() el: HTMLLdFileUploadElement
  private chooseFileRef: HTMLLdChooseFileElement

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** TODO: is used to display and validate maximum file size */
  @Prop() maxSize?: number

  @State() uploadItems: UploadItem[] = []
  @State() fileList: FileList

  @Event() ldchoosefiles: EventEmitter<FileList>

  @Event() ldfileuploadready: EventEmitter<FileList>

  /* @Listen('ldchoosefiles')
  chooseFilesHandler(event: CustomEvent<Todo>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  } */

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and updates the upload items state.
   */
  @Method()
  async updateUploadItems(uploadItems: UploadItem[]) {
    this.uploadItems = uploadItems
  }

  /**
   * Accepts a file from component consumer (name, progress, state etc.)
   * and updates the upload item state.
   */
  @Method()
  async updateUploadItem(uploadItem: UploadItem) {
    const itemToUpdateIndex = this.uploadItems.findIndex(
      (item) => item.fileName === uploadItem.fileName
    )
    if (!itemToUpdateIndex) {
      throw new Error(
        `Upload item with name ${uploadItem.fileName} not found in upload list.`
      )
    }

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToUpdateIndex),
      uploadItem,
      ...this.uploadItems.slice(itemToUpdateIndex + 1),
    ]
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    this.fileList = ev.detail
    ev.stopImmediatePropagation() // We stop the internal event...
    this.ldchoosefiles.emit(this.fileList) // ...and dispatch the public one.
    if (this.startUpload) {
      this.ldfileuploadready.emit(this.fileList)
    }
    /* const file = ev.detail[0]
    for (let i = 0; i < ev.detail.length; i++) {
      if (
        // ev.detail[i].size <= this.maxSize &&
        !this.uploadItems.some(
          (uploadedfile) => uploadedfile.fileName === ev.detail[i].name
        )
      ) {
        this.uploadItems.push({
          state: 'pending',
          fileName: ev.detail[i].name,
          fileSize: ev.detail[i].size,
          progress: 0,
        })
      } */
    /* if (
      file.size <= this.maxSize &&
      !this.uploadItems.some(
        (uploadedfile) => uploadedfile.fileName === file.name
      )
    ) {
      this.uploadItems.push({
        state: 'pending',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    } */
    /* this.updateUploadItems(this.uploadItems) */
  }

  private handleContinueClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUpload) {
      this.ldfileuploadready.emit(this.fileList)
    }
  }

  /* onClick={this.handleContinueClick} */

  render() {
    return (
      <Host class="ld-file-upload">
        <ld-choose-file
          onLdchoosefiles={this.handleChooseFiles}
          ref={(el: HTMLLdChooseFileElement) => (this.chooseFileRef = el)}
        />
        <ld-upload-progress
          uploadItems={this.uploadItems}
          start-upload="false"
        />
        {!this.startUpload && (
          <ld-button onClick={this.handleContinueClick}>Continue</ld-button>
        )}
        <ld-button mode="secondary">Delete all files</ld-button>
      </Host>
    )
  }
}
