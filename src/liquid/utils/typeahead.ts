import { focusInnerOrFocus } from "./focus";

const isPrintableCharacter = (key: string) =>
  key.length === 1 && key.match(/\S/);

export class TypeAheadHandler<T extends HTMLElement> {
  private currentIndex: number;
  private typeAheadQuery = "";
  private typeAheadTimeout: number;
  private _options: T[];

  constructor(optionNodes: NodeListOf<T> | T[]) {
    this.options = optionNodes;
  }

  set options(optionNodes: NodeListOf<T> | T[]) {
    this._options = Array.isArray(optionNodes)
      ? optionNodes
      : Array.from(optionNodes);
  }

  private getElementByQuery = () => {
    if (!this.typeAheadQuery) return;

    const query = this.typeAheadQuery.toLowerCase();
    const values = this._options.map((option) =>
      option.textContent.trim().toLowerCase(),
    );
    let index = values.findIndex(
      (value, index) => index > this.currentIndex && value.indexOf(query) === 0,
    );

    // only search again from index 0, if you previously started from an index > 0
    if (index === -1 && this.currentIndex > -1) {
      index = values.findIndex((value) => value.indexOf(query) === 0);
    }

    if (index > -1) {
      return this._options[index];
    }

    // find the first value that is alphabetically following the query
    const matchingLabel = [...values].sort().find((value) => query < value);

    if (matchingLabel) {
      return this._options[values.indexOf(matchingLabel)];
    }
  };

  clearTimeout() {
    window.clearTimeout(this.typeAheadTimeout);
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
      return;
    }

    // set the current index only once while adding to a typeahead query
    if (!this.typeAheadQuery) {
      this.currentIndex = currentElement
        ? this._options.indexOf(currentElement)
        : -1;
    }

    this.typeAheadQuery = this.typeAheadQuery + key;

    const focusableElement = this.getElementByQuery();

    if (focusableElement) {
      focusInnerOrFocus(focusableElement);
    }

    this.clearTimeout();
    this.typeAheadTimeout = window.setTimeout(() => {
      this.typeAheadQuery = "";
    }, 500);

    return focusableElement;
  };
}
