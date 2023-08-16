import {
  Component,
  Element,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { LdUploadItemConfig } from './ld-upload-item.types'

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

  /** Type of the uploaded file. */
  @Prop() fileType?: string

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

  /** Maps file types to icon path */
  @Prop() icons?: Partial<LdUploadItemConfig> = {}
  // @Prop() icon?: string = 'documents'

  // icon prop hinzufügen, string type, nur einen Pfad damit es customizable ist
  // generisches file icon als standard

  @State() defaultIcons: Partial<LdUploadItemConfig> = {
    pdf: 'pdf',
    zip: 'zip',
    jpeg: 'jpeg',
    txt: 'documents',
    png: 'documents',
    rtf: 'documents',
  }

  /**
   * @internal
   * Emitted on pause button click.
   */
  @Event() lduploaditempause: EventEmitter

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
   * Emitted on delete button click.
   */
  @Event() lduploaditemdelete: EventEmitter

  /* private getFileType = () => {
    const fileType = this.fileName.split('.').pop()?.toLowerCase()
    return fileType
  } */

  private setIcon = () => {
    const mergedIcons = { ...this.defaultIcons, ...this.icons }
    // const fileType = this.getFileType()
    const fileType = this.fileType.split('/').pop()?.toLowerCase()
    if (fileType && mergedIcons[fileType]) {
      return mergedIcons[fileType]
    } else {
      return 'documents'
    }
  }

  /* private getIconFile = async () => {
    try {
      const icon = await fetch(
        '{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg'
      )
      icon
    } catch (err) {
      console.error(err)
    }
  } */

  /* async created() {
    try {
      const data = await fetch('{{ env.base }}/{{ buildstamp }}assets/examples/numerals.json').then((res) => res.json())
      this.elements = data.elements
    } catch (err) {
      console.error(err)
    }
  }
 */
  private pauseClick = () => {
    this.lduploaditempause.emit({
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
    // this.getFileType()
  }

  render() {
    const cl = getClassNames(['ld-upload-item'])

    return (
      <Host class={cl}>
        <div class="ld-upload-item__card" part="card">
          <div class="ld-upload-item__container">
            {/* Image mit pfad hier setzen, falls Pfad gegeben ist */}
            <ld-icon
              class="ld-upload-item__icon"
              name={this.setIcon()}
              size="lg"
            ></ld-icon>

            {/* <img src="{{ env.base }}/{{ buildstamp }}assets/examples/file-upload-jpeg.svg"></img> */}
            <div class="ld-upload-item__file-details">
              {/* <ld-typo variant="h5">{this.fileName}</ld-typo> */}
              <ld-typo class="ld-upload-item__file-name" variant="h5">
                {/* {this.fileName.length <= 15
                  ? this.fileName
                  : this.fileName.slice(0, 10).concat('...')} */}
                {this.fileName}
              </ld-typo>
              <ld-typo>{this.bytesToSize(this.fileSize)}</ld-typo>
            </div>
            <div class="ld-upload-item__buttons">
              {this.state == 'uploading' ? (
                <ld-button mode="ghost" size="sm" onClick={this.pauseClick}>
                  <ld-icon
                    class="ld-upload-icon__pause-icon"
                    name="pause"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'pending' ||
              this.state == 'uploading' ||
              this.state == 'upload failed' ? (
                <ld-button mode="ghost" size="sm" onClick={this.removeClick}>
                  <ld-icon
                    class="ld-upload-item__remove-icon"
                    name="cross"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'uploaded' ? (
                <ld-button mode="ghost" size="sm" onClick={this.downloadClick}>
                  <ld-icon
                    class="ld-upload-item__download-icon"
                    name="download"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
                </ld-button>
              ) : undefined}
              {this.state == 'uploaded' ? (
                <ld-button mode="ghost" size="sm" onClick={this.deleteClick}>
                  <ld-icon
                    class="ld-upload-item__delete-icon"
                    name="bin"
                    size="sm"
                    aria-label="Text"
                  ></ld-icon>
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
        </div>
      </Host>
    )
  }
}
