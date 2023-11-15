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
 *     -> emit upload ready event (if startUpload prop is set to true)
 *   - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
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

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** allowPause defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean = false

  /** showTotalProgress defines whether the progress of uploading files will be shown, or only an uploading indicator. */
  @Prop() showProgress?: boolean = false

  /** selectMultiple defines whether selection of multiple input files is allowed. */
  @Prop() selectMultiple?: boolean = false

  /** circularProgress defines whether only the circular progress indicator will be shown during upload. */
  @Prop() circularProgress?: boolean = false

  /** TODO: circularProgress defines whether only one file can be chosen and uploaded. */
  @Prop() singularUpload?: boolean = false

  /** Is used to display and validate maximum file size in Bytes */
  @Prop() maxSize?: number
  // @Prop() maxSize?: number = 1572864

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
    this.selectMultiple ? '(s)' : ''
  } here or browse`

  /** Label to be used to describe upload constraints like the maximum file size. */
  @Prop() labelUploadConstraints = `${
    this.maxSize !== undefined ? 'max. $maxSize file size' : ''
  }`

  /** Label to be used for the select files button. */
  @Prop() labelSelectFile = `Select ${this.selectMultiple ? '' : 'a'} file${
    this.selectMultiple ? '(s)' : ''
  }`

  /** Label to be used for the upload files button. */
  @Prop() labelUploadFile = `Upload ${this.selectMultiple ? '' : 'a'} file${
    this.selectMultiple ? '(s)' : ''
  }`

  /** Label to be used for the upload state header. */
  @Prop() labelUploadState = `Upload state:`

  /** Label to be used to count the amount of files that have been uploaded. */
  @Prop() labelUploadCount = `$filesUploaded of $filesTotal file${
    this.selectMultiple ? 's' : ''
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
  labelMaxSizeExceededError = `$filesExceedingMaxSize cannot be chosen since the file(s) exceed(s) the maximum file size.`

  // Labels for circular progress:

  /** Label to be used to count th uploaded files in circular progress mode. */
  @Prop() labelCPUploadCount = `Uploading $filesUploading file${
    this.selectMultiple ? 's' : ''
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

  /** List of files */
  @State() fileList: FileList

  /** Contains files that have been chosen but the upload has not started yet. */
  @State() lastChosenFiles: UploadItem[] = []

  /** Contains all files that have been chosen but the upload has not started yet. */
  @State() allChosenFiles: UploadItem[] = []

  /** Names of files that cannot be chosen by the user since a file of the same name has been chosen already. */
  @State() cannotBeChosen: string[] = []

  /** Names of files that cannot be chosen by the user since the files exceed the maximum file size. */
  @State() exceedMaxSize: string[] = []

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

  /** @internal */
  /** Emitted after choosing files. */
  @Event() ldchoosefiles: EventEmitter<UploadItem[]>

  /** @internal */
  /** Emitted on start upload click or after choosing files, if upload starts immediately after choosing files. */
  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  /** @internal */
  /** Emitted on delete all files click. */
  @Event() ldfileuploaddeleteall: EventEmitter<UploadItem[]>

  /** @internal */
  /** Emitted on pause all uploads click. */
  @Event() ldfileuploadpausealluploads: EventEmitter<UploadItem[]>

  /** @internal */
  /** Emitted on continue all uploads click. */
  @Event() ldfileuploadcontinueuploads: EventEmitter<UploadItem[]>

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

  /* @Listen('ldfileuploadready')
  updateFileTypes() {
    const fileListArray = Array.from(this.fileList)
    fileListArray.forEach((file) =>
      this.uploadItemTypes.push({
        fileName: file.name,
        fileType: file.type,
      })
    )
  } */

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
      this.exceedMaxSize.length == 0
    ) {
      this.renderCircularProgress = true
    }
    // clears file input value
    this.fileInput.value = null
  }

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and updates the upload items state.
   */
  @Method()
  async updateUploadItems(uploadItems: UploadItem[]) {
    if (this.uploadItems.length == 0) {
      this.uploadItems = uploadItems
    } else {
      this.uploadItems = [...this.uploadItems.slice(), ...uploadItems.slice()]
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
  async deleteUploadItems() {
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

  @Watch('uploadItems')
  async changeProgressVisualisation() {
    if (this.uploadItems.length == 0) {
      this.startUploadClicked = false
    }
    if (
      this.uploadItems.length == 0 &&
      this.renderOnlyChooseFile == false &&
      this.cannotBeChosen.length == 0 &&
      this.exceedMaxSize.length == 0
    ) {
      this.renderOnlyChooseFile = true
      this.startUploadClicked = false
      this.renderCircularProgress = false
    }
    if (
      this.uploadItems.filter((item) => item.state == 'uploaded').length ==
        this.uploadItems.length &&
      this.uploadItems.length != 0
    ) {
      this.allUploadsFinished = true
    }

    if (
      this.uploadItems.filter((item) => item.state == 'uploaded').length ==
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

    return roundedSize + ' ' + sizes[sizeIndex]
  }

  private calculateTotalProgress = () => {
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
      (partialSum, file) => partialSum + file.fileSize * (file.progress / 100),
      0
    )
    const totalProgress = uploadedSizeSum / totalSizeSum || 0
    // returns total progress between 0 and 1
    return totalProgress
  }

  private addChosenFiles(chosenFiles: UploadItem[]) {
    for (let i = 0; i < chosenFiles.length; i++) {
      this.allChosenFiles.push(chosenFiles[i])
    }
  }

  private removeDuplicateChosenFiles(chosenFiles: FileList) {
    this.lastChosenFiles = []
    this.cannotBeChosen = []
    this.exceedMaxSize = []
    for (let i = 0; i < chosenFiles.length; i++) {
      if (
        !this.lastChosenFiles.some(
          (chosenFile) => chosenFile.fileName == chosenFiles[i].name
        ) &&
        !this.uploadItems.some(
          (uploadFile) => uploadFile.fileName == chosenFiles[i].name
        ) &&
        ((chosenFiles[i].size < this.maxSize && this.maxSize != undefined) ||
          this.maxSize == undefined)
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
            (chosenFile) => chosenFile.fileName == chosenFiles[i].name
          ) ||
          this.uploadItems.some(
            (uploadFile) => uploadFile.fileName == chosenFiles[i].name
          )
        ) {
          this.cannotBeChosen.push(chosenFiles[i].name)
        }
        if (chosenFiles[i].size > this.maxSize && this.maxSize != undefined) {
          this.exceedMaxSize.push(chosenFiles[i].name)
        }
      }
    }
  }

  private handleInputChange = async (ev) => {
    const files = (ev.target as HTMLInputElement).files
    if (!files || !files.length) return

    this.fileList = files
    this.removeDuplicateChosenFiles(files)
    this.ldchoosefiles.emit(this.lastChosenFiles)
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUpload || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    this.fileList = ev.detail

    ev.stopImmediatePropagation() // We stop the internal event...
    this.removeDuplicateChosenFiles(ev.detail)
    this.ldchoosefiles.emit(this.lastChosenFiles) // ...and dispatch the public one.
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUpload || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  private handleStartUploadClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUpload && !this.startUploadClicked) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
    this.startUploadClicked = true
    this.cannotBeChosen = []
    this.exceedMaxSize = []
  }

  // private handleDeleteAllClick = () => {
  //   this.ldfileuploaddeleteall.emit(this.uploadItems)
  //   /* this.uploadItems = [] */
  //   this.allChosenFiles = []
  // }

  private handlePauseAllClick = () => {
    const uploadingItems = this.uploadItems.filter(
      (item) => item.state == 'uploading'
    )
    this.ldfileuploadpausealluploads.emit(uploadingItems)
    this.pauseAllClicked = true
  }

  private handleContinuePausedClick = () => {
    const pausedItems = this.uploadItems.filter(
      (item) => item.state == 'paused'
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
                size={this.renderOnlyChooseFile ? 'bg' : 'sm'}
                onLdchoosefiles={this.handleChooseFiles}
                start-upload={this.startUpload}
                selectMultiple={this.selectMultiple}
                startUploadClicked={this.startUploadClicked}
                showProgress={this.showProgress}
                uploadItems={this.uploadItems}
                maxSize={this.maxSize}
                labelDragInstructions={this.labelDragInstructions}
                labelUploadConstraints={this.labelUploadConstraints}
                labelSelectFile={this.labelSelectFile}
                labelUploadFile={this.labelUploadFile}
                labelUploadState={this.labelUploadState}
                labelUploadCount={this.labelUploadCount}
                labelUploadPercentage={this.labelUploadPercentage}
              ></ld-choose-file>
              {this.exceedMaxSize.length != 0 ? (
                <ld-notice
                  headline={this.labelErrorHeader}
                  mode="error"
                  class="ld-file-upload__error"
                >
                  {this.labelMaxSizeExceededError.replace(
                    '$filesExceedingMaxSize',
                    this.exceedMaxSize.join(', ')
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
                    (item) => item.state == 'upload failed'
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
              {/* Cancel button has the same functionality as the delete all button */}
              {/* <ld-button
                class="ld-file-upload__cancel-button"
                onClick={this.handleDeleteAllClick}
                mode="secondary"
              >
                Cancel
              </ld-button> */}
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
            multiple={this.selectMultiple}
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
          item.state == 'pending' ||
          item.state == 'paused' ||
          item.state == 'uploading'
      ).length != 0
        ? this.calculateTotalProgress()
        : !this.showProgress &&
          this.startUploadClicked &&
          this.uploadItems.filter(
            (item) =>
              item.state == 'pending' ||
              item.state == 'paused' ||
              item.state == 'uploading'
          ).length != 0
        ? 'pending'
        : undefined
    return (
      <Host class={cl}>
        {(this.renderOnlyChooseFile || !this.singularUpload) && (
          <ld-choose-file
            class="ld-file-upload__choose-file"
            size={
              this.renderOnlyChooseFile && !this.singularUpload ? 'bg' : 'sm'
            }
            onLdchoosefiles={this.handleChooseFiles}
            start-upload={this.startUpload}
            selectMultiple={this.selectMultiple}
            startUploadClicked={this.startUploadClicked}
            showProgress={this.showProgress}
            uploadItems={this.uploadItems}
            maxSize={this.maxSize}
            labelDragInstructions={this.labelDragInstructions}
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
            {this.exceedMaxSize.length != 0 ? (
              <ld-notice
                headline={this.labelErrorHeader}
                mode="error"
                class="ld-file-upload__error"
              >
                {this.labelMaxSizeExceededError.replace(
                  '$filesExceedingMaxSize',
                  this.exceedMaxSize.join(', ')
                )}
              </ld-notice>
            ) : undefined}
            {this.uploadItems.length != 0 && (
              <Fragment>
                <ld-upload-progress
                  class="ld-file-upload__progress"
                  uploadItems={this.uploadItems}
                  startUpload={false}
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
                  {!this.startUpload && (
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
                              item.state == 'pending' ||
                              item.state == 'paused' ||
                              item.state == 'uploading'
                          ).length != 0
                        ? this.labelUploading
                        : this.labelUploadCompleted}
                    </ld-button>
                  )}
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
                          (item) => item.state == 'paused'
                        ).length == 0
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
                          (item) => item.state == 'uploading'
                        ).length == 0
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
          multiple={this.selectMultiple}
          tabIndex={-1}
          class="ld-file-upload__input"
        />
      </Host>
    )
  }
}
