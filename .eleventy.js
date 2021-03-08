const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const { readFileSync } = require('fs')
const { join } = require('path')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  })
  eleventyConfig.setLibrary('md', markdownIt({ html: true }))

  eleventyConfig.addShortcode(
    'source',
    function (path, lang = 'html', onlyJS = false) {
      let code = readFileSync(join(__dirname, path), {
        encoding: 'utf8',
      }).trim()
      if (onlyJS) {
        code = code
          .split('<script type="module">')[1]
          .split('</script>')[0]
          .split('\n')
          .map((l) => {
            if (l.indexOf('    ') === 0) return l.slice(4)
            return l
          })
          .join('\n')
          .trim()
      }
      return `\`\`\`${lang} \n${code}\n\`\`\` `
    }
  )

  return {
    dir: {
      input: './src',
      output: './dist_docs',
    },
    templateFormats: ['html', 'md', 'njk', 'css'],
  }
}
