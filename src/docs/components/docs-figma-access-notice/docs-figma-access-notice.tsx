import '../../../components' // type definitions for type checks and intelliSense
import { Component, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-figma-access-notice',
  styleUrl: 'docs-figma-access-notice.css',
  shadow: true,
})
export class DocsFigmaAccessNotice {
  render() {
    return (
      <div class="docs-figma-access-notice">
        <ld-icon class="docs-figma-access-notice__icon" name="info" size="lg" />
        <ld-typo variant="body-s">
          The Liquid Oxygen Figma library is only&nbsp;available to you, if you
          have a Figma&nbsp;account associated with a <b>@merckgroup.com</b>,{' '}
          <b>@emdgroup.com</b> or <b>@milliporesigma.com</b> or the respective
          @external. email address.
        </ld-typo>
      </div>
    )
  }
}
