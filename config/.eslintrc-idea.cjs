const config = require('./.eslintrc.cjs')

const customConfig = { ...config }

customConfig.overrides.forEach((override) => {
  override.rules['prettier/prettier'] = 0
})

module.exports = customConfig
