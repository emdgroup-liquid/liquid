declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoAccessibilityIssues(options?: {
        violationsThreshold?: number;
        incompleteThreshold?: number;
      }): R;
    }
  }

  interface Window {
    __LD_ASSET_PATH__?: string;
  }
}

export {};
