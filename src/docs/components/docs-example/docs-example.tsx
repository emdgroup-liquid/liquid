import {
  Component,
  h,
  Host,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core'
import { getClassNames } from '../../../liquid/utils/getClassNames'

/** @internal **/
@Component({
  tag: 'docs-example',
  styleUrl: 'docs-example.css',
  shadow: false,
})
export class DocsExample {
  @Element() el: HTMLElement

  /** Background color mode. */
  @Prop() background: 'brand' | 'light'

  /** Center examples. */
  @Prop() centered = false

  /** Web Component markup encoded as URI component. */
  @Prop() code!: string

  /** CSS component markup encoded as URI component. */
  @Prop() codeCssComponent: string

  /** React component markup encoded as URI component. */
  @Prop() codeReactComponent: string

  /** Adds a thin border to the container. */
  @Prop() hasBorder = false

  /** Puts some space between content and container. */
  @Prop() hasPadding = false

  /** Opens code view on initial load. */
  @Prop() opened = false

  /** Stack examples (use display block). */
  @Prop() stacked = false

  /** Custom show-container styles. */
  @Prop() styles = '{}'

  /** Enables theme switch. */
  @Prop() themable = false

  /** Current theme. */
  @State() currentTheme = 'ocean'

  /** Is code toggled to be visible */
  @State() isCodeVisible = this.opened

  /** Is Web Component visible (as opposed to the css component version) */
  @State() codeType: 'wc' | 'css' | 'react' = 'wc'

  /** Code type pick change event. */
  @Event() pickCodeType: EventEmitter<this['codeType']>

  private handlePickTheme = (event: CustomEvent<string>) => {
    this.currentTheme = event.detail
  }

  private handleToggleCode = (event: CustomEvent<boolean>) => {
    this.isCodeVisible = event.detail
  }

  @Listen('pickCodeType', {
    target: 'window',
  })
  handleSwitchCode(ev: CustomEvent<this['codeType']>) {
    if (!this.hasCodeType(ev.detail)) return
    this.codeType = ev.detail
    window.localStorage.setItem(
      'liquid_docs_preferred_code_type',
      this.codeType
    )
  }

  private unescapeCode(code) {
    return (
      code
        // lang html
        .replaceAll(/\\{\\{/g, '{{')
        .replaceAll(/\\}\\}/g, '}}')
        // lang jsx
        .replaceAll(
          /<span class="token punctuation">{<\/span> <span class="token punctuation">{<\/span>/g,
          '<span class="token punctuation">{</span><span class="token punctuation">{</span>'
        )
        .replaceAll(
          /<span class="token punctuation">}<\/span> <span class="token punctuation">}<\/span>/g,
          '<span class="token punctuation">}</span><span class="token punctuation">}</span>'
        )
    )
  }

  private hasCodeType(codeType: this['codeType']) {
    if (codeType === 'wc') {
      return Boolean(this.el.querySelector('[slot="code"]'))
    }
    return Array.from(this.el.querySelectorAll('[slot^="code"]')).some(
      (slot) =>
        slot.getAttribute('slot').toLowerCase() === `code${codeType}component`
    )
  }

  componentWillLoad() {
    const preferredCodeType = window.localStorage.getItem(
      'liquid_docs_preferred_code_type'
    ) as this['codeType']
    if (preferredCodeType) {
      if (this.hasCodeType(preferredCodeType)) {
        this.codeType = preferredCodeType as this['codeType']
      }
    }
    this.el.querySelectorAll('[slot^="code"]').forEach((slot) => {
      slot.innerHTML = this.unescapeCode(slot.innerHTML)
    })
  }

  render() {
    const cl = [
      'docs-example',
      this.isCodeVisible && 'docs-example--code-visible',
      this.hasBorder && 'docs-example--has-border',
      this.hasPadding && 'docs-example--has-padding',
      this.codeType === 'wc' && 'docs-example--web-component',
      this.codeType === 'css' && 'docs-example--css-component',
      this.codeType === 'react' && 'docs-example--react-component',
    ]

    let clShow = 'docs-example__show'
    if (this.themable && this.currentTheme) {
      clShow += ' ld-theme-' + this.currentTheme.toLowerCase()
    }
    if (this.centered) clShow += ' docs-example__show--centered'
    if (this.stacked) clShow += ' docs-example__show--stacked'
    if (this.background) clShow += ` docs-example__show--${this.background}`

    return (
      <Host class={getClassNames(cl)}>
        <div class={clShow} style={JSON.parse(this.styles)}>
          <slot name="show"></slot>
          <slot name="showCssComponent"></slot>
        </div>
        <div class="docs-example__tools-scroll-container">
          <div class="docs-example__tools">
            {(this.codeCssComponent || this.codeReactComponent) && (
              <ld-switch
                onClick={() => (this.isCodeVisible = true)}
                onLdswitchchange={(ev) => {
                  this.handleSwitchCode(ev as CustomEvent<this['codeType']>)
                  this.pickCodeType.emit(this.codeType)
                }}
                class="docs-example__tool-switch"
                size="sm"
              >
                <ld-switch-item value="wc" checked={this.codeType === 'wc'}>
                  <ld-icon
                    slot="icon-start"
                    size="sm"
                    aria-label="Web Component"
                  >
                    <svg viewBox="0 0 800 800">
                      <path
                        fill="currentColor"
                        d="M196.3 400l200 346.4H200L0 400 200 53.6h196.3L196.3 400zM505.4 53.6H600L800 400 600 746.4h-94.6l-98-169.8H502L604 400 502 223.4h-94.7l98-169.8z"
                      />
                    </svg>
                  </ld-icon>
                </ld-switch-item>
                {this.codeReactComponent && (
                  <ld-switch-item
                    value="react"
                    checked={this.codeType === 'react'}
                  >
                    <ld-icon
                      slot="icon-start"
                      size="sm"
                      aria-label="React component"
                    >
                      <svg
                        viewBox="-11.5 -10.2 23 20.5"
                        style={{ transform: 'scale(1.1)' }}
                      >
                        <circle r="2" fill="currentColor" />
                        <g stroke="currentColor" fill="none">
                          <ellipse rx="11" ry="4.2" />
                          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                      </svg>
                    </ld-icon>
                  </ld-switch-item>
                )}
                {this.codeCssComponent && (
                  <ld-switch-item value="css" checked={this.codeType === 'css'}>
                    <ld-icon
                      slot="icon-start"
                      size="sm"
                      aria-label="CSS component"
                    >
                      <svg
                        viewBox="0 0 800 300"
                        style={{ transform: 'scale(1.2)' }}
                      >
                        <path
                          fill="currentColor"
                          d="M0 0h238.7v99.8H99.8v99.8h139v99.9H0V0zM283.2 0h235.3v85.6H381.6v17h136.9v196.9H283.2v-89.9h136.9v-17H283.2V0zM564.7 0H800v85.6H663.1v17H800v196.9H564.7v-89.9h136.9v-17H564.7V0z"
                        />
                      </svg>
                    </ld-icon>
                  </ld-switch-item>
                )}
              </ld-switch>
            )}
            <div class="docs-example__tool-buttons">
              {this.themable && (
                <docs-pick-theme onPickTheme={this.handlePickTheme} />
              )}
              <docs-toggle-code
                onToggleCode={this.handleToggleCode}
                isOn={this.isCodeVisible}
              />
            </div>
          </div>
        </div>
        <div class="docs-example__code">
          <div class="docs-example__code-tools">
            <docs-copy-to-cb
              class="docs-example__copy-to-clipboard"
              textToCopy={this.unescapeCode(
                decodeURIComponent(
                  this.codeType === 'wc'
                    ? this.code
                    : this.codeType === 'css'
                      ? this.codeCssComponent
                      : this.codeType === 'react'
                        ? this.codeReactComponent
                        : ''
                )
              )}
            />
          </div>
          <slot name="code"></slot>
          <slot name="codeReactComponent"></slot>
          <slot name="codeCssComponent"></slot>
        </div>
      </Host>
    )
  }
}
