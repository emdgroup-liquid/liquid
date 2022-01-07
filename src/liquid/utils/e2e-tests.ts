import { E2EPage, newE2EPage } from '@stencil/core/testing'
import { resolve } from 'path'
import { realpathSync } from 'fs'
import * as axe from 'axe-core'
import { printReceived } from 'jest-matcher-utils'

const PATH_TO_AXE = './node_modules/axe-core/axe.min.js'
const appDirectory = realpathSync(process.cwd())

const resolvePath = (relativePath) => resolve(appDirectory, relativePath)

interface PatchedE2EPage extends E2EPage {
  screenshot: () => void
}

type Component = Record<string, unknown> & {
  COMPILER_META: Record<string, unknown> & {
    styles: (Record<string, unknown> & {
      externalStyles: (Record<string, unknown> & {
        relativePath: string
      })[]
    })[]
  }
}

export const getPageWithContent = async (
  content,
  config?: {
    bgColor?: string
    components?: unknown
    disableAllTransitions?: boolean
    enforceAnimationDurationSeconds?: number
    notWrapped?: boolean
  }
) => {
  const page = (await newE2EPage({
    html: config?.notWrapped
      ? content
      : `<div class="e2e-container">${content}</div>`,
    // TODO: test, if this helps the asset loading...
    waitUntil: 'domcontentloaded',
  })) as PatchedE2EPage

  // TODO: The following monkey patch is required until the upstream issue
  //  https://github.com/ionic-team/stencil/issues/3188) is fixed:
  const screenshot = page.screenshot
  page.screenshot = async function () {
    return screenshot.call(page, {
      captureBeyondViewport: false,
    })
  }

  const disableAllTransitionsStyles = `
    *,
    *::before,
    *::after {
      transition: none !important;
    }`

  await page.addStyleTag({
    content: `${
      config?.disableAllTransitions ? disableAllTransitionsStyles : ''
    }
    body {
      margin: 0;
      ${config?.bgColor ? `background-color: ${config.bgColor};` : ''}
      height: 600px;
    }
    *:focus,
    ::part(focusable) {
      outline: none;
      caret-color: transparent;
    }
    .e2e-container {
      display: grid;
      height: 100vh;
      place-items: center
    }`,
  })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })

  if (config?.components) {
    await Promise.all(
      [config.components].flat().map(async (component: Component) => {
        const cssFileName =
          component.COMPILER_META.styles[0].externalStyles[0].relativePath
        await page.addStyleTag({ path: `./dist/css/${cssFileName}` })
      })
    )
  }

  return page
}

export const analyzeAccessibility = async (page, options = {}) => {
  const defaultOptions = { rules: {} }
  const disabledRuleIds = [
    'document-title',
    'html-has-lang',
    'label',
    'landmark-one-main',
    'page-has-heading-one',
    'region',
  ]
  disabledRuleIds.forEach((ruleId) => {
    defaultOptions.rules[ruleId] = { enabled: false }
  })

  const finalOptions = Object.assign({}, defaultOptions, options)

  // Inject the axe script in our page.
  await page.addScriptTag({ path: resolvePath(PATH_TO_AXE) })
  // Make sure that axe is executed in the next tick after
  // the page emits the load event, giving priority to other scripts.
  const accessibilityReport = await page.evaluate((axeOptions) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 0)
    }).then(() => axe.run(axeOptions))
  }, finalOptions)

  return accessibilityReport
}

function getInvalidNodeInfo(node) {
  return `- ${printReceived(node.html)}\n\t${node.any
    .map((check) => check.message)
    .join('\n\t')}`
}

function getInvalidRuleInfo(rule) {
  return `[rule id: ${rule.id}] ${printReceived(rule.help)} on ${
    rule.nodes.length
  } nodes\r\n${rule.nodes.map(getInvalidNodeInfo).join('\n')}`
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveNoAccessibilityIssues(): R
    }
  }
}

// Add a new method to expect assertions with a very detailed error report
expect.extend({
  toHaveNoAccessibilityIssues(accessibilityReport, options) {
    let violations = []
    let incomplete = []

    const defaultOptions = {
      violationsThreshold: 0,
      incompleteThreshold: 0,
    }

    const finalOptions = Object.assign({}, defaultOptions, options)

    if (
      accessibilityReport.violations.length > finalOptions.violationsThreshold
    ) {
      violations = [
        `Expected to have no more than ${finalOptions.violationsThreshold} violations. Detected ${accessibilityReport.violations.length} violations:\n`,
      ].concat(accessibilityReport.violations.map(getInvalidRuleInfo))
    }

    if (
      finalOptions.incompleteThreshold !== false &&
      accessibilityReport.incomplete.length > finalOptions.incompleteThreshold
    ) {
      incomplete = [
        `Expected to have no more than ${finalOptions.incompleteThreshold} incomplete. Detected ${accessibilityReport.incomplete.length} incomplete:\n`,
      ].concat(accessibilityReport.incomplete.map(getInvalidRuleInfo))
    }

    const message = [].concat(violations, incomplete).join('\n')
    const pass =
      accessibilityReport.violations.length <=
        finalOptions.violationsThreshold &&
      (finalOptions.incompleteThreshold === false ||
        accessibilityReport.incomplete.length <=
          finalOptions.incompleteThreshold)

    return {
      pass,
      message: () => message,
    }
  },
})
