import { E2EPage, newE2EPage } from '@stencil/core/testing'

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
  }
) => {
  const page = await newE2EPage({
    html: `<div class="e2e-container">${content}</div>`,
    // TODO: test, if this helps the asset loading...
    waitUntil: 'domcontentloaded',
  })

  // TODO: The following monkey patch is required until the upstream issue
  //  https://github.com/ionic-team/stencil/issues/3188) is fixed:
  const screenshot = (page as PatchedE2EPage).screenshot
  ;(page as PatchedE2EPage).screenshot = async function () {
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
