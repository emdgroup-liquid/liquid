import { Component, h, getAssetPath } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-topbar",
  styleUrl: "docs-topbar.css",
  shadow: false,
  assetsDirs: ["assets"],
})
export class DocsTopbar {
  private base = document.querySelector("base").href;

  render() {
    return (
      <ld-header
        class="docs-topbar ld-theme-bubblegum"
        logo-title="Home"
        logo-url={this.base}
        sticky
      >
        <img
          alt="Logo"
          class="docs-topbar__logo"
          role="presentation"
          slot="logo"
          src={getAssetPath("./assets/logo.svg")}
        />
        <a class="docs-topbar__headline-link" href={this.base} title="Home">
          <p class="docs-topbar__headline docs-topbar__headline--long">
            <b>Liquid Oxygen</b> Documentation
          </p>
          <p class="docs-topbar__headline docs-topbar__headline--short">
            <b>Liquid</b> Docs
          </p>
        </a>
        <div slot="end" class="docs-topbar__links">
          <a
            class="docs-topbar__link"
            href="https://www.figma.com/file/8GYcAOePm8Tt9qqJ7Gnv99/Liquid-Oxygen-(Share)?node-id=3%3A14310"
            rel="noreferrer noopener"
            slot="end"
            target="_blank"
          >
            <ld-tooltip
              class="docs-topbar__tooltip"
              arrow
              position="bottom right"
              tetherOptions={JSON.stringify({
                offset: "0px -12px",
                constraints: [
                  {
                    to: "window",
                  },
                ],
              })}
            >
              <img
                class="docs-topbar__tooltip-trigger"
                slot="trigger"
                src={getAssetPath("./assets/figma.svg")}
                alt="Liquid Oxygen on Figma"
                role="presentation"
              />
              <docs-figma-access-notice />
            </ld-tooltip>
          </a>
          <a
            class="docs-topbar__link"
            href="https://github.com/emdgroup-liquid/liquid"
            rel="noreferrer noopener"
            slot="end"
            target="_blank"
          >
            <img
              src={getAssetPath("./assets/github.svg")}
              alt="Liquid Oxygen on GitHub"
              role="presentation"
            />
          </a>
        </div>
      </ld-header>
    );
  }
}
