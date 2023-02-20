import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part dialog - Actual `dialog` element
 * @part content - `div` element wrapping the default slot
 * @part footer - `footer` element
 * @part header - `header` element
 */
@Component({
  tag: 'ld-modal',
  styleUrl: 'ld-modal.css',
  shadow: true,
})
export class LdModal {
  @Element() el: HTMLElement
  private dialogRef: HTMLDialogElement

  /** The modal is cancelable by default. However, you can change this using this prop. */
  @Prop() cancelable?: boolean = true

  /** Indicates that the modal dialog is active and can be interacted with. */
  @Prop({ mutable: true, reflect: true }) open?: boolean

  /** Use a blurry backdrop. */
  @Prop() blurryBackdrop?: boolean = false

  /** Emitted when modal is opening (before transition). */
  @Event() ldmodalopening: EventEmitter

  /** Emitted when modal has opened (after transition). */
  @Event() ldmodalopened: EventEmitter

  /** Emitted when modal is closing (before transition). */
  @Event() ldmodalclosing: EventEmitter

  /** Emitted when modal has closed (after transition). */
  @Event() ldmodalclosed: EventEmitter

  /** Opens the modal dialog. */
  @Method()
  async showModal() {
    this.open = true
  }

  /** Closes the modal dialog. */
  @Method()
  async close() {
    this.open = false
  }

  @Listen('keydown', { passive: true, target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && this.cancelable) {
      this.open = false
    }
  }

  @Watch('open')
  onOpenChange(open: boolean) {
    // Calling the showModal and close methods on the dialog element here
    // is super important, because these make the native focus trap and
    // the backdrop feature work.
    // TODO: Remove @ts-ignore comments as soon as TS types get updated.
    if (open) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.dialogRef.showModal()
      this.ldmodalopening.emit()
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.dialogRef.close()
      this.ldmodalclosing.emit()
    }
  }

  private handleClose = () => {
    // When the dialog is closed with the Esc key we need to
    // update the open prop explicitly.
    this.open = false
  }

  private handleCancel = (ev: Event) => {
    if (!this.cancelable) {
      ev.preventDefault()
    }
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.cancelable && (ev.target as HTMLElement).tagName === 'DIALOG') {
      this.close()
    }
  }

  private handleTransitionEnd = () => {
    if (this.open) {
      this.ldmodalopened.emit()
    } else {
      this.ldmodalclosed.emit()
    }
  }

  componentDidLoad() {
    this.dialogRef.addEventListener('cancel', this.handleCancel)
  }

  disconnectedCallback() {
    this.dialogRef.removeEventListener('cancel', this.handleCancel)
  }

  render() {
    const cl = getClassNames([
      'ld-modal',
      this.blurryBackdrop && 'ld-modal--blurry-backdrop',
    ])

    return (
      <Host class={cl}>
        <dialog
          onClick={this.handleClick}
          onClose={this.handleClose}
          onTransitionEnd={this.handleTransitionEnd}
          open={this.open}
          part="dialog"
          ref={(el) => (this.dialogRef = el as HTMLDialogElement)}
        >
          <header class="ld-modal__header" part="header">
            <slot name="header"></slot>
            {this.cancelable && (
              <button
                class="ld-modal__x"
                aria-label="Dismiss"
                onClick={this.close.bind(this)}
              ></button>
            )}
          </header>
          <div class="ld-modal__content" part="content">
            <slot></slot>
          </div>
          <footer class="ld-modal__footer" part="footer">
            <slot name="footer"></slot>
          </footer>
        </dialog>
      </Host>
    )
  }
}
