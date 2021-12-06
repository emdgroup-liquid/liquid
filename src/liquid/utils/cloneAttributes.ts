export function cloneAttributes(attributesToIgnore: string[] = []) {
  const attributes = []
  for (const key in this) {
    // Component props are getters. Getters don't have a descriptor.
    // So we can check for component props as follows:
    if (!Object.getOwnPropertyDescriptor(this, key) && this[key]) {
      attributes.push({
        name: key.replaceAll(/([A-Z])/g, '-$1').toLowerCase(),
        value: this[key],
      })
    }
  }
  return Object.values(attributes).reduce((acc, { name, value }) => {
    if (
      !name ||
      ['style', 'id', 'class', 'slot', 'part', ...attributesToIgnore].includes(
        name
      )
    ) {
      return acc
    }

    acc[name] = value || true

    return acc
  }, {})
}
