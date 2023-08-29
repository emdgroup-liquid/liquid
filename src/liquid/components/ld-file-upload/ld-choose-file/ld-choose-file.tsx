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
import type { UploadItem } from '../ld-file-upload'

/**
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-choose-file',
  styleUrl: 'ld-choose-file.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class LdChooseFile {
  @Element() el: HTMLLdChooseFileElement

  /** Max. file size in bytes */
  @Prop() maxSize?: number = 1572864

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** contineClicked defines whether the continue button has been clicked while startUpload = false */
  @Prop() continueClicked?: boolean = false

  /** selectMultiple defines whether selection of multiple input files is allowed. */
  @Prop() selectMultiple?: boolean = false

  /** Chosen Files */
  /* @Prop() uploadFiles: {
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
  }[] = [] */
  @Prop() uploadFiles: UploadItem[] = []

  /** Chosen Files from the parent component */
  /* @Prop() uploadItems: {
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
  }[] = [] */
  @Prop() uploadItems: UploadItem[] = []

  /** Size of the choose file area */
  @Prop() size?: 'sm' | 'bg' = 'bg'

  /** Represents whether a file is currently being dragged over the drop area */
  @State() highlighted? = false

  /** @internal */
  @Event() ldchoosefiles: EventEmitter<FileList>

  /** @internal */
  @Event() lduploadclick: EventEmitter

  private handleUploadClick = () => {
    this.lduploadclick.emit()
  }

  private handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    const fileList = ev.dataTransfer.files
    if (
      (this.selectMultiple || (!this.selectMultiple && fileList.length <= 1)) &&
      (this.startUpload || (!this.startUpload && !this.continueClicked))
    ) {
      this.highlighted = true
    }
  }

  private handleDragOver = (ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    const fileList = ev.dataTransfer.files
    if (
      (this.selectMultiple || (!this.selectMultiple && fileList.length <= 1)) &&
      (this.startUpload || (!this.startUpload && !this.continueClicked))
    ) {
      this.highlighted = true
    }
  }

  private handleDragLeave = (ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    this.highlighted = false
  }

  private handleDrop = (ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    console.log(ev)
    this.highlighted = false

    const fileList = ev.dataTransfer.files
    console.info('fileList', fileList)

    if (
      (this.selectMultiple || (!this.selectMultiple && fileList.length <= 1)) &&
      (this.startUpload || (!this.startUpload && !this.continueClicked))
    ) {
      this.ldchoosefiles.emit(fileList)
    }
  }

  render() {
    const cl = getClassNames([
      'ld-choose-file',
      this.highlighted && 'ld-choose-file--highlighted',
    ])

    const calculateProgress = () => {
      const activeUploads = this.uploadItems.filter(
        (item) =>
          item.state == 'pending' ||
          item.state == 'paused' ||
          item.state == 'uploading' ||
          item.state == 'uploaded'
      )
      const totalSizeSum = activeUploads.reduce(
        (partialSum, file) => partialSum + file.fileSize,
        0
      )
      const uploadedSizeSum = activeUploads.reduce(
        (partialSum, file) => partialSum + file.fileSize * file.progress,
        0
      )
      const totalProgress = uploadedSizeSum / totalSizeSum / 100 || 0
      return totalProgress
    }

    return (
      <Host
        class={cl}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div
          class={getClassNames([
            'ld-choose-file__content',
            this.size && `ld-choose-file--${this.size}`,
          ])}
        >
          <img
            class="ld-choose-file__image"
            src={getAssetPath('./assets/file-upload.svg')}
            alt=""
            width="142"
            height="122"
          />

          <div class="ld-choose-file__text">
            {this.startUpload ||
            (!this.startUpload && !this.continueClicked) ? (
              <Fragment>
                <ld-typo variant="h5">
                  {this.selectMultiple
                    ? 'Drag your file(s) here or browse'
                    : 'Drag your file here or browse'}
                </ld-typo>
                <ld-typo>max. 1.5 mb file size</ld-typo>
                <slot></slot>
                <ld-button onClick={this.handleUploadClick}>
                  {this.startUpload
                    ? this.selectMultiple
                      ? 'Upload file(s)'
                      : 'Upload a file'
                    : this.selectMultiple
                    ? 'Select file(s)'
                    : 'Select a file'}
                </ld-button>
              </Fragment>
            ) : (
              <Fragment>
                <ld-typo variant="h5">Upload state:</ld-typo>
                <ld-typo>
                  {
                    this.uploadItems.filter((item) => item.state == 'uploaded')
                      .length
                  }{' '}
                  of {this.uploadItems.length} file(s) uploaded.
                </ld-typo>
                <ld-typo>{calculateProgress()} % uploaded.</ld-typo>
              </Fragment>
            )}
          </div>
        </div>
      </Host>
    )
  }
}
