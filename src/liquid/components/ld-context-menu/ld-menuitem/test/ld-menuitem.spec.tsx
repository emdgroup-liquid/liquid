import { newSpecPage } from "@stencil/core/testing";
import { LdMenuitem } from "../ld-menuitem";
import {
  clearTriggerableMutationObservers,
  getTriggerableMutationObservers,
} from "../../../../utils/mutationObserver";

describe("ld-menuitem", () => {
  afterEach(clearTriggerableMutationObservers);

  it("renders default", async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem>Menu item</ld-menuitem>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("maps mode prop", async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem mode="neutral">Menu item 1</ld-menuitem>
      <ld-menuitem mode="highlight">Menu item 2</ld-menuitem>
      <ld-menuitem mode="danger">Menu item 3</ld-menuitem>`,
    });
    expect(page.body).toMatchSnapshot();
  });

  it("renders other known props", async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem
        disabled
        href="#"
        ld-tabindex="1"
        size="sm"
        target="_blank"
      >Menu item</ld-menuitem>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("clones attributes", async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem data-attribute="example">Menu item</ld-menuitem>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("updates cloned attributes", async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem data-attribute="example">Menu item</ld-menuitem>`,
    });

    page.root.setAttribute("data-attribute", "test");
    getTriggerableMutationObservers()[0].trigger([
      { attributeName: "data-attribute" },
    ]);
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it("allows to set inner focus", async () => {
    const { root } = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem data-attribute="example">Menu item</ld-menuitem>`,
    });
    const button = root.shadowRoot.querySelector("ld-button");

    button.focusInner = jest.fn();
    await root.focusInner();

    expect(button.focusInner).toHaveBeenCalled();
  });
});
