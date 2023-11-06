import { newSpecPage } from "@stencil/core/testing";
import { LdLoading } from "../ld-loading";

describe("ld-loading", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [LdLoading],
      html: `<ld-loading />`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("is neutral", async () => {
    const page = await newSpecPage({
      components: [LdLoading],
      html: `<ld-loading neutral />`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("uses custom label", async () => {
    const page = await newSpecPage({
      components: [LdLoading],
      html: `<ld-loading neutral label="Doing stuff..." />`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
