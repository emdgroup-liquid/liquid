jest.mock("../../../utils/cloneAttributes");
import { newSpecPage } from "@stencil/core/testing";
import { LdHeader } from "../ld-header";

describe("ld-header", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders with site name", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `
      <ld-header site-name="Liquid Oxygen"></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders with linked logo", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `
      <ld-header logo-title="Home" logo-url="#"></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders with logo title", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `
      <ld-header logo-title="Logo"></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders with content", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `
      <ld-header>
        <ld-typo>Liquid Oxygen</ld-typo>
      </ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders sticky", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header sticky></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders hidden", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header sticky hidden></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("renders hide-on-scroll", async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header sticky hide-on-scroll></ld-header>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("does not throw when disconnecting before hydration", () => {
    const component = new LdHeader();
    component.disconnectedCallback();
  });
});
