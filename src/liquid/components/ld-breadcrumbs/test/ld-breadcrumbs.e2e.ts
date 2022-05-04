import {
  analyzeAccessibility,
  getPageWithContent,
} from 'src/liquid/utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdBreadcrumbs } from '../ld-breadcrumbs'
import { LdCrumb } from '../ld-crumb/ld-crumb'
import { LdLink } from '../../ld-link/ld-link'

const components = [LdBreadcrumbs, LdCrumb, LdLink, LdIcon]

describe('ld-breadcrumbs', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(
      `<ld-breadcrumbs>
        <ld-crumb href="/foo">foo</ld-crumb>
        <ld-crumb href="/foo/bar">bar</ld-crumb>
        <ld-crumb href="/foo/bar/qux">qux</ld-crumb>
      </ld-breadcrumbs>`
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<nav class="ld-breadcrumbs" aria-label="Breadcrumbs">
        <ol>
          <li>
            <a class="ld-link ld-link--chevron-end" href="/foo">foo</a>
          </li>
          <li>
            <a class="ld-link ld-link--chevron-end" href="/foo/bar">bar</a>
          </li>
          <li>
            <a class="ld-link" href="/foo/bar/qux" aria-current="page">qux</a>
          </li>
        </ol>
      </nav>`,
      {
        components,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-breadcrumbs>
          <ld-crumb href="/foo">foo</ld-crumb>
          <ld-crumb href="/foo/bar">bar</ld-crumb>
          <ld-crumb href="/foo/bar/qux">qux</ld-crumb>
        </ld-breadcrumbs>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page, {
        rules: {
          // Disabling list rules here, because manual tests with screenreader
          // resulted in expected behavior: The screenreader reads number of list items
          // in breadcrumb trail list.
          list: { enabled: false },
          listitem: { enabled: false },
        },
      })
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<nav class="ld-breadcrumbs" aria-label="Breadcrumbs">
          <ol>
            <li>
              <a class="ld-link ld-link--chevron-end" href="/foo">foo</a>
            </li>
            <li>
              <a class="ld-link ld-link--chevron-end" href="/foo/bar">bar</a>
            </li>
            <li>
              <a class="ld-link" href="/foo/bar/qux" aria-current="page">qux</a>
            </li>
          </ol>
        </nav>`,
        {
          components,
        }
      )

      page.waitForChanges()
      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  it('renders with icons as Web Component', async () => {
    const page = await getPageWithContent(
      `<ld-breadcrumbs>
        <ld-crumb href="/foo">
          <ld-icon name="placeholder" size="sm"></ld-icon>
          foo
        </ld-crumb>
        <ld-crumb href="/foo/bar">
          <ld-icon name="placeholder" size="sm"></ld-icon>
          bar
        </ld-crumb>
        <ld-crumb href="/foo/bar/qux">
          <ld-icon name="placeholder" size="sm"></ld-icon>
          qux
        </ld-crumb>
      </ld-breadcrumbs>`,
      {
        components,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders with icons as CSS component', async () => {
    const page = await getPageWithContent(
      `<nav class="ld-breadcrumbs" aria-label="Breadcrumbs">
        <ol>
          <li>
            <a class="ld-link ld-link--chevron-end" href="/foo">
              <span class="ld-icon ld-icon--sm" role="presentation">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
                </svg>
              </span>
              foo
            </a>
          </li>
          <li>
            <a class="ld-link ld-link--chevron-end" href="/foo/bar">
              <span class="ld-icon ld-icon--sm" role="presentation">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
                </svg>
              </span>
              bar
            </a>
          </li>
          <li>
            <a class="ld-link" href="/foo/bar/qux" aria-current="page">
              <span class="ld-icon ld-icon--sm" role="presentation">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
                </svg>
              </span>
              qux
            </a>
          </li>
        </ol>
      </nav>`,
      {
        components,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
