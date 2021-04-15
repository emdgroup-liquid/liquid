const { readFileSync } = require('fs')
const { join } = require('path')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'docs-toc__nav',
  })
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  })
  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItAnchor)
  )

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

  eleventyConfig.addShortcode('tokens-colors', function () {
    let output = ''

    let code = readFileSync(
      join(__dirname, './src/liquid/global/styles/colors/colors.css'),
      {
        encoding: 'utf8',
      }
    )
    code.split('\n').forEach((line) => {
      if (line.indexOf('  --') === 0) {
        output += `<docs-color var="${line
          .split(':')[0]
          .trim()}" description="${line.trim()}"></docs-color>\n\n`
      }
    })

    return output
  })

  eleventyConfig.addPairedShortcode('example', function (code, lang = 'html') {
    let output = '<docs-example>\n'
    output += '<div slot="code">\n\n'
    output += `\`\`\`${lang} \n${code.trim()}\n\`\`\``
    output += '\n</div>'
    output += '<div slot="show">'
    output += code.trim()
    output += '</div>'
    output += '</docs-example>'
    return output
  })

  return {
    dir: {
      input: './src',
      output: './dist_docs',
      includes: './docs/_includes',
    },
    templateFormats: ['html', 'md', 'njk', 'css'],
  }
}
