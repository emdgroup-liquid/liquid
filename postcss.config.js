const postcssConfigDocs = require('./postcss.config.docs')
const postcssNano = require('cssnano')

module.exports = {
  plugins: [...postcssConfigDocs.plugins, postcssNano()],
}
