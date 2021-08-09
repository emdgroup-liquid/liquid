import { Config } from '@stencil/core'
import { postcss } from '@stencil/postcss'
import { reactOutputTarget } from '@stencil/react-output-target'
import postcssConfig from './postcss.config'

export const config: Config = {
  namespace: 'liquid',
  srcDir: 'src/liquid',
  globalStyle: 'src/liquid/global/styles/global.css',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '..',
      proxiesFile: './src/react.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
      footer: ' ',
    },
    {
      type: 'docs-vscode',
      file: 'tmp/web-components.html-data.json',
    },
    {
      type: 'docs-json',
      file: 'dist/web-components.json',
    },
  ],
  plugins: [postcss(postcssConfig)],
  testing: {
    moduleDirectories: ['node_modules', './'],
    timers: 'fake',
  },
  buildEs5: false,
  extras: {
    cssVarsShim: false,
    dynamicImportShim: false,
    shadowDomShim: false,
    safari10: false,
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
}
