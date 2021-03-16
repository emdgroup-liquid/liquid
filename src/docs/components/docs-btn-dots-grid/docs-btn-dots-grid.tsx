import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-btn-dots-grid',
  styleUrl: 'docs-btn-dots-grid.css',
  shadow: false,
})
export class DocsBtnDotsGrid {
  render() {
    return (
      <Host class="docs-btn-dots-grid">
        <button class="docs-btn-dots-grid__btn">
          <svg
            class="docs-btn-dots-grid__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="4" height="4" rx="2" fill="white" />
            <rect y="8" width="4" height="4" rx="2" fill="white" />
            <rect y="16" width="4" height="4" rx="2" fill="white" />
            <rect x="8" width="4" height="4" rx="2" fill="white" />
            <rect x="8" y="8" width="4" height="4" rx="2" fill="white" />
            <rect x="8" y="16" width="4" height="4" rx="2" fill="white" />
            <rect x="16" width="4" height="4" rx="2" fill="white" />
            <rect x="16" y="8" width="4" height="4" rx="2" fill="white" />
            <rect x="16" y="16" width="4" height="4" rx="2" fill="white" />
          </svg>
        </button>
      </Host>
    )
  }
}
