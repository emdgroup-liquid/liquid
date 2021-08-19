import { newE2EPage } from '@stencil/core/testing'
import { ThemeName } from '../../../types/theme'

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './src/docs/global/styles/reset.css' })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-button.css' })
  await page.addStyleTag({ path: './dist/css/ld-heading.css' })
  await page.addStyleTag({ path: './dist/css/ld-icon.css' })
  await page.addStyleTag({ path: './dist/css/ld-paragraph.css' })
  await page.addStyleTag({ path: './dist/css/ld-tooltip.css' })
  await page.addStyleTag({ content: '*:focus { outline: none; }' })
  return page
}

const themes = [
  'none',
  ThemeName.ocean.toLowerCase(),
  ThemeName.bubblegum.toLowerCase(),
  // ThemeName.shake.toLowerCase(),
  // ThemeName.solvent.toLowerCase(),
  // ThemeName.tea.toLowerCase(),
]
const positions = [
  'bottom center',
  'bottom left',
  'bottom right',
  'left bottom',
  'left middle',
  'left top',
  'right bottom',
  'right middle',
  'right top',
  'top center',
  'top left',
  'top right',
]
const allowableMismatchedPixels = 2000

describe('ld-tooltip', () => {
  for (const theme of themes) {
    describe(`theme ${theme}`, () => {
      it(`default trigger`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip>
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`default trigger (focus)`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip trigger-type="click">
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`default trigger (hover)`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip trigger-type="click">
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        await page.hover('ld-tooltip')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom clickable trigger`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip trigger-type="click">
            <ld-button slot="trigger">Click me</ld-button>
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom clickable trigger (focus)`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip trigger-type="click">
            <ld-button slot="trigger">Click me</ld-button>
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom clickable trigger (hover)`, async () => {
        const page = await getPageWithContent(
          `<ld-tooltip trigger-type="click">
            <ld-button slot="trigger">Click me</ld-button>
            <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
            <ld-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ld-paragraph>
          </ld-tooltip>`,
          theme
        )
        await page.hover('ld-tooltip')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom inline trigger`, async () => {
        const page = await getPageWithContent(
          `<p>
            I am an
            <ld-tooltip trigger-type="click">
              <span slot="trigger" style="text-decoration: underline">inline</span>
              <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
              <ld-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ld-paragraph>
            </ld-tooltip>
          trigger!</p>`,
          theme
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom inline trigger (focus)`, async () => {
        const page = await getPageWithContent(
          `<p>
            I am an
            <ld-tooltip trigger-type="click">
              <span slot="trigger" style="text-decoration: underline">inline</span>
              <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
              <ld-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ld-paragraph>
            </ld-tooltip>
          trigger!</p>`,
          theme
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      it(`custom inline trigger (hover)`, async () => {
        const page = await getPageWithContent(
          `<p>
            I am an
            <ld-tooltip trigger-type="click">
              <span slot="trigger" style="text-decoration: underline">inline</span>
              <ld-heading level="4" style="margin-bottom: 10px">Headline</ld-heading>
              <ld-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ld-paragraph>
            </ld-tooltip>
          trigger!</p>`,
          theme
        )
        await page.hover('ld-tooltip')
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })

      positions.forEach((position) => {
        it(`position ${position} (default)`, async () => {
          const page = await getPageWithContent(
            `<ld-tooltip position="${position}">
              <ld-paragraph>Lorem ipsum dolor sit amet.</ld-paragraph>
            </ld-tooltip>`,
            theme
          )
          await page.keyboard.press('Tab')
          await new Promise((resolve) => setTimeout(resolve))

          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`position ${position} (with arrow)`, async () => {
          const page = await getPageWithContent(
            `<ld-tooltip arrow position="${position}">
              <ld-paragraph>Lorem ipsum dolor sit amet.</ld-paragraph>
            </ld-tooltip>`,
            theme
          )
          await page.keyboard.press('Tab')
          await new Promise((resolve) => setTimeout(resolve))

          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`position ${position} (custom trigger)`, async () => {
          const page = await getPageWithContent(
            `<ld-tooltip position="${position}">
              <ld-button slot="trigger">Trigger</ld-button>
              <ld-paragraph>Lorem ipsum dolor sit amet.</ld-paragraph>
            </ld-tooltip>`,
            theme
          )
          await page.keyboard.press('Tab')
          await new Promise((resolve) => setTimeout(resolve))

          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`position ${position} (custom trigger with arrow)`, async () => {
          const page = await getPageWithContent(
            `<ld-tooltip arrow position="${position}">
              <ld-button slot="trigger">Trigger</ld-button>
              <ld-paragraph>Lorem ipsum dolor sit amet.</ld-paragraph>
            </ld-tooltip>`,
            theme
          )
          await page.keyboard.press('Tab')
          await new Promise((resolve) => setTimeout(resolve))

          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
      })
    })
  }
})
