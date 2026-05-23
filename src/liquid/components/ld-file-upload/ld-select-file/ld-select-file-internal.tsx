import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Fragment,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { getAssetPath } from '../../../utils/assetPath'
import type { LdUploadItem } from '../ld-file-upload'

let selectFileCount = 0

/**
 * @internal
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-select-file-internal',
  styleUrl: 'ld-select-file-internal.shadow.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class LdSelectFileInternal {
  @Element() el: HTMLLdSelectFileInternalElement
  private idPrefix = `ld-select-file-${++selectFileCount}`

  /** Max. file size in bytes */
  @Prop() maxFileSize?: number

  /** Defines whether upload starts immediately after selecting files or after confirmation. */
  @Prop() immediate?: boolean = false

  /** Defines whether start upload button has been clicked (only relevant when immediate is false)
   * @internal
   */
  @Prop() startUploadClicked?: boolean = false

  /** Defines whether selection of multiple input files is allowed. */
  @Prop() multiple?: boolean = false

  /** Defines whether the total progress of all uploading files will be shown in the progress button */
  @Prop() progress?: 'pending' | number

  /** Selected files from the parent component */
  @Prop() uploadItems: LdUploadItem[] = []

  /** Label to be used as a header with instructions for drag and drop or file upload. */
  @Prop() labelDragInstructions = `Drag your file${
    this.multiple ? '(s)' : ''
  } here or browse`

  /** Label to be used to describe upload constraints like the maximum file size. */
  @Prop() labelUploadConstraints = `${
    this.maxFileSize !== undefined ? 'max. $maxFileSize file size' : ''
  }`

  /** Label to be used for the select files button. */
  @Prop() labelSelectFile = `Select ${this.multiple ? '' : 'a'} file${
    this.multiple ? '(s)' : ''
  }`

  /** Label to be used for the upload files button. */
  @Prop() labelUploadFile = `Upload ${this.multiple ? '' : 'a'} file${
    this.multiple ? '(s)' : ''
  }`

  /** Label to be used for the upload state header. */
  @Prop() labelUploadState = `Upload state:`

  /** Label to be used to count the amount of files that have been uploaded. */
  @Prop() labelUploadCount = `$filesUploaded of $filesTotal file${
    this.multiple ? 's' : ''
  } uploaded.`

  /** Label to be used to show the total upload percentage. */
  @Prop() labelUploadPercentage = `$uploadProgress % uploaded.`

  /** Represents whether a file is currently being dragged over the drop area */
  @State() highlighted? = false

  /** @internal */
  /** Emitted after dropping a file in the drop area. */
  @Event() ldselectfiles: EventEmitter<FileList>

  /** @internal */
  /** Emitted on upload click. */
  @Event() lduploadclick: EventEmitter

  private bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    let sizeIndex = 0

    while (bytes >= 1000 && sizeIndex < sizes.length - 1) {
      bytes /= 1000
      sizeIndex++
    }

    const roundedSize = bytes % 1 > 0 ? bytes.toFixed(2) : bytes

    return `${roundedSize} ${sizes[sizeIndex]}`
  }

  private handleUploadClick = () => {
    this.lduploadclick.emit()
  }

  private handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault()
    const fileList = ev.dataTransfer.files
    if (
      (this.multiple || fileList.length <= 1) &&
      (this.immediate || !this.startUploadClicked)
    ) {
      this.highlighted = true
    }
  }

  private handleDragOver = (ev: DragEvent) => {
    ev.preventDefault()
    const fileList = ev.dataTransfer.files
    if (
      (this.multiple || fileList.length <= 1) &&
      (this.immediate || !this.startUploadClicked)
    ) {
      this.highlighted = true
    }
  }

  private handleDragLeave = (ev: DragEvent) => {
    ev.preventDefault()
    // ev.stopPropagation()
    this.highlighted = false
  }

  private handleDrop = (ev: DragEvent) => {
    ev.preventDefault()
    // ev.stopPropagation()
    this.highlighted = false

    const fileList = ev.dataTransfer.files

    if (
      (this.multiple || fileList.length <= 1) &&
      (this.immediate || !this.startUploadClicked)
    ) {
      this.ldselectfiles.emit(fileList)
    }
  }

  render() {
    const cl = getClassNames([
      'ld-select-file',
      this.highlighted && 'ld-select-file--highlighted',
    ])

    return (
      <Host
        class={cl}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div class="ld-select-file__container">
          <img
            class="ld-select-file__image"
            src={getAssetPath('./assets/file-upload.svg')}
            alt=""
            width="55"
            height="46"
          />

          {this.immediate || (!this.immediate && !this.startUploadClicked) ? (
            <Fragment>
              <div class="ld-select-file__instructions-container">
                <ld-typo
                  class="ld-select-file__instructions"
                  id={`${this.idPrefix}-instructions`}
                  variant="label-s"
                >
                  {this.labelDragInstructions}
                </ld-typo>
                {this.labelUploadConstraints !== '' && (
                  <ld-typo
                    class="ld-select-file__constraints"
                    variant="label-s"
                  >
                    {this.labelUploadConstraints.replace(
                      '$maxFileSize',
                      this.bytesToSize(this.maxFileSize)
                    )}
                  </ld-typo>
                )}
              </div>
              <slot />
              <ld-button
                aria-labelledby={`${this.idPrefix}-instructions`}
                class="ld-select-file__upload-button"
                size="sm"
                mode="ghost"
                onClick={this.handleUploadClick}
              >
                <ld-icon name="upload" size="sm" />
                {this.immediate ? this.labelUploadFile : this.labelSelectFile}
              </ld-button>
            </Fragment>
          ) : (
            <Fragment>
              <ld-typo variant="h5">{this.labelUploadState}</ld-typo>
              <ld-typo>
                {this.labelUploadCount
                  .replace(
                    '$filesUploaded',
                    String(
                      this.uploadItems.filter(
                        (item) => item.state === 'uploaded'
                      ).length
                    )
                  )
                  .replace('$filesTotal', String(this.uploadItems.length))}
              </ld-typo>
              {typeof this.progress === 'number' && (
                <ld-typo>
                  {this.labelUploadPercentage.replace(
                    '$uploadProgress',
                    String((this.progress * 100).toFixed(2))
                  )}
                </ld-typo>
              )}
            </Fragment>
          )}
        </div>
      </Host>
    )
  }
}
