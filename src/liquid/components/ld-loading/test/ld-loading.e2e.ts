import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdLoading } from '../ld-loading'

describe('ld-loading', () => {
  it('renders', async () => {
    const page = await getPageWithContent(`<ld-loading paused />`)
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as css component', async () => {
    const page = await getPageWithContent(
      `<svg class="ld-loading" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <title>Loading</title>
        <circle cx="50" cy="50" r="50" />
        <g>
          <circle cx="50" cy="50" r="50" />
          <circle cx="50" cy="50" r="50" />
          <circle cx="50" cy="50" r="50" />
        </g>
      </svg>`,
      { components: LdLoading }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders neutral', async () => {
    const page = await getPageWithContent(`<ld-loading neutral paused />`)
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders neutral as css component', async () => {
    const page = await getPageWithContent(
      `<svg class="ld-loading ld-loading--neutral" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <title>Loading</title>
        <circle cx="50" cy="50" r="50" />
        <g>
          <circle cx="50" cy="50" r="50" />
          <circle cx="50" cy="50" r="50" />
          <circle cx="50" cy="50" r="50" />
        </g>
      </svg>`,
      { components: LdLoading }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
