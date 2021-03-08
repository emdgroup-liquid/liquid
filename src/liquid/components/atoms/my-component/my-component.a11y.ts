import 'globals'
import pa11yConfig from '../../../../../pa11y.json'
import pa11y from 'pa11y'
import puppeteer from 'puppeteer'
import { startServer } from 'polyserve'
import { join } from 'path'

describe('my-component', () => {
  let server, browser, page

  beforeAll(async function () {
    server = await startServer({
      root: join(process.cwd(), 'dist_docs'),
    })
  })

  afterAll(async function () {
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve)
      })
    }
  })

  beforeEach(async function () {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  it('is accessible', async () => {
    try {
      const result = await pa11y(
        `http://localhost:${
          server.address().port
        }/liquid/components/atoms/my-component/`,
        {
          browser,
          page: page,
          ...pa11yConfig,
        }
      )

      expect(result).toHaveNoPa11yViolations()

      await page.close()
      await browser.close()
    } catch (err) {
      if (page) {
        await page.close()
      }
      if (browser) {
        await browser.close()
      }
      throw err
    }
  })
})
