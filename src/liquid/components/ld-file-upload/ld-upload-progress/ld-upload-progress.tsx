import { Component, Element, h, Host, Prop, State } from '@stencil/core'
import type { UploadItem } from '../ld-file-upload'

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

  @State() initialized = false

  // TODO: remove mock data
  @Prop() uploadItems: UploadItem[] = [
    {
      state: 'pending',
      fileName: 'file1.png',
      fileSize: 100000,
      progress: 0,
    },
    {
      state: 'uploading',
      fileName: 'file2.png',
      fileSize: 200000,
      progress: 0,
    },
  ]
  // @State() uploadItems: unknown[] = [{ state: 'uploaded', fileName: 'yolo.png' }]

  private renderListItems = () =>
    this.uploadItems.map((item) => (
      <li>
        <ld-upload-item
          key={item.fileName + '_' + item.fileSize + '_' + item.progress}
          state={item.state}
          fileName={item.fileName}
          fileSize={item.fileSize}
          progress={item.progress}
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
