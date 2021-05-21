import '../../../components' // type definitions for type checking and intelliSense
import 'wicg-inert'
import { Component, h, Listen, State, Host } from '@stencil/core'
import Fuse from 'fuse.js'
import eventBus from '../../utils/eventBus'
import { SearchEventType } from '../../utils/eventTypes'

interface SearchResult {
  breadcrumbs: string[]
  headings: ''
  tags: string
  title: string
  url: string
}

/** @internal **/
@Component({
  tag: 'docs-search',
  styleUrl: 'docs-search.css',
  shadow: false,
})
export class DocsSearch {
  private searchInput!: HTMLLdInputElement
  private fuse: Fuse<SearchResult>

  @State() results: Fuse.FuseResult<SearchResult>[] = []
  @State() isActive: boolean

  @Listen('click', { capture: true })
  handleClick(ev) {
    if (ev.target.id === 'docs-search-backdrop') {
      ev.preventDefault()
      this.onSearchClose()
    }
  }

  @Listen('keydown', {
    passive: true,
  })
  handleKeyDown(ev: KeyboardEvent) {
    ev.stopImmediatePropagation()
    if (ev.key === 'Escape') {
      this.onSearchClose()
    }
  }

  @Listen('submit')
  handleSubmit(ev: Event) {
    ev.preventDefault()
  }

  private handleChange() {
    const searchResult = this.fuse.search(this.searchInput.value)
    this.results = searchResult
  }

  componentWillLoad() {
    this.fuse = new Fuse(window['__docsSearchIndex__'], {
      keys: [
        {
          name: 'title',
          weight: 0.4,
        },
        {
          name: 'tags',
          weight: 0.35,
        },
        {
          name: 'headings',
          weight: 0.25,
        },
      ],
      distance: 10000,
      threshold: 0.3,
    })
  }

  componentDidLoad() {
    eventBus.on(SearchEventType.open, this.onSearchOpen.bind(this))
  }

  private onSearchOpen() {
    document.getElementById('docs-layout').setAttribute('inert', 'true')
    this.isActive = true
    this.searchInput.value = ''
    setTimeout(() => {
      this.searchInput.querySelector('input').focus()
    })
  }

  private onSearchClose() {
    document.getElementById('docs-layout').removeAttribute('inert')
    this.isActive = false
    eventBus.emit(SearchEventType.close)
  }

  render() {
    return (
      <Host
        inert={!this.isActive}
        class={`docs-search${this.isActive ? ' docs-search--active' : ''}`}
      >
        <div class="docs-search__content">
          <form role="search" autocomplete="off">
            <ld-input
              onInput={this.handleChange.bind(this)}
              placeholder="Search in documentation..."
              class="docs-search__input"
              id="docs-search-input"
              ref={(el) => (this.searchInput = el as HTMLLdInputElement)}
              type="search"
              mode="light"
              spellcheck={false}
            ></ld-input>
          </form>
          {this.results.length ? (
            <ol class="docs-search__results" aria-label="Search results">
              {this.results.map((result) => {
                if (!result.item.breadcrumbs.length) return ''
                return (
                  <li class="docs-search__result" key={result.refIndex}>
                    <a href={result.item.url}>
                      <b>{result.item.title}</b>
                      <span class="docs-search__result-crumbs">
                        {result.item.breadcrumbs.map((crumb) => (
                          <span class="docs-search__result-crumb">{crumb}</span>
                        ))}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>
          ) : (
            ''
          )}
        </div>
        <button
          id="docs-search-backdrop"
          class="docs-search__backdrop"
          aria-label="Close search"
        ></button>
      </Host>
    )
  }
}
