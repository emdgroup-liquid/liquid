import { getPageWithContent } from '../../../utils/e2e-tests'

describe('ld-slider', () => {
  it('renders', async () => {
    const page = await getPageWithContent('<ld-slider></ld-slider>')

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
