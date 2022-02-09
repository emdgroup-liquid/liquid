require('dotenv').config()
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItReplaceLink = require('markdown-it-replace-link')
const pluginTOC = require('eleventy-plugin-toc')
const cheerio = require('cheerio')
const memoize = require('lodash.memoize')
const fetch = require('node-fetch')

module.exports = function (eleventyConfig) {
  eleventyConfig.setWatchJavaScriptDependencies(false)

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
          ['href', state.env.permalink + opts.permalinkHref(slug, state)],
        ],
      }),
      Object.assign(new state.Token('html_block', '', 0), {
        content: '<span aria-label="" class="header-anchor__symbol">#</span>',
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
    markdownIt({
      html: true,
      linkify: true,
      replaceLink: (link, env) => {
        // Convert relative links to absolute links
        const base = process.env.MODE === 'gh_pages' ? '/liquid' : ''
        if (link.startsWith('./')) {
          const splitted = env.page.url.split('/')
          splitted.splice(splitted.length - 1, 0, link.substr(2))
          return base + splitted.join('/')
        }
        if (link.startsWith('../')) {
          const splitted = env.page.url.split('/')
          splitted.splice(splitted.length - 2, 1, link.substr(3))
          return base + splitted.join('/')
        }
        return link
      },
    })
      .use(markdownItAnchor, {
        permalink: true,
        renderPermalink,
      })
      .use(markdownItReplaceLink)
  )
  eleventyConfig.addPassthroughCopy({ 'src/docs/assets': 'assets' })

  // Memoized serch index filter for headings
  eleventyConfig.addNunjucksFilter(
    'memoizedHeadings',
    memoize((value) =>
      Array.from(cheerio.load(value)('h2, h3').contents())
        .filter((elem) => elem.type === 'text')
        .map((elem) => elem.data)
        .join(' ')
        .replaceAll(/(\n|\r)/g, ' ')
    )
  )

  // Contributors short code (used in layout.njk)
  eleventyConfig.addNunjucksAsyncShortcode(
    'contributors',
    async function (inputPath) {
      const path = inputPath.replace('/readme.md', '').replace('/index.md', '')

      let commits
      try {
        const res = await fetch(
          `https://api.github.com/repos/emdgroup-liquid/liquid/commits?path=${path}`,
          {
            headers: { Authorization: `token ${process.env.GH_TOKEN}` },
          }
        )
        commits = await res.json()
      } catch (err) {
        console.warn(`Failed fetching contributors for path ${path}`, err)
        return '[]'
      }

      if (!Array.isArray(commits)) {
        return '[]'
      }

      return JSON.stringify([
        ...new Set(
          commits.map((entry) => entry.author.html_url.split('/').pop())
        ),
      ])
    }
  )

  // Code example short codes
  eleventyConfig.addPairedShortcode('example', function (code, config) {
    const defaultConfig = {
      background: undefined,
      centered: false,
      hasPadding: true,
      highlight: undefined,
      highlightCssComponent: undefined,
      lang: 'html',
      opened: false,
      stacked: false,
      themable: true,
    }
    const finalConfig = Object.assign(defaultConfig, JSON.parse(config || '{}'))
    const [codeWebComponent, codeCssComponent] = code
      .split('<!-- CSS component -->')
      .map((c) => c.trim())
    let output = '<docs-example '
    output += `code="${encodeURIComponent(codeWebComponent)}" `

    if (codeCssComponent) {
      output += `code-css-component="${encodeURIComponent(codeCssComponent)}" `
    }

    output += `${finalConfig.centered ? ' centered' : ''}`
    output += `${finalConfig.stacked ? ' stacked' : ''}`
    output += `${finalConfig.opened ? ' opened' : ''}`
    if (finalConfig.background) {
      output += ` background="${finalConfig.background}"`
    }
    output += `${finalConfig.themable ? ' themable' : ''}`
    output += `${finalConfig.hasPadding ? ' has-padding' : ''}`
    output += '>\n'
    output += `<div slot="code">\n\n`
    output += `\`\`\`${finalConfig.lang}${
      finalConfig.highlight ? '/' + finalConfig.highlight : ''
    } \n${codeWebComponent}\n\`\`\``
    output += '\n</div>'

    if (codeCssComponent) {
      output += `<div slot="codeCssComponent">\n\n`
      output += `\`\`\`${finalConfig.lang}${
        finalConfig.highlightCssComponent
          ? '/' + finalConfig.highlightCssComponent
          : ''
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
  })

  return {
    dir: {
      input: './src',
      output: './dist_docs',
      includes: './docs/includes',
    },
    templateFormats: ['md', 'njk'],
  }
}
