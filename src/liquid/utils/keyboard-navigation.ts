import { focusInnerOrFocus } from './focus'

const isPrintableCharacter = (key: string) =>
  key.length === 1 && key.match(/\S/)

export class TypeAheadHandler<T extends HTMLElement> {
  private typeAheadQuery = ''
  private typeAheadTimeout: NodeJS.Timeout
  private _options: T[]

  constructor(optionNodes: NodeListOf<T> | T[]) {
    this.options = optionNodes
  }

  disconnectedCallback() {
    clearTimeout(this.typeAheadTimeout)
  }

  set options(optionNodes: NodeListOf<T> | T[]) {
    this._options = Array.isArray(optionNodes)
      ? optionNodes
      : Array.from(optionNodes)
  }

  private getElementByQuery = (currentElement?: T) => {
    if (!this.typeAheadQuery) return

    const currentIndex = this._options.indexOf(currentElement)
    const query = this.typeAheadQuery.toLowerCase()
    const values = this._options.map((option) =>
      option.textContent.trim().toLowerCase()
    )
    let index = values.findIndex(
      (value, index) => index > currentIndex && value.indexOf(query) === 0
    )

    if (index === -1) {
      index = values.findIndex((value) => value.indexOf(query) === 0)
    }

    if (index > -1) {
      return this._options[index]
    }

    // find the first value that is alphabetically following the query
    const matchingLabel = [...values].sort().find((value) => query < value)

    if (matchingLabel) {
      return this._options[values.indexOf(matchingLabel)]
    }
  }

  /**
   * Type a character: focus moves to the next item with a name that starts
   * with the typed character. Type multiple characters in rapid succession:
   * focus moves to the next item with a name that starts with the string of
   * characters typed.
   * @param key typed key
   * @returns The focused element, if any
   */
  typeAhead = (key: string, currentElement?: T) => {
    if (!isPrintableCharacter(key)) {
      return
    }

    this.typeAheadQuery = this.typeAheadQuery + key

    const focusableElement = this.getElementByQuery(currentElement)

    if (focusableElement) {
      focusInnerOrFocus(focusableElement)
    }

    clearTimeout(this.typeAheadTimeout)
    this.typeAheadTimeout = setTimeout(() => {
      this.typeAheadQuery = ''
    }, 500)

    return focusableElement
  }
}
