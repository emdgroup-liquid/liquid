require('dotenv').config()
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItReplaceLink = require('markdown-it-replace-link')
const markdownItLinkAttributes = require('markdown-it-link-attributes')
const pluginTOC = require('eleventy-plugin-toc')
const cheerio = require('cheerio')
const memoize = require('lodash.memoize')

module.exports = function (eleventyConfig) {
  eleventyConfig.watchIgnores.add('.github')
  eleventyConfig.watchIgnores.add('.stencil')
  eleventyConfig.watchIgnores.add('bin')
  eleventyConfig.watchIgnores.add('coverage')
  eleventyConfig.watchIgnores.add('dist')
  eleventyConfig.watchIgnores.add('dist_docs')
  eleventyConfig.watchIgnores.add('screenshot')
  eleventyConfig.watchIgnores.add('scripts')

  const buildstamp = process.env.MODE === 'gh_pages' ? Date.now() + '/' : ''
  eleventyConfig.addGlobalData('buildstamp', buildstamp)

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
    init: function ({ Prism }) {
      // Set highlighting for template strings (i.e. for code examples using Vue template strings)
      Prism.languages.javascript['template-string'] = {
        // The following RegEx matches strings enclosed in backticks,
        // excluding any references to variables (denoted by ${...}).
        // It will also ignore any escaped backticks (denoted by a backslash) in the string.
        // It essentially looks for a string that starts with a backtick,
        // followed by any number of characters that are not a backtick,
        // a variable reference, or an escaped backtick.
        // The string then ends with a backtick.
        pattern: /`(?:\\.|\$\{[^{}]*\}|(?!\$\{)[^\\`])*`/,
        inside: Prism.languages.html,
      }
    },
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
          [
            'href',
            (state.env.permalink || '') + opts.permalinkHref(slug, state),
          ],
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
          return base + splitted.join('/').replace(/\/$/, '')
        }
        if (link.startsWith('../')) {
          const splitted = env.page.url.split('/')
          splitted.splice(splitted.length - 2, 1, link.substr(3))
          return base + splitted.join('/').replace(/\/$/, '')
        }
        return link
      },
    })
      .use(markdownItAnchor, {
        permalink: renderPermalink,
      })
      .use(markdownItReplaceLink)
      .use(markdownItLinkAttributes, {
        matcher(href) {
          return href.match(/^https?:\/\//)
        },
        attrs: {
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-describedby': 'external-link-description',
          'data-link-external': '', // TODO: Add a script to automatically add an icon for external links
        },
      })
  )
  eleventyConfig.addPassthroughCopy(
    buildstamp
      ? {
          'src/docs/assets': `${buildstamp}assets`,
          'dist_docs/css_components': `${buildstamp}css_components`,
          'dist_docs/dist': `${buildstamp}dist`,
          'dist_docs/docs.css': `${buildstamp}docs.css`,
          'dist_docs/liquid.global.css': `${buildstamp}liquid.global.css`,
        }
      : {
          'src/docs/assets': 'assets',
        }
  )

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
          commits
            .filter((entry) => entry.author)
            .map((entry) => {
              try {
                return entry.author.html_url.split('/').pop()
              } catch (err) {
                console.warn('Failed parsing contributor', entry, err)
                return
              }
            })
        ),
      ])
    }
  )

  // Code example short codes
  eleventyConfig.addPairedShortcode('example', function (code, config) {
    const defaultConfig = {
      background: undefined,
      centered: false,
      hasBorder: true,
      hasPadding: true,
      highlight: undefined,
      highlightCssComponent: undefined,
      highlightReactComponent: undefined,
      lang: 'html',
      opened: false,
      stacked: false,
      themable: true,
    }
    const finalConfig = Object.assign(defaultConfig, JSON.parse(config || '{}'))
    const base = process.env.MODE === 'gh_pages' ? '/liquid' : ''
    const codeBlocks = code
      .replaceAll(
        /url\('\/dist\/build\/assets\//g,
        `url('${base}/dist/build/assets/`
      )
      .split(/<!-- React component -->|<!-- CSS component -->/g)
      .map((c) => c.trim())
    const codeTypes = [
      ...code.matchAll(/<!-- (CSS|React) component -->*/g),
    ].map((m) => m[1])
    const codeWebComponent = codeBlocks[0]
    const indexCSS = codeTypes.findIndex((t) => t === 'CSS') + 1
    const indexReact = codeTypes.findIndex((t) => t === 'React') + 1
    const codeCssComponent = indexCSS ? codeBlocks[indexCSS] : undefined
    const codeReactComponent = indexReact ? codeBlocks[indexReact] : undefined

    let output = '<docs-example '
    output += `code="${encodeURIComponent(codeWebComponent)}" `

    if (codeCssComponent) {
      output += `code-css-component="${encodeURIComponent(codeCssComponent)}" `
    }
    if (codeReactComponent) {
      output += `code-react-component="${encodeURIComponent(
        codeReactComponent
      )}" `
    }

    output += `${finalConfig.centered ? ' centered' : ''}`
    output += `${finalConfig.stacked ? ' stacked' : ''}`
    output += `${finalConfig.opened ? ' opened' : ''}`
    if (finalConfig.background) {
      output += ` background="${finalConfig.background}"`
    }
    output += `${finalConfig.themable ? ' themable' : ''}`
    output += `${finalConfig.hasBorder ? ' has-border' : ''}`
    output += `${finalConfig.hasPadding ? ' has-padding' : ''}`
    if (finalConfig.styles) {
      output += ` styles='${JSON.stringify(finalConfig.styles)}'`
    }
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

    if (codeReactComponent) {
      output += `<div slot="codeReactComponent">\n\n`
      output += `\`\`\`jsx${
        finalConfig.highlightReactComponent
          ? '/' + finalConfig.highlightReactComponent
          : ''
      } \n${codeReactComponent.trim()}\n\`\`\``
      output += '\n</div>'
    }

    output += `<div slot="show"${
      finalConfig.gap ? ` style="gap: ${finalConfig.gap}"` : ''
    }>${codeWebComponent.replaceAll(/\n\n/g, '\n')}</div>`

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
