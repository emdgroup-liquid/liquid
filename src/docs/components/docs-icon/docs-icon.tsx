import {
  Component,
  Prop,
  h,
  State,
  getAssetPath,
  Fragment,
} from "@stencil/core";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { getClassNames } from "../../../liquid/utils/getClassNames";
import "@lottiefiles/lottie-player";

/** @internal **/
@Component({
  tag: "docs-icon",
  styleUrl: "docs-icon.css",
  shadow: false,
})
export class DocsIcon {
  private aRef: HTMLAnchorElement;
  private isDownload = false;

  /** Play the animation back and forth */
  @Prop() bounce = false;

  /** URL to download from */
  @Prop({ mutable: true }) downloadUrl: string;

  /** Icon file name */
  @Prop() identifier: string;

  /** Is an animation */
  @Prop() isAnimation = false;

  /** Human readable icon name */
  @Prop() name: string;

  @State() confirm = false;
  @State() isMenuOpen = false;

  private handleMenuOpen = () => {
    this.isMenuOpen = true;
  };
  private handleMenuClose = () => {
    this.isMenuOpen = false;
  };

  private copyIdentifier = async () => {
    await copyToClipboard(this.identifier);

    this.confirm = true;

    setTimeout(() => {
      this.confirm = false;
    }, 2000);
  };

  private handleClick = (ev: MouseEvent) => {
    if (!this.isDownload) {
      ev.preventDefault();

      if (!this.isAnimation) {
        this.copyIdentifier();
      }
    }
  };

  private handleClickDownload = () => {
    this.isDownload = true;
    this.aRef.click();
    this.isDownload = false;
  };

  async componentWillLoad(): Promise<void> {
    if (!this.downloadUrl && this.isAnimation) {
      const { buildstamp } =
        document.querySelector<HTMLMetaElement>("[data-buildstamp]").dataset;
      this.downloadUrl = `../../${buildstamp}assets/animations/${this.identifier}.json`;
    } else if (!this.downloadUrl) {
      this.downloadUrl = getAssetPath(`./assets/${this.identifier}.svg`);
    }
  }

  render() {
    return (
      <ld-context-menu
        onLdcontextmenuopen={this.handleMenuOpen}
        onLdcontextmenuclose={this.handleMenuClose}
        position="bottom center"
        rightClick
        size="sm"
      >
        <a
          class={getClassNames([
            "docs-icon",
            this.isMenuOpen && "docs-icon--active",
          ])}
          href={this.downloadUrl}
          ref={(el) => (this.aRef = el)}
          slot="trigger"
          download={this.identifier}
          onClick={this.handleClick}
        >
          {this.isAnimation ? (
            <lottie-player
              class="docs-icon__player"
              autoplay
              loop
              mode={this.bounce ? "bounce" : undefined}
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
                "docs-icon__instructions",
                this.confirm && "docs-icon__instructions--hidden",
              ])}
              variant="body-xs"
            >
              {!this.isAnimation && (
                <>
                  <span>Click</span> to copy name
                  <br />
                </>
              )}
              <span>Right-click</span> to download
            </ld-typo>
            {!this.isAnimation && (
              <ld-typo
                class={getClassNames([
                  "docs-icon__confirmation",
                  this.confirm && "docs-icon__confirmation--visible",
                ])}
                variant="label-s"
              >
                Copied! <ld-icon name="checkmark" size="sm" />
              </ld-typo>
            )}
          </div>
        </a>
        <ld-menuitem onClick={this.handleClickDownload}>
          <ld-icon name="download" /> Download
        </ld-menuitem>
      </ld-context-menu>
    );
  }
}
