import { getPageWithContent } from '../../../utils/e2e-tests'

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
})
