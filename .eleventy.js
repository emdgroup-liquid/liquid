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
    alwaysWrapLineHighlights: false,
  })
  const highlighter = eleventyConfig.markdownHighlighter
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === 'mermaid') {
      return `<pre class="mermaid">${str}</pre>`
    }
    return highlighter(str, language)
  })
  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItAnchor)
  )
  eleventyConfig.addPassthroughCopy({ 'src/docs/assets': 'assets' })

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

  eleventyConfig.addPairedShortcode(
    'example',
    function (
      code,
      lang = 'html',
      stacked,
      opened,
      brand,
      themable = true,
      heighlight,
      heighlightCssComponent
    ) {
      const [codeWebComponent, codeCssComponent] = code
        .split('<!-- CSS component -->')
        .map((c) => c.trim())
      let output = '<docs-example '
      output += `code="${encodeURIComponent(codeWebComponent)}" `

      if (codeCssComponent) {
        output += `code-css-component="${encodeURIComponent(
          codeCssComponent
        )}" `
      }

      output += `${stacked ? ' stacked' : ''}`
      output += `${opened ? ' opened' : ''}`
      output += `${brand ? ' brand' : ''}`
      output += `${themable ? ' themable' : ''}`
      output += '>\n'
      output += `<div slot="code">\n\n`
      output += `\`\`\`${lang}${
        heighlight ? '/' + heighlight : ''
      } \n${codeWebComponent}\n\`\`\``
      output += '\n</div>'

      if (codeCssComponent) {
        output += `<div slot="codeCssComponent">\n\n`
        output += `\`\`\`${lang}${
          heighlightCssComponent ? '/' + heighlightCssComponent : ''
        } \n${codeCssComponent.trim()}\n\`\`\``
        output += '\n</div>'
      }

      output += `<div slot="show">${codeWebComponent.replaceAll(
        /\n\n/g,
        '\n'
      )}</div>`

      if (codeCssComponent) {
        output += `<div slot="showCssComponent">${codeCssComponent.replaceAll(
          /\n\n/g,
          '\n'
        )}</div>`
      }

      output += '</docs-example>'
      return output
    }
  )

  return {
    dir: {
      input: './src',
      output: './dist_docs',
      includes: './docs/includes',
    },
    templateFormats: ['html', 'md', 'njk', 'css'],
  }
}
