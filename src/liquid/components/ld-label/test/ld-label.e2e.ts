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
  await page.addStyleTag({ path: './dist/css/ld-input-message.css' })
  await page.addStyleTag({ path: './dist/css/ld-toggle.css' })
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

    it('renders at the top by default with input message at the bottom', async () => {
      const page = await getPageWithContent(`
        <ld-label>
          Email Address
          <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
          <ld-input-message>This field is required.</ld-input-message>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders at the top by default with input message at the bottom as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label">
          Email Address
          <div class="ld-input ld-input--invalid">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
          <span class="ld-input-message ld-input-message--error">
            <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#E61E50"/>
              <path d="M4.66675 4.66699L9.33341 9.33366" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.66675 9.33301L9.33341 4.66634" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            This field is required.
          </span>
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

    it('renders on the left with input message at the bottom', async () => {
      const page = await getPageWithContent(`
        <ld-label position="left" size="m">
          Email Address
          <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
          <ld-input-message>This field is required.</ld-input-message>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the left with input message at the bottom as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--left ld-label--m">
          Email Address
          <div class="ld-input ld-input--invalid">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
          <span class="ld-input-message ld-input-message--error">
            <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#E61E50"/>
              <path d="M4.66675 4.66699L9.33341 9.33366" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.66675 9.33301L9.33341 4.66634" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            This field is required.
          </span>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the left with left-aligned input message at the bottom', async () => {
      const page = await getPageWithContent(`
        <ld-label position="left" size="m">
          Auto-update
          <ld-toggle></ld-toggle>
          <ld-input-message mode="info">Recommended.</ld-input-message>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the left with left-aligned input message at the bottom as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--left ld-label--m">
          Auto-update
          <div class="ld-toggle">
            <input type="checkbox" />
            <span class="ld-toggle__knob"></span>
          </div>
          <span class="ld-input-message ld-input-message--info">
            <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Info</title>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#FFC832"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="#091734"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="#091734"/>
            </svg>
            Recommended.
          </span>
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

    it('renders on the right with input message at the bottom', async () => {
      const page = await getPageWithContent(`
        <ld-label position="right" size="m">
          Email Address
          <ld-input invalid placeholder="jane.doe@example.com" type="email"></ld-input>
          <ld-input-message>This field is required.</ld-input-message>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the right with input message at the bottom as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--right ld-label--m">
          Email Address
          <div class="ld-input ld-input--invalid">
            <input placeholder="jane.doe@example.com" type="email">
          </div>
          <span class="ld-input-message ld-input-message--error">
            <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#E61E50"/>
              <path d="M4.66675 4.66699L9.33341 9.33366" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.66675 9.33301L9.33341 4.66634" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            This field is required.
          </span>
        </label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the right with left-aligned input message at the bottom', async () => {
      const page = await getPageWithContent(`
        <ld-label position="right" size="m">
          Auto-update
          <ld-toggle></ld-toggle>
          <ld-input-message mode="info">Recommended.</ld-input-message>
        </ld-label>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it('renders on the right with left-aligned input message at the bottom as css component', async () => {
      const page = await getPageWithContent(`
        <label class="ld-label ld-label--right ld-label--m">
          Auto-update
          <div class="ld-toggle">
            <input type="checkbox" />
            <span class="ld-toggle__knob"></span>
          </div>
          <span class="ld-input-message ld-input-message--info">
            <svg class="ld-input-message__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Info</title>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#FFC832"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="#091734"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="#091734"/>
            </svg>
            Recommended.
          </span>
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
