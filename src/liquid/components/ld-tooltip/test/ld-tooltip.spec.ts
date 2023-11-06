jest.mock("../../../utils/focus");

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { newSpecPage } from "@stencil/core/testing";
import { LdIcon } from "../../ld-icon/ld-icon";
import { LdTooltip } from "../ld-tooltip";
import { LdTooltipPopper } from "../ld-tooltip-popper/ld-tooltip-popper";
import {
  clearTriggerableMutationObservers,
  getTriggerableMutationObservers,
} from "../../../utils/mutationObserver";

const positions = [
  "bottom center",
  "bottom left",
  "bottom right",
  "left bottom",
  "left middle",
  "left top",
  "right bottom",
  "right middle",
  "right top",
  "top center",
  "top left",
  "top right",
];

describe("ld-tooltip", () => {
  afterEach(() => {
    jest.advanceTimersToNextTimer();
    clearTriggerableMutationObservers();
  });

  it("renders default", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    expect(page.root).toMatchSnapshot();
  });

  it("renders custom trigger", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <div slot="trigger">Custom trigger</div>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    expect(page.root).toMatchSnapshot();
  });

  it("renders with arrow", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip arrow>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    expect(page.root).toMatchSnapshot();
  });

  positions.forEach((position) => {
    it(`renders with position ${position}`, async () => {
      const page = await newSpecPage({
        components: [LdIcon, LdTooltip, LdTooltipPopper],
        html: `<ld-tooltip position="${position}">
          <h4>Headline</h4>
          <p>Text content</p>
        </ld-tooltip>`,
      });

      const component = page.root;
      const trigger = component.shadowRoot.querySelector(
        ".ld-tooltip__trigger",
      );
      const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
        ".ld-tooltip__content slot",
      );

      // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
      defaultSlot.assignedNodes = () =>
        component.querySelectorAll("> *") as unknown as Node[];
      trigger.dispatchEvent(new MouseEvent("mouseenter"));
      jest.advanceTimersByTime(0);
      await page.waitForChanges();

      expect(page.body).toMatchSnapshot();
    });
  });

  it(`places the popper inside a given element`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<form></form>
      <ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const form = page.body.querySelector("form");
    const component = page.root as HTMLLdTooltipElement;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    component.tetherOptions = { bodyElement: form };
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(page.body).toMatchSnapshot();
  });

  it(`initializes on mouseenter, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it(`initializes on focus, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    component.dispatchEvent(new FocusEvent("focus"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it(`does not initialize on click, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`initializes on click, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it("closes tooltip on click outside", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    const event = {
      type: "touchend",
      isTrusted: true,
      composedPath: () => [page.body],
    };
    page.body.dispatchEvent(event as unknown as Event);
    await page.waitForChanges();

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it("does not close tooltip on click inside", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    const event = {
      type: "touchend",
      isTrusted: true,
    };
    defaultSlot.dispatchEvent(event as Event);
    await page.waitForChanges();

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it(`does not initialize on mouseenter, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`does not initialize on focus, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    component.dispatchEvent(new FocusEvent("focus"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`does not initialize, if disabled (trigger-type: "hover")`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip disabled>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);

    trigger.dispatchEvent(new FocusEvent("focus"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`does not initialize, if disabled (trigger-type: "click")`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip disabled trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`hides on mouseleave, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`hides on blur, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    component.dispatchEvent(new FocusEvent("focus"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    component.dispatchEvent(new FocusEvent("blur"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it(`does not hide on click, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    trigger.dispatchEvent(new MouseEvent("click"));
    jest.advanceTimersByTime(0);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it(`shows after delay`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip show-delay="500">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(499);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);

    jest.advanceTimersByTime(1);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );
  });

  it(`hides after delay`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip hide-delay="500">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    jest.advanceTimersByTime(499);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).not.toBe(
      null,
    );

    jest.advanceTimersByTime(1);

    expect(component.shadowRoot.querySelector(".ld-tether-enabled")).toBe(null);
  });

  it("removes popper element on disconnect", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });

    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");
    const defaultSlot = component.shadowRoot.querySelector<HTMLSlotElement>(
      ".ld-tooltip__content slot",
    );

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    defaultSlot.assignedNodes = () =>
      component.querySelectorAll("> *") as unknown as Node[];
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);
    await page.waitForChanges();
    expect(page.body.querySelector("ld-tooltip-popper")).toBeTruthy();

    component.remove();
    await page.waitForChanges();
    expect(page.body.querySelector("ld-tooltip-popper")).toBeFalsy();
  });

  it("updates popper on content changes", async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    });
    const component = page.root;
    const trigger = component.shadowRoot.querySelector(".ld-tooltip__trigger");

    component.querySelector("p").textContent = "Changed content";

    const assignedNodes = component.querySelectorAll(
      "> *",
    ) as unknown as Node[];

    // TODO: remove as soon as https://github.com/ionic-team/stencil/issues/2830 is resolved
    const mockAssignedNodesOnDefaultSlot = () => {
      component.shadowRoot.querySelector<HTMLSlotElement>(
        ".ld-tooltip__content slot",
      ).assignedNodes = () => assignedNodes;
    };
    mockAssignedNodesOnDefaultSlot();

    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    jest.advanceTimersByTime(0);

    mockAssignedNodesOnDefaultSlot();

    await page.waitForChanges();
    getTriggerableMutationObservers()[0].trigger([]);
    await page.waitForChanges();

    expect(page.body.querySelector("ld-tooltip-popper p").textContent).toBe(
      "Changed content",
    );
  });

  it("does not throw when disconnecting before hydration", () => {
    const component = new LdTooltip();
    component.disconnectedCallback();
  });
});
