import { Config } from '@stencil/core'
import { postcss } from '@stencil/postcss'
import { reactOutputTarget } from '@stencil/react-output-target'
import {
  ComponentModelConfig,
  vueOutputTarget,
} from '@stencil/vue-output-target'
import postcssConfig from './config/postcss.config.cjs'

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: ['ld-input', 'ld-slider'],
    event: 'input',
    externalEvent: 'input',
    targetAttr: 'value',
  },
  {
    elements: ['ld-checkbox', 'ld-toggle'],
    event: 'input',
    externalEvent: 'input',
    targetAttr: 'checked',
  },
]

export const config: Config = {
  namespace: 'liquid',
  srcDir: 'src/liquid',
  globalStyle: 'src/liquid/global/styles/global.css',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '../dist/components',
      proxiesFile: './out/react.ts',
      includeDefineCustomElements: true,
    }),
    vueOutputTarget({
      componentCorePackage: '../dist/components',
      proxiesFile: './out/vue.ts',
      includeDefineCustomElements: true,
      componentModels: vueComponentModels,
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
    },
    {
      type: 'docs-readme',
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
    allowableMismatchedRatio: 0.01,
    setupFiles: ['./config/jest.setup.js'],
    moduleDirectories: ['node_modules', './'],
    timers: 'legacy',
    // browserHeadless: false,
    // browserDevtools: true,
    // browserSlowMo: 1000, // milliseconds
  },
  buildEs5: false,
  extras: {
    experimentalImportInjection: true,
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
}
