const Eleventy = require('@11ty/eleventy')

;(async function () {
  const elev = new Eleventy('src', 'dist_docs', {
    quietMode: true,
    configPath: '.eleventy.cjs',

    config: function (eleventyConfig) {
      // Do some custom Configuration API stuff
      // Works great with eleventyConfig.addGlobalData
    },
  })

  if (process.argv.includes('--watch')) {
    await elev.watch()
  } else {
    await elev.write()
  }
})()
