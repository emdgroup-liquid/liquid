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
}

/**
 * TODO:
 *   - listen for files chosen event (from ld-choose-file.tsx) with file list
 *     -> emit upload ready event (if startUpload prop is set to true)
 *   - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
 *   - The upload ready event contains the file list as its payload
 *   - Keep a state of files chosen and pass them as a prop (uploadItems) to ld-upload-progress.tsx
 *   - Implement callback methods, which accept a file list (name, progress, state etc.) and update the upload items
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

  /** TODO: is used to display and validate maximum file size in Bytes */
  @Prop() maxSize?: number

  /** Name of form field to use for sending the element's directionality in form submission. */
  @Prop() dirname?: string

  /** Associates the control with a form element. */
  @Prop() form?: string

  // TODO: Do we need the name prop at all (for "native" form submission)?
  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The input value. */
  @Prop({ mutable: true }) value?: string

  /** List of files */
  @State() uploadItems: UploadItem[] = []

  // TODO: Remove, this is no longer needed
  /** List of file names + types */
  @State() uploadItemTypes: {
    fileName: string
    fileType: string
  }[] = []
  @State() fileList: FileList

  /** Contains files that have been chosen but the upload has not started yet. */
  @State() chosenFiles: UploadItem[] = []

  /** Contains all files that have been chosen but the upload has not started yet. */
  @State() allChosenFiles: UploadItem[] = []

  /** Names of files that cannot be chosen by the user since a file of the same name has been chosen already. */
  @State() cannotBeChosen: string[] = []

  /** Names of files that cannot be chosen by the user since the files exceed the maximum file size. */
  @State() exceedMaxSize: string[] = []

  @State() renderOnlyChooseFile = true

  @State() continueClicked = false

  @State() pauseAllClicked = false

  /** Defines whether files have been chosen in circular progress mode and the circular progress should be rendered. */
  @State() renderCircularProgress = false

  /** Defines whether all uploads in circular progress mode are finished. */
  @State() allUploadsFinished = false

  @Event() ldchoosefiles: EventEmitter<UploadItem[]>

  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  @Event() ldfileuploaddeleteall: EventEmitter

  @Event() ldfileuploadpausealluploads: EventEmitter

  @Event() ldfileuploadcontinueuploads: EventEmitter

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
    /* console.info('alalalala', this.el) */
    if (this.fileInput) {
      this.fileInput.click()
    }
  }

  @Listen('ldfileuploadready')
  updateFileTypes() {
    const fileListArray = Array.from(this.fileList)
    fileListArray.forEach((file) =>
      this.uploadItemTypes.push({
        fileName: file.name,
        fileType: file.type,
      })
    )
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
    if (this.circularProgress && !this.renderCircularProgress) {
      this.renderCircularProgress = true
    }
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
    /* for (let i = 0; i < uploadItems.length; i++) {
      const itemToDeleteIndex = this.uploadItems.findIndex(
        (item) => item.fileName === uploadItems[i].fileName
      )
      if (!itemToDeleteIndex && itemToDeleteIndex != 0) {
        throw new Error(
          `Upload item with name ${uploadItems[i].fileName} not found in upload list.`
        )
      }

      this.uploadItems = [
        ...this.uploadItems.slice(0, itemToDeleteIndex),
        ...this.uploadItems.slice(itemToDeleteIndex + 1),
      ]
    } */
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
  changeProgressVisualisation() {
    if (this.uploadItems.length == 0 && this.renderOnlyChooseFile == false) {
      this.renderOnlyChooseFile = true
      this.continueClicked = false
      this.renderCircularProgress = false
    }
    if (
      this.uploadItems.filter((item) => item.state == 'uploaded').length ==
        this.uploadItems.length &&
      this.uploadItems.length != 0
    ) {
      this.allUploadsFinished = true
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
    console.log(activeUploads)
    const totalSizeSum = activeUploads.reduce(
      (partialSum, file) => partialSum + file.fileSize,
      0
    )
    const uploadedSizeSum = activeUploads.reduce(
      (partialSum, file) => partialSum + file.fileSize * (file.progress / 100),
      0
    )
    const totalProgress = uploadedSizeSum / totalSizeSum || 0
    console.log('totalProgress', totalProgress)
    // returns total progress between 0 and 1
    return totalProgress
  }

  private addChosenFiles(chosenFiles: UploadItem[]) {
    for (let i = 0; i < chosenFiles.length; i++) {
      this.allChosenFiles.push(chosenFiles[i])
    }
  }

  private removeDuplicateChosenFiles(chosenFiles: FileList) {
    this.chosenFiles = []
    this.cannotBeChosen = []
    this.exceedMaxSize = []
    for (let i = 0; i < chosenFiles.length; i++) {
      if (
        !this.chosenFiles.some(
          (chosenFile) => chosenFile.fileName == chosenFiles[i].name
        ) &&
        !this.uploadItems.some(
          (uploadFile) => uploadFile.fileName == chosenFiles[i].name
        ) &&
        ((chosenFiles[i].size < this.maxSize && this.maxSize != undefined) ||
          this.maxSize == undefined)
      ) {
        this.chosenFiles.push({
          state: 'pending',
          fileName: chosenFiles[i].name,
          fileSize: chosenFiles[i].size,
          fileType: chosenFiles[i].type,
          progress: 0,
        })
      } else {
        if (
          this.chosenFiles.some(
            (chosenFile) => chosenFile.fileName == chosenFiles[i].name
          ) ||
          this.uploadItems.some(
            (uploadFile) => uploadFile.fileName == chosenFiles[i].name
          )
        ) {
          console.log(
            `${chosenFiles[i].name} cannot be chosen since a file with the same name has been chosen already.`
          )
          this.cannotBeChosen.push(chosenFiles[i].name)
          console.log('cannotbechosen', this.cannotBeChosen)
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
    this.ldchoosefiles.emit(this.chosenFiles)
    this.addChosenFiles(this.chosenFiles)
    if (this.startUpload || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    this.fileList = ev.detail

    ev.stopImmediatePropagation() // We stop the internal event...
    this.removeDuplicateChosenFiles(ev.detail)
    this.ldchoosefiles.emit(this.chosenFiles) // ...and dispatch the public one.
    this.addChosenFiles(this.chosenFiles)
    if (this.startUpload || this.circularProgress) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /* TODO: Continue nur einmal erlauben */
  private handleContinueClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUpload && !this.continueClicked) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
    this.continueClicked = true
  }

  /* TODO: State management dem user überlassen, hier nur Event emitten */
  private handleDeleteAllClick = () => {
    this.ldfileuploaddeleteall.emit(this.uploadItems)
    /* this.uploadItems = [] */
    this.allChosenFiles = []
  }

  private handlePauseAllClick = () => {
    const uploadingItems = this.uploadItems.filter(
      (item) => item.state == 'uploading'
    )
    this.ldfileuploadpausealluploads.emit(uploadingItems)
    console.log('ldfileuploadpausealluploads', uploadingItems)
    this.pauseAllClicked = true
  }

  private handleContinuePausedClick = () => {
    const pausedItems = this.uploadItems.filter(
      (item) => item.state == 'paused'
    )
    this.ldfileuploadcontinueuploads.emit(pausedItems)
    this.pauseAllClicked = false
  }

  componentWillLoad() {
    if (this.form) {
      this.fileInput.setAttribute('form', this.form)
    }

    if (this.value) {
      this.fileInput.value = this.value
    }
  }

  render() {
    const cl = getClassNames([
      'ld-file-upload',
      this.renderOnlyChooseFile && 'ld-file-upload--only-choose-file',
      this.renderCircularProgress && 'ld-file-upload--only-circular-progress',
    ])

    /* this.allUploadsFinished = true */

    /* TODO: Error case if upload fails */
    if (this.circularProgress) {
      return (
        <Host class={cl}>
          {!this.renderCircularProgress && !this.allUploadsFinished ? (
            <ld-choose-file
              class="ld-file-upload__choose-file"
              size={this.renderOnlyChooseFile ? 'bg' : 'sm'}
              onLdchoosefiles={this.handleChooseFiles}
              start-upload={this.startUpload}
              selectMultiple={this.selectMultiple}
              continueClicked={this.continueClicked}
              uploadItems={this.uploadItems}
            ></ld-choose-file>
          ) : this.renderCircularProgress && !this.allUploadsFinished ? (
            <Fragment>
              <ld-sr-only id="progress-label">Progress</ld-sr-only>
              <ld-circular-progress
                /* class="ld-file-upload__circular-progress" */
                class={getClassNames([
                  'ld-file-upload__circular-progress',
                  this.uploadItems.filter(
                    (item) => item.state == 'upload failed'
                  ).length != 0 && 'ld-file-upload--circular-progress-error',
                ])}
                aria-labelledby="progress-label"
                aria-valuenow={this.calculateTotalProgress() * 100}
                /* aria-valuenow="25" */
              >
                <ld-typo variant="b6">
                  {(this.calculateTotalProgress() * 100).toFixed(2)}%
                </ld-typo>
                {/* <ld-typo variant="label-s">complete</ld-typo> */}
              </ld-circular-progress>
              <ld-typo variant="h5">
                Uploading {this.uploadItems.length} files
              </ld-typo>
              <ld-typo>
                {this.bytesToSize(
                  this.uploadItems.reduce(
                    (partialSum, file) => partialSum + file.fileSize,
                    0
                  )
                )}
              </ld-typo>
              <ld-typo>
                {this.bytesToSize(
                  this.uploadItems.reduce(
                    (partialSum, file) =>
                      partialSum + file.fileSize * (file.progress / 100),
                    0
                  )
                )}{' '}
                uploaded...
              </ld-typo>
              {/* Cancel button has the same functionality as the delete all button */}
              <ld-button
                class="ld-file-upload__cancel-button"
                onClick={this.handleDeleteAllClick}
                mode="secondary"
              >
                Cancel
              </ld-button>
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

    return (
      <Host class={cl}>
        <ld-choose-file
          class="ld-file-upload__choose-file"
          size={this.renderOnlyChooseFile ? 'bg' : 'sm'}
          onLdchoosefiles={this.handleChooseFiles}
          start-upload={this.startUpload}
          selectMultiple={this.selectMultiple}
          continueClicked={this.continueClicked}
          uploadItems={this.uploadItems}
        >
          {/* <slot>
            <pre>Upload button</pre>
          </slot> */}
        </ld-choose-file>

        {!this.renderOnlyChooseFile && (
          <Fragment>
            {this.cannotBeChosen.length != 0 ? (
              <ld-typo class="ld-file-upload__error">
                Error: {this.cannotBeChosen.join(', ')} cannot be chosen since a
                file with the same name has been chosen already. To upload this
                file please remove the file with the same name.
              </ld-typo>
            ) : undefined}
            {this.exceedMaxSize.length != 0 ? (
              <ld-typo class="ld-file-upload__error">
                Error: {this.exceedMaxSize.join(', ')} cannot be chosen since
                the file(s) exceed the maximum file size.
              </ld-typo>
            ) : undefined}
            <ld-upload-progress
              class="ld-file-upload__progress"
              uploadItems={this.uploadItems}
              startUpload={false}
              allowPause={this.allowPause}
              showProgress={this.showProgress}
            />
            {!this.startUpload && (
              <ld-button
                class="ld-file-upload__continue-button"
                onClick={this.handleContinueClick}
                /* disabled={this.continueClicked} */
                progress={
                  this.showProgress &&
                  this.continueClicked &&
                  this.uploadItems.filter(
                    (item) =>
                      item.state == 'pending' ||
                      item.state == 'paused' ||
                      item.state == 'uploading'
                  ).length != 0
                    ? this.calculateTotalProgress()
                    : !this.showProgress &&
                      this.continueClicked &&
                      this.uploadItems.filter(
                        (item) =>
                          item.state == 'pending' ||
                          item.state == 'paused' ||
                          item.state == 'uploading'
                      ).length != 0
                    ? 'pending'
                    : undefined
                }
              >
                {!this.continueClicked
                  ? 'Start upload'
                  : this.uploadItems.filter(
                      (item) =>
                        item.state == 'pending' ||
                        item.state == 'paused' ||
                        item.state == 'uploading'
                    ).length != 0
                  ? 'Uploading'
                  : 'Upload completed'}
              </ld-button>
            )}
            <ld-button
              class="ld-file-upload__delete-button"
              onClick={this.handleDeleteAllClick}
              mode="secondary"
            >
              Delete all files
            </ld-button>

            {this.pauseAllClicked && this.allowPause ? (
              <ld-button
                class="ld-file-upload__continue-paused-button"
                onClick={this.handleContinuePausedClick}
                mode="secondary"
                disabled={
                  this.uploadItems.filter((item) => item.state == 'paused')
                    .length == 0
                }
              >
                Continue paused uploads
              </ld-button>
            ) : !this.pauseAllClicked && this.allowPause ? (
              <ld-button
                class="ld-file-upload__pause-all-button"
                onClick={this.handlePauseAllClick}
                mode="secondary"
                disabled={
                  this.uploadItems.filter((item) => item.state == 'uploading')
                    .length == 0
                }
              >
                Pause all uploads
              </ld-button>
            ) : undefined}
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
