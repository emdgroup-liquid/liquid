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

  /**
   * @internal
   * Emitted on pause button click.
   */
  @Event() lduploaditempause: EventEmitter

  /**
   * @internal
   * Emitted on continue button click.
   */
  @Event() lduploaditemcontinue: EventEmitter

  /**
   * @internal
   * Emitted on stop button click.
   */
  @Event() lduploaditemremove: EventEmitter

  /**
   * @internal
   * Emitted on download button click.
   */
  @Event() lduploaditemdownload: EventEmitter

  /**
   * @internal
   * Emitted on retry button click.
   */
  @Event() lduploaditemretry: EventEmitter

  /**
   * @internal
   * Emitted on delete button click.
   */
  @Event() lduploaditemdelete: EventEmitter

  private pauseClick = () => {
    this.lduploaditempause.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
    })
  }

  private continueUploadClick = () => {
    this.lduploaditemcontinue.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
    })
  }

  private removeClick = () => {
    this.lduploaditemremove.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
    })
  }

  private downloadClick = () => {
    this.lduploaditemdownload.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
    })
  }

  private retryClick = () => {
    this.lduploaditemretry.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
    })
  }

  private deleteClick = () => {
    this.lduploaditemdelete.emit({
      state: this.state,
      fileName: this.fileName,
      fileSize: this.fileSize,
      fileType: this.fileType,
      progress: this.progress,
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
    // TODO: If custom icon exists, clone it and insert it.
    if (customIcon) {
      // this.customIcon = customIcon.cloneNode(true)
      // this.customIcon.className = 'ld-upload-item__icon'
      // console.log(this.customIcon)
      const clonedIcon = customIcon.cloneNode(true) /* as HTMLElement */
      /* clonedIcon.style.width = '2rem'
      clonedIcon.style.height = 'auto' */
      // this.customIcon = <div class="ld-upload-item__icon">{clonedIcon}</div>
      this.el.appendChild(clonedIcon)
    } /* else {
      // this.customIcon = (
      //   <ld-icon
      //     class="ld-upload-item__icon"
      //     name="documents"
      //     size="lg"
      //   ></ld-icon>
      // )
      this.el.appendChild(
        <ld-icon slot="icons" name="documents" size="lg"></ld-icon>
      )
    } */

    /* if (customIcon) {
      this.customIcon = customIcon.cloneNode(true) as HTMLElement
    } */
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
          {/* überprüfen, ob es sich um einen Pfad oder einen Icon namen handelt und entsprechend img oder ld-icon nutzen */}
          {/* {this.availableIcons.includes(this.setIcon()) ? (
            <ld-icon
              class="ld-upload-item__icon"
              name={this.setIcon()}
              size="lg"
            ></ld-icon>
          ) : (
            <img class="ld-upload-item__icon" src={this.setIcon()}></img>
          )} */}
          {/* {this.customIcon} */}
          {/* {this.getIcon()} */}
          {/* <div class="ld-upload-item__icon">
            {this.customIcon ? (
              this.customIcon
            ) : (
              <ld-icon name="documents" size="lg"></ld-icon>
            )}
          </div> */}
          {
            <div class="ld-upload-item__icon">
              <slot name="icons">
                <pre>
                  <ld-icon name="documents" size="lg"></ld-icon>
                </pre>
              </slot>
            </div>
          }

          <div class="ld-upload-item__file-details">
            <ld-typo class="ld-upload-item__file-name" variant="h5">
              {this.fileName}
            </ld-typo>
            {/* <b class="ld-upload-item__file-name">{this.fileName}</b> */}
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
            {this.state == 'uploading' && this.allowPause ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
            ) : undefined}
            {this.state == 'paused' && this.allowPause ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
            ) : undefined}
            {this.state == 'pending' ||
            this.state == 'paused' ||
            this.state == 'uploading' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
                </ld-button>
                <ld-typo>Remove</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'uploaded' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
                </ld-button>
                <ld-typo>Download</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'upload failed' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
                </ld-button>
                <ld-typo>Retry</ld-typo>
              </ld-tooltip>
            ) : undefined}
            {this.state == 'cancelled' ||
            this.state == 'uploaded' ||
            this.state == 'upload failed' ? (
              <ld-tooltip arrow position="left middle" size="sm">
                <ld-button
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
                </ld-button>
                <ld-typo>Delete</ld-typo>
              </ld-tooltip>
            ) : undefined}
          </div>
        </div>
        {this.state == 'pending' || this.state == 'uploading' ? (
          <ld-sr-only id="progress-label">Progress</ld-sr-only>
        ) : undefined}
        {activeUploads && this.showProgress ? (
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
        ) : undefined}
        {this.state == 'cancelled' ? (
          <ld-input-message mode="info">
            Upload of this file has been cancelled
          </ld-input-message>
        ) : undefined}
        {this.state == 'uploaded' ? (
          <ld-input-message mode="valid">
            Upload was successful!
          </ld-input-message>
        ) : undefined}
        {this.state == 'upload failed' ? (
          <ld-input-message>Error! Upload was unsuccessful</ld-input-message>
        ) : undefined}
        <slot></slot>
      </Host>
    )
  }
}
