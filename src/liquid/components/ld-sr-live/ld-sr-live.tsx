import { Component, h, Listen, State } from "@stencil/core";

/**
 * @virtualProp ref - reference to component
 */
@Component({
  tag: "ld-sr-live",
  styleUrl: "ld-sr-live.shadow.css",
  shadow: true,
})
export class LdSrLive {
  private infoSuffix: string;
  private alertSuffix: string;

  @State() info: string;
  @State() alert: string;

  @Listen("ldSrLiveInfo", {
    target: "window",
    passive: true,
  })
  handleInfo(event: CustomEvent<string>) {
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.infoSuffix = this.infoSuffix ? "" : "​";
    this.info = event.detail + this.infoSuffix;
  }

  @Listen("ldSrLiveAlert", {
    target: "window",
    passive: true,
  })
  handleAlert(event: CustomEvent<string>) {
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.alertSuffix = this.alertSuffix ? "" : "​";
    this.alert = event.detail + this.alertSuffix;
  }

  render() {
    return (
      <ld-sr-only>
        <span
          role="status"
          aria-live="polite"
          aria-relevant="all"
          aria-atomic="true"
        >
          {this.info}
        </span>
        <span
          role="alert"
          aria-live="polite"
          aria-relevant="all"
          aria-atomic="true"
        >
          {this.alert}
        </span>
      </ld-sr-only>
    );
  }
}
