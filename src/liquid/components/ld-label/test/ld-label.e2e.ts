import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './dist/css/ld-label.css' })
  await page.addStyleTag({ path: './dist/css/ld-input.css' })
  await page.addStyleTag({ path: './dist/css/ld-checkbox.css' })
  await page.waitForChanges()
  return page
}

const allowableMismatchedRatio = 0.02

describe('ld-label', () => {
  it('renders', async () => {
    const page = await getPageWithContent('<ld-label>Email Address</ld-label>')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedRatio })
  })

  it('renders as css component', async () => {
    const page = await getPageWithContent(
      '<label class="ld-label">Email Address</label>'
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot({ allowableMismatchedRatio })
  })

  describe('size', () => {
    it('renders with size m', async () => {
      const page = await getPageWithContent(
        '<ld-label size="m">Email Address</ld-label>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders with size m as css component', async () => {
      const page = await getPageWithContent(
        '<label class="ld-label ld-label--m">Email Address</label>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('position', () => {
    it('renders at the top by default', async () => {
      const page = await getPageWithContent(`
        <ld-label>
          Email Address
          <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders at the top by default as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label">
          Email Address
          <div class="ld-input">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the left', async () => {
      const page = await getPageWithContent(`
        <ld-label position="left" size="m">
          Email Address
          <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the left as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--left ld-label--m">
          Email Address
          <div class="ld-input">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the right', async () => {
      const page = await getPageWithContent(`
        <ld-label position="right" size="m">
          Email Address
          <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the right as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--right ld-label--m">
          Email Address
          <div class="ld-input">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('with html content', () => {
    it('renders with html content', async () => {
      const page = await getPageWithContent(`
        <ld-label position="right">
          <span>I love to <code style="line-height: 0">code</code>.</span>
          <ld-checkbox></ld-checkbox>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders with html content as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--right">
          <span>I love to <code style="line-height: 0">code</code>.</span>
          <div class="ld-checkbox">
            <input type="checkbox">
            <svg
              class="ld-checkbox__check"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L5.40795 10L2 6.63964"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="ld-checkbox__box"></div>
          </div>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })
})
