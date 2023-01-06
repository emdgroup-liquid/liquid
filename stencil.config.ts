import { Config } from '@stencil/core'
import { postcss } from '@stencil/postcss'
import { reactOutputTarget } from '@stencil/react-output-target'
import { vueOutputTarget } from '@stencil/vue-output-target'
import postcssConfig from './postcss.config.cjs'

export const config: Config = {
  namespace: 'liquid',
  srcDir: 'src/liquid',
  globalStyle: 'src/liquid/global/styles/global.css',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '..',
      proxiesFile: './src/react.ts',
      includeDefineCustomElements: false,
    }),
    vueOutputTarget({
      componentCorePackage: '..',
      proxiesFile: './src/vue.ts',
      includeDefineCustomElements: false,
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
      generateTypeDeclarations: true,
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
    allowableMismatchedPixels: 0,
    setupFiles: ['./jest.setup.js'],
    moduleDirectories: ['node_modules', './'],
    timers: 'legacy',
    // browserHeadless: false,
    // browserDevtools: true,
    // browserSlowMo: 1000, // milliseconds
  },
  buildEs5: false,
  extras: {
    cssVarsShim: false,
    dynamicImportShim: false,
    experimentalImportInjection: true,
    shadowDomShim: false,
    safari10: false,
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
}
