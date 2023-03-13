import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'

const positions = [
  'bottom center',
  'bottom left',
  'bottom right',
  'left bottom',
  'left middle',
  'left top',
  'right bottom',
  'right middle',
  'right top',
  'top center',
  'top left',
  'top right',
]
const sizes = ['sm', 'md', 'lg']

describe('ld-context-menu', () => {
  sizes.forEach((size) => {
    describe(`size ${size}`, () => {
      positions.forEach((position) => {
        describe(`position ${position}`, () => {
          it('default', async () => {
            const page = await getPageWithContent(
              `<ld-context-menu${size ? ` size="${size}"` : ''}${
                position ? ` position="${position}"` : ''
              }>
              <ld-button slot="trigger">Open</ld-button>
              <ld-menuitem>Menu item 1</ld-menuitem>
              <ld-menuitem>Menu item 2</ld-menuitem>
              <ld-menuitem>Menu item 3</ld-menuitem>
            </ld-context-menu>`,
              { disableAllTransitions: true }
            )

            const trigger = await page.find('ld-button')
            await trigger.click()
            await new Promise((resolve) => setTimeout(resolve, 200))

            return expect(page.compareScreenshot()).resolves.toMatchScreenshot()
          })

          it('with menu groups', async () => {
            const page = await getPageWithContent(
              `<ld-context-menu${size ? ` size="${size}"` : ''}${
                position ? ` position="${position}"` : ''
              }>
              <ld-button slot="trigger">Open</ld-button>
              <ld-menuitem-group>
                <ld-menuitem>Menu item 1</ld-menuitem>
                <ld-menuitem>Menu item 2</ld-menuitem>
              </ld-menuitem-group>
              <ld-menuitem-group>
                <ld-menuitem mode="highlight">
                  <ld-icon name="repost"></ld-icon>
                  Reset
                </ld-menuitem>
                <ld-menuitem mode="danger">
                  <ld-icon name="bin"></ld-icon>
                  Delete
                </ld-menuitem>
              </ld-menuitem-group>
            </ld-context-menu>`,
              { disableAllTransitions: true }
            )

            const trigger = await page.find('ld-button')
            await trigger.click()
            await new Promise((resolve) => setTimeout(resolve, 200))

            return expect(page.compareScreenshot()).resolves.toMatchScreenshot()
          })
        })
      })

      it('accessibility', async () => {
        const page = await getPageWithContent(
          `<ld-context-menu${size ? ` size="${size}"` : ''}>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item 1</ld-menuitem>
          <ld-menuitem>Menu item 2</ld-menuitem>
          <ld-menuitem>Menu item 3</ld-menuitem>
        </ld-context-menu>`,
          { disableAllTransitions: true }
        )

        const trigger = await page.find('ld-button')
        await trigger.click()
        await new Promise((resolve) => setTimeout(resolve, 200))

        expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
        await expect(
          analyzeAccessibility(page)
        ).resolves.toHaveNoAccessibilityIssues()
      })
    })
  })
})
