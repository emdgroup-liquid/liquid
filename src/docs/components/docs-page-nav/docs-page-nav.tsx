import '../../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-page-nav',
  styleUrl: 'docs-page-nav.css',
  shadow: false,
})
export class DocsPageNav {
  @Element() el: HTMLElement

  /** Href to previous page. */
  @Prop() prevHref: string

  /** Href to next page. */
  @Prop() nextHref: string

  /** Title of previous page. */
  @Prop() prevTitle = 'Back'

  /** Title of next page. */
  @Prop() nextTitle = 'Next'

  @State() hasSlot = false

  componentWillLoad() {
    this.hasSlot = this.el.childNodes.length > 2
  }

  render() {
    return (
      <Host
        class={{
          'docs-page-nav': true,
          'docs-page-nav--has-slot': this.hasSlot,
        }}
      >
        <div class="docs-page-nav__container docs-page-nav__dark">
          <div class="docs-page-nav__content">
            {this.prevHref ? (
              <ld-button
                brand-color
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
              <ld-button
                brand-color
                class="docs-page-nav__push"
                href={this.nextHref}
              >
                {this.nextTitle}
              </ld-button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div class="docs-page-nav__container docs-page-nav__light">
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
        <slot></slot>
      </Host>
    )
  }
}
