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

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** allowPause defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean

  /** showTotalProgress defines whether the total progress of all upoading files will be shown in the progress button */
  @Prop() showProgress?: boolean = false

  /** List of files */
  @Prop() uploadItems: UploadItem[] = []

  /** Label to be used for the tooltip of the remove button. */
  @Prop() labelRemove = `Remove`

  /** Label to be used for the tooltip of the download button. */
  @Prop() labelDownload = `Download`

  /** Label to be used for the tooltip of the retry button. */
  @Prop() labelRetry = `Retry`

  /** Label to be used for the tooltip of the delete button. */
  @Prop() labelDelete = `Delete`

  private renderListItems = () =>
    this.uploadItems.map((item) => (
      <li key={item.fileName}>
        <ld-upload-item
          // key={item.fileName + '_' + item.fileSize + '_' + item.progress}
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
