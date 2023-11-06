import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { LdCardStack } from "../ld-card-stack";

describe("ld-card-stack", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [LdCardStack],
      template: () => (
        <ld-card-stack>
          <ld-card>Card A</ld-card>
          <ld-card>Card B</ld-card>
        </ld-card-stack>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  describe("adds classes according to props", () => {
    it("direction", async () => {
      const page = await newSpecPage({
        components: [LdCardStack],
        template: () => (
          <ld-card-stack direction="ltr">
            <ld-card>Card A</ld-card>
            <ld-card>Card B</ld-card>
          </ld-card-stack>
        ),
      });
      expect(page.root).toHaveClass("ld-card-stack--ltr");
    });
  });
});
