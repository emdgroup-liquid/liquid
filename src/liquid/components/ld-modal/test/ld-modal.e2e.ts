import { getPageWithContent } from "../../../utils/e2e-tests";
import { LdModal } from "../ld-modal";
import { LdTypo } from "../../ld-typo/ld-typo";
import { LdButton } from "../../ld-button/ld-button";

const lipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

describe("ld-modal", () => {
  it("renders as Web Component", async () => {
    const page = await getPageWithContent(
      `<ld-modal open>
        <ld-typo slot="header">Hello</ld-typo>
        <ld-typo style="text-align: center">
          I'm a modal dialog.
        </ld-typo>
        <ld-button slot="footer" style="width: 8rem" mode="ghost">Cancel</ld-button>
        <ld-button slot="footer" style="width: 8rem">Submit</ld-button>
      </ld-modal>`,
      { reducedMotion: true },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });

  it("renders as CSS Component", async () => {
    const page = await getPageWithContent(
      `<dialog class="ld-modal" open>
        <header class="ld-modal__header">
          <p class="ld-typo">Hello</p>
          <button
            class="ld-modal__x"
            aria-label="Dismiss"
            onclick="this.closest('dialog').close()"
          ></button>
        </header>
        <div class="ld-modal__content">
          <p class="ld-typo" style="text-align: center">
            I'm a modal dialog.
          </p>
        </div>
        <footer class="ld-modal__footer">
          <button class="ld-button ld-button--ghost" style="width: 8rem">Cancel</button>
          <button class="ld-button" style="width: 8rem">Submit</button>
        </footer>
      </dialog>`,
      {
        components: [LdModal, LdTypo, LdButton],
        reducedMotion: true,
      },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });

  it("renders as Web Component without header and footer", async () => {
    const page = await getPageWithContent(
      `<ld-modal open cancelable="false">
        <ld-typo style="text-align: center">
          I'm a modal dialog.
        </ld-typo>
      </ld-modal>`,
      { reducedMotion: true },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });

  it("renders as CSS Component without header and footer", async () => {
    const page = await getPageWithContent(
      `<dialog class="ld-modal" open>
        <div class="ld-modal__content">
          <p class="ld-typo" style="text-align: center">
            I'm a modal dialog.
          </p>
        </div>
      </dialog>`,
      {
        components: [LdModal, LdTypo],
        reducedMotion: true,
      },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });

  it("renders as Web Component with lots of content in scrollable container", async () => {
    const page = await getPageWithContent(
      `<ld-modal open>
        <ld-typo slot="header">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</ld-typo>
        <ld-typo>
          I'm a modal dialog. ${lipsum}
        </ld-typo>
        <ld-button slot="footer" style="width: 8rem" mode="ghost">Cancel</ld-button>
        <ld-button slot="footer" style="width: 8rem">Submit</ld-button>
      </ld-modal>`,
      { reducedMotion: true },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });

  it("renders as CSS Component with lots of content in scrollable container", async () => {
    const page = await getPageWithContent(
      `<dialog class="ld-modal" open>
        <header class="ld-modal__header">
          <p class="ld-typo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button
            class="ld-modal__x"
            aria-label="Dismiss"
            onclick="this.closest('dialog').close()"
          ></button>
        </header>
        <div class="ld-modal__content">
          <p class="ld-typo">
            I'm a modal dialog. ${lipsum}
          </p>
        </div>
        <footer class="ld-modal__footer">
          <button class="ld-button ld-button--ghost" style="width: 8rem">Cancel</button>
          <button class="ld-button" style="width: 8rem">Submit</button>
        </footer>
      </dialog>`,
      {
        components: [LdModal, LdTypo, LdButton],
        reducedMotion: true,
      },
    );

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot();
  });
});
