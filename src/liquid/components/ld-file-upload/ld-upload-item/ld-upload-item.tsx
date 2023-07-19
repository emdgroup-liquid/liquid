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

type Mode = 'highlight' | 'danger' | 'neutral'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part listitem - `li` element wrapping the `ld-button` element
 * @part button - `ld-button` element wrapping the default slot
 */
@Component({
  tag: 'ld-upload-item',
  styleUrl: 'ld-upload-item.css',
  shadow: true,
})
export class LdUploadItem {
  @Element() el: HTMLLdUploadItemElement

  /** State of the file. */
  @Prop() state?: 'pending' | 'uploading' | 'uploaded' | 'upload failed' =
    'pending'

  /** URL of the uploaded image. Preview of image will be shown after upload. */
  @Prop() previewUrl?: string

  /** Name of the uploaded file. */
  @Prop() fileName: string

  /** Size of the uploaded file in bytes. */
  @Prop() fileSize: number

  /** Tab index of the progress item. */
  @Prop() ldTabindex?: number

  /** Display mode. */
  @Prop() mode?: Mode = 'neutral'

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
   * Emitted on stop button click.
   */
  @Event() lduploaditemstop: EventEmitter

  /**
   * @internal
   * Emitted on download button click.
   */
  @Event() lduploaditemdownload: EventEmitter

  /**
   * @internal
   * Emitted on delete button click.
   */
  @Event() lduploaditemdelete: EventEmitter

  private pauseClick = (ev: MouseEvent) => {
    this.lduploaditempause.emit(ev)
  }

  private stopClick = (ev: MouseEvent) => {
    this.lduploaditemstop.emit(ev)
  }

  private downloadClick = (ev: MouseEvent) => {
    this.lduploaditemdownload.emit(ev)
  }

  private deleteClick = (ev: MouseEvent) => {
    this.lduploaditemdelete.emit(ev)
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

  /** componentWillLoad() {
    if (
      this.el.parentElement?.tagName === 'LD-UPLOAD-PROGRESS' &&
      this.el.parentElement?.startUpload === false
    ) {
      this.el.setAttribute('state', 'uploading')
    }
  } */

  render() {
    const cl = getClassNames(['ld-upload-item'])

    return (
      <Host class={cl}>
        <ld-card class="ld-upload-item__card">
          <div class="ld-upload-item__container">
            <ld-icon class="ld-upload-item__icon" name="placeholder"></ld-icon>
            <div class="ld-upload-item__file-details">
              <ld-typo variant="h5">{this.fileName}</ld-typo>
              <ld-typo>{this.bytesToSize(this.fileSize)}</ld-typo>
            </div>
            <div class="ld-upload-item__buttons">
              {this.state == 'uploading' ? (
                <ld-button mode="ghost" onClick={this.pauseClick}>
                  <ld-icon name="pause" aria-label="Text"></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'pending' ||
              this.state == 'uploading' ||
              this.state == 'upload failed' ? (
                <ld-button mode="ghost" onClick={this.stopClick}>
                  <ld-icon name="cross" aria-label="Text"></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'uploaded' ? (
                <ld-button mode="ghost" onClick={this.downloadClick}>
                  <ld-icon name="download" aria-label="Text"></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'uploaded' ? (
                <ld-button mode="ghost" onClick={this.deleteClick}>
                  <ld-icon name="bin" aria-label="Text"></ld-icon>
                </ld-button>
              ) : undefined}
            </div>
          </div>
          {this.state == 'pending' || this.state == 'uploading' ? (
            <ld-sr-only id="progress-label">Progress</ld-sr-only>
          ) : undefined}
          {this.state == 'pending' || this.state == 'uploading' ? (
            <ld-progress
              class="ld-upload-item__progress"
              aria-labeledby="progress-label"
              aria-valuenow={this.progress}
            ></ld-progress>
          ) : undefined}
          {this.state == 'uploaded' ? (
            <ld-typo>Upload was successful!</ld-typo>
          ) : undefined}
          {this.state == 'upload failed' ? (
            <ld-typo>Error! Upload was unsuccessful</ld-typo>
          ) : undefined}
          <slot></slot>
        </ld-card>
      </Host>
    )
  }
}
