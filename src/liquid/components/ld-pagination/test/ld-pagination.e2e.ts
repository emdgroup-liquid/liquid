import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'

describe('ld-pagination', () => {
  describe('default', () => {
    it('start', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('middle', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="14"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('single', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="1"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('without dots', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="7"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('indefinite', () => {
    it('start', async () => {
      const page = await getPageWithContent('<ld-pagination></ld-pagination>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('middle', async () => {
      const page = await getPageWithContent(
        '<ld-pagination selected-index="7"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('sticky', () => {
    it('start', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('middle', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="14"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('single', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="1"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('without dots', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="11"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('without offset', () => {
    it('start', async () => {
      const page = await getPageWithContent(
        '<ld-pagination offset="0" length="15"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('middle', async () => {
      const page = await getPageWithContent(
        '<ld-pagination offset="0" length="15" selected-index="7"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end', async () => {
      const page = await getPageWithContent(
        '<ld-pagination offset="0" length="15" selected-index="14"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('single', async () => {
      const page = await getPageWithContent(
        '<ld-pagination offset="0" length="1"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('without dots', async () => {
      const page = await getPageWithContent(
        '<ld-pagination offset="0" length="3"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('hover', () => {
    it('start arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow > ld-button'
      )
      await arrow.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('prev arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:nth-child(2) > ld-button'
      )
      await arrow.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('first sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__sticky > ld-button'
      )
      await item.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('slidable item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__item:nth-child(6) > ld-button'
      )
      await item.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__item--selected > ld-button'
      )
      await item.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('last sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__sticky:nth-last-child(2) > ld-button'
      )
      await item.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('next arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:nth-last-child(2) > ld-button'
      )
      await arrow.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:last-child > ld-button'
      )
      await arrow.hover()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('active', () => {
    it('start arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow > ld-button'
      )
      await arrow.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('prev arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:nth-child(2) > ld-button'
      )
      await arrow.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('first sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__sticky > ld-button'
      )
      await item.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('slidable item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__item:nth-child(6) > ld-button'
      )
      await item.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__item--selected > ld-button'
      )
      await item.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('last sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      const item = await page.find(
        'ld-pagination >>> li.ld-pagination__sticky:nth-last-child(2) > ld-button'
      )
      await item.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('next arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:nth-last-child(2) > ld-button'
      )
      await arrow.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      const arrow = await page.find(
        'ld-pagination >>> li.ld-pagination__arrow:last-child > ld-button'
      )
      await arrow.hover()
      await page.mouse.down()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('focus', () => {
    it('start arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('prev arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('first sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('slidable item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('last sticky item', async () => {
      const page = await getPageWithContent(
        '<ld-pagination sticky="2" length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('next arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('end arrow', async () => {
      const page = await getPageWithContent(
        '<ld-pagination length="15" selected-index="7"></ld-pagination>'
      )

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
