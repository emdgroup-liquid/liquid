import { Component, Element, h, Host, Prop, State } from '@stencil/core'
import type { UploadItem } from '../ld-file-upload'
import { LdUploadItemConfig } from '../ld-upload-item/ld-upload-item.types'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
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

  /** Maps file types to icon path */
  @Prop() icons?: Partial<LdUploadItemConfig>

  @State() initialized = false

  // TODO: remove mock data
  @Prop() uploadItems: UploadItem[] = [
    {
      state: 'pending',
      fileName: 'file1.png',
      fileSize: 100000,
      fileType: 'png',
      progress: 0,
    },
    {
      state: 'uploading',
      fileName: 'file2.png',
      fileSize: 200000,
      fileType: 'png',
      progress: 0,
    },
  ]
  // @State() uploadItems: unknown[] = [{ state: 'uploaded', fileName: 'yolo.png' }]

  @Prop() uploadItemTypes: {
    fileName: string
    fileType: string
  }[] = []

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
          icons={this.icons}
          /* fileType={
            this.uploadItemTypes.find(
              (typeItem) => item.fileName === typeItem.fileName
            )
              ? this.uploadItemTypes.find(
                  (typeItem) => item.fileName === typeItem.fileName
                ).fileType
              : 'undefined'
          } */
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
