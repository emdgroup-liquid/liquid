const Eleventy = require('@11ty/eleventy')

;(async function () {
  let elev = new Eleventy('src', 'dist_docs', {
    quietMode: true,
    configPath: '.eleventy.cjs',

    config: function (eleventyConfig) {
      // Do some custom Configuration API stuff
      // Works great with eleventyConfig.addGlobalData
    },
  })
  await elev.write()
})()
