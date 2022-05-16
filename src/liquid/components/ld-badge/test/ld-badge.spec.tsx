import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdBadge } from '../ld-badge'
import { getTriggerableMutationObserver } from '../../../utils/mutationObserver'

describe('ld-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge icon="checkmark"></ld-badge>',
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: `<ld-badge>
        <svg slot="icon" viewBox="0 0 14 14">
          <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </ld-badge>`,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with size lg', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge icon="checkmark" size="lg"></ld-badge>',
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with text', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge>Badge</ld-badge>',
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders on brand color', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge brand-color icon="checkmark"></ld-badge>',
    })
    expect(page.root).toMatchSnapshot()
  })
  it('updates after addition of an icon', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge>Badge</ld-badge>',
    })
    await page.waitForChanges()

    const icon = page.doc.createElement('ld-icon')
    icon.setAttribute('slot', 'icon')
    icon.setAttribute('name', 'placeholder')

    page.root.appendChild(icon)
    getTriggerableMutationObserver().trigger([])
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
  it('updates after addition of text', async () => {
    const page = await newSpecPage({
      components: [LdBadge, LdIcon],
      html: '<ld-badge icon="checkmark"></ld-badge>',
    })
    await page.waitForChanges()

    const span = page.doc.createElement('span')
    span.innerHTML = 'Badge'

    page.root.appendChild(span)
    getTriggerableMutationObserver().trigger([])
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
})
