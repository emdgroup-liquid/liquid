export function cloneAttributes(attributesToIgnore: string[] = []) {
  const attributesToIgnoreSet = new Set([
    'style',
    'id',
    'class',
    'slot',
    'part',
    ...attributesToIgnore,
  ])

  // Get attributes from props.
  const attributesFromProps = {}
  for (const key in this) {
    // Component props are getters. Getters don't have a descriptor.
    // So we can check for component props as follows:
    if (
      !Object.getOwnPropertyDescriptor(this, key) &&
      this[key] !== undefined &&
      this[key] !== null
    ) {
      const attrName = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase()

      if (!attributesToIgnoreSet.has(attrName)) {
        attributesFromProps[attrName] = this[key]
      }
    }
  }

  // Get attributes not in props.
  const attributesNotInProps = {}
  for (const attr of this.el.attributes) {
    if (
      attr.name in attributesFromProps ||
      attributesToIgnoreSet.has(attr.name)
    ) {
      continue
    }
    attributesNotInProps[attr.name] = attr.value
  }

  // Update cloned attributes state.
  const allAttributes = { ...attributesFromProps, ...attributesNotInProps }
  this.clonedAttributes = allAttributes

  // Set up attributes observer.
  const callback = (mutationsList) => {
    // Update cloned attributes state.
    for (const mutation of mutationsList) {
      const { attributeName } = mutation
      if (!attributesToIgnoreSet.has(attributeName)) {
        const attrValue = this.el.getAttribute(attributeName)
        if (attrValue === undefined || attrValue === null) {
          delete this.clonedAttributes[attributeName]
        } else {
          this.clonedAttributes[attributeName] = attrValue
        }
      }
    }

    // Trigger state update.
    this.clonedAttributes = { ...this.clonedAttributes }
  }
  const observer = new MutationObserver(callback)
  observer.observe(this.el, {
    subtree: false,
    childList: false,
    attributes: true,
  })

  return observer
}
