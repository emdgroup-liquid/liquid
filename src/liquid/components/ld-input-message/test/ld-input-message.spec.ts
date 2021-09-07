import { newSpecPage } from '@stencil/core/testing'
import { LdInputMessage } from '../ld-input-message'

describe('ld-input-message', () => {
  it('renders as error message by default', async () => {
    const page = await newSpecPage({
      components: [LdInputMessage],
      html: `<ld-input-message>This field is required.</ld-input-message>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input-message>
        <span class="ld-input-message ld-input-message--error">
          <img class="ld-input-message__icon" alt="" role="presentation" src="/assets/error.svg">
          <span aria-live="assertive">
            This field is required.
          </span>
        </span>
      </ld-input-message>
    `)
  })
  it('renders as error message with mode set to "error"', async () => {
    const page = await newSpecPage({
      components: [LdInputMessage],
      html: `<ld-input-message mode="error">This field is required.</ld-input-message>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input-message mode="error">
        <span class="ld-input-message ld-input-message--error">
          <img class="ld-input-message__icon" alt="" role="presentation" src="/assets/error.svg">
          <span aria-live="assertive">
            This field is required.
          </span>
        </span>
      </ld-input-message>
    `)
  })
  it('renders as info message with mode set to "info"', async () => {
    const page = await newSpecPage({
      components: [LdInputMessage],
      html: `<ld-input-message mode="info">This field will destroy itself on form submission.</ld-input-message>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input-message mode="info">
        <span class="ld-input-message ld-input-message--info">
          <img class="ld-input-message__icon" alt="" role="presentation" src="/assets/info.svg">
          <span aria-live="assertive">
            This field will destroy itself on form submission.
          </span>
        </span>
      </ld-input-message>
    `)
  })
})
