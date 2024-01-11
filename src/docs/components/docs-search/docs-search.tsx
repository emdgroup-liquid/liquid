import 'wicg-inert'
import { Component, h, Listen, State, Host } from '@stencil/core'
import Fuse, { FuseResult } from 'fuse.js'
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
  assetsDirs: ['assets'],
})
export class DocsSearch {
  private searchInput!: HTMLLdInputElement
  private searchResults!: HTMLOListElement
  private fuse: Fuse<SearchResult>

  @State() results: FuseResult<SearchResult>[] = []
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
  handleEscapeDown(ev: KeyboardEvent) {
    if (!this.isActive) {
      return
    }
    if (ev.key === 'Escape') {
      ev.stopImmediatePropagation()
      this.onSearchClose()
    }
  }

  @Listen('keydown', {
    passive: false,
  })
  handleKeyDown(ev: KeyboardEvent) {
    if (!this.isActive) {
      return
    }
    switch (ev.key) {
      case 'ArrowDown': {
        ev.preventDefault()

        if (
          document.activeElement.closest('.docs-search__input') ===
          this.searchInput
        ) {
          ;(
            this.searchResults.querySelector(
              '.docs-search__result > a'
            ) as HTMLAnchorElement
          )?.focus()
          return
        }

        const nextSibling = document.activeElement.closest(
          '.docs-search__result'
        )?.nextElementSibling
        if (nextSibling?.classList.contains('docs-search__result')) {
          ;(nextSibling.querySelector('a') as HTMLAnchorElement).focus()
        }
        return
      }

      case 'ArrowUp': {
        ev.preventDefault()

        const focusedSearchResult = document.activeElement.closest(
          '.docs-search__result'
        )

        if (focusedSearchResult) {
          const prevSibling = focusedSearchResult.previousElementSibling
          if (prevSibling?.classList.contains('docs-search__result')) {
            ;(prevSibling.querySelector('a') as HTMLAnchorElement).focus()
          } else {
            this.searchInput.shadowRoot.querySelector('input').focus()
            this.searchResults.scrollTo(0, 0)
          }
        }
        return
      }

      case ' ': {
        const focusedSearchResult = document.activeElement.closest(
          '.docs-search__result'
        )

        if (focusedSearchResult) {
          ev.preventDefault()
          window.location.href = (
            focusedSearchResult.querySelector('a') as HTMLAnchorElement
          ).href
        }
        return
      }
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
      this.searchInput.focusInner()
    }, 200)
  }

  private onSearchClose() {
    document.getElementById('docs-layout').removeAttribute('inert')
    this.isActive = false
    this.results = []
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
              size="lg"
              aria-expanded={this.results.length ? 'true' : 'false'}
              aria-controls="docs-search-results-list"
              onInput={this.handleChange.bind(this)}
              placeholder="Search in documentation..."
              class="docs-search__input"
              id="docs-search-input"
              ref={(el) => (this.searchInput = el as HTMLLdInputElement)}
              type="search"
              spellcheck={false}
            >
              <svg
                aria-hidden="true"
                slot="start"
                class="docs-search__input-icon"
                fill="none"
                viewBox="0 0 18 19"
              >
                <ellipse
                  cx="7.54523"
                  cy="7.74543"
                  stroke="#091734"
                  stroke-width="2"
                  rx="6.54523"
                  ry="6.54548"
                />
                <path
                  stroke="#091734"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.6367 12.8362l4.3635 4.3636"
                />
              </svg>
            </ld-input>
          </form>
          <ol
            id="docs-search-results-list"
            class={`docs-search__results${
              this.results.length ? ' docs-search__results--expanded' : ''
            }`}
            aria-label="Search results"
            ref={(el) => (this.searchResults = el as HTMLOListElement)}
          >
            {this.results.length
              ? this.results.map((result) => {
                  if (!result.item.breadcrumbs.length) return ''
                  return (
                    <li class="docs-search__result" key={result.refIndex}>
                      <a href={result.item.url}>
                        <b>{result.item.title}</b>
                        <span class="docs-search__result-crumbs">
                          {result.item.breadcrumbs.map((crumb) => (
                            <span class="docs-search__result-crumb">
                              {crumb}
                            </span>
                          ))}
                        </span>
                      </a>
                    </li>
                  )
                })
              : ''}
          </ol>
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
