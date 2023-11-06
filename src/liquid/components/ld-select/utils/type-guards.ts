export const isLdOption = (
  el: HTMLElement | Node | EventTarget,
): el is HTMLLdOptionElement | HTMLLdOptionInternalElement =>
  ["LD-OPTION", "LD-OPTION-INTERNAL"].includes((el as HTMLElement)?.tagName);

export const isLdOptgroup = (
  el: HTMLElement | Node | EventTarget,
): el is HTMLLdOptgroupElement | HTMLLdOptgroupInternalElement =>
  ["LD-OPTGROUP", "LD-OPTGROUP-INTERNAL"].includes(
    (el as HTMLElement)?.tagName,
  );

export const isLdOptionInternal = (
  el: HTMLElement | Node | EventTarget,
): el is HTMLLdOptionInternalElement =>
  ["LD-OPTION-INTERNAL"].includes((el as HTMLElement)?.tagName);

export const isLdOptgroupInternal = (
  el: HTMLElement | Node | EventTarget,
): el is HTMLLdOptgroupInternalElement =>
  ["LD-OPTGROUP-INTERNAL"].includes((el as HTMLElement)?.tagName);

type HTMLLdOptInternal =
  | HTMLLdOptionInternalElement
  | HTMLLdOptgroupInternalElement;
export const isLdOptInternalHidden = (
  opt: HTMLLdOptInternal,
): opt is
  | (HTMLLdOptInternal & {
      hidden: true;
    })
  | (HTMLLdOptInternal & {
      filtered: true;
    }) => {
  return opt.hidden || opt.filtered;
};
