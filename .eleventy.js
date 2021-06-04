const { readFileSync } = require('fs')
const { join } = require('path')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')

module.exports = function (eleventyConfig) {
  // Navigation
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  // Table of contents
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'docs-toc__nav',
  })

  // Syntax highlighting
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

  // Headings
  const position = { false: 'push', true: 'unshift' }
  const renderPermalink = (slug, opts, state, idx) => {
    const space = () =>
      Object.assign(new state.Token('text', '', 0), {
        content: ' ',
      })

    const linkTokens = [
      Object.assign(new state.Token('link_open', 'a', 1), {
        attrs: [
          ['class', opts.permalinkClass],
          ['href', opts.permalinkHref(slug, state)],
        ],
      }),
      Object.assign(new state.Token('html_block', '', 0), {
        content:
          '<span aria-label="Direct link" class="header-anchor__symbol">#</span>',
      }),
      new state.Token('link_close', 'a', -1),
    ]
    if (opts.permalinkSpace) {
      linkTokens[position[!opts.permalinkBefore]](space())
    }
    state.tokens[idx + 1].children[position[opts.permalinkBefore]](
      ...linkTokens
    )
  }
  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItAnchor, {
      permalink: true,
      renderPermalink,
    })
  )
  eleventyConfig.addPassthroughCopy({ 'src/docs/assets': 'assets' })

  // Code example short codes
  eleventyConfig.addPairedShortcode(
    'example',
    function (
      code,
      lang = 'html',
      stacked,
      opened,
      background,
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
      if (background) {
        output += ` background="${background}"`
      }
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
