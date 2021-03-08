import { Config } from '@stencil/core'

import { config as configProd } from './stencil.config'

export const config: Config = {
  ...configProd,
  tsconfig: 'tsconfig.docs.json',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      dir: 'dist_docs/dist',
    },
  ],
}
