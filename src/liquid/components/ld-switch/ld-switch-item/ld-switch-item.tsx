import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { cloneAttributes } from "../../../utils/cloneAttributes";
import { getClassNames } from "../../../utils/getClassNames";
import { isAriaDisabled } from "../../../utils/ariaDisabled";

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part label-element - wrapping label element
 * @part input - the form input element
 * @part content - content container element
 * @part label - text label container containing the main slot
 */
@Component({
  tag: "ld-switch-item",
  styleUrl: "ld-switch-item.css",
  shadow: true,
})
export class LdSwitchItem implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLLdSwitchItemElement;

  private attributesObserver: MutationObserver;

  private input: HTMLInputElement;
  private hiddenInput: HTMLInputElement;

  /** Alternative disabled state that keeps element focusable */
  @Prop({ reflect: true }) ariaDisabled: string;

  /** Indicates whether the switch item is selected. */
  @Prop({ mutable: true }) checked? = false;

  /** Disabled state of the switch item. */
  @Prop() disabled?: boolean;

  /**
   * @internal
   * Associates the control with a form element.
   */
  @Prop() form?: string;

  /**
   * @internal
   * Tab index of the input.
   */
  @Prop() ldTabindex?: number;

  /**
   * @internal
   * A string specifying a name for the input control. This name is submitted
   * along with the control's value when the form data is submitted.
   */
  @Prop() name?: string;

  /**
   * @internal
   * The value is not editable.
   */
  @Prop({ reflect: true }) readonly?: boolean;

  /**
   * @internal
   * Set by the outer switch component marking input element as required.
   */
  @Prop() required?: boolean;

  /** The input value. */
  @Prop() value?: string;

  @State() clonedAttributes;
  @State() hasLabel: boolean;

  /**
   * @internal
   * Emitted when the input value changed and the element loses focus.
   */
  @Event() ldswitchitemchange: EventEmitter<string>;

  /**
   * @internal
   * Emitted when the input receives focus.
   */
  @Event() ldswitchitemfocus: EventEmitter<string>;

  /** Sets focus on the switch item. */
  @Method()
  async focusInner() {
    this.input.focus();
  }

  @Watch("checked")
  @Watch("form")
  @Watch("name")
  @Watch("value")
  updateHiddenInput() {
    const outerForm = this.el.closest("form");
    if (!this.hiddenInput && this.name && (outerForm || this.form)) {
      this.createHiddenInput();
    }

    if (this.hiddenInput) {
      if (!this.name) {
        this.hiddenInput.remove();
        this.hiddenInput = undefined;
        return;
      }

      this.hiddenInput.name = this.name;
      this.hiddenInput.checked = this.checked;

      if (this.value) {
        this.hiddenInput.value = this.value;
      } else {
        this.hiddenInput.removeAttribute("value");
      }

      if (this.form) {
        this.hiddenInput.setAttribute("form", this.form);
      } else if (this.hiddenInput.getAttribute("form")) {
        if (outerForm) {
          this.hiddenInput.removeAttribute("form");
        } else {
          this.hiddenInput.remove();
          this.hiddenInput = undefined;
        }
      }
    }
  }

  private createHiddenInput() {
    this.hiddenInput = document.createElement("input");
    this.hiddenInput.type = "radio";
    this.hiddenInput.style.visibility = "hidden";
    this.hiddenInput.style.position = "absolute";
    this.hiddenInput.style.pointerEvents = "none";
    this.el.appendChild(this.hiddenInput);
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowUp":
      case "ArrowLeft":
        ev.preventDefault();
        this.focusAndSelect("prev");
        return;
      case "ArrowDown":
      case "ArrowRight":
        ev.preventDefault();
        this.focusAndSelect("next");
    }
  };

  private handleClick = (ev: MouseEvent) => {
    if (
      this.checked ||
      this.disabled ||
      isAriaDisabled(this.ariaDisabled) ||
      this.readonly
    ) {
      ev.preventDefault();
      return;
    }

    // Uncheck siblings.
    Array.from(
      this.el.parentElement.querySelectorAll("ld-switch-item"),
    ).forEach((ldSwitchItem) => {
      ldSwitchItem.checked = false;
    });

    this.checked = true;

    this.el.dispatchEvent(new InputEvent("change", { bubbles: true }));
    this.ldswitchitemchange.emit(this.el.value);
  };

  private handleFocus = () => {
    this.ldswitchitemfocus.emit();
  };

  private focusAndSelect(dir: "next" | "prev") {
    const sibling = (
      dir === "next"
        ? this.el.nextElementSibling
        : this.el.previousElementSibling
    ) as HTMLLdSwitchItemElement;
    if (sibling) {
      sibling.focusInner();
      sibling.click();
    }
  }

  componentWillLoad() {
    this.hasLabel = Array.from(this.el.childNodes).some(
      (el: HTMLElement) =>
        el.tagName !== "LD-ICON" &&
        !el.classList?.contains("ld-icon") &&
        el.textContent.trim(),
    );

    this.attributesObserver = cloneAttributes.call(this);
  }

  disconnectedCallback() {
    // istanbul ignore if
    if (this.attributesObserver) this.attributesObserver.disconnect();
  }

  render() {
    const cl = getClassNames([
      "ld-switch-item",
      this.hasLabel && "ld-switch-item--has-label",
    ]);

    return (
      <Host onClick={this.handleClick} class={cl}>
        <label part="label-element">
          <input
            type="radio"
            {...this.clonedAttributes}
            part="input focusable"
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            ref={(ref) => (this.input = ref)}
            required={this.required}
            disabled={this.disabled}
            checked={this.checked}
            tabIndex={this.checked ? this.ldTabindex : -1}
          />
          <span part="content" class="ld-switch-item__content">
            <slot name="icon-start" />
            <span part="label" class="ld-switch-item__label">
              <slot />
            </span>
            <slot name="icon-end" />
          </span>
        </label>
      </Host>
    );
  }
}
