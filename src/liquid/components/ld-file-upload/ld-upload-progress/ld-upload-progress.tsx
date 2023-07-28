import {
  Component,
  Element,
  h,
  Host,
  /* Method, */
  Prop,
  State,
  /* Watch, */
} from '@stencil/core'
/* import { TypeAheadHandler } from '../../../utils/typeahead'
import { isElement, isMenuItem, isSlot } from '../../../utils/type-checking'
import { LdUploadItem } from '../ld-upload-item/ld-upload-item' */

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
  @Prop() uploadItems: {
    state: 'pending' | 'uploading' | 'uploaded' | 'upload failed'
    fileName: string
    fileSize: number
    progress: number
  }[] = [
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

  private renderListItems = () => {
    const items = []

    this.uploadItems.forEach((item) => {
      items.push(
        <li>
          <ld-upload-item
            state={item.state}
            file-name={item.fileName}
            file-size={item.fileSize}
            progress={item.progress}
          ></ld-upload-item>
        </li>
      )
    })

    return items
  }

  /* updateUploadItemProps() {
    const ldUploadItems =
      this.el.querySelectorAll<HTMLLdUploadItemElement>('ld-upload-item')
    ldUploadItems.forEach((ldUploadItem) => {
      if (this.startUpload) {
        ldUploadItem.state = 'uploading'
      } else {
        ldUploadItem.state = 'pending'
      }
    })
  }

  componentWillLoad() {
    this.updateUploadItemProps()
  } */

  render() {
    return (
      <Host>
        <ul class="ld-upload-progress">{this.renderListItems()}</ul>
      </Host>
    )
  }
}
