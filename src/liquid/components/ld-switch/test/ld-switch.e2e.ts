import {
  analyzeAccessibility,
  getPageWithContent,
} from 'src/liquid/utils/e2e-tests'
import { LdSwitch } from '../ld-switch'
import { LdSwitchItem } from '../ld-switch-item/ld-switch-item'
import { LdIcon } from '../../ld-icon/ld-icon'

const sizes = ['sm', 'md', 'lg']

function getSwitchWebComponent(
  props = '',
  hasLabels = true,
  icon: 'start' | 'end' | undefined = undefined,
  ellipsed = false
) {
  if (ellipsed) {
    return `
      <ld-switch legend="Dress" name="dress" ${props} style="max-width: 16rem; --ld-switch-item-outline: none">
        <ld-switch-item value="ghost" checked>
          ${
            icon === 'start'
              ? '<ld-icon slot="icon-start" name="placeholder" />'
              : ''
          }
          ${hasLabels ? 'Ghost' : ''}
          ${
            icon === 'end'
              ? '<ld-icon slot="icon-end" name="placeholder" />'
              : ''
          }
        </ld-switch-item>
        <ld-switch-item value="zvwmsc">
          ${
            icon === 'start'
              ? '<ld-icon slot="icon-start" name="placeholder" />'
              : ''
          }
          ${hasLabels ? 'Zombie-Vampire-Werewolf-Monster-Squirrel-Clown' : ''}
          ${
            icon === 'end'
              ? '<ld-icon slot="icon-end" name="placeholder" />'
              : ''
          }
        </ld-switch-item>
      </ld-switch>
    `
  }

  return `
    <ld-switch legend="Dress" name="dress" ${props} style="--ld-switch-item-outline: none">
      <ld-switch-item value="werewolf" checked>
        ${
          icon === 'start'
            ? '<ld-icon slot="icon-start" name="placeholder" />'
            : ''
        }
        ${hasLabels ? 'Werewolf' : ''}
        ${
          icon === 'end' ? '<ld-icon slot="icon-end" name="placeholder" />' : ''
        }
      </ld-switch-item>
      <ld-switch-item value="zombie">
        ${
          icon === 'start'
            ? '<ld-icon slot="icon-start" name="placeholder" />'
            : ''
        }
        ${hasLabels ? 'Zombie' : ''}
        ${
          icon === 'end' ? '<ld-icon slot="icon-end" name="placeholder" />' : ''
        }
      </ld-switch-item>
      <ld-switch-item value="mummy" disabled>
        ${
          icon === 'start'
            ? '<ld-icon slot="icon-start" name="placeholder" />'
            : ''
        }
        ${hasLabels ? 'Mummy' : ''}
        ${
          icon === 'end' ? '<ld-icon slot="icon-end" name="placeholder" />' : ''
        }
      </ld-switch-item>
      <ld-switch-item value="vampire" readonly>
        ${
          icon === 'start'
            ? '<ld-icon slot="icon-start" name="placeholder" />'
            : ''
        }
        ${hasLabels ? 'Vampire' : ''}
        ${
          icon === 'end' ? '<ld-icon slot="icon-end" name="placeholder" />' : ''
        }
      </ld-switch-item>
      <ld-switch-item value="ghost" aria-disabled="true">
        ${
          icon === 'start'
            ? '<ld-icon slot="icon-start" name="placeholder" />'
            : ''
        }
        ${hasLabels ? 'Ghost' : ''}
        ${
          icon === 'end' ? '<ld-icon slot="icon-end" name="placeholder" />' : ''
        }
      </ld-switch-item>
    </ld-switch>
  `
}

function getSwitchCSSComponent(
  props = '',
  hasLabels = true,
  icon: 'start' | 'end' | undefined = undefined,
  ellipsed = false
) {
  let cssClassesIcon = ''
  const cssClasses = props
    .split(' ')
    .map((prop) => {
      if (prop.startsWith('size="')) {
        const size = prop.substr(6, 2)
        cssClassesIcon += ` ld-icon--${size}`
        return `ld-switch--${size}`
      }
      return `ld-switch--${prop}`
    })
    .join(' ')

  const iconHTML = `
    <span class="ld-icon ${cssClassesIcon}">
      <svg viewBox="0 0 24 24" fill="none">
        <title>Text</title>
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </span>
  `

  if (ellipsed) {
    return `
      <fieldset class="ld-switch ${cssClasses}" style="max-width: 16rem; --ld-switch-item-outline: none">
        <legend>Dress</legend>
        <label class="ld-switch-item">
          <input name="dress"
                 type="radio"
                 value="ghost"
                 checked />
          <span class="ld-switch-item__content">
            ${icon === 'start' ? iconHTML : ''}
            ${
              hasLabels
                ? '<span class="ld-switch-item__label">Ghost</span>'
                : ''
            }
            ${icon === 'end' ? iconHTML : ''}
          </span>
        </label>
        <label class="ld-switch-item">
          <input name="dress"
                 type="radio"
                 value="zvwmsc" />
          <span class="ld-switch-item__content">
            ${icon === 'start' ? iconHTML : ''}
            ${
              hasLabels
                ? '<span class="ld-switch-item__label">Zombie-Vampire-Werewolf-Monster-Squirrel-Clown</span>'
                : ''
            }
            ${icon === 'end' ? iconHTML : ''}
          </span>
        </label>
      </fieldset>
    `
  }

  return `
    <fieldset class="ld-switch ${cssClasses}" style="--ld-switch-item-outline: none">
      <legend>Dress</legend>
      <label class="ld-switch-item">
        <input name="dress"
               type="radio"
               value="werewolf"
               checked />
        <span class="ld-switch-item__content">
          ${icon === 'start' ? iconHTML : ''}
          ${
            hasLabels
              ? '<span class="ld-switch-item__label">Werewolf</span>'
              : ''
          }
          ${icon === 'end' ? iconHTML : ''}
        </span>
      </label>
      <label class="ld-switch-item">
        <input name="dress"
               type="radio"
               value="zombie" />
        <span class="ld-switch-item__content">
          ${icon === 'start' ? iconHTML : ''}
          ${
            hasLabels ? '<span class="ld-switch-item__label">Zombie</span>' : ''
          }
          ${icon === 'end' ? iconHTML : ''}
        </span>
      </label>
      <label class="ld-switch-item">
        <input name="dress"
               type="radio"
               value="mummy"
               disabled />
        <span class="ld-switch-item__content">
          ${icon === 'start' ? iconHTML : ''}
          ${hasLabels ? '<span class="ld-switch-item__label">Mummy</span>' : ''}
          ${icon === 'end' ? iconHTML : ''}
        </span>
      </label>
      <label class="ld-switch-item">
        <input name="dress"
               type="radio"
               value="vampire"
               readonly />
        <span class="ld-switch-item__content">
          ${icon === 'start' ? iconHTML : ''}
          ${
            hasLabels
              ? '<span class="ld-switch-item__label">Vampire</span>'
              : ''
          }
          ${icon === 'end' ? iconHTML : ''}
        </span>
      </label>
      <label class="ld-switch-item">
        <input name="dress"
               type="radio"
               value="ghost"
               aria-disabled="true" />
        <span class="ld-switch-item__content">
          ${icon === 'start' ? iconHTML : ''}
          ${hasLabels ? '<span class="ld-switch-item__label">Ghost</span>' : ''}
          ${icon === 'end' ? iconHTML : ''}
        </span>
      </label>
    </fieldset>
  `
}

const brandColor = {
  bgColor: 'var(--ld-thm-primary)',
}

describe('ld-switch', () => {
  for (const getSwitchComponent of [
    getSwitchWebComponent,
    getSwitchCSSComponent,
  ]) {
    const isCSSComponent = getSwitchComponent.name === 'getSwitchCSSComponent'
    const pageConfig = {
      components: isCSSComponent ? [LdSwitch, LdSwitchItem, LdIcon] : [],
    }
    const switchItemSelector = isCSSComponent
      ? '.ld-switch-item'
      : 'ld-switch-item'

    describe(isCSSComponent ? 'CSS component' : 'Web Component', () => {
      it('is accessibile', async () => {
        const page = await getPageWithContent(
          getSwitchComponent('fit-content', true, undefined, true),
          pageConfig
        )
        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('default', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('hover', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.hover(`${switchItemSelector}:nth-of-type(2)`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('hover selected', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.hover(`${switchItemSelector}:nth-of-type(1)`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('hover disabled', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.hover(`${switchItemSelector}:nth-of-type(3)`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('focus', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('focus selected', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('focus disabled', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('active', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('active selected', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('active disabled', async () => {
        const page = await getPageWithContent(getSwitchComponent(), pageConfig)
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      describe('brand-color', () => {
        it('default', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('hover', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.hover(`${switchItemSelector}:nth-of-type(2)`)
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('hover selected', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.hover(`${switchItemSelector}:nth-of-type(1)`)
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('hover disabled', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.hover(`${switchItemSelector}:nth-of-type(3)`)
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('focus', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.press('ArrowRight')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('focus selected', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('focus disabled', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('ArrowRight')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('active', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.press('ArrowRight')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('active selected', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('active disabled', async () => {
          const page = await getPageWithContent(
            getSwitchComponent('brand-color'),
            { ...pageConfig, ...brandColor }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('ArrowRight')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })

      describe('size', () => {
        for (const size of sizes) {
          it(`${size}`, async () => {
            const page = await getPageWithContent(
              getSwitchComponent(`size="${size}"`),
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }
      })

      describe('with icon', () => {
        for (const size of sizes) {
          it(`size ${size} icon start`, async () => {
            const page = await getPageWithContent(
              getSwitchComponent(`size="${size}"`, true, 'start'),
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it(`size ${size} icon end`, async () => {
            const page = await getPageWithContent(
              getSwitchComponent(`size="${size}"`, true, 'end'),
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it(`size ${size} icon only`, async () => {
            const page = await getPageWithContent(
              getSwitchComponent(`size="${size}"`, false, 'start'),
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }
      })

      it('fit content', async () => {
        const page = await getPageWithContent(
          getSwitchComponent('fit-content'),
          pageConfig
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      describe('ellipsed', () => {
        it(`no icon`, async () => {
          const page = await getPageWithContent(
            getSwitchComponent('fit-content', true, undefined, true),
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it(`icon start`, async () => {
          const page = await getPageWithContent(
            getSwitchComponent('fit-content', true, 'start', true),
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it(`icon end`, async () => {
          const page = await getPageWithContent(
            getSwitchComponent('fit-content', true, 'end', true),
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })
    })
  }
})
