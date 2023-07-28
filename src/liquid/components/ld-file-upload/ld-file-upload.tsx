import { Component, h, Host, Element } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 */
@Component({
  tag: 'ld-file-upload',
  styleUrl: 'ld-file-upload.css',
  shadow: true,
})
export class LdFileUpload {
  @Element() el: HTMLLdFileUploadElement

  render() {
    const cl = getClassNames(['ld-file-upload'])

    return (
      <Host class={cl}>
        <ld-choose-file></ld-choose-file>
        <ld-upload-progress start-upload="false"></ld-upload-progress>
      </Host>
    )
  }
}
