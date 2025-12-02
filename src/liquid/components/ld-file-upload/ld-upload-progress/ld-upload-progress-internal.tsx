import { Component, Element, h, Host, Prop } from '@stencil/core'
import type { LdUploadItem } from '../ld-file-upload'

/**
 * @internal
 * @virtualProp ref - reference to component
 */
@Component({
  tag: 'ld-upload-progress-internal',
  styleUrl: 'ld-upload-progress-internal.shadow.css',
  shadow: true,
})
export class LdUploadProgressInternal {
  @Element() el: HTMLLdUploadProgressInternalElement

  /** Defines whether upload starts immediately after selecting files or after confirmation. */
  @Prop() immediate?: boolean = false

  /** Defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean

  /** Defines whether the total progress of all upoading files will be shown in the progress button */
  @Prop() showProgress?: boolean = false

  /** List of files */
  @Prop() uploadItems: LdUploadItem[] = []

  /** Label to be used for the tooltip of the cancel button. */
  @Prop() labelCancel: string

  /** Label to be used for the tooltip of the download button. */
  @Prop() labelDownload: string

  /** Label to be used for the tooltip of the remove button. */
  @Prop() labelRemove: string

  /** Label to be used for the tooltip of the retry button. */
  @Prop() labelRetry: string

  /** Label to be used for upload success message. */
  @Prop() labelUploadSuccessMsg: string

  /** Label to be used for upload cancelled message. */
  @Prop() labelUploadCancelledMsg: string

  /** Label to be used for upload error message. */
  @Prop() labelUploadErrorMsg: string

  private renderListItems = () =>
    this.uploadItems.map((item) => (
      <li key={item.fileName}>
        <ld-upload-item-internal
          state={item.state}
          fileName={item.fileName}
          fileSize={item.fileSize}
          fileType={item.fileType}
          progress={item.progress}
          file={item.file}
          allowPause={this.allowPause}
          showProgress={this.showProgress}
          uploadItems={this.uploadItems}
          labelCancel={this.labelCancel}
          labelDownload={this.labelDownload}
          labelRemove={this.labelRemove}
          labelRetry={this.labelRetry}
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
