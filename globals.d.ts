declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoPa11yViolations(): R
    }
  }
}
export {}
