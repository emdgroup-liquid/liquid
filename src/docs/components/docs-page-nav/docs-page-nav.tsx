import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-page-nav',
  styleUrl: 'docs-page-nav.css',
  shadow: false,
})
export class DocsPageNav {
  /** Href to previous page. */
  @Prop() prevHref: string

  /** Href to next page. */
  @Prop() nextHref: string

  /** Title of previous page. */
  @Prop() prevTitle = 'Back'

  /** Title of next page. */
  @Prop() nextTitle = 'Next'

  render() {
    return (
      <Host class="docs-page-nav">
        <div class="docs-page-nav__dark">
          <div class="docs-page-nav__content">
            {this.prevHref ? (
              <ld-button
                class="docs-page-nav__pull"
                mode="secondary-on-brand-color"
                href={this.prevHref}
              >
                {this.prevTitle}
              </ld-button>
            ) : (
              ''
            )}
            {this.nextHref ? (
              <ld-button
                class="docs-page-nav__push"
                mode="on-brand-color"
                href={this.nextHref}
              >
                {this.nextTitle}
              </ld-button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div class="docs-page-nav__light">
          <div class="docs-page-nav__content">
            {this.prevHref ? (
              <ld-button
                class="docs-page-nav__pull"
                mode="secondary"
                href={this.prevHref}
              >
                {this.prevTitle}
              </ld-button>
            ) : (
              ''
            )}
            {this.nextHref ? (
              <ld-button class="docs-page-nav__push" href={this.nextHref}>
                {this.nextTitle}
              </ld-button>
            ) : (
              ''
            )}
          </div>
        </div>
      </Host>
    )
  }
}
