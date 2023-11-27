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
  Listen,
  Watch,
  Fragment,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

export type UploadItem = {
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
  file: File
}

/**
 * File upload:
 *   - listen for files chosen event (from ld-choose-file.tsx) with file list
 *     -> emit upload ready event (if startUploadImmediately prop is set to true)
 *   - listen for click event of continue button and emit upload ready event (if startUploadImmediately prop is set to false)
 *   - The upload ready event contains the file list as its payload
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-file-upload',
  styleUrl: 'ld-file-upload.css',
  shadow: true,
})
export class LdFileUpload {
  @Element() el: HTMLLdFileUploadElement

  private fileInput?: HTMLInputElement

  /** Defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUploadImmediately?: boolean = false

  /** Defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean = false

  /** Defines whether the progress of uploading files will be shown, or only an uploading indicator.
   * Also defines is exact progress will be shown in uploading progress button, as well as in the upload state area.
   */
  @Prop() showProgress?: boolean = false

  /** Defines whether selection of multiple input files is allowed. */
  @Prop() multiple?: boolean = false

  /** Defines whether only the circular progress indicator will be shown during upload. */
  @Prop() circularProgress?: boolean = false

  /** Defines whether only one file can be chosen and uploaded. */
  @Prop() compact?: boolean = false

  /** Is used to display and validate maximum file size in Bytes */
  @Prop() maxFileSize?: number
  // @Prop() maxFileSize?: number = 1572864

  /** Name of form field to use for sending the element's directionality in form submission. */
  @Prop() dirname?: string

  /** Associates the control with a form element. */
  @Prop() form?: string

  // TODO: Do we need the name prop at all (for "native" form submission)?
  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The input value. */
  @Prop({ mutable: true }) value?: string

  // Labels for ld-choose-file

  /** Label to be used as a header with instructions for drag and drop or file upload. */
  @Prop() labelDragInstructions = `Drag your file${
    this.multiple ? '(s)' : ''
  } here or browse`

  /** Label to be used as a header with instructions for drag and drop or file upload in the simgular upload version. */
  // @Prop() labelSingularDropInstructions = `Or drop file${
  //   this.multiple ? '(s)' : ''
  // }`

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

  // Labels for ld-file-upload

  /** Label to be used for the start upload button. */
  @Prop() labelStartUpload = `Start upload`

  /** Label to be used for the (disabled) uploading button. */
  @Prop() labelUploading = `Uploading`

  /** Label to be used for the (disabled) upload completed button. */
  @Prop() labelUploadCompleted = `Upload completed`

  /** Label to be used for the delete all files button. */
  @Prop() labelDeleteAllFiles = `Delete all files`

  /** Label to be used for the pause all uploads button. */
  @Prop() labelPauseAllUploads = `Pause all uploads`

  /** Label to be used for the continue paused uploads button. */
  @Prop() labelContinuePausedUploads = `Continue paused uploads`

  /** Label to be used for the header of error messages. */
  @Prop() labelErrorHeader = `An error occurred`

  /** Label to be used for the error message that is shown if a file that has already been chosen is selected again. */
  @Prop()
  labelFileAlreadyChosenError = `$duplicateFiles cannot be chosen since file(s) with the same name(s) has/have been chosen already. To upload this/these file(s) please remove the file(s) with the same name(s).`

  /** Label to be used for the error message that is shown if chosen file exceeds the maximum file size. */
  @Prop()
  labelmaxFileSizeExceededError = `$filesExceedingmaxFileSize cannot be chosen since the file(s) exceed(s) the maximum file size.`

  // Labels for circular progress:

  /** Label to be used to count th uploaded files in circular progress mode. */
  @Prop() labelCPUploadCount = `Uploading $filesUploading file${
    this.multiple ? 's' : ''
  }`

  /** Label to be used to show the total uploaded file size in circular progress mode. */
  @Prop() labelCPUploadedSize = `$uploadedSize uploaded...`

  /** Label to be used for the cancel button in circular progress mode. */
  @Prop() labelCPCancel = `Cancel`

  // Labels for ld-upload-item

  /** Label to be used for the remove button. */
  @Prop() labelRemove = `Remove`

  /** Label to be used for the download button. */
  @Prop() labelDownload = `Download`

  /** Label to be used for the retry button. */
  @Prop() labelRetry = `Retry`

  /** Label to be used for the delete button. */
  @Prop() labelDelete = `Delete`

  /** Label to be used for upload success message. */
  @Prop() labelUploadSuccessMsg = `Upload was successful!`

  /** Label to be used for upload cancelled message. */
  @Prop() labelUploadCancelledMsg = `Upload of this file has been cancelled`

  /** Label to be used for upload error message. */
  @Prop() labelUploadErrorMsg = `Error! Upload was unsuccessful`

  /** List of files */
  @State() uploadItems: UploadItem[] = []

  /** Contains files that have been chosen but the upload has not started yet. */
  @State() lastChosenFiles: UploadItem[] = []

  /** Contains all files that have been chosen but the upload has not started yet. */
  @State() allChosenFiles: UploadItem[] = []

  /** Names of files that cannot be chosen by the user since a file of the same name has been chosen already. */
  @State() cannotBeChosen: string[] = []

  /** Names of files that cannot be chosen by the user since the files exceed the maximum file size. */
  @State() exceedmaxFileSize: string[] = []

  /** Only renders the choose file component, if true. */
  @State() renderOnlyChooseFile = true

  /** Represents whether the start upload button has been clicked. */
  @State() startUploadClicked = false

  /** Represents whether the pause all button has been clicked. */
  @State() pauseAllClicked = false

  /** Defines whether files have been chosen in circular progress mode and the circular progress should be rendered. */
  @State() renderCircularProgress = false

  /** Defines whether all uploads in circular progress mode are finished. */
  @State() allUploadsFinished = false

  /** Emitted after choosing files. */
  @Event() ldchoosefiles: EventEmitter<UploadItem[]>

  /** Emitted on start upload click or after choosing files, if upload starts immediately after choosing files. */
  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  /** Emitted on delete all files click. */
  @Event() ldfileuploaddeleteall: EventEmitter<UploadItem[]>

  /** Emitted on pause all uploads click. */
  @Event() ldfileuploadpausealluploads: EventEmitter<UploadItem[]>

  /** Emitted on continue all uploads click. */
  @Event() ldfileuploadcontinueuploads: EventEmitter<UploadItem[]>

  /**
   * Emitted on pause button click.
   */
  @Event() lduploaditempause: EventEmitter<UploadItem>

  /**
   * Emitted on continue button click.
   */
  @Event() lduploaditemcontinue: EventEmitter<UploadItem>

  /**
   * Emitted on stop button click.
   */
  @Event() lduploaditemremove: EventEmitter<UploadItem>

  /**
   * Emitted on download button click.
   */
  @Event() lduploaditemdownload: EventEmitter<UploadItem>

  /**
   * Emitted on retry button click.
   */
  @Event() lduploaditemretry: EventEmitter<UploadItem>

  /**
   * Emitted on delete button click.
   */
  @Event() lduploaditemdelete: EventEmitter<UploadItem>

  /* @Listen('lduploaditempause')
  pauseClickHandler(ev: CustomEvent<UploadItem>) {
    const itemToPauseIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    ev.detail.state = 'pending'

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToPauseIndex),
      ev.detail,
      ...this.uploadItems.slice(itemToPauseIndex + 1),
    ]
  } */

  /* @Listen('lduploaditemremove')
  @Listen('lduploaditemdelete')
  removeClickHandler(ev: CustomEvent<UploadItem>) {
    const itemToRemoveIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToRemoveIndex),
      ...this.uploadItems.slice(itemToRemoveIndex + 1),
    ]
  } */

  @Listen('lduploadclick')
  handleUploadClick() {
    if (this.fileInput) {
      this.fileInput.click()
    }
  }

  @Listen('ldfileuploadready')
  /** After the ldfileuploadready event is emitted, the list of all chosen files is cleared */
  clearChosenFiles() {
    this.allChosenFiles = []
  }

  @Listen('ldchoosefiles')
  updateComponentAppearance() {
    if (this.renderOnlyChooseFile) {
      this.renderOnlyChooseFile = false
    }
    if (
      this.circularProgress &&
      !this.renderCircularProgress &&
      this.exceedmaxFileSize.length === 0
    ) {
      this.renderCircularProgress = true
    }
    // clears file input value
    this.fileInput.value = null
  }

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and adds the items to the upload items state.
   */
  @Method()
  async addUploadItems(uploadItems: UploadItem[]) {
    if (this.uploadItems.length === 0) {
      this.uploadItems = uploadItems
    } else {
      this.uploadItems = [...this.uploadItems, ...uploadItems]
    }
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
    if (!itemToUpdateIndex && itemToUpdateIndex != 0) {
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

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and deletes the upload items.
   */
  @Method()
  async deleteAllUploadItems() {
    this.uploadItems = []
  }

  /**
   * Accepts a file from component consumer (name, progress, state etc.)
   * and deletes the upload items.
   */
  @Method()
  async deleteUploadItem(uploadItem: UploadItem) {
    const itemToDeleteIndex = this.uploadItems.findIndex(
      (item) => item.fileName === uploadItem.fileName
    )
    if (!itemToDeleteIndex && itemToDeleteIndex != 0) {
      throw new Error(
        `Upload item with name ${uploadItem.fileName} not found in upload list.`
      )
    }

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToDeleteIndex),
      ...this.uploadItems.slice(itemToDeleteIndex + 1),
    ]
  }

  private setToInitialState = () => {
    this.renderOnlyChooseFile = true
    this.startUploadClicked = false
    this.renderCircularProgress = false
  }

  @Watch('uploadItems')
  async changeComponentAppearanceAndStates() {
    if (this.uploadItems.length === 0) {
      this.startUploadClicked = false
    }
    if (
      this.uploadItems.length === 0 &&
      this.renderOnlyChooseFile === false &&
      this.cannotBeChosen.length === 0 &&
      this.exceedmaxFileSize.length === 0
    ) {
      this.setToInitialState()
    }
    if (
      this.uploadItems.filter((item) => item.state === 'uploaded').length ==
        this.uploadItems.length &&
      this.uploadItems.length != 0
    ) {
      this.allUploadsFinished = true
    }

    // sets component to initial state after all files have been uploaded in circular progress mode
    if (
      this.uploadItems.filter((item) => item.state === 'uploaded').length ==
        this.uploadItems.length &&
      this.uploadItems.length != 0 &&
      this.circularProgress
    ) {
      this.allUploadsFinished = true
      const delay = (ms) => new Promise((res) => setTimeout(res, ms))
      await delay(5000)
      this.uploadItems = []
      this.renderOnlyChooseFile = true
      this.startUploadClicked = false
      this.renderCircularProgress = false
      this.allUploadsFinished = false
    }
  }

  private bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    let sizeIndex = 0

    while (bytes >= 1024 && sizeIndex < sizes.length - 1) {
      bytes /= 1024
      sizeIndex++
    }

    const roundedSize = Number(bytes.toFixed(2))

    return `${roundedSize} ${sizes[sizeIndex]}`
  }

  private calculateTotalProgress = () => {
    const activeUploads = this.uploadItems.filter(
      (item) =>
        item.state === 'pending' ||
        item.state === 'paused' ||
        item.state === 'uploading' ||
        item.state === 'uploaded'
    )
    const totalSizeSum = activeUploads.reduce(
      (partialSum, file) => partialSum + file.fileSize,
      0
    )
    const uploadedSizeSum = activeUploads.reduce(
      (partialSum, file) => partialSum + file.fileSize * (file.progress / 100),
      0
    )
    const totalProgress = uploadedSizeSum / totalSizeSum || 0
    // returns total progress between 0 and 1
    return totalProgress
  }

  private addChosenFiles(chosenFiles: UploadItem[]) {
    this.allChosenFiles = [...this.allChosenFiles, ...chosenFiles]
  }

  private removeDuplicateChosenFiles(chosenFiles: FileList) {
    this.lastChosenFiles = []
    this.cannotBeChosen = []
    this.exceedmaxFileSize = []
    for (let i = 0; i < chosenFiles.length; i++) {
      if (
        !this.lastChosenFiles.some(
          (chosenFile) => chosenFile.fileName === chosenFiles[i].name
        ) &&
        !this.uploadItems.some(
          (uploadFile) => uploadFile.fileName === chosenFiles[i].name
        ) &&
        ((chosenFiles[i].size < this.maxFileSize &&
          this.maxFileSize != undefined) ||
          this.maxFileSize === undefined)
      ) {
        this.lastChosenFiles.push({
          state: 'pending',
          fileName: chosenFiles[i].name,
          fileSize: chosenFiles[i].size,
          fileType: chosenFiles[i].type,
          progress: 0,
          file: chosenFiles[i],
        })
      } else {
        if (
          this.lastChosenFiles.some(
            (chosenFile) => chosenFile.fileName === chosenFiles[i].name
          ) ||
          this.uploadItems.some(
            (uploadFile) => uploadFile.fileName === chosenFiles[i].name
          )
        ) {
          this.cannotBeChosen.push(chosenFiles[i].name)
        }
        if (
          chosenFiles[i].size > this.maxFileSize &&
          this.maxFileSize != undefined
        ) {
          this.exceedmaxFileSize.push(chosenFiles[i].name)
        }
      }
    }
  }

  private handleInputChange = async (ev) => {
    const files = (ev.target as HTMLInputElement).files
    if (!files || !files.length) return

    this.removeDuplicateChosenFiles(files)
    this.ldchoosefiles.emit(this.lastChosenFiles)
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUploadImmediately || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    ev.stopImmediatePropagation() // We stop the internal event...
    this.removeDuplicateChosenFiles(ev.detail)
    this.ldchoosefiles.emit(this.lastChosenFiles) // ...and dispatch the public one.
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUploadImmediately || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  private handleStartUploadClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUploadImmediately && !this.startUploadClicked) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
    this.startUploadClicked = true
    this.cannotBeChosen = []
    this.exceedmaxFileSize = []
  }

  // private handleDeleteAllClick = () => {
  //   this.ldfileuploaddeleteall.emit(this.uploadItems)
  //   /* this.uploadItems = [] */
  //   this.allChosenFiles = []
  // }

  private handlePauseAllClick = () => {
    const uploadingItems = this.uploadItems.filter(
      (item) => item.state === 'uploading'
    )
    this.ldfileuploadpausealluploads.emit(uploadingItems)
    this.pauseAllClicked = true
  }

  private handleContinuePausedClick = () => {
    const pausedItems = this.uploadItems.filter(
      (item) => item.state === 'paused'
    )
    this.ldfileuploadcontinueuploads.emit(pausedItems)
    this.pauseAllClicked = false
  }

  render() {
    const cl = getClassNames([
      'ld-file-upload',
      this.renderOnlyChooseFile && 'ld-file-upload--only-choose-file',
      this.renderCircularProgress && 'ld-file-upload--only-circular-progress',
    ])

    if (this.circularProgress) {
      return (
        <Host class={cl}>
          {!this.renderCircularProgress && !this.allUploadsFinished ? (
            <Fragment>
              <ld-choose-file
                class="ld-file-upload__choose-file"
                layout={this.renderOnlyChooseFile ? 'vertical' : 'horizontal'}
                // layout={
                //   this.compact
                //     ? 'compact'
                //     : this.renderOnlyChooseFile
                //     ? 'vertical'
                //     : 'horizontal'
                // }
                onLdchoosefiles={this.handleChooseFiles}
                start-upload-immediately={this.startUploadImmediately}
                multiple={this.multiple}
                startUploadClicked={this.startUploadClicked}
                showProgress={this.showProgress}
                compact={this.compact}
                uploadItems={this.uploadItems}
                maxFileSize={this.maxFileSize}
                labelDragInstructions={this.labelDragInstructions}
                // labelSingularDropInstructions={
                //   this.labelSingularDropInstructions
                // }
                labelUploadConstraints={this.labelUploadConstraints}
                labelSelectFile={this.labelSelectFile}
                labelUploadFile={this.labelUploadFile}
                labelUploadState={this.labelUploadState}
                labelUploadCount={this.labelUploadCount}
                labelUploadPercentage={this.labelUploadPercentage}
              ></ld-choose-file>
              {this.exceedmaxFileSize.length != 0 ? (
                <ld-notice
                  headline={this.labelErrorHeader}
                  mode="error"
                  class="ld-file-upload__error"
                >
                  {this.labelmaxFileSizeExceededError.replace(
                    '$filesExceedingmaxFileSize',
                    this.exceedmaxFileSize.join(', ')
                  )}
                </ld-notice>
              ) : undefined}
            </Fragment>
          ) : this.renderCircularProgress && !this.allUploadsFinished ? (
            <Fragment>
              <ld-sr-only id="progress-label">Progress</ld-sr-only>
              <ld-circular-progress
                class={getClassNames([
                  'ld-file-upload__circular-progress',
                  this.uploadItems.filter(
                    (item) => item.state === 'upload failed'
                  ).length != 0 && 'ld-file-upload--circular-progress-error',
                ])}
                aria-labelledby="progress-label"
                aria-valuenow={this.calculateTotalProgress() * 100}
              >
                <ld-typo variant="b6">
                  {(this.calculateTotalProgress() * 100).toFixed(2)}%
                </ld-typo>
              </ld-circular-progress>
              <ld-typo variant="h5">
                {this.labelCPUploadCount.replace(
                  '$filesUploading',
                  String(this.uploadItems.length)
                )}
              </ld-typo>
              <ld-typo class="ld-file-upload__circular-progress-total-upload-size">
                {this.bytesToSize(
                  this.uploadItems.reduce(
                    (partialSum, file) => partialSum + file.fileSize,
                    0
                  )
                )}
              </ld-typo>
              <ld-typo>
                {this.labelCPUploadedSize.replace(
                  '$uploadedSize',
                  String(
                    this.bytesToSize(
                      this.uploadItems.reduce(
                        (partialSum, file) =>
                          partialSum + file.fileSize * (file.progress / 100),
                        0
                      )
                    )
                  )
                )}
              </ld-typo>
              {/* Cancel button has the same functionality as the delete all button; currently not being shown */}
              {/* <ld-button
                class="ld-file-upload__cancel-button"
                onClick={this.handleDeleteAllClick}
                mode="secondary"
              >
                {this.labelCPCancel}
              </ld-button> */}
            </Fragment>
          ) : (
            <ld-input-message mode="valid">Files uploaded</ld-input-message>
          )}

          <input
            ref={(el) => (this.fileInput = el)}
            onChange={this.handleInputChange}
            type="file"
            multiple={this.multiple}
            tabIndex={-1}
            class="ld-file-upload__input"
          />
        </Host>
      )
    }

    const progress =
      this.showProgress &&
      this.startUploadClicked &&
      this.uploadItems.filter(
        (item) =>
          item.state === 'pending' ||
          item.state === 'paused' ||
          item.state === 'uploading'
      ).length != 0
        ? this.calculateTotalProgress()
        : !this.showProgress &&
          this.startUploadClicked &&
          this.uploadItems.filter(
            (item) =>
              item.state === 'pending' ||
              item.state === 'paused' ||
              item.state === 'uploading'
          ).length != 0
        ? 'pending'
        : undefined
    return (
      <Host class={cl}>
        {(this.renderOnlyChooseFile || !this.compact) && (
          <ld-choose-file
            class="ld-file-upload__choose-file"
            layout={
              this.renderOnlyChooseFile && !this.compact
                ? 'vertical'
                : 'horizontal'
            }
            // layout={
            //   this.compact
            //     ? 'compact'
            //     : this.renderOnlyChooseFile
            //     ? 'vertical'
            //     : 'horizontal'
            // }
            onLdchoosefiles={this.handleChooseFiles}
            startUploadImmediately={this.startUploadImmediately}
            multiple={this.multiple}
            startUploadClicked={this.startUploadClicked}
            showProgress={this.showProgress}
            compact={this.compact}
            uploadItems={this.uploadItems}
            maxFileSize={this.maxFileSize}
            labelDragInstructions={this.labelDragInstructions}
            // labelSingularDropInstructions={this.labelSingularDropInstructions}
            labelUploadConstraints={this.labelUploadConstraints}
            labelSelectFile={this.labelSelectFile}
            labelUploadFile={this.labelUploadFile}
            labelUploadState={this.labelUploadState}
            labelUploadCount={this.labelUploadCount}
            labelUploadPercentage={this.labelUploadPercentage}
          ></ld-choose-file>
        )}

        {!this.renderOnlyChooseFile && (
          <Fragment>
            {this.cannotBeChosen.length != 0 ? (
              <ld-notice
                headline={this.labelErrorHeader}
                mode="error"
                class="ld-file-upload__error"
              >
                {this.labelFileAlreadyChosenError.replace(
                  '$duplicateFiles',
                  this.cannotBeChosen.join(', ')
                )}
              </ld-notice>
            ) : undefined}
            {this.exceedmaxFileSize.length != 0 ? (
              <ld-notice
                headline={this.labelErrorHeader}
                mode="error"
                class="ld-file-upload__error"
              >
                {this.labelmaxFileSizeExceededError.replace(
                  '$filesExceedingmaxFileSize',
                  this.exceedmaxFileSize.join(', ')
                )}
              </ld-notice>
            ) : undefined}
            {this.uploadItems.length != 0 && (
              <Fragment>
                <ld-upload-progress
                  class="ld-file-upload__progress"
                  uploadItems={this.uploadItems}
                  startUploadImmediately={false}
                  allowPause={this.allowPause}
                  showProgress={this.showProgress}
                  labelRemove={this.labelRemove}
                  labelDownload={this.labelDownload}
                  labelRetry={this.labelRetry}
                  labelDelete={this.labelDelete}
                  labelUploadSuccessMsg={this.labelUploadSuccessMsg}
                  labelUploadCancelledMsg={this.labelUploadCancelledMsg}
                  labelUploadErrorMsg={this.labelUploadErrorMsg}
                ></ld-upload-progress>

                <div class="ld-file-upload__buttons">
                  {!this.startUploadImmediately && (
                    <ld-button
                      class="ld-file-upload__start-upload-button"
                      size="sm"
                      onClick={this.handleStartUploadClick}
                      progress={progress}
                    >
                      {!this.startUploadClicked
                        ? this.labelStartUpload
                        : this.uploadItems.filter(
                            (item) =>
                              item.state === 'pending' ||
                              item.state === 'paused' ||
                              item.state === 'uploading'
                          ).length != 0
                        ? this.labelUploading
                        : this.labelUploadCompleted}
                    </ld-button>
                  )}
                  {/* Delete all button is currently not being shown */}
                  {/* <ld-button
                  class="ld-file-upload__delete-button"
                  size="sm"
                  onClick={this.handleDeleteAllClick}
                  mode="secondary"
                >
                  {this.labelDeleteAllFiles}
                </ld-button> */}

                  {this.pauseAllClicked && this.allowPause ? (
                    <ld-button
                      class="ld-file-upload__continue-paused-button"
                      size="sm"
                      onClick={this.handleContinuePausedClick}
                      mode="secondary"
                      disabled={
                        this.uploadItems.filter(
                          (item) => item.state === 'paused'
                        ).length === 0
                      }
                    >
                      {this.labelContinuePausedUploads}
                    </ld-button>
                  ) : !this.pauseAllClicked && this.allowPause ? (
                    <ld-button
                      class="ld-file-upload__pause-all-button"
                      size="sm"
                      onClick={this.handlePauseAllClick}
                      mode="secondary"
                      disabled={
                        this.uploadItems.filter(
                          (item) => item.state === 'uploading'
                        ).length === 0
                      }
                    >
                      {this.labelPauseAllUploads}
                    </ld-button>
                  ) : undefined}
                </div>
              </Fragment>
            )}
          </Fragment>
        )}

        <input
          ref={(el) => (this.fileInput = el)}
          onChange={this.handleInputChange}
          type="file"
          multiple={this.multiple}
          tabIndex={-1}
          class="ld-file-upload__input"
        />
      </Host>
    )
  }
}
