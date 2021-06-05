import 'globals'
import pa11yConfig from '../../../../../pa11y.json'
import pa11y from 'pa11y'
import puppeteer from 'puppeteer'
import liveServer from 'live-server'
import { join } from 'path'

describe('ld-button', () => {
  let server, browser, page

  beforeAll(async function () {
    server = await liveServer.start({
      port: 0,
      root: join(process.cwd(), 'dist_docs'),
      open: false,
      ignore: '*',
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
        `http://localhost:${server.address().port}/components/ld-button/`,
        {
          browser,
          page,
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
