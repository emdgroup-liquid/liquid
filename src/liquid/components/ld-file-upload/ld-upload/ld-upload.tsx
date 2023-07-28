import { Component, h, Host, Element } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 */
@Component({
  tag: 'ld-upload',
  styleUrl: 'ld-upload.css',
  shadow: true,
})
export class LdUpload {
  @Element() el: HTMLLdUploadElement
  private chooseFileRef: HTMLLdChooseFileElement
  private uploadProgressRef: HTMLLdUploadProgressElement

  private updateFileProgress = () => {
    this.uploadProgressRef.uploadItems = structuredClone(
      this.chooseFileRef.uploadFiles
    )
    console.log(this.chooseFileRef.uploadFiles)
    console.log(this.uploadProgressRef.uploadItems)
  }

  render() {
    const cl = getClassNames(['ld-upload'])

    return (
      <Host class={cl}>
        <ld-choose-file
          onLdchoosefile={this.updateFileProgress}
          ref={(el: HTMLLdChooseFileElement) => (this.chooseFileRef = el)}
        ></ld-choose-file>
        <ld-upload-progress
          start-upload="false"
          ref={(el: HTMLLdUploadProgressElement) =>
            (this.uploadProgressRef = el)
          }
        ></ld-upload-progress>
      </Host>
    )
  }
}
