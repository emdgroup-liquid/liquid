import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './dist/css/ld-loading.css' })
  return page
}

const allowableMismatchedRatio = 0.02

describe('ld-loading', () => {
  it('renders', async () => {
    const page = await getPageWithContent(`<ld-loading></ld-loading>`)
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedRatio })
  })

  it('renders as css component', async () => {
    const page = await getPageWithContent(`<span class="ld-loading"></span>`)
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedRatio })
  })
})
