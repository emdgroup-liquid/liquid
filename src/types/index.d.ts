interface InnerFocusable {
  focusInner: () => Promise<void>;
  ldTabindex?: number;
}

interface ClonesAttributes {
  clonedAttributes: Record<string, string | number | boolean>; // should use State decorator
}

interface SanitizeConfig extends import("dompurify").Config {
  RETURN_DOM_FRAGMENT?: false | undefined;
  RETURN_DOM?: false | undefined;
}

interface CollatorOptions {
  numeric?: boolean;
  numberingSystem?: string;
}
declare type NumberingSystem = typeof Intl.NumberingSystem;
