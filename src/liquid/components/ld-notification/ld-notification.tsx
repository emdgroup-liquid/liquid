import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Listen, State, Watch } from '@stencil/core'

type Notification = {
  type: 'info' | 'warn' | 'error'
  content: string
  timeout?: number
}

const DEFAULT_NOTIFICATION_TIMEOUT = 6000

@Component({
  tag: 'ld-notification',
  styleUrl: 'ld-notification.css',
  shadow: false,
})
export class LdNotification {
  @State() queue: Notification[] = []

  @State() dismissTimeout: number

  @State() currentNotification?: Notification

  @Watch('currentNotification')
  updateDismissTimeout() {
    clearTimeout(this.dismissTimeout)

    if (!this.currentNotification) return
    if (this.currentNotification.type === 'error') return
    if (this.currentNotification.timeout === 0) return

    this.dismissTimeout = window.setTimeout(() => {
      this.queue = this.queue.slice(0, -1)
    }, this.currentNotification.timeout || DEFAULT_NOTIFICATION_TIMEOUT)
  }

  @Listen('ldNotification', {
    target: 'window',
    passive: true,
  })
  handleNotification(ev: CustomEvent<Notification>) {
    ev.stopImmediatePropagation()
    const newNotification = ev.detail

    // If the same notification is already in queue (same content, same type), ignore this notification.
    const inQueue = this.queue.find(
      (notification) =>
        notification.content === newNotification.content &&
        notification.type === newNotification.type
    )
    if (inQueue) return

    // Insert by relevance, whith error notifications being more relevant than non-error notifications.
    if (newNotification.type === 'error') {
      this.queue = [...this.queue, newNotification]
      this.currentNotification = newNotification
      return
    }

    const firstErrorNotificationIndex = this.queue.findIndex(
      (notification) => notification.type === 'error'
    )
    if (firstErrorNotificationIndex === -1) {
      this.queue = [...this.queue, newNotification]
      this.currentNotification = newNotification
      return
    }

    this.queue.splice(firstErrorNotificationIndex, 0, newNotification)
    this.queue = [...this.queue]
  }

  @Listen('ldNotificationDismiss', {
    target: 'window',
    passive: true,
  })
  handleNotificationDismiss() {
    this.queue = this.queue.slice(0, -1)
    this.currentNotification = this.queue[this.queue.length - 1]
  }

  @Listen('ldNotificationClear', {
    target: 'window',
    passive: true,
  })
  handleNotificationClear() {
    this.queue = []
    this.currentNotification = undefined
  }

  disconnectedCallback() {
    clearTimeout(this.dismissTimeout)
  }

  render() {
    return (
      <Host
        class="ld-notifcation"
        role="region"
        aria-live="polite"
        aria-relevant="additions"
      >
        {this.queue.map((notification, index) => (
          <div
            class={`ld-notification__item ld-notification__item--${notification.type}`}
            key={index}
          >
            <div
              class="ld-notification__item-content"
              innerHTML={notification.content}
              role={notification.type === 'error' ? 'alert' : 'status'}
            ></div>
            <button
              class="ld-notification__btn-dismiss"
              onClick={this.handleNotificationDismiss.bind(this)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Dismiss</title>
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </Host>
    )
  }
}
