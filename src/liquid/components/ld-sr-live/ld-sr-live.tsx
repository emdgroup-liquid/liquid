import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Listen, State } from '@stencil/core'

@Component({
  tag: 'ld-sr-live',
  styleUrl: 'ld-sr-live.css',
  shadow: false,
})
export class LdSrLive {
  private infoSuffix = ''
  private alertSuffix = ''

  @State() info = ''
  @State() alert = ''

  @Listen('ldSrLiveInfo', {
    target: 'window',
    passive: true,
  })
  handleInfo(event: CustomEvent<string>) {
    console.log('Received the custom ldSrLiveInfo event: ', event.detail)
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.infoSuffix = this.infoSuffix ? '' : '​'
    this.info = event.detail + this.infoSuffix
    event.stopImmediatePropagation()
  }

  @Listen('ldSrLiveAlert', {
    target: 'window',
    passive: true,
  })
  handleAlert(event: CustomEvent<string>) {
    console.log('Received the custom ldSrLiveAlert event: ', event.detail)
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.alertSuffix = this.alertSuffix ? '' : '​'
    this.alert = event.detail + this.alertSuffix
    event.stopImmediatePropagation()
  }

  render() {
    return (
      <Host class="ld-sr-live ld-sr-only">
        <span
          role="status"
          aria-live="polite"
          aria-relevant="text"
          aria-atomic="true"
        >
          {this.info}
        </span>
        <span
          role="alert"
          aria-live="polite"
          aria-relevant="text"
          aria-atomic="true"
        >
          {this.alert}
        </span>
      </Host>
    )
  }
}
