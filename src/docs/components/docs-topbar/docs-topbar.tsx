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
      <Host class="ld-theme-bubblegum docs-topbar">
        <div class="docs-topbar__content">
          {/*<docs-btn-dots-grid></docs-btn-dots-grid>*/}
          <a class="docs-topbar__link-home" href="./">
            <img
              src={getAssetPath('./assets/logo.svg')}
              alt=""
              role="presentation"
            />
            <h1 class="docs-topbar__headline docs-topbar__headline--long">
              <b>Liquid Oxygen</b> Documentation
            </h1>
            <h1 class="docs-topbar__headline docs-topbar__headline--short">
              <b>Liquid</b> Docs
            </h1>
          </a>

          <div class="docs-topbar__external-links">
            <a
              class="docs-topbar__link docs-topbar__link--figma"
              href="https://www.figma.com/file/8GYcAOePm8Tt9qqJ7Gnv99/Liquid-Oxygen-(Share)?node-id=3%3A14310"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={getAssetPath('./assets/figma.svg')}
                alt="Liquid Oxygen on Figma"
                role="presentation"
              />
            </a>
            <a
              class="docs-topbar__link docs-topbar__link--github"
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
