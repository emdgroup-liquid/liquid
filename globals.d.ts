declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoAccessibilityIssues(): R
    }
  }

  interface Window {
    __LD_ASSET_PATH__?: string
  }
}

export {}
