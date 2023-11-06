export function makeInert(el: HTMLElement) {
  if (!el.dataset.ldIsInert) {
    const prevTabindex = el.getAttribute("tabindex");
    if (prevTabindex) el.dataset.ldPrevTabindex = prevTabindex;
    el.setAttribute("tabindex", "-1");

    const prevAriaHidden = el.getAttribute("aria-hidden");
    if (prevAriaHidden) el.dataset.ldPrevAriaHidden = prevAriaHidden;
    el.setAttribute("aria-hidden", "true");

    el.dataset.ldIsInert = "true";
  }

  if (el.children) Array.from(el.children).forEach(makeInert);
  if (el.shadowRoot) Array.from(el.shadowRoot.children).forEach(makeInert);
}

export function unmakeInert(el: HTMLElement) {
  if (el.dataset.ldIsInert) {
    const prevTabindex = el.dataset.ldPrevTabindex;
    if (prevTabindex) {
      el.setAttribute("tabindex", prevTabindex);
    } else {
      el.removeAttribute("tabindex");
    }
    delete el.dataset.ldPrevTabindex;

    const prevAriaHidden = el.dataset.ldPrevAriaHidden;
    if (prevAriaHidden) {
      el.setAttribute("aria-hidden", prevAriaHidden);
    } else {
      el.removeAttribute("aria-hidden");
    }
    delete el.dataset.ldPrevAriaHidden;

    delete el.dataset.ldIsInert;
  }

  if (el.children) Array.from(el.children).forEach(unmakeInert);
  if (el.shadowRoot) Array.from(el.shadowRoot.children).forEach(unmakeInert);
}
