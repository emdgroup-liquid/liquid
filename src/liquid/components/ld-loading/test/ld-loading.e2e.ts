import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdLoading } from '../ld-loading'

jest.useRealTimers()

const allowableMismatchedPixels = 100

describe('ld-loading', () => {
  it('renders', async () => {
    const page = await getPageWithContent(
      `<ld-loading style="animation: none;" />`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedPixels })
  })

  it('spins', async () => {
    const page = await getPageWithContent(
      `<ld-loading style="animation-play-state: paused;"></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -0.25s; "></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -0.5s;"></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -0.75s;"></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -1s;"></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -1.25s;"></ld-loading>
      <ld-loading style="animation-play-state: paused; animation-delay: -1.5s;"></ld-loading>`
    )
    page.addStyleTag({
      content: `
      .ld-loading {
        position: relative;
      }
      .ld-loading::before {
        background: red;
        content: "";
        height: 3px;
        position: absolute;
        right: 0;
        top: 0;
        width: 3px;
      }`,
    })
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedPixels })
  })

  it('renders as css component', async () => {
    const page = await getPageWithContent(
      `<span class="ld-loading" style="animation: none;" />`,
      undefined,
      LdLoading
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedPixels })
  })

  it('spins as css component', async () => {
    const page = await getPageWithContent(
      `<span class="ld-loading" style="animation-play-state: paused;"></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -0.25s; "></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -0.5s;"></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -0.75s;"></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -1s;"></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -1.25s;"></span>
      <span class="ld-loading" style="animation-play-state: paused; animation-delay: -1.5s;"></span>`,
      undefined,
      LdLoading
    )
    page.addStyleTag({
      content: `
      .ld-loading {
        position: relative;
      }
      .ld-loading::before {
        background: red;
        content: "";
        height: 3px;
        position: absolute;
        right: 0;
        top: 0;
        width: 3px;
      }`,
    })
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedPixels })
  })
})
