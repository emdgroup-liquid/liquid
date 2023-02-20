import { Component, h, Host, Listen, Prop, State, Watch } from '@stencil/core'

type Notification = {
  type: 'info' | 'warn' | 'alert'
  content: string
  timeout?: number
}

const DEFAULT_NOTIFICATION_TIMEOUT = 6000
const FADE_TRANSITION_DURATION = 200

@Component({
  tag: 'ld-notification',
  styleUrl: 'ld-notification.shadow.css',
  shadow: true,
})
export class LdNotification {
  /**
   * Notification placement within the screen.
   */
  @Prop() placement?: 'top' | 'bottom' = 'top'

  @State() queue: Notification[] = []
  @State() queueDismissed: Notification[] = []

  @State() dismissTimeout: NodeJS.Timeout | null

  @State() fadeoutTimeouts: (NodeJS.Timeout | null)[] = []

  @State() currentNotification?: Notification

  @Watch('currentNotification')
  updateDismissTimeout() {
    clearTimeout(this.dismissTimeout)

    if (!this.currentNotification) return
    if (this.currentNotification.type === 'alert') return
    if (this.currentNotification.timeout === 0) return

    this.dismissTimeout = setTimeout(() => {
      this.handleNotificationDismiss()
    }, this.currentNotification.timeout || DEFAULT_NOTIFICATION_TIMEOUT)
  }

  @Listen('ldNotificationAdd', {
    target: 'window',
    passive: true,
  })
  handleNotification(ev: CustomEvent<Notification>) {
    ev.stopImmediatePropagation()
    const newNotification = ev.detail

    // If the same notification is already in queue (same content, same type), ignore this notification.
    const inQueue = this.queue.some(
      (notification) =>
        notification.content === newNotification.content &&
        notification.type === newNotification.type
    )
    if (inQueue) return

    // Insert by relevance, whith error notifications being more relevant than non-error notifications.
    if (newNotification.type === 'alert') {
      this.queue = [...this.queue, newNotification]
      this.currentNotification = newNotification
      return
    }

    const firstErrorNotificationIndex = this.queue.findIndex(
      (notification) => notification.type === 'alert'
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
    if (!this.currentNotification) return

    this.queueDismissed.unshift(this.queue.pop())
    this.queueDismissed = [...this.queueDismissed]
    this.queue = [...this.queue]
    this.currentNotification = this.queue[this.queue.length - 1]

    this.fadeoutTimeouts.push(
      setTimeout(() => {
        this.queueDismissed = this.queueDismissed.slice(0, -1)
      }, FADE_TRANSITION_DURATION)
    )
  }

  @Listen('ldNotificationClear', {
    target: 'window',
    passive: true,
  })
  handleNotificationClear() {
    this.queueDismissed = [...this.queue]
    this.queue = []
    this.currentNotification = undefined
    this.fadeoutTimeouts.forEach(clearTimeout)
    this.fadeoutTimeouts.push(
      setTimeout(() => {
        this.queueDismissed = []
      }, FADE_TRANSITION_DURATION)
    )
  }

  private renderNotification(notification: Notification, dismissed = false) {
    let cl = `ld-notification__item ld-notification__item--${notification.type}`
    if (dismissed) cl += ' ld-notification__item--dismissed'

    return (
      <div
        class={cl}
        key={notification.type + notification.content}
        part="item"
      >
        <div
          class="ld-notification__item-content"
          innerHTML={notification.content}
          role={notification.type === 'alert' ? 'alert' : 'status'}
          part="content"
        ></div>
        <button
          class="ld-notification__btn-dismiss"
          onClick={
            dismissed ? undefined : this.handleNotificationDismiss.bind(this)
          }
          part="btn-dismiss focusable"
        >
          {/* custom icon cross */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            part="btn-dismiss-icon"
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
    )
  }

  disconnectedCallback() {
    clearTimeout(this.dismissTimeout)
    this.fadeoutTimeouts.forEach(clearTimeout)
  }

  render() {
    const cl = `ld-notification ld-notification--${this.placement}`

    return (
      <Host class={cl} role="region" aria-label="Notifications">
        {this.queue.map((notification) =>
          this.renderNotification.call(this, notification)
        )}
        {this.queueDismissed.map((notification) =>
          this.renderNotification.call(this, notification, true)
        )}
      </Host>
    )
  }
}
