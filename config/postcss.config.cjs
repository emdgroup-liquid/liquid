const postcssConfigDocs = require('./postcss.config.docs.cjs')
const postcssNano = require('cssnano')

module.exports = {
  plugins: [
    ...postcssConfigDocs.plugins,
    require('cssnano')({
      preset: ['default', { calc: false }],
    }),
  ],
}
