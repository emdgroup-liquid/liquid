class LocalStorage {
  private store: Map<string, string>

  get length() {
    return this.store.size
  }

  key(num: number) {
    return this.store.keys()[num]
  }

  constructor() {
    this.store = new Map()
  }

  clear() {
    this.store.clear()
  }

  getItem(key) {
    return this.store.get(key) || null
  }

  setItem(key, value) {
    this.store.set(key, value)
  }

  removeItem(key) {
    this.store.delete(key)
  }
}

Object.defineProperty(global, 'localStorage', { value: new LocalStorage() })
