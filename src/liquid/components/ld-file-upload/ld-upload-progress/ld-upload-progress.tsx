import { Component, Element, h, Host, Prop } from '@stencil/core'
import type { UploadItem } from '../ld-file-upload'
import { LdUploadItemConfig } from '../ld-upload-item/ld-upload-item.types'

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

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** allowPause defines whether the user will be able to pause uploads. */
  @Prop() allowPause?: boolean

  /** showTotalProgress defines whether the total progress of all upoading files will be shown in the progress button */
  @Prop() showProgress?: boolean = false

  /** Maps file types to icon path */
  @Prop() icons?: Partial<LdUploadItemConfig>

  /** List of files */
  @Prop() uploadItems: UploadItem[] = []

  /* @Prop() uploadItemTypes: {
    fileName: string
    fileType: string
  }[] = [] */

  private renderListItems = () =>
    this.uploadItems.map((item) => (
      <li>
        <ld-upload-item
          key={item.fileName + '_' + item.fileSize + '_' + item.progress}
          state={item.state}
          fileName={item.fileName}
          fileSize={item.fileSize}
          fileType={item.fileType}
          progress={item.progress}
          allowPause={this.allowPause}
          showProgress={this.showProgress}
          icons={this.icons}
        ></ld-upload-item>
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
