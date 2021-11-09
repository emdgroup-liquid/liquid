import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdLoading } from '../ld-loading'

jest.useRealTimers()

describe('ld-loading', () => {
  it('renders', async () => {
    const page = await getPageWithContent(
      `<ld-loading style="animation: none;" />`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as css component', async () => {
    const page = await getPageWithContent(
      `<span class="ld-loading" style="animation: none;" />`,
      undefined,
      LdLoading
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
