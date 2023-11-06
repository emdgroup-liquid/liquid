import { Component, Element, h, Host } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-main",
  styleUrl: "docs-main.css",
  shadow: false,
})
export class DocsNav {
  @Element() el: HTMLElement;

  private mainRef!: HTMLElement;

  componentDidLoad() {
    this.mainRef
      .querySelectorAll("#css-variables + table code, #properties + table code")
      .forEach((code) => {
        code.innerHTML = code.innerHTML.replace(/\\\|/g, "|");
      });

    // Timeout is required in order to use innerText.
    // We use innerText and not textContent in order to preserve line breaks.
    setTimeout(() => {
      Array.from(this.mainRef.children)
        .filter((child) => child.tagName === "PRE")
        .forEach((pre: HTMLPreElement) => {
          const copyToCB = document.createElement("docs-copy-to-cb");
          copyToCB.textToCopy = pre.innerText;
          pre.appendChild(copyToCB);
        });
    });
  }

  render() {
    return (
      <Host class="docs-main">
        <main id="main" ref={(ref) => (this.mainRef = ref)}>
          <slot></slot>
        </main>
      </Host>
    );
  }
}
