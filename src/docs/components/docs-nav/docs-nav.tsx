import { Component, h, Host, State, Listen, Element } from "@stencil/core";
import eventBus from "../../utils/eventBus";
import { NavEventType } from "../../utils/eventTypes";

/** @internal **/
@Component({
  tag: "docs-nav",
  styleUrl: "docs-nav.css",
  shadow: false,
  assetsDirs: ["assets"],
})
export class DocsNav {
  @Element() el: HTMLElement;

  @State() isNavOpen = false;

  private onNavOpen() {
    this.isNavOpen = true;
    document.getElementById("main").setAttribute("inert", "true");
  }
  private onNavClose() {
    this.isNavOpen = false;
    document.getElementById("main").removeAttribute("inert");
  }

  @Listen("resize", { target: "window" })
  handleResize() {
    const isNarrow = window.matchMedia("(max-width: 52rem)").matches;
    if (!isNarrow) {
      document.getElementById("main").removeAttribute("inert");
    } else if (this.isNavOpen) {
      document.getElementById("main").setAttribute("inert", "true");
    }
  }

  /**
   * This click handler is needed on mobile safari.
   * @param ev
   */
  @Listen("click", { capture: false })
  handleClick(ev) {
    const closestLink = ev.target.closest(".docs-nav__li a");
    if (closestLink) {
      window.location.href = closestLink.href;
    }
  }

  componentWillLoad() {
    // Make sure the sidenav-open hash is removed on page reload
    // when the sidenav is open.
    if (location.hash === "#sidenav-open") {
      location.hash = "";
      setTimeout(() => {
        history.replaceState({}, "", window.location.pathname);
      });
    }
  }

  componentDidLoad() {
    eventBus.on(NavEventType.open, this.onNavOpen.bind(this));
    eventBus.on(NavEventType.close, this.onNavClose.bind(this));

    // Scroll current nav item into view.
    const link = this.el.querySelector(`[href='${location.pathname}']`);
    link?.scrollIntoView({ block: "center" });
  }

  render() {
    return (
      <Host class="docs-nav" id="sidenav-open">
        <div class="docs-nav__content">
          <div class="docs-nav__section">
            <docs-switch-dark-light />
            <docs-btn-search></docs-btn-search>
          </div>
          <div class="docs-nav__section">
            <nav class="docs-nav__nav" role="navigation">
              <slot></slot>
            </nav>
          </div>
          <div class="docs-nav__section">
            <p>
              <span class="docs-nav__dimmed">
                © {new Date().getFullYear()}, Merck KGaA,
                Darmstadt,&nbsp;Germany
              </span>
            </p>
            <br />
            <p>
              <span class="docs-nav__dimmed">Get in touch:</span>
              <span class="docs-nav__contact-links">
                <a
                  href="https://github.com/emdgroup-liquid/liquid/discussions"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub discussions
                </a>
                <br />
                <a
                  href="https://teams.microsoft.com/l/channel/19%3aeae3b35b0cbf42659e45c2b5592e0c0e%40thread.tacv2/General?groupId=88f23881-53e2-4a99-ad5c-8188c1087bbf&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Teams
                </a>
              </span>
            </p>
          </div>
          <div class="docs-nav__section">
            <p class="docs-nav__legal-links">
              <a href="legal/license/">License</a>
              <a href="legal/terms/">Terms and Conditions</a>
              <a href="legal/privacy/">Privacy Statement</a>
              <a href="legal/imprint/">Imprint</a>
            </p>
          </div>
        </div>
      </Host>
    );
  }
}
