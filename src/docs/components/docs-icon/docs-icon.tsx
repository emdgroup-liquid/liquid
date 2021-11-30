import {
  Component,
  Prop,
  h,
  State,
  getAssetPath,
  Fragment,
} from '@stencil/core'
import { copyToClipboard } from '../../utils/copyToClipboard'
import { getClassNames } from '../../../liquid/utils/getClassNames'
import '@lottiefiles/lottie-player'

/** @internal **/
@Component({
  tag: 'docs-icon',
  styleUrl: 'docs-icon.css',
  shadow: false,
})
export class DocsIcon {
  /** Play the animation back and forth */
  @Prop() bounce = false

  /** URL to download from */
  @Prop({ mutable: true }) downloadUrl: string

  /** Icon file name */
  @Prop() identifier: string

  /** Is an animation */
  @Prop() isAnimation = false

  /** Human readable icon name */
  @Prop() name: string

  @State() confirm = false

  private copyIdentifier = async (event: MouseEvent) => {
    event.preventDefault()
    await copyToClipboard(this.identifier)

    this.confirm = true

    setTimeout(() => {
      this.confirm = false
    }, 2000)
  }

  async componentWillLoad(): Promise<void> {
    if (!this.downloadUrl && this.isAnimation) {
      this.downloadUrl = `../../assets/animations/${this.identifier}.json`
    } else if (!this.downloadUrl) {
      this.downloadUrl = getAssetPath(`./assets/${this.identifier}.svg`)
    }
  }

  render() {
    return (
      <a
        class="docs-icon"
        href={this.downloadUrl}
        onContextMenu={this.isAnimation ? undefined : this.copyIdentifier}
        slot="trigger"
        download
      >
        {this.isAnimation ? (
          <lottie-player
            class="docs-icon__player"
            autoplay
            loop
            mode={this.bounce ? 'bounce' : undefined}
            src={this.downloadUrl}
          />
        ) : (
          <ld-icon name={this.identifier} size="lg" />
        )}
        <p class="docs-icon__name">{this.name}</p>
        <p class="docs-icon__identifier">{this.identifier}</p>
        <div class="docs-icon__action">
          <ld-typo
            class={getClassNames([
              'docs-icon__instructions',
              this.confirm && 'docs-icon__instructions--hidden',
            ])}
            variant="body-xs"
          >
            <span>Click</span> to download
            {!this.isAnimation && (
              <>
                <br />
                <span>Right-click</span> to copy name
              </>
            )}
          </ld-typo>
          {!this.isAnimation && (
            <ld-typo
              class={getClassNames([
                'docs-icon__confirmation',
                this.confirm && 'docs-icon__confirmation--visible',
              ])}
              variant="label-s"
            >
              Copied! <ld-icon name="checkmark" size="sm" />
            </ld-typo>
          )}
        </div>
      </a>
    )
  }
}
