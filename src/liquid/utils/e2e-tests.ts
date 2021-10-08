import { newE2EPage } from '@stencil/core/testing'

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
  content: string,
  theme = 'ocean',
  components?: unknown
) => {
  const page = await newE2EPage({
    html: `<div class="ld-theme-${theme} e2e-container">${content}</div>`,
    // TODO: test, if this helps the asset loading...
    waitUntil: 'load',
  })

  await page.addStyleTag({
    content: `body {
  margin: 0;
}
*:focus, ld-button >>> *:focus {
  outline: none;
}
.e2e-container {
  display: grid;
  height: 100vh;
  place-items: center
}`,
  })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  if (components) {
    await Promise.all(
      [components].flat().map(async (component: Component) => {
        const cssFileName =
          component.COMPILER_META.styles[0].externalStyles[0].relativePath
        await page.addStyleTag({ path: `./dist/css/${cssFileName}` })
      })
    )
  }

  return page
}
