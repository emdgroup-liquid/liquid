import {
  Component,
  h,
  Host,
  Element,
  Method,
  State,
  Event,
  EventEmitter,
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
 *     -> update upload items accordingly
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

  @State() uploadItems: UploadItem[] = []

  @Event() ldchoosefiles: EventEmitter<FileList>

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
    const itenToUpdateIndex = this.uploadItems.findIndex(
      (item) => item.fileName === uploadItem.fileName
    )
    if (!itenToUpdateIndex) {
      throw new Error(
        `Upload item with name ${uploadItem.fileName} not found in upload list.`
      )
    }

    this.uploadItems = [
      ...this.uploadItems.slice(0, itenToUpdateIndex),
      uploadItem,
      ...this.uploadItems.slice(itenToUpdateIndex + 1),
    ]
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    ev.stopImmediatePropagation() // We stop the internal event...
    this.ldchoosefiles.emit(ev.detail) // ...and dispatch the public one.
  }

  render() {
    return (
      <Host class="ld-file-upload">
        <ld-choose-file onLdchoosefiles={this.handleChooseFiles} />
        <ld-upload-progress
          uploadItems={this.uploadItems}
          start-upload="false"
        />
      </Host>
    )
  }
}
