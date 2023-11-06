import { Component, h, Host, Listen, State } from "@stencil/core";
import { NavEventType } from "../../utils/eventTypes";
import eventBus from "../../utils/eventBus";

/** @internal **/
@Component({
  tag: "docs-btn-toggle-nav",
  styleUrl: "docs-btn-toggle-nav.css",
  shadow: false,
})
export class DocsBtnToggleNav {
  private aOpen!: HTMLAnchorElement;
  private aClose!: HTMLAnchorElement;

  @State() isNavOpen = false;

  private onNavOpen(ev) {
    ev.preventDefault();
    location.hash = "sidenav-open";
    eventBus.emit(NavEventType.open);
    this.isNavOpen = true;
    setTimeout(() => {
      this.aClose.focus();
    });
  }
  private onNavClose(ev) {
    ev.preventDefault();
    location.hash = "";
    eventBus.emit(NavEventType.close);
    this.isNavOpen = false;
    setTimeout(() => {
      history.replaceState({}, "", window.location.pathname);
      this.aOpen.focus();
    });
  }

  @Listen("keydown", {
    passive: false,
  })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === " ") {
      ev.stopImmediatePropagation();
      ev.preventDefault();

      if (this.isNavOpen) {
        this.aClose.click();
      } else {
        this.aOpen.click();
      }
    }
  }

  componentDidLoad() {
    eventBus.on(NavEventType.open, () => {
      this.isNavOpen = true;
    });
    eventBus.on(NavEventType.close, () => {
      this.isNavOpen = false;
    });
  }

  render() {
    return (
      <Host class="docs-btn-toggle-nav">
        <a
          role="switch"
          aria-checked="true"
          ref={(el) => (this.aClose = el as HTMLAnchorElement)}
          onClick={this.onNavClose.bind(this)}
          class="docs-btn-toggle-nav__close"
          href="#"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <title>Close nav</title>
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <rect
              width="4"
              height="20"
              x="25.7"
              y="11.5"
              fill="#fff"
              rx="2"
              transform="rotate(45 25.7 11.5)"
            />
            <rect
              width="4"
              height="20"
              x="11.5"
              y="14.3"
              fill="#fff"
              rx="2"
              transform="rotate(-45 11.5 14.3)"
            />
          </svg>
        </a>
        <a
          role="switch"
          aria-checked="false"
          ref={(el) => (this.aOpen = el as HTMLAnchorElement)}
          onClick={this.onNavOpen.bind(this)}
          class="docs-btn-toggle-nav__open"
          href="#sidenav-open"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <title>Open nav</title>
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <rect x="18" y="10" width="4" height="4" rx="2" fill="white" />
            <rect x="18" y="18" width="4" height="4" rx="2" fill="white" />
            <rect x="18" y="26" width="4" height="4" rx="2" fill="white" />
          </svg>
        </a>
      </Host>
    );
  }
}
