import { newSpecPage } from "@stencil/core/testing";
import { LdInputMessage } from "../ld-input-message";

describe("ld-input-message", () => {
  it("renders as error message by default", async () => {
    const page = await newSpecPage({
      components: [LdInputMessage],
      html: `<ld-input-message>This field is required.</ld-input-message>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it("applies the mode modifier, if mode is set", async () => {
    const page = await newSpecPage({
      components: [LdInputMessage],
      html: `<ld-input-message mode="info">This field is optional.</ld-input-message>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
