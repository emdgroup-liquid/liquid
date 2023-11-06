import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { LdMenuitemGroup } from "../../ld-menuitem-group/ld-menuitem-group";
import { LdMenuitem } from "../../ld-menuitem/ld-menuitem";
import { LdMenu } from "../ld-menu";
import "../../../../utils/mutationObserver";

describe("ld-menu", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [LdMenu],
      template: () => (
        <ld-menu>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it("forwards size prop to menu items", async () => {
    const page = await newSpecPage({
      components: [LdMenu, LdMenuitem, LdMenuitemGroup],
      template: () => (
        <ld-menu size="sm">
          <ld-menuitem>Menu item 1</ld-menuitem>
          <ld-menuitem-group>
            <ld-menuitem>Menu item 2</ld-menuitem>
            <ld-menuitem>Menu item 3</ld-menuitem>
          </ld-menuitem-group>
        </ld-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it("forwards size prop changes to menu items", async () => {
    const page = await newSpecPage({
      components: [LdMenu, LdMenuitem, LdMenuitemGroup],
      template: () => (
        <ld-menu size="sm">
          <ld-menuitem>Menu item 1</ld-menuitem>
          <ld-menuitem-group>
            <ld-menuitem>Menu item 2</ld-menuitem>
            <ld-menuitem>Menu item 3</ld-menuitem>
          </ld-menuitem-group>
        </ld-menu>
      ),
    });

    page.root.size = "lg";
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  describe("keyboard navigation", () => {
    let item1: HTMLLdMenuitemElement,
      item2: HTMLLdMenuitemElement,
      item3: HTMLLdMenuitemElement,
      item4: HTMLLdMenuitemElement;

    beforeEach(async () => {
      const page = await newSpecPage({
        components: [LdMenu, LdMenuitem, LdMenuitemGroup],
        template: () => (
          <ld-menu size="sm">
            <ld-menuitem>First menu item</ld-menuitem>
            <ld-menuitem>Second menu item</ld-menuitem>
            <ld-menuitem-group>
              <ld-menuitem>Third menu item</ld-menuitem>
              <ld-menuitem>Fourth menu item</ld-menuitem>
            </ld-menuitem-group>
          </ld-menu>
        ),
      });

      const items = Array.from(page.root.querySelectorAll("ld-menuitem"));
      [item1, item2, item3, item4] = items;

      items.forEach((item) => {
        Object.defineProperty(item, "focusInner", {
          value: jest.fn(),
          configurable: true,
          writable: true,
        });
      });
    });

    it("focuses items with a matching first character", async () => {
      item1.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "t",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item2.focusInner).not.toHaveBeenCalled();
      expect(item3.focusInner).toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      item3.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "f",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item4.focusInner).toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      item4.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "f",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      item4.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "f",
          bubbles: true,
          composed: true,
        }),
      );
      item4.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "i",
          bubbles: true,
          composed: true,
        }),
      );
      item4.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "s",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalledTimes(3);
      expect(item2.focusInner).toHaveBeenCalledTimes(0);
      expect(item3.focusInner).toHaveBeenCalledTimes(1);
      expect(item4.focusInner).toHaveBeenCalledTimes(2);
    });

    it("focuses last item on End key", async () => {
      item1.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "End",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item4.focusInner).toHaveBeenCalled();
    });

    it("focuses first item on Home key", async () => {
      item3.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Home",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalled();
    });

    it("focuses last item on ArrowDown + meta key", async () => {
      item1.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          composed: true,
          metaKey: true,
        }),
      );

      expect(item4.focusInner).toHaveBeenCalled();
    });

    it("focuses first item on ArrowUp + meta key", async () => {
      item3.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowUp",
          bubbles: true,
          composed: true,
          metaKey: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalled();
    });

    it("focuses next item on ArrowDown key", async () => {
      item1.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item2.focusInner).toHaveBeenCalled();

      item2.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item3.focusInner).toHaveBeenCalled();
    });

    it("focuses previous item on ArrowUp key", async () => {
      item3.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowUp",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item2.focusInner).toHaveBeenCalled();

      item2.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowUp",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalled();
    });

    it("focuses first item on ArrowDown key, if last item is focused", async () => {
      item4.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item1.focusInner).toHaveBeenCalled();
    });

    it("focuses last item on ArrowUp key, if first item is focused", async () => {
      item1.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowUp",
          bubbles: true,
          composed: true,
        }),
      );

      expect(item4.focusInner).toHaveBeenCalled();
    });
  });

  it("does not throw when disconnecting before hydration", () => {
    const component = new LdMenu();
    component.disconnectedCallback();
  });

  it("does not throw when disconnecting after typeAheadHandler initialization", () => {
    const component = new LdMenu();
    component.componentWillLoad();
    expect(component.typeAheadHandler).toBeTruthy();
    component.disconnectedCallback();
  });
});
