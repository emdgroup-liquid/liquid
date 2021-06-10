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
    target: 'document',
    passive: true,
  })
  handleInfo(event: CustomEvent<string>) {
    console.log('Received the custom ldSrLiveInfo event: ', event.detail)
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.alertSuffix = this.infoSuffix ? '' : '​'
    this.info = event.detail + this.infoSuffix
  }

  @Listen('ldSrLiveAlert', {
    target: 'document',
    passive: true,
  })
  handleAlert(event: CustomEvent<string>) {
    console.log('Received the custom ldSrLiveAlert event: ', event.detail)
    // MAGIC: the second “pseudo-empty” string contains a zero width space, which is required
    // in order to repeat an alert message, without altering the printed message displayed on the screen.
    this.alertSuffix = this.alertSuffix ? '' : '​'
    this.alert = event.detail + this.alertSuffix
  }

  render() {
    return (
      <Host class="ld-sr-live ld-sr-only">
        <span role="status" aria-live="polite" aria-relevant="text">
          {this.info}
        </span>
        <span role="alert" aria-live="polite" aria-relevant="text">
          {this.alert}
        </span>
      </Host>
    )
  }
}
