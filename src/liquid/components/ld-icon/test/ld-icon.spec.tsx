import { h, Fragment } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { LdIcon } from "../ld-icon";

const rectSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="100" height="100" fill="currentcolor" /></svg>';
const circleSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="50" cy="50" r="50" fill="currentcolor" /></svg>';

function setupFetchStub() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function fetchStub(url: string): Promise<Response> {
    return new Promise((resolve) => {
      let data: string;
      if (url.endsWith("/rect.svg")) {
        data = rectSvg;
      } else if (url.endsWith("/circle.svg")) {
        data = circleSvg;
      } else {
        data = "";
      }

      process.nextTick(() => {
        resolve({
          text: () => Promise.resolve<string>(data),
        } as Response);
      });
    });
  };
}

describe("ld-icon", () => {
  beforeAll(() => {
    jest.spyOn(global, "fetch").mockImplementation(setupFetchStub());
  });

  afterAll(() => {
    global.fetch["mockClear"]();
  });

  it("renders with name prop", async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => <ld-icon name="rect" />,
    });
    expect(page.root).toMatchSnapshot();
  });
  it("renders multiple", async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => (
        <>
          <ld-icon name="rect" />
          <ld-icon name="circle" />
          <ld-icon name="rect" />
        </>
      ),
    });
    expect(page.body).toMatchSnapshot();
  });
  it("renders with size prop", async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => <ld-icon name="rect" size="sm" />,
    });
    expect(page.root).toMatchSnapshot();
  });
  it("does not throw if icon is not found", async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => <ld-icon name="triangle" />,
    });
    expect(page.root).toMatchSnapshot();
  });
  it("renders with slot", async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => (
        <ld-icon>
          <span>fake icon</span>
        </ld-icon>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
