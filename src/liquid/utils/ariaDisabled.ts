// 'true', '1', 'yolo' etc. correspond to an aria disabled element, but not 'false'.
export const isAriaDisabled = (ariaDisabledValue: string | undefined) =>
  ariaDisabledValue && ariaDisabledValue !== "false";
