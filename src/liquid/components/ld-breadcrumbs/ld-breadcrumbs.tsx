import { Component, h, Element } from '@stencil/core'

/**
 * @part list - Breadcrumbs list
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */

@Component({
  tag: 'ld-breadcrumbs',
  styleUrl: 'ld-breadcrumbs.css',
  shadow: true,
})
export class LdBreadcrumbs {
  @Element() el: HTMLElement

  private observer: MutationObserver

  private updateCurrent = () => {
    const crumbs = this.el.querySelectorAll('ld-crumb')
    if (!crumbs.length) return

    crumbs.forEach((crumb) => {
      crumb.current = undefined
    })
    crumbs[crumbs.length - 1].current = true
  }

  componentDidLoad() {
    this.observer = new MutationObserver(this.updateCurrent)
    this.observer.observe(this.el, {
      subtree: true,
      childList: true,
      attributes: false,
    })

    this.updateCurrent()
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.observer) this.observer.disconnect()
  }

  render() {
    return (
      <nav aria-label="Breadcrumbs" class="ld-breadcrumbs">
        <ol class="ld-breadcrumbs__list" part="list">
          <slot></slot>
        </ol>
      </nav>
    )
  }
}
