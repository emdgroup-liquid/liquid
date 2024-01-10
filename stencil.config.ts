import { Config } from '@stencil/core'
import { postcss } from '@stencil/postcss'
import { reactOutputTarget } from '@stencil/react-output-target'
import { WebTypesGenerator } from 'stenciljs-web-types-generator/web-types-generator'
import {
  ComponentModelConfig,
  vueOutputTarget,
} from '@stencil/vue-output-target'
import * as postcssConfig from './config/postcss.config.cjs'

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
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'docs-custom',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      generator: new WebTypesGenerator({
        name: '@emdgroup-liquid/liquid',
        version: 'latest',
        defaultIconPath:
          'https://liquid.merck.design/liquid/dist/build/assets/logo.svg',
        outputPath: 'dist/web-types.json',
      }).generateWebTypesJson,
    },
  ],
  plugins: [postcss(postcssConfig)],
  testing: {
    allowableMismatchedPixels: 10,
    setupFiles: ['./config/jest.setup.js'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    timers: 'legacy',
    emulate: [
      {
        viewport: {
          width: 600,
          height: 600,
          // A device scale factor of 2 would reduce issues with antialiasing.
          // However, testing then takes longer and screenshot matching
          // tends to time out, especially when running all tests in one go.
          // That is why we do without the higher device scale factor, for now.
          // deviceScaleFactor: 2,
        },
      },
    ],
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
