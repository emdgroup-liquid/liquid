/**
 * Allows using lowercase props as aliases for camelcase props.
 * This resolves issues in react based applications, where
 * otherwise only kebabcase attributes would work, but are not
 * proposed by intellisense.
 */
export function applyPropAliases() {
  if (!this.el) {
    throw new Error(`Component ${this.name} is missing @Element() decorator.`)
  }
  for (const prop in this) {
    if (prop !== prop.toLowerCase()) {
      const lowercaseAttr = this.el.getAttribute(prop.toLowerCase())
      if (lowercaseAttr) {
        this[prop] = lowercaseAttr
      }
    }
  }
}
