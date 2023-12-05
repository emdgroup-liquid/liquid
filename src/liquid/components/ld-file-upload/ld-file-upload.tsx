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
  // @Prop() labelSingularDropInstructions = `Or drop file${this.multiple?'(s)':''}`

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
  labelFileAlreadyChosenError =
    `$duplicateFiles cannot be chosen since file(s) with the same name(s) has/have been chosen already. To upload this/these file(s) please remove the file(s) with the same name(s).`

  /** Label to be used for the error message that is shown if chosen file exceeds the maximum file size. */
  @Prop()
  labelmaxFileSizeExceededError =
    `$filesExceedingmaxFileSize cannot be chosen since the file(s) exceed(s) the maximum file size.`

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

  /** Emitted after choosing files.
   * UploadItems emitted can be added to the list of chosen files by using the addUploadItems() method.
   */
  @Event() ldchoosefiles: EventEmitter<UploadItem[]>

  /** Emitted on start upload click or after choosing files, if upload starts immediately after choosing files.
   * UploadItems emitted can be added to the list of chosen files by using the addUploadItems() method
   * or updated, if they have been added already, using the updateUploadItem() method.
   */
  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  /** Emitted on delete all files click.
   * UploadItems emitted can be deleted using the deleteAllUploadItems() method.
   */
  @Event() ldfileuploaddeleteall: EventEmitter<UploadItem[]>

  /** Emitted on pause all uploads click.
   * UploadItems emitted can be updated using the updateUploadItem() method.
   */
  @Event() ldfileuploadpausealluploads: EventEmitter<UploadItem[]>

  /** Emitted on continue all uploads click.
   * UploadItems emitted can be updated using the updateUploadItem() method.
   */
  @Event() ldfileuploadcontinueuploads: EventEmitter<UploadItem[]>

  /**
   * Emitted on pause button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditempause: EventEmitter<UploadItem>

  /**
   * Emitted on continue button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditemcontinue: EventEmitter<UploadItem>

  /**
   * Emitted on stop button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditemremove: EventEmitter<UploadItem>

  /**
   * Emitted on download button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditemdownload: EventEmitter<UploadItem>

  /**
   * Emitted on retry button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditemretry: EventEmitter<UploadItem>

  /**
   * Emitted on delete button click.
   * UploadItem emitted can be updated using the updateUploadItem() method.
   */
  @Event() lduploaditemdelete: EventEmitter<UploadItem>

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
   * and updates the upload item state of items that have been added already.
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
   * Deletes all UploadItems.
   */
  @Method()
  async deleteAllUploadItems() {
    this.uploadItems = []
  }

  /**
   * Accepts a file from component consumer (name, progress, state etc.)
   * and deletes the upload item.
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

  private handleInputChange = async (ev: InputEvent) => {
    const files = (ev.target as HTMLInputElement).files
    if (!files || !files.length) return

    this.removeDuplicateChosenFiles(files)
    this.ldchoosefiles.emit(this.lastChosenFiles)
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUploadImmediately) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    ev.stopImmediatePropagation() // We stop the internal event...
    this.removeDuplicateChosenFiles(ev.detail)
    this.ldchoosefiles.emit(this.lastChosenFiles) // ...and dispatch the public one.
    this.addChosenFiles(this.lastChosenFiles)
    if (this.startUploadImmediately) {
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

  // Might be added again later?
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
    ])

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
            onLdchoosefiles={this.handleChooseFiles}
            startUploadImmediately={this.startUploadImmediately}
            multiple={this.multiple}
            startUploadClicked={this.startUploadClicked}
            showProgress={this.showProgress}
            compact={this.compact}
            uploadItems={this.uploadItems}
            maxFileSize={this.maxFileSize}
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
