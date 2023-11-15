import {
  Component,
  Element,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'
import type { UploadItem } from '../ld-file-upload'

/**
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-upload-item',
  styleUrl: 'ld-upload-item.css',
  shadow: true,
})
export class LdUploadItem {
  @Element() el: HTMLLdUploadItemElement

  /** allowPause defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean

  /** showTotalProgress defines whether the total progress of all upoading files will be shown in the progress button */
  @Prop() showProgress?: boolean = false

  /** State of the file. */
  @Prop() state?:
    | 'pending'
    | 'paused'
    | 'cancelled'
    | 'uploading'
    | 'uploaded'
    | 'upload failed' = 'pending'

  /** Name of the uploaded file. */
  @Prop() fileName: string

  /** Size of the uploaded file in bytes. */
  @Prop() fileSize: number

  /** Type of the uploaded file. */
  @Prop() fileType?: string

  /** Tab index of the progress item. */
  @Prop() ldTabindex?: number

  /**
   * Size of the menu item.
   * @internal
   */
  @Prop() size?: 'sm' | 'lg'

  /** Upload progress in percent. */
  @Prop() progress?: number = 0

  /** File of type File. */
  @Prop() file?: File

  /** List of files */
  @Prop() uploadItems: UploadItem[] = []

  /** Label to be used for the tooltip of the remove button. */
  @Prop() labelRemove = `Remove`

  /** Label to be used for the tooltip of the download button. */
  @Prop() labelDownload = `Download`

  /** Label to be used for the tooltip of the retry button. */
  @Prop() labelRetry = `Retry`

  /** Label to be used for the tooltip of the delete button. */
  @Prop() labelDelete = `Delete`

  /** Label to be used for upload success message. */
  @Prop() labelUploadSuccessMsg = `Upload was successful!`

  /** Label to be used for upload cancelled message. */
  @Prop() labelUploadCancelledMsg = `Upload of this file has been cancelled`

  /** Label to be used for upload error message. */
  @Prop() labelUploadErrorMsg = `Error! Upload was unsuccessful`

  /**
   * @internal
   * Emitted on pause button click.
   */
  @Event() lduploaditempause: EventEmitter<UploadItem>

  /**
   * @internal
   * Emitted on continue button click.
   */
  @Event() lduploaditemcontinue: EventEmitter<UploadItem>

  /**
   * @internal
   * Emitted on stop button click.
   */
  @Event() lduploaditemremove: EventEmitter<UploadItem>

  /**
   * @internal
   * Emitted on download button click.
   */
  @Event() lduploaditemdownload: EventEmitter<UploadItem>

  /**
   * @internal
   * Emitted on retry button click.
   */
  @Event() lduploaditemretry: EventEmitter<UploadItem>

  /**
   * @internal
   * Emitted on delete button click.
   */
  @Event() lduploaditemdelete: EventEmitter<UploadItem>

  // Pausing the upload of singular files might be implemented at a later time

  // private pauseClick = () => {
  //   this.lduploaditempause.emit({
  //     state: this.state,
  //     fileName: this.fileName,
  //     fileSize: this.fileSize,
  //     fileType: this.fileType,
  //     progress: this.progress,
  //     file: this.file,
  //   })
  // }

  // private continueUploadClick = () => {
  //   this.lduploaditemcontinue.emit({
  //     state: this.state,
  //     fileName: this.fileName,
  //     fileSize: this.fileSize,
  //     fileType: this.fileType,
  //     progress: this.progress,
  //     file: this.file,
  //   })
  // }

  private removeClick = () => {
    this.lduploaditemremove.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
      file: this.file,
    })
  }

  private downloadClick = () => {
    this.lduploaditemdownload.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
      file: this.file,
    })
  }

  private retryClick = () => {
    this.lduploaditemretry.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
      file: this.file,
    })
  }

  private deleteClick = () => {
    this.lduploaditemdelete.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
      file: this.file,
    })
  }

  private bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    let sizeIndex = 0

    while (bytes >= 1024 && sizeIndex < sizes.length - 1) {
      bytes /= 1024
      sizeIndex++
    }

    const roundedSize = Number(bytes.toFixed(2))

    return roundedSize + ' ' + sizes[sizeIndex]
  }

  componentWillLoad() {
    const customIcon = closest('ld-file-upload', this.el)?.querySelector(
      `[data-upload-icon='${this.fileType}']`
    )
    // If custom icon exists, clone it and insert it.
    if (customIcon) {
      const clonedIcon = customIcon.cloneNode(true) /* as HTMLElement */
      this.el.appendChild(clonedIcon)
    }
  }

  render() {
    const cl = getClassNames(['ld-upload-item'])

    const activeUploads =
      this.state == 'pending' ||
      this.state == 'paused' ||
      this.state == 'uploading'

    return (
      <Host class={cl}>
        <div class="ld-upload-item__container">
          {this.showProgress || this.state == 'uploaded' ? (
            <div class="ld-upload-item__icon">
              <slot name="icons">
                <ld-icon name="documents" size="lg"></ld-icon>
              </slot>
            </div>
          ) : (
            <ld-loading class="ld-upload-item__loading"></ld-loading>
          )}

          <div class="ld-upload-item__file-details">
            <ld-typo class="ld-upload-item__file-name" variant="h5">
              {this.fileName}
            </ld-typo>
            {this.state == 'uploaded' || !this.showProgress ? (
              <ld-typo class="ld-upload-item__file-size">
                {this.bytesToSize(this.fileSize)}
              </ld-typo>
            ) : (
              <ld-typo class="ld-upload-item__file-size">
                {this.bytesToSize(this.fileSize * (this.progress / 100))} /{' '}
                {this.bytesToSize(this.fileSize)}
              </ld-typo>
            )}
          </div>
          <div class="ld-upload-item__buttons">
            {/* {this.state == 'uploading' && this.allowPause ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__pause-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.pauseClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__pause-icon"
                    name="pause"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                </ld-button>
                <ld-typo>Pause</ld-typo>
              </ld-tooltip>
            ) : undefined} */}
            {/* {this.state == 'paused' && this.allowPause ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__continue-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.continueUploadClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__continue-icon"
                    name="upload"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                </ld-button>
                <ld-typo>Continue upload</ld-typo>
              </ld-tooltip>
            ) : undefined} */}
            {this.state == 'pending' ||
            this.state == 'paused' ||
            this.state == 'uploading' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__remove-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.removeClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__remove-icon"
                    name="cross"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                  <div class="ld-upload-item__hide-on-sm">
                    {this.labelRemove}
                  </div>
                </ld-button>
                <ld-typo>{this.labelRemove}</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'uploaded' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__download-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.downloadClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__download-icon"
                    name="download"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                  <div class="ld-upload-item__hide-on-sm">
                    {this.labelDownload}
                  </div>
                </ld-button>
                <ld-typo>{this.labelDownload}</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'upload failed' &&
            this.uploadItems.filter((item) => item.state == 'uploading')
              .length == 0 ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__retry-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.retryClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__retry-icon"
                    name="refresh"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                  <div class="ld-upload-item__hide-on-sm">
                    {this.labelRetry}
                  </div>
                </ld-button>
                <ld-typo>{this.labelRetry}</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'cancelled' ||
            this.state == 'uploaded' ||
            this.state == 'upload failed' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
                  class="ld-upload-item__delete-button"
                  mode="ghost"
                  size="sm"
                  onClick={this.deleteClick}
                  slot="trigger"
                >
                  <ld-icon
                    class="ld-upload-item__delete-icon"
                    name="bin"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                  <div class="ld-upload-item__hide-on-sm">
                    {this.labelDelete}
                  </div>
                </ld-button>
                <ld-typo>{this.labelDelete}</ld-typo>
              </ld-tooltip>
            ) : undefined}
          </div>
        </div>
        {this.state == 'pending' || this.state == 'uploading' ? (
          <ld-sr-only id="progress-label">Progress</ld-sr-only>
        ) : undefined}
        {/* {activeUploads && this.showProgress ? (
          <ld-progress
            class="ld-upload-item__progress"
            pending={this.state == 'paused'}
            aria-labeledby="progress-label"
            aria-valuenow={this.progress}
          ></ld-progress>
        ) : this.state == 'uploading' && !this.showProgress ? (
          <div class="ld-upload-item__progress">
            <ld-loading class="ld-upload-item__loading"></ld-loading>
          </div>
        ) : undefined} */}
        {activeUploads && this.showProgress ? (
          <ld-progress
            class="ld-upload-item__progress"
            pending={this.state == 'paused'}
            aria-labeledby="progress-label"
            aria-valuenow={this.progress}
          ></ld-progress>
        ) : this.state == 'uploading' &&
          !this.showProgress ? undefined : undefined}
        {this.state == 'cancelled' ? (
          <ld-input-message mode="info">
            {this.labelUploadCancelledMsg}
          </ld-input-message>
        ) : undefined}
        {this.state == 'uploaded' ? (
          <ld-input-message mode="valid">
            {this.labelUploadSuccessMsg}
          </ld-input-message>
        ) : undefined}
        {this.state == 'upload failed' ? (
          <ld-input-message>{this.labelUploadErrorMsg}</ld-input-message>
        ) : undefined}
        <slot></slot>
      </Host>
    )
  }
}
