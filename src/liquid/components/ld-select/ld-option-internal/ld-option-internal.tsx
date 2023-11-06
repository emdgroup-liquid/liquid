import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Event,
  EventEmitter,
  Listen,
  State,
  Method,
  Watch,
} from "@stencil/core";
import { getClassNames } from "../../../utils/getClassNames";

/** @internal **/
@Component({
  tag: "ld-option-internal",
  styleUrl: "ld-option-internal.shadow.css",
  shadow: true,
})
export class LdOptionInternal implements InnerFocusable {
  @Element() el: HTMLElement;

  private optionRef: HTMLElement;

  /**
   * The content of this attribute represents the value to be submitted with the form,
   * should this option be selected. If this attribute is omitted, the value is taken
   * from the text content of the option element.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * If present, this boolean attribute indicates that the option is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected? = false;

  /**
   * Disables the option.
   */
  @Prop() disabled? = false;

  /**
   * Prevents deselection of a selected options when the selected option
   * is clicked in single select mode.
   */
  @Prop() preventDeselection?: boolean;

  /**
   * Display mode.
   */
  @Prop() mode?: "checkbox";

  /** Size of the option. */
  @Prop() size?: "sm" | "lg";

  /** Set to true on filtering via select input. */
  @Prop() filtered? = false;

  /** Tab index of the option. */
  @Prop() ldTabindex? = -1;

  /** Sets focus internally. */
  @Method()
  async focusInner() {
    this.optionRef.focus();
  }

  /**
   * @internal
   * Emitted on either selection or de-selection of the option.
   */
  @Event() ldoptionselect: EventEmitter<boolean>;

  @State() title: string;

  @State() hasFocus: boolean;
  @State() hasHover: boolean;
  @State() indent?: boolean = false;

  @Watch("selected")
  handleSelectedChange() {
    this.ldoptionselect.emit(this.selected);
  }

  private handleClick = () => {
    if (this.disabled) return;

    if (
      !this.preventDeselection ||
      !this.selected ||
      this.mode === "checkbox"
    ) {
      this.selected = !this.selected;
    }
  };

  @Listen("keydown", { passive: false })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === " " || ev.key === "Enter") {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      this.handleClick();
    }
  }

  componentWillLoad() {
    if (typeof this.value === "undefined") {
      setTimeout(() => {
        this.value = this.el.innerText;
      });
    }
    if (this.mode === "checkbox" && this.el.closest("ld-optgroup-internal")) {
      this.indent = true;
    }
  }

  render() {
    return (
      <Host>
        <div
          class={getClassNames([
            "ld-option-internal",
            this.indent && `ld-option-internal--indent`,
            this.size && `ld-option-internal--${this.size}`,
            this.filtered && "ld-option-internal--filtered",
          ])}
          role="option"
          ref={(el) => (this.optionRef = el as HTMLElement)}
          aria-selected={this.selected ? "true" : undefined}
          aria-disabled={this.disabled ? "true" : undefined}
          onClick={this.handleClick}
          tabindex={this.ldTabindex}
          part="option focusable"
        >
          {this.mode === "checkbox" ? (
            <div
              class="ld-option-internal__checkbox-wrapper"
              role="presentation"
              part="checkbox-wrapper"
            >
              <ld-checkbox
                class="ld-option-internal__checkbox"
                checked={this.selected}
                disabled={this.disabled}
                part="checkbox"
              ></ld-checkbox>
            </div>
          ) : (
            <svg
              role={"presentation"}
              class="ld-option-internal__check"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              part="check"
            >
              <path
                style={{ visibility: this.selected ? "inherit" : "hidden" }}
                d="M15 7L8.40795 13L5 9.63964"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}

          <span
            class="ld-option-internal__label"
            title={this.title}
            part="label"
          >
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
