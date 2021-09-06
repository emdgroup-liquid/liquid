import { Component, h, Host, getAssetPath } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-topbar',
  styleUrl: 'docs-topbar.css',
  shadow: false,
  assetsDirs: ['assets'],
})
export class DocsTopbar {
  render() {
    return (
      <Host class="docs-topbar">
        <div class="docs-topbar__content">
          {/*<docs-btn-dots-grid></docs-btn-dots-grid>*/}
          <a class="docs-topbar__link-home" href="./">
            <img
              src={getAssetPath('./assets/logo.svg')}
              alt=""
              role="presentation"
            />
            <h1 class="docs-topbar__headline">
              <b>Liquid Oxygen</b> Documentation
            </h1>
          </a>

          <div class="docs-topbar__external-links">
            <a
              class="docs-topbar__link-github"
              href="https://github.com/emdgroup-liquid/liquid"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={getAssetPath('./assets/github.svg')}
                alt="Liquid Oxygen on GitHub"
                role="presentation"
              />
            </a>
          </div>
        </div>
      </Host>
    )
  }
}
