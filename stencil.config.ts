import { Config } from '@stencil/core'
import { postcss } from '@stencil/postcss'
import postcssConfig from './postcss.config'

export const config: Config = {
  namespace: 'liquid',
  srcDir: 'src/liquid',
  globalStyle: 'src/liquid/global/styles/global.css',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
  ],
  plugins: [postcss(postcssConfig)],
  testing: {
    moduleDirectories: ['node_modules', './'],
  },
}
