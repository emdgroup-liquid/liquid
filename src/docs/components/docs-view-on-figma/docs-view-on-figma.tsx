import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-view-on-figma',
  styleUrl: 'docs-view-on-figma.css',
  shadow: false,
})
export class DocsViewOnFigma {
  render() {
    return (
      <Host class="docs-view-on-figma">
        <ld-tooltip
          class="docs-topbar__tooltip"
          arrow
          position="top right"
          tetherOptions={JSON.stringify({
            offset: '0px -12px',
            constraints: [
              {
                to: 'window',
              },
            ],
          })}
        >
          <ld-button
            slot="trigger"
            brand-color
            href="https://www.figma.com/file/8GYcAOePm8Tt9qqJ7Gnv99/Liquid-Oxygen-(Share)?node-id=3%3A14310"
            target="_blank"
          >
            <ld-icon>
              <svg fill="none" width="24" height="24" viewBox="0 0 16 24">
                <g clip-path="url(#a)">
                  <path
                    fill="#0ACF83"
                    d="M4 24a4 4 0 0 0 4-4v-4H4a4 4 0 0 0 0 8Z"
                  />
                  <path
                    fill="#A259FF"
                    d="M0 12a4 4 0 0 1 4-4h4v8H4a4 4 0 0 1-4-4Z"
                  />
                  <path
                    fill="#F24E1E"
                    d="M0 4a4 4 0 0 1 4-4h4v8H4a4 4 0 0 1-4-4Z"
                  />
                  <path fill="#FF7262" d="M8 0h4a4 4 0 0 1 0 8H8V0Z" />
                  <path
                    fill="#1ABCFE"
                    d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h16v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            </ld-icon>
            Design System Library
          </ld-button>
          <docs-figma-access-notice />
        </ld-tooltip>
      </Host>
    )
  }
}
