import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdTypo } from '../ld-typo'

const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const variants = [
  'body-xs',
  'body-s',
  'body-m',
  'body-l',
  'body-xl',
  'cap-m',
  'cap-l',
  'label-s',
  'label-m',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'xb1',
  'xb2',
  'xb3',
  'xh1',
  'xh2',
  'xh3',
  'xh4',
  'xh5',
  'xh6',
]

describe('ld-typo', () => {
  for (const variant of variants) {
    it(`renders as ${variant} Web Component`, async () => {
      const page = await getPageWithContent(
        `<ld-typo variant="${variant}">${lipsum}</ld-typo>`,
        { notWrapped: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`renders as ${variant} CSS component`, async () => {
      const page = await getPageWithContent(
        `<p class="ld-typo--${variant}">${lipsum}</p>`,
        {
          notWrapped: true,
          components: [LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  }
})
