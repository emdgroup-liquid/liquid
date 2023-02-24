import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdCheckbox } from '../../ld-checkbox/ld-checkbox'
import { LdTable } from '../ld-table'

const components = [LdCheckbox, LdTable]

describe('ld-table', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(
      `<ld-table>
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Superheros and sidekicks
          </ld-table-caption>
        </ld-table-toolbar>
        <ld-table-colgroup>
          <ld-table-col></ld-table-col>
          <ld-table-col span="2" class="batman"></ld-table-col>
          <ld-table-col span="2" class="flash"></ld-table-col>
        </ld-table-colgroup>
        <ld-table-body>
          <ld-table-row>
            <ld-table-cell></ld-table-cell>
            <ld-table-header scope="col">Batman</ld-table-header>
            <ld-table-header scope="col">Robin</ld-table-header>
            <ld-table-header scope="col">The Flash</ld-table-header>
            <ld-table-header scope="col">Kid Flash</ld-table-header>
          </ld-table-row>
          <ld-table-row>
            <ld-table-header scope="row">Skill</ld-table-header>
            <ld-table-cell>Smarts</ld-table-cell>
            <ld-table-cell>Dex, acrobat</ld-table-cell>
            <ld-table-cell>Super speed</ld-table-cell>
            <ld-table-cell>Super speed</ld-table-cell>
          </ld-table-row>
        </ld-table-body>
      </ld-table>`
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<figure class="ld-table">
        <div class="ld-table__toolbar">
          <figcaption>
            Superheros and sidekicks
          </figcaption>
        </div>
        <div class="ld-table__scroll-container">
          <table>
            <colgroup>
              <col></col>
              <col span="2" class="batman"></col>
              <col span="2" class="flash"></col>
            </colgroup>
            <tbody>
              <tr>
                <td></td>
                <th scope="col">Batman</th>
                <th scope="col">Robin</th>
                <th scope="col">The Flash</th>
                <th scope="col">Kid Flash</th>
              </tr>
              <tr>
                <th scope="row">Skill</th>
                <td>Smarts</td>
                <td>Dex, acrobat</td>
                <td>Super speed</td>
                <td>Super speed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </figure>`,
      {
        components,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('handles CSS reset as a Web Component', async () => {
    const page = await getPageWithContent(
      `<style>
        .*, ::before, ::after {
          border-width: 0;
          border-style: dashed;
          border-color: red;
        }
      </style>
      <ld-table>
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Superheros and sidekicks
          </ld-table-caption>
        </ld-table-toolbar>
        <ld-table-colgroup>
          <ld-table-col></ld-table-col>
          <ld-table-col span="2" class="batman"></ld-table-col>
          <ld-table-col span="2" class="flash"></ld-table-col>
        </ld-table-colgroup>
        <ld-table-body>
          <ld-table-row>
            <ld-table-cell></ld-table-cell>
            <ld-table-header scope="col">Batman</ld-table-header>
            <ld-table-header scope="col">Robin</ld-table-header>
            <ld-table-header scope="col">The Flash</ld-table-header>
            <ld-table-header scope="col">Kid Flash</ld-table-header>
          </ld-table-row>
          <ld-table-row>
            <ld-table-header scope="row">Skill</ld-table-header>
            <ld-table-cell>Smarts</ld-table-cell>
            <ld-table-cell>Dex, acrobat</ld-table-cell>
            <ld-table-cell>Super speed</ld-table-cell>
            <ld-table-cell>Super speed</ld-table-cell>
          </ld-table-row>
        </ld-table-body>
      </ld-table>`
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('handles CSS reset as a CSS Component', async () => {
    const page = await getPageWithContent(
      `<style>
        .*, ::before, ::after {
          border-width: 0;
          border-style: dashed;
          border-color: red;
        }
      </style>
      <figure class="ld-table">
        <div class="ld-table__toolbar">
          <figcaption>
            Superheros and sidekicks
          </figcaption>
        </div>
        <div class="ld-table__scroll-container">
          <table>
            <colgroup>
              <col></col>
              <col span="2" class="batman"></col>
              <col span="2" class="flash"></col>
            </colgroup>
            <tbody>
              <tr>
                <td></td>
                <th scope="col">Batman</th>
                <th scope="col">Robin</th>
                <th scope="col">The Flash</th>
                <th scope="col">Kid Flash</th>
              </tr>
              <tr>
                <th scope="row">Skill</th>
                <td>Smarts</td>
                <td>Dex, acrobat</td>
                <td>Super speed</td>
                <td>Super speed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </figure>`,
      {
        components,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as Web Component with sort buttons', async () => {
    const page = await getPageWithContent(
      `<style>
        .chinese-div-by-pop { max-height: 26rem; }
        .chinese-div-by-pop :is(ld-table-header, ld-table-cell):not(:first-child) {
          text-align: right;
        }
      </style>
      <ld-table class="chinese-div-by-pop">
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Chinese administrative divisions by population in 2017
          </ld-table-caption>
        </ld-table-toolbar>
        <ld-table-head>
          <ld-table-row>
            <ld-table-header sortable>Administrative Division</ld-table-header>
            <ld-table-header sortable sort-order="desc">Total</ld-table-header>
            <ld-table-header sortable>Urban</ld-table-header>
            <ld-table-header sortable>Rural</ld-table-header>
          </ld-table-row>
        </ld-table-head>
        <ld-table-body>
          <ld-table-row>
            <ld-table-cell>Mainland China</ld-table-cell>
            <ld-table-cell>1,485,710,000</ld-table-cell>
            <ld-table-cell>831,370,000</ld-table-cell>
            <ld-table-cell>564,010,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Guangdong</ld-table-cell>
            <ld-table-cell>188,690,000</ld-table-cell>
            <ld-table-cell>78,020,000</ld-table-cell>
            <ld-table-cell>33,670,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Shandong</ld-table-cell>
            <ld-table-cell>167,060,000</ld-table-cell>
            <ld-table-cell>60,620,000</ld-table-cell>
            <ld-table-cell>39,440,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Henan</ld-table-cell>
            <ld-table-cell>163,590,000</ld-table-cell>
            <ld-table-cell>47,950,000</ld-table-cell>
            <ld-table-cell>47,640,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Sichuan</ld-table-cell>
            <ld-table-cell>158,020,000</ld-table-cell>
            <ld-table-cell>42,170,000</ld-table-cell>
            <ld-table-cell>40,850,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Jiangsu</ld-table-cell>
            <ld-table-cell>156,290,000</ld-table-cell>
            <ld-table-cell>55,210,000</ld-table-cell>
            <ld-table-cell>25,080,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Hebei</ld-table-cell>
            <ld-table-cell>135,200,000</ld-table-cell>
            <ld-table-cell>41,360,000</ld-table-cell>
            <ld-table-cell>33,830,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Hunan</ld-table-cell>
            <ld-table-cell>127,600,000</ld-table-cell>
            <ld-table-cell>37,470,000</ld-table-cell>
            <ld-table-cell>31,130,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Anhui</ld-table-cell>
            <ld-table-cell>118,550,000</ld-table-cell>
            <ld-table-cell>33,460,000</ld-table-cell>
            <ld-table-cell>29,090,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Hubei</ld-table-cell>
            <ld-table-cell>95,020,000</ld-table-cell>
            <ld-table-cell>35,000,000</ld-table-cell>
            <ld-table-cell>24,020,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Zhejiang</ld-table-cell>
            <ld-table-cell>92,570,000</ld-table-cell>
            <ld-table-cell>38,470,000</ld-table-cell>
            <ld-table-cell>18,100,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Guangxi</ld-table-cell>
            <ld-table-cell>85,850,000</ld-table-cell>
            <ld-table-cell>24,040,000</ld-table-cell>
            <ld-table-cell>24,810,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Yunnan</ld-table-cell>
            <ld-table-cell>68,010,000</ld-table-cell>
            <ld-table-cell>22,410,000</ld-table-cell>
            <ld-table-cell>25,590,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Jiangxi</ld-table-cell>
            <ld-table-cell>65,220,000</ld-table-cell>
            <ld-table-cell>25,240,000</ld-table-cell>
            <ld-table-cell>20,980,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Liaoning</ld-table-cell>
            <ld-table-cell>63,690,000</ld-table-cell>
            <ld-table-cell>29,490,000</ld-table-cell>
            <ld-table-cell>14,200,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Fujian</ld-table-cell>
            <ld-table-cell>58,110,000</ld-table-cell>
            <ld-table-cell>25,340,000</ld-table-cell>
            <ld-table-cell>13,770,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Shaanxi</ld-table-cell>
            <ld-table-cell>54,350,000</ld-table-cell>
            <ld-table-cell>21,780,000</ld-table-cell>
            <ld-table-cell>16,570,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Heilongjiang</ld-table-cell>
            <ld-table-cell>53,890,000</ld-table-cell>
            <ld-table-cell>22,500,000</ld-table-cell>
            <ld-table-cell>15,380,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Shanxi</ld-table-cell>
            <ld-table-cell>48,820,000</ld-table-cell>
            <ld-table-cell>21,230,000</ld-table-cell>
            <ld-table-cell>15,790,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Guizhou</ld-table-cell>
            <ld-table-cell>45,550,000</ld-table-cell>
            <ld-table-cell>16,480,000</ld-table-cell>
            <ld-table-cell>19,320,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Chongqing</ld-table-cell>
            <ld-table-cell>33,750,000</ld-table-cell>
            <ld-table-cell>19,710,000</ld-table-cell>
            <ld-table-cell>11,050,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Jilin</ld-table-cell>
            <ld-table-cell>27,170,000</ld-table-cell>
            <ld-table-cell>15,390,000</ld-table-cell>
            <ld-table-cell>11,780,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Gansu</ld-table-cell>
            <ld-table-cell>26,260,000</ld-table-cell>
            <ld-table-cell>12,180,000</ld-table-cell>
            <ld-table-cell>14,080,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Inner Mongolia</ld-table-cell>
            <ld-table-cell>25,290,000</ld-table-cell>
            <ld-table-cell>15,680,000</ld-table-cell>
            <ld-table-cell>9,610,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Xinjiang</ld-table-cell>
            <ld-table-cell>24,450,000</ld-table-cell>
            <ld-table-cell>12,070,000</ld-table-cell>
            <ld-table-cell>12,380,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Shanghai</ld-table-cell>
            <ld-table-cell>24,180,000</ld-table-cell>
            <ld-table-cell>21,210,000</ld-table-cell>
            <ld-table-cell>2,970,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Beijing</ld-table-cell>
            <ld-table-cell>21,710,000</ld-table-cell>
            <ld-table-cell>18,780,000</ld-table-cell>
            <ld-table-cell>2,930,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Tianjin</ld-table-cell>
            <ld-table-cell>15,570,000</ld-table-cell>
            <ld-table-cell>12,910,000</ld-table-cell>
            <ld-table-cell>2,660,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Hainan</ld-table-cell>
            <ld-table-cell>9,170,000</ld-table-cell>
            <ld-table-cell>5,370,000</ld-table-cell>
            <ld-table-cell>3,890,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Hong Kong</ld-table-cell>
            <ld-table-cell>7,335,384</ld-table-cell>
            <ld-table-cell>7,335,384</ld-table-cell>
            <ld-table-cell>-</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Ningxia</ld-table-cell>
            <ld-table-cell>6,820,000</ld-table-cell>
            <ld-table-cell>3,950,000</ld-table-cell>
            <ld-table-cell>2,870,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Qinghai</ld-table-cell>
            <ld-table-cell>5,980,000</ld-table-cell>
            <ld-table-cell>3,170,000</ld-table-cell>
            <ld-table-cell>2,810,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Tibet</ld-table-cell>
            <ld-table-cell>3,370,000</ld-table-cell>
            <ld-table-cell>1,040,000</ld-table-cell>
            <ld-table-cell>2,330,000</ld-table-cell>
          </ld-table-row>
          <ld-table-row>
            <ld-table-cell>Macao</ld-table-cell>
            <ld-table-cell>644,900</ld-table-cell>
            <ld-table-cell>644,900</ld-table-cell>
            <ld-table-cell>-</ld-table-cell>
          </ld-table-row>
        </ld-table-body>
      </ld-table>`,
      {
        components,
      }
    )

    const resultsScrollTop = await page.compareScreenshot('scroll top')
    expect(resultsScrollTop).toMatchScreenshot()

    await page.evaluate(() => {
      const tableScrollContainer = document
        .querySelector('ld-table')
        .shadowRoot.querySelector('.ld-table__scroll-container')
      tableScrollContainer.scrollTop = 9999
    })
    await page.waitForChanges()

    const resultsScrollBottom = await page.compareScreenshot('scroll bottom')
    expect(resultsScrollBottom).toMatchScreenshot()
  })

  it('renders as Web Component with selection and pagination', async () => {
    const page = await getPageWithContent(
      `<style>
        .periodic-table {
          max-height: 26rem;
          max-width: 30rem;
        }
        .periodic-table :is(ld-table-header, ld-table-cell):is(:nth-child(1), :nth-child(n+4)) {
          text-align: right;
        }
        .periodic-table ld-table-header:nth-child(2) {
          min-width: 7rem;
        }
        .periodic-table ld-table-header:nth-child(4) {
          min-width: 8rem;
        }
      </style>
      <ld-table class="periodic-table">
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Periodic table
          </ld-table-caption>
          <ld-pagination
            offset="1"
            size="sm"
            style="margin-left: auto"
            length="20"
            selected-index="0">
          </ld-pagination>
        </ld-table-toolbar>
        <ld-table-head>
          <ld-table-row selectable>
            <ld-table-header sortable>#</ld-table-header>
            <ld-table-header sortable>Name</ld-table-header>
            <ld-table-header sortable>Symbol</ld-table-header>
            <ld-table-header sortable>Atomic mass</ld-table-header>
            <ld-table-header sortable>Electronegativity</ld-table-header>
            <ld-table-header sortable>Density</ld-table-header>
          </ld-table-row>
        </ld-table-head>
        <ld-table-body>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">1</ld-table-cell>
            <ld-table-cell class="hydrated">Hydrogen</ld-table-cell>
            <ld-table-cell class="hydrated">H</ld-table-cell>
            <ld-table-cell class="hydrated">1.0080000000</ld-table-cell>
            <ld-table-cell class="hydrated">2.20</ld-table-cell>
            <ld-table-cell class="hydrated">0.09</ld-table-cell>
          </ld-table-row>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">2</ld-table-cell>
            <ld-table-cell class="hydrated">Helium</ld-table-cell>
            <ld-table-cell class="hydrated">He</ld-table-cell>
            <ld-table-cell class="hydrated">4.0026022000</ld-table-cell>
            <ld-table-cell class="hydrated">-</ld-table-cell>
            <ld-table-cell class="hydrated">0.18</ld-table-cell>
          </ld-table-row>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">3</ld-table-cell>
            <ld-table-cell class="hydrated">Lithium</ld-table-cell>
            <ld-table-cell class="hydrated">Li</ld-table-cell>
            <ld-table-cell class="hydrated">6.9400000000</ld-table-cell>
            <ld-table-cell class="hydrated">0.98</ld-table-cell>
            <ld-table-cell class="hydrated">0.53</ld-table-cell>
          </ld-table-row>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">4</ld-table-cell>
            <ld-table-cell class="hydrated">Beryllium</ld-table-cell>
            <ld-table-cell class="hydrated">Be</ld-table-cell>
            <ld-table-cell class="hydrated">9.0121831500</ld-table-cell>
            <ld-table-cell class="hydrated">1.57</ld-table-cell>
            <ld-table-cell class="hydrated">1.85</ld-table-cell>
          </ld-table-row>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">5</ld-table-cell>
            <ld-table-cell class="hydrated">Boron</ld-table-cell>
            <ld-table-cell class="hydrated">B</ld-table-cell>
            <ld-table-cell class="hydrated">10.8100000000</ld-table-cell>
            <ld-table-cell class="hydrated">2.04</ld-table-cell>
            <ld-table-cell class="hydrated">2.08</ld-table-cell>
          </ld-table-row>
          <ld-table-row class="hydrated" selectable>
            <ld-table-cell class="hydrated">6</ld-table-cell>
            <ld-table-cell class="hydrated">Carbon</ld-table-cell>
            <ld-table-cell class="hydrated">C</ld-table-cell>
            <ld-table-cell class="hydrated">12.0110000000</ld-table-cell>
            <ld-table-cell class="hydrated">2.55</ld-table-cell>
            <ld-table-cell class="hydrated">1.82</ld-table-cell>
          </ld-table-row>
        </ld-table-body>
      </ld-table>`,
      {
        components,
      }
    )

    const resultsScrollTop = await page.compareScreenshot('scroll left')
    expect(resultsScrollTop).toMatchScreenshot()

    await page.evaluate(() => {
      const tableScrollContainer = document
        .querySelector('ld-table')
        .shadowRoot.querySelector('.ld-table__scroll-container')
      tableScrollContainer.scrollLeft = 9999

      const tableToolbar = document.querySelector('ld-table-toolbar')
      tableToolbar.scrollLeft = 9999
    })
    await page.waitForChanges()

    const resultsScrollBottom = await page.compareScreenshot('scroll right')
    expect(resultsScrollBottom).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-table>
          <ld-table-toolbar slot="toolbar">
            <ld-table-caption>
              Superheros and sidekicks
            </ld-table-caption>
          </ld-table-toolbar>
          <ld-table-colgroup>
            <ld-table-col></ld-table-col>
            <ld-table-col span="2" class="batman"></ld-table-col>
            <ld-table-col span="2" class="flash"></ld-table-col>
          </ld-table-colgroup>
          <ld-table-body>
            <ld-table-row>
              <ld-table-cell></ld-table-cell>
              <ld-table-header scope="col">Batman</ld-table-header>
              <ld-table-header scope="col">Robin</ld-table-header>
              <ld-table-header scope="col">The Flash</ld-table-header>
              <ld-table-header scope="col">Kid Flash</ld-table-header>
            </ld-table-row>
            <ld-table-row>
              <ld-table-header scope="row">Skill</ld-table-header>
              <ld-table-cell>Smarts</ld-table-cell>
              <ld-table-cell>Dex, acrobat</ld-table-cell>
              <ld-table-cell>Super speed</ld-table-cell>
              <ld-table-cell>Super speed</ld-table-cell>
            </ld-table-row>
          </ld-table-body>
        </ld-table>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<figure class="ld-table">
          <div class="ld-table__toolbar">
            <figcaption>
              Superheros and sidekicks
            </figcaption>
          </div>
          <div class="ld-table__scroll-container">
            <table>
              <colgroup>
                <col></col>
                <col span="2" class="batman"></col>
                <col span="2" class="flash"></col>
              </colgroup>
              <tbody>
                <tr>
                  <td></td>
                  <th scope="col">Batman</th>
                  <th scope="col">Robin</th>
                  <th scope="col">The Flash</th>
                  <th scope="col">Kid Flash</th>
                </tr>
                <tr>
                  <th scope="row">Skill</th>
                  <td>Smarts</td>
                  <td>Dex, acrobat</td>
                  <td>Super speed</td>
                  <td>Super speed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
