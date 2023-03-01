import { newSpecPage } from '@stencil/core/testing'
import { LdBreadcrumbs } from '../ld-breadcrumbs'
import { LdCrumb } from '../ld-crumb/ld-crumb'
import { getTriggerableMutationObserver } from '../../../utils/mutationObserver'

describe('ld-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdBreadcrumbs, LdCrumb],
      html: `<ld-breadcrumbs>
              <ld-crumb>foo</ld-crumb>
              <ld-crumb>bar</ld-crumb>
              <ld-crumb>qux</ld-crumb>
            </ld-breadcrumbs>`,
    })
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(page.root).toMatchSnapshot()
  })

  it('updates current after addition of a crumb', async () => {
    const page = await newSpecPage({
      components: [LdBreadcrumbs, LdCrumb],
      html: `<ld-breadcrumbs>
              <ld-crumb>foo</ld-crumb>
              <ld-crumb>bar</ld-crumb>
              <ld-crumb>qux</ld-crumb>
            </ld-breadcrumbs>`,
    })
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    const crumb = page.doc.createElement('ld-crumb')
    crumb.innerHTML = 'baz'

    page.root.appendChild(crumb)
    getTriggerableMutationObserver().trigger([])
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('updates current after removal of current crumb', async () => {
    const page = await newSpecPage({
      components: [LdBreadcrumbs, LdCrumb],
      html: `<ld-breadcrumbs>
              <ld-crumb>foo</ld-crumb>
              <ld-crumb>bar</ld-crumb>
              <ld-crumb>qux</ld-crumb>
            </ld-breadcrumbs>`,
    })
    await page.waitForChanges()

    page.root.removeChild(page.root.querySelector('ld-crumb:last-of-type'))
    getTriggerableMutationObserver().trigger([])
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('Does not throw with no crumbs', async () => {
    const page = await newSpecPage({
      components: [LdBreadcrumbs, LdCrumb],
      html: `<ld-breadcrumbs></ld-breadcrumbs>`,
    })
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(page.root).toMatchSnapshot()
  })
})
