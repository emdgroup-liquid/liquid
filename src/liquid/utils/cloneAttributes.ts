export function cloneAttributes(attributesToIgnore: string[] = []) {
  const attributesToIgnoreSet = new Set([
    'style',
    'id',
    'class',
    'slot',
    'part',
    ...attributesToIgnore,
  ])

  // Get attributes not in props.
  const attributesToClone = {}
  for (const attr of this.el.attributes) {
    if (attributesToIgnoreSet.has(attr.name)) {
      continue
    }
    const valueToClone = attr.value === '' ? true : attr.value
    attributesToClone[attr.name] = valueToClone
  }

  // Update cloned attributes state.
  this.clonedAttributes = attributesToClone

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
