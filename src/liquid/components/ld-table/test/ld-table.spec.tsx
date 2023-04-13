import '../../../utils/mutationObserver'
import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdCheckbox } from '../../ld-checkbox/ld-checkbox'
import { LdTable } from '../ld-table'
import { LdTableBody } from '../ld-table-body/ld-table-body'
import { LdTableCaption } from '../ld-table-caption/ld-table-caption'
import { LdTableCell } from '../ld-table-cell/ld-table-cell'
import { LdTableCol } from '../ld-table-col/ld-table-col'
import { LdTableColgroup } from '../ld-table-colgroup/ld-table-colgroup'
import { LdTableFoot } from '../ld-table-foot/ld-table-foot'
import { LdTableHeader } from '../ld-table-header/ld-table-header'
import { LdTableHead } from '../ld-table-head/ld-table-head'
import { LdTableRow } from '../ld-table-row/ld-table-row'
import { LdTableToolbar } from '../ld-table-toolbar/ld-table-toolbar'

const components = [
  LdCheckbox,
  LdTable,
  LdTableBody,
  LdTableCaption,
  LdTableCell,
  LdTableCol,
  LdTableColgroup,
  LdTableFoot,
  LdTableHead,
  LdTableHeader,
  LdTableRow,
  LdTableToolbar,
]

describe('ld-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components,
      template: () => (
        <ld-table>
          <ld-table-toolbar slot="toolbar">
            <ld-table-caption>Superheros and sidekicks</ld-table-caption>
          </ld-table-toolbar>
          <ld-table-colgroup>
            <ld-table-col></ld-table-col>
            <ld-table-col span={2} class="batman"></ld-table-col>
            <ld-table-col span={2} class="flash"></ld-table-col>
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
        </ld-table>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('sorting', () => {
    it('sorts', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row>
                <ld-table-header sortable sort-order="asc">
                  Nums
                </ld-table-header>
                <ld-table-header sortable>Chars</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row>
                <ld-table-cell>1.0</ld-table-cell>
                <ld-table-cell>A</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>200,000.0</ld-table-cell>
                <ld-table-cell>B</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>100,000,000.0</ld-table-cell>
                <ld-table-cell>C</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      const getNums = () =>
        Array.from(page.root.querySelectorAll('ld-table-cell:first-child')).map(
          (cell) => cell.textContent
        )
      let nums = getNums()
      const getChars = () =>
        Array.from(
          page.root.querySelectorAll('ld-table-cell:nth-child(2)')
        ).map((cell) => cell.textContent)
      let chars = getChars()

      expect(nums[0]).toEqual('1.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('100,000,000.0')

      const btnNumsSortAsc = page.root
        .querySelector('ld-table-header:first-child')
        .shadowRoot.querySelector(
          '[part="sort-button-asc"]'
        ) as HTMLLdButtonElement
      const btnNumsSortDesc = page.root
        .querySelector('ld-table-header:first-child')
        .shadowRoot.querySelector(
          '[part="sort-button-desc"]'
        ) as HTMLLdButtonElement

      const btnCharsSortAsc = page.root
        .querySelector('ld-table-header:nth-child(2)')
        .shadowRoot.querySelector(
          '[part="sort-button-asc"]'
        ) as HTMLLdButtonElement
      const btnCharsSortDesc = page.root
        .querySelector('ld-table-header:nth-child(2)')
        .shadowRoot.querySelector(
          '[part="sort-button-desc"]'
        ) as HTMLLdButtonElement

      expect(btnNumsSortAsc).toHaveAttribute('aria-disabled')
      btnNumsSortAsc.ariaDisabled = 'true'
      expect(btnNumsSortDesc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')

      btnNumsSortAsc.click()
      await page.waitForChanges()
      nums = getNums()
      chars = getChars()

      expect(nums[0]).toEqual('1.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('100,000,000.0')
      expect(chars[0]).toEqual('A')
      expect(chars[1]).toEqual('B')
      expect(chars[2]).toEqual('C')

      expect(btnNumsSortAsc).toHaveAttribute('aria-disabled')
      expect(btnNumsSortDesc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')

      btnNumsSortDesc.click()
      await page.waitForChanges()
      nums = getNums()
      chars = getChars()

      expect(nums[0]).toEqual('100,000,000.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('1.0')
      expect(chars[0]).toEqual('C')
      expect(chars[1]).toEqual('B')
      expect(chars[2]).toEqual('A')

      expect(btnNumsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnNumsSortDesc).toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')

      btnCharsSortAsc.click()
      await page.waitForChanges()
      nums = getNums()
      chars = getChars()

      expect(nums[0]).toEqual('1.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('100,000,000.0')
      expect(chars[0]).toEqual('A')
      expect(chars[1]).toEqual('B')
      expect(chars[2]).toEqual('C')

      expect(btnNumsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnNumsSortDesc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')

      const th = page.root
        .querySelector('ld-table-header:first-child')
        .shadowRoot.querySelector('th')

      th.click()
      await page.waitForChanges()
      nums = getNums()
      chars = getChars()

      expect(nums[0]).toEqual('100,000,000.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('1.0')
      expect(chars[0]).toEqual('C')
      expect(chars[1]).toEqual('B')
      expect(chars[2]).toEqual('A')

      expect(btnNumsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnNumsSortDesc).toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')

      th.click()
      await page.waitForChanges()
      nums = getNums()
      chars = getChars()

      expect(nums[0]).toEqual('1.0')
      expect(nums[1]).toEqual('200,000.0')
      expect(nums[2]).toEqual('100,000,000.0')
      expect(chars[0]).toEqual('A')
      expect(chars[1]).toEqual('B')
      expect(chars[2]).toEqual('C')

      expect(btnNumsSortAsc).toHaveAttribute('aria-disabled')
      expect(btnNumsSortDesc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortAsc).not.toHaveAttribute('aria-disabled')
      expect(btnCharsSortDesc).not.toHaveAttribute('aria-disabled')
    })

    it('does not sort if prevented', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row>
                <ld-table-header sortable sort-order="asc">
                  Nums
                </ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
            <ld-table-foot>
              <ld-table-row>
                <ld-table-cell>6</ld-table-cell>
              </ld-table-row>
            </ld-table-foot>
          </ld-table>
        ),
      })

      const getNums = () =>
        Array.from(page.root.querySelectorAll('ld-table-cell:first-child')).map(
          (cell) => cell.textContent
        )
      let nums = getNums()

      expect(nums[0]).toEqual('1')
      expect(nums[1]).toEqual('2')
      expect(nums[2]).toEqual('3')

      page.root.querySelector('ld-table-header').dispatchEvent(
        new CustomEvent('ldTableSort', {
          bubbles: true,
          detail: {
            columnIndex: 0,
            sortOrder: 'desc',
          },
        })
      )
      await page.waitForChanges()
      nums = getNums()

      expect(nums[0]).toEqual('3')
      expect(nums[1]).toEqual('2')
      expect(nums[2]).toEqual('1')

      const prevented = new CustomEvent('ldTableSort', {
        bubbles: true,
        detail: {
          columnIndex: 0,
          sortOrder: 'asc',
        },
      })
      prevented.preventDefault()

      page.root.querySelector('ld-table-header').dispatchEvent(prevented)
      await page.waitForChanges()
      nums = getNums()

      expect(nums[0]).toEqual('3')
      expect(nums[1]).toEqual('2')
      expect(nums[2]).toEqual('1')
    })

    it('does not sort if not sortable', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row>
                <ld-table-header sort-order="asc">Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
            <ld-table-foot>
              <ld-table-row>
                <ld-table-cell>6</ld-table-cell>
              </ld-table-row>
            </ld-table-foot>
          </ld-table>
        ),
      })

      const getNums = () =>
        Array.from(page.root.querySelectorAll('ld-table-cell:first-child')).map(
          (cell) => cell.textContent
        )
      let nums = getNums()

      expect(nums[0]).toEqual('1')
      expect(nums[1]).toEqual('2')
      expect(nums[2]).toEqual('3')

      const th = page.root
        .querySelector('ld-table-header:first-child')
        .shadowRoot.querySelector('th')

      th.click()
      await page.waitForChanges()
      nums = getNums()

      expect(nums[0]).toEqual('1')
      expect(nums[1]).toEqual('2')
      expect(nums[2]).toEqual('3')
    })
  })

  describe('selection', () => {
    it('selects', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row selectable>
                <ld-table-header>Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      const getCheckboxes = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) =>
          row.shadowRoot.querySelector('ld-checkbox')
        )
      const checkboxes = getCheckboxes()
      expect(checkboxes.length).toEqual(4)

      expect(checkboxes[0].indeterminate).toBeFalsy()
      expect(checkboxes[0].checked).toBeFalsy()
      expect(checkboxes[1].checked).toBeFalsy()
      expect(checkboxes[2].checked).toBeFalsy()
      expect(checkboxes[3].checked).toBeFalsy()

      checkboxes[2].click()
      await page.waitForChanges()

      expect(checkboxes[0].indeterminate).toBeTruthy()
      expect(checkboxes[0].checked).toBeFalsy()
      expect(checkboxes[1].checked).toBeFalsy()
      expect(checkboxes[2].checked).toBeTruthy()
      expect(checkboxes[3].checked).toBeFalsy()

      checkboxes[0].click()
      await page.waitForChanges()

      expect(checkboxes[0].indeterminate).toBeFalsy()
      expect(checkboxes[0].checked).toBeTruthy()
      expect(checkboxes[1].checked).toBeTruthy()
      expect(checkboxes[2].checked).toBeTruthy()
      expect(checkboxes[3].checked).toBeTruthy()

      checkboxes[2].click()
      await page.waitForChanges()

      expect(checkboxes[0].indeterminate).toBeTruthy()
      expect(checkboxes[0].checked).toBeFalsy()
      expect(checkboxes[1].checked).toBeTruthy()
      expect(checkboxes[2].checked).toBeFalsy()
      expect(checkboxes[3].checked).toBeTruthy()

      checkboxes[2].click()
      await page.waitForChanges()

      expect(checkboxes[0].indeterminate).toBeFalsy()
      expect(checkboxes[0].checked).toBeTruthy()
      expect(checkboxes[1].checked).toBeTruthy()
      expect(checkboxes[2].checked).toBeTruthy()
      expect(checkboxes[3].checked).toBeTruthy()
    })

    it('does not select if prevented', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row selectable>
                <ld-table-header>Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      const getRows = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) => ({
          row,
          checkbox: row.shadowRoot.querySelector('ld-checkbox'),
        }))
      const rows = getRows()

      rows[2].row.selected = true
      rows[2].checkbox.checked = true
      page.root.dispatchEvent(
        new CustomEvent('ldTableSelect', {
          bubbles: true,
          detail: {
            rowIndex: 2,
            selected: true,
          },
        })
      )
      await page.waitForChanges()

      expect(rows[0].checkbox.indeterminate).toBeTruthy()

      rows[2].row.selected = false
      rows[2].checkbox.checked = false
      const prevented = new CustomEvent('ldTableSelect', {
        bubbles: true,
        detail: {
          rowIndex: 2,
          selected: false,
        },
      })
      prevented.preventDefault()
      page.root.dispatchEvent(prevented)

      expect(rows[0].checkbox.indeterminate).toBeTruthy()
    })

    it('does not select all if prevented', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row selectable>
                <ld-table-header>Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      const getCheckboxes = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) =>
          row.shadowRoot.querySelector('ld-checkbox')
        )
      const checkboxes = getCheckboxes()

      page.root.dispatchEvent(
        new CustomEvent('ldTableSelectAll', {
          bubbles: true,
          detail: {
            selected: true,
          },
        })
      )
      await page.waitForChanges()

      expect(checkboxes[1].checked).toBeTruthy()
      expect(checkboxes[2].checked).toBeTruthy()
      expect(checkboxes[3].checked).toBeTruthy()

      page.root.dispatchEvent(
        new CustomEvent('ldTableSelectAll', {
          bubbles: true,
          detail: {
            selected: false,
          },
        })
      )
      await page.waitForChanges()

      expect(checkboxes[1].checked).toBeFalsy()
      expect(checkboxes[2].checked).toBeFalsy()
      expect(checkboxes[3].checked).toBeFalsy()

      const prevented = new CustomEvent('ldTableSelectAll', {
        bubbles: true,
        detail: {
          selected: true,
        },
      })
      prevented.preventDefault()
      page.root.dispatchEvent(prevented)

      expect(checkboxes[1].checked).toBeFalsy()
      expect(checkboxes[2].checked).toBeFalsy()
      expect(checkboxes[3].checked).toBeFalsy()
    })

    it('updates select all checkbox on load', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row selectable>
                <ld-table-header>Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable selected>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      await page.waitForChanges()
      const getCheckboxes = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) =>
          row.shadowRoot.querySelector('ld-checkbox')
        )
      const checkboxes = getCheckboxes()

      expect(checkboxes[0].indeterminate).toBeTruthy()
    })

    it('does not throw updating select all checkbox on load if there is no table head', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable selected>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })

      await page.waitForChanges()
      const getCheckboxes = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) =>
          row.shadowRoot.querySelector('ld-checkbox')
        )
      const checkboxes = getCheckboxes()

      expect(checkboxes.length).toEqual(3)
    })

    it('disabled select all if at least one row has a disabled selection', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-table>
            <ld-table-head>
              <ld-table-row selectable>
                <ld-table-header>Nums</ld-table-header>
              </ld-table-row>
            </ld-table-head>
            <ld-table-body>
              <ld-table-row selectable>
                <ld-table-cell>1</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable selectionDisabled>
                <ld-table-cell>2</ld-table-cell>
              </ld-table-row>
              <ld-table-row selectable>
                <ld-table-cell>3</ld-table-cell>
              </ld-table-row>
            </ld-table-body>
          </ld-table>
        ),
      })
      await page.waitForChanges()

      const getCheckboxes = () =>
        Array.from(page.root.querySelectorAll('ld-table-row')).map((row) =>
          row.shadowRoot.querySelector('ld-checkbox')
        )
      const checkboxes = getCheckboxes()

      expect(checkboxes[0]).toHaveAttribute('aria-disabled')
    })
  })
})
