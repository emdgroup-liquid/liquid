import { Component, Element, h, Host, Prop } from '@stencil/core'
import type { UploadItem } from '../ld-file-upload'

/**
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-upload-progress',
  styleUrl: 'ld-upload-progress.css',
  shadow: true,
})
export class LdUploadProgress {
  @Element() el: HTMLLdUploadProgressElement

  /** Defines whether upload starts immediately after selecting files or after confirmation. */
  @Prop() immediate?: boolean = false

  /** Defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean

  /** Defines whether the total progress of all upoading files will be shown in the progress button */
  @Prop() showProgress?: boolean = false

  /** List of files */
  @Prop() uploadItems: UploadItem[] = []

  /** Label to be used for the tooltip of the remove button. */
  @Prop() labelRemove: string

  /** Label to be used for the tooltip of the download button. */
  @Prop() labelDownload: string

  /** Label to be used for the tooltip of the retry button. */
  @Prop() labelRetry: string

  /** Label to be used for the tooltip of the delete button. */
  @Prop() labelDelete: string

  /** Label to be used for upload success message. */
  @Prop() labelUploadSuccessMsg: string

  /** Label to be used for upload cancelled message. */
  @Prop() labelUploadCancelledMsg: string

  /** Label to be used for upload error message. */
  @Prop() labelUploadErrorMsg: string

  private renderListItems = () =>
    this.uploadItems.map((item) => (
      <li key={item.fileName}>
        <ld-upload-item
          state={item.state}
          fileName={item.fileName}
          fileSize={item.fileSize}
          fileType={item.fileType}
          progress={item.progress}
          file={item.file}
          allowPause={this.allowPause}
          showProgress={this.showProgress}
          uploadItems={this.uploadItems}
          labelRemove={this.labelRemove}
          labelDownload={this.labelDownload}
          labelRetry={this.labelRetry}
          labelDelete={this.labelDelete}
          labelUploadSuccessMsg={this.labelUploadSuccessMsg}
          labelUploadCancelledMsg={this.labelUploadCancelledMsg}
          labelUploadErrorMsg={this.labelUploadErrorMsg}
        />
      </li>
    ))

  render() {
    return (
      <Host>
        <ul class="ld-upload-progress">{this.renderListItems()}</ul>
      </Host>
    )
  }
}
