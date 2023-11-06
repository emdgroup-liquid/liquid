import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { LdMenuitemGroup } from "../ld-menuitem-group";

describe("ld-menuitem-group", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [LdMenuitemGroup],
      template: () => (
        <ld-menuitem-group aria-label="Test label">
          <ld-menuitem>Menu item 1</ld-menuitem>
          <ld-menuitem>Menu item 2</ld-menuitem>
        </ld-menuitem-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
