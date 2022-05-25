import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'

const modes = [
  { label: 'numbers' },
  { label: 'dots', props: ' mode="dots"' },
  { label: 'numbers on brand color', props: ' brand-color' },
  { label: 'dots on brand color', props: ' brand-color mode="dots"' },
]

describe('ld-pagination', () => {
  modes.forEach(({ label, props }) => {
    const pageConfig = props?.includes('brand-color')
      ? {
          bgColor: 'var(--ld-thm-primary)',
        }
      : undefined

    describe(`${label} mode`, () => {
      describe('default', () => {
        it('start', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${props ?? ''} length="15"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('middle', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('end', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="14"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('single', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${props ?? ''} length="1"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('without ellipsis', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${props ?? ''} length="7"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })

      describe('indefinite', () => {
        it('start', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${props ?? ''}></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('middle', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${props ?? ''} selected-index="7"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })

      if (!label.includes('dots')) {
        describe('sticky', () => {
          it('start', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()

            const accessibilityReport = await analyzeAccessibility(page)
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          })

          it('middle', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('end', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="14"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()

            const accessibilityReport = await analyzeAccessibility(page)
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          })

          it('single', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="1"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('without ellipsis', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="11"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })
      }
      describe('without offset', () => {
        it('start', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } offset="0" length="15"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('middle', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } offset="0" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('end', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } offset="0" length="15" selected-index="14"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('single', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } offset="0" length="1"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('without ellipsis', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } offset="0" length="3"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })

      describe('hover', () => {
        it('start arrow', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          const arrow = await page.find(
            'ld-pagination >>> li.ld-pagination__arrow:nth-child(2) > ld-button'
          )
          await arrow.hover()

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        if (!label.includes('dots')) {
          it('first sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )

            const item = await page.find(
              'ld-pagination >>> li.ld-pagination__sticky > ld-button'
            )
            await item.hover()

            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }

        it('slidable item', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          const item = await page.find(
            'ld-pagination >>> li.ld-pagination__item--selected > ld-button'
          )
          await item.hover()

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          // TODO: remove condition, if a11y is fixed
          if (props !== ' brand-color') {
            const accessibilityReport = await analyzeAccessibility(page)
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          }
        })

        if (!label.includes('dots')) {
          it('last sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )

            const item = await page.find(
              'ld-pagination >>> li.ld-pagination__sticky:nth-last-child(2) > ld-button'
            )
            await item.hover()

            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }

        it('next arrow', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          const arrow = await page.find(
            'ld-pagination >>> li.ld-pagination__arrow:nth-child(2) > ld-button'
          )
          await arrow.hover()
          await page.mouse.down()

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        if (!label.includes('dots')) {
          it('first sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )

            const item = await page.find(
              'ld-pagination >>> li.ld-pagination__sticky > ld-button'
            )
            await item.hover()
            await page.mouse.down()

            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }

        it('slidable item', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          const item = await page.find(
            'ld-pagination >>> li.ld-pagination__item--selected > ld-button'
          )
          await item.hover()
          await page.mouse.down()

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          // TODO: remove condition, if a11y is fixed
          if (props !== ' brand-color') {
            const accessibilityReport = await analyzeAccessibility(page)
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          }
        })

        if (!label.includes('dots')) {
          it('last sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )

            const item = await page.find(
              'ld-pagination >>> li.ld-pagination__sticky:nth-last-child(2) > ld-button'
            )
            await item.hover()
            await page.mouse.down()

            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }

        it('next arrow', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          await page.keyboard.press('Tab')

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          const accessibilityReport = await analyzeAccessibility(page)
          expect(accessibilityReport).toHaveNoAccessibilityIssues()
        })

        it('prev arrow', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )

          await page.keyboard.press('Tab')
          await page.keyboard.press('Tab')

          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        if (!label.includes('dots')) {
          it('first sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
            )

            await page.keyboard.press('Tab')
            await page.keyboard.press('Tab')

            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        }

        it('slidable item', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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

        if (!label.includes('dots')) {
          it('last sticky item', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } hide-start-end sticky="2" length="15" selected-index="7"></ld-pagination>`,
              pageConfig
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
        }

        it('next arrow', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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
            `<ld-pagination${
              props ?? ''
            } length="15" selected-index="7"></ld-pagination>`,
            pageConfig
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

      describe('without arrows', () => {
        it('start', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-prev-next hide-start-end length="15"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('middle', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-prev-next hide-start-end length="15" selected-index="7"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('end', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } hide-prev-next hide-start-end length="15" selected-index="14"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      })

      describe('with text navigation', () => {
        it('start', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } end-label="Last" length="15" next-label="Next" prev-label="Prev" start-label="First"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          const accessibilityReport = await analyzeAccessibility(page)
          expect(accessibilityReport).toHaveNoAccessibilityIssues()
        })

        it('middle', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } end-label="Last" length="15" next-label="Next" prev-label="Prev" selected-index="7" start-label="First"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        it('end', async () => {
          const page = await getPageWithContent(
            `<ld-pagination${
              props ?? ''
            } end-label="Last" length="15" next-label="Next" prev-label="Prev" selected-index="14" start-label="First"></ld-pagination>`,
            pageConfig
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          const accessibilityReport = await analyzeAccessibility(page)
          expect(accessibilityReport).toHaveNoAccessibilityIssues()
        })
      })

      describe('size', () => {
        describe('sm', () => {
          it('start', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" size="sm"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('middle', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" selected-index="7" size="sm"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('end', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" selected-index="14" size="sm"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('single', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="1" size="sm"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('without ellipsis', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="7" size="sm"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })

        describe('lg', () => {
          it('start', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" size="lg"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('middle', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" selected-index="7" size="lg"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('end', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="15" selected-index="14" size="lg"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('single', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="1" size="lg"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('without ellipsis', async () => {
            const page = await getPageWithContent(
              `<ld-pagination${
                props ?? ''
              } length="7" size="lg"></ld-pagination>`,
              pageConfig
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })
      })
    })
  })
})
