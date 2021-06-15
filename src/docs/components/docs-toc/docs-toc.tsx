import { Component, h, Host, Element, Listen, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-toc',
  styleUrl: 'docs-toc.css',
  shadow: false,
})
export class DocsToc {
  @Element() el: HTMLElement
  @State() headings: HTMLElement[]

  private createObserver(links) {
    const options = {
      rootMargin: '-60px 0px -70% 0px',
      threshold: 1,
    }
    const callback = (entries) => this.handleObserver(entries, links)
    return new IntersectionObserver(callback, options)
  }

  private handleObserver(entries, links) {
    for (let i = entries.length; i--; ) {
      const entry = entries[i]
      const { target, isIntersecting, intersectionRatio } = entry
      if (isIntersecting && intersectionRatio >= 1) {
        const visibleId = target.getAttribute('id')
        this.updateLinks(visibleId, links)
        return
      }
    }
  }

  private updateLinks(visibleId, links) {
    const heading = document.getElementById(visibleId)
    if (heading && (heading as HTMLElement).tagName === 'H1') {
      links.map((link) => {
        link.classList.remove('docs-toc__link--is-active')
      })
      links[0].classList.add('docs-toc__link--is-active')
      return
    }

    links.map((link) => {
      const href = link.getAttribute('href')
      link.classList.remove('docs-toc__link--is-active')
      if (href === `#${visibleId}`) {
        link.classList.add('docs-toc__link--is-active')
      }
    })
  }

  @Listen('click', { capture: true })
  handleClick(ev) {
    if ((ev.target as HTMLElement).tagName !== 'A') return

    ev.preventDefault()
    this.el
      .querySelector('.docs-toc__link--is-active')
      ?.classList.remove('docs-toc__link--is-active')
    ev.target.classList.add('docs-toc__link--is-active')
    const id = ev.target.getAttribute('href').replace('#', '')
    const heading = this.headings.find(
      (heading) => heading.getAttribute('id') === id
    )
    heading.setAttribute('tabindex', '-1')
    heading.focus()

    window.scroll({
      top: heading.offsetTop - 80,
    })
  }

  componentDidLoad() {
    // Generating a list of heading links
    setTimeout(() => {
      this.headings = Array.from(
        document.querySelectorAll('#main > h1, #main > h2, #main > h3')
      )

      // Adding an Intersection Observer
      const links = Array.from(this.el.querySelectorAll('a'))
      const observer = this.createObserver(links)
      this.headings.map((heading) => observer.observe(heading))
    })
  }

  render() {
    return (
      <Host class="docs-toc">
        <aside class="docs-toc__content">
          <h2 class="docs-toc__heading" aria-label="Content">
            Content
          </h2>
          <slot></slot>
        </aside>
      </Host>
    )
  }
}
