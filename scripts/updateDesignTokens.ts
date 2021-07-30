/* eslint-disable @typescript-eslint/no-var-requires */
const nodeFetch = require('node-fetch')
const { writeFile } = require('fs').promises

function pxToRem(px: string | number) {
  return parseInt(px + '') / 16 + 'rem'
}

function relRGBToAbsRGB(fill) {
  const r = Math.round(fill.color.r * 255)
  const g = Math.round(fill.color.g * 255)
  const b = Math.round(fill.color.b * 255)
  const a = Math.round((fill.opacity || 1) * 100) / 100
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function parseThemes(items) {
  const themes = {}

  for (const item of items) {
    if (['Bubblegum', 'Ocean', 'Shake', 'Solvent', 'Tea'].includes(item.name)) {
      const themeName = item.name.toLowerCase()
      themes[themeName] = {}

      const themeItems = item.children
      for (const themeItem of themeItems) {
        let colorName
        if (themeItem.name.indexOf('Primary') !== -1) {
          colorName = 'bg-primary'
        }
        if (themeItem.name.indexOf('Drop-Shadow Color') !== -1) {
          colorName = 'bg-secondary'
        }
        if (themeItem.name.indexOf('Accent') !== -1) {
          colorName = 'accent'
        }
        if (themeItem.name.indexOf('Highlight') !== -1) {
          colorName = 'highlight'
        }
        themes[themeName][colorName] = relRGBToAbsRGB(themeItem.fills[0])
      }
      continue
    }
  }

  return themes
}

function parseVariants(items) {
  const variants = {}

  function addCol(colorBaseName, themeItem) {
    variants[
      themeItem.name.indexOf('Primary') === 0
        ? `${colorBaseName}-primary`
        : `${colorBaseName}-${themeItem.name.split('_')[0].toLowerCase()}`
    ] = relRGBToAbsRGB(themeItem.fills[0])
  }

  for (const item of items) {
    if (item.name.indexOf('Vibrant') === 0 || item.name.indexOf('Rich') === 0) {
      let colorBaseName
      switch (item.name) {
        case 'RichBlack':
          colorBaseName = 'rblck'
          break
        case 'RichBlue':
          colorBaseName = 'rb'
          break
        case 'RichGreen':
          colorBaseName = 'rg'
          break
        case 'RichPurple':
          colorBaseName = 'rp'
          break
        case 'RichRed':
          colorBaseName = 'rr'
          break
        case 'VibrantCyan':
          colorBaseName = 'vc'
          break
        case 'VibrantGreen':
          colorBaseName = 'vg'
          break
        case 'VibrantMagenta':
          colorBaseName = 'vm'
          break
        case 'VibrantYellow':
          colorBaseName = 'vy'
          break
      }

      for (const themeItem of item.children) {
        if (themeItem.children) {
          for (const child of themeItem.children) {
            addCol(colorBaseName, child)
          }
        } else {
          addCol(colorBaseName, themeItem)
        }
      }
    }

    if (item.name === 'Disabled Color') {
      const themeItems = item.children
      for (const themeItem of themeItems) {
        let colorName
        if (themeItem.name === 'Disabled Color') {
          colorName = 'disabled'
        }
        if (themeItem.name === 'Disabled On Brand Color') {
          colorName = 'disabled-on-primary'
        }
        variants[colorName] = relRGBToAbsRGB(themeItem.fills[0])
      }
      continue
    }
  }

  return variants
}

function parseShadows(items) {
  const shadows = {}

  for (const item of items) {
    shadows[item.name.split(' ')[0].toLowerCase()] = item.effects
      .map((effect) => {
        const col = effect.color
        return `${pxToRem(effect.offset.x)} ${pxToRem(
          effect.offset.y
        )} ${pxToRem(effect.radius)} rgba(${Math.round(
          col.r * 255
        )}, ${Math.round(col.g * 255)}, ${Math.round(col.b * 255)}, ${
          Math.round(col.a * 100) / 100
        })`
      })
      .join(', ')
  }

  return shadows
}

function parseColors(items) {
  const colors = {}

  for (const item of items) {
    if (item.fills?.length) {
      colors[item.name.split('_')[0].toLowerCase()] = relRGBToAbsRGB(
        item.fills[0]
      )
    }
  }

  return colors
}

function parseTypography(itemsDisplay, itemsBody) {
  const typography = {
    display: {},
    body: {},
  }

  for (const item of itemsDisplay) {
    typography.display[item.name.split(' ')[0].toLowerCase()] = {
      fontSize: pxToRem(item.style.fontSize),
      lineHeight: Math.round(item.style.lineHeightPercentFontSize) + '%',
      fontFamiliy: item.style.fontFamily === 'Lato' ? 'Lato' : 'MWeb',
    }
  }

  const fontNameMap = {
    'XS Paragraph': 'body-xs',
    'S Paragraph': 'body-s',
    'M Paragraph': 'body-m',
    'L Paragraph': 'body-l',
    'XL Paragraph': 'body-xl',
    'Caption Medium': 'cap-m',
    'Caption Large': 'cap-l',
    'Mobile Label': 'label-s',
    'Default Label': 'label-m',
  }

  for (const item of itemsBody) {
    typography.body[fontNameMap[item.name]] = {
      fontSize: pxToRem(item.style.fontSize),
      lineHeight: Math.round(item.style.lineHeightPercentFontSize) + '%',
      fontFamiliy: item.style.fontFamily === 'Lato' ? 'Lato' : 'MWeb',
    }
  }

  return typography
}

function parseSpacings(items) {
  const spacings = {}

  for (const item of items) {
    spacings[item.name.split('$spacing-')[1]] = pxToRem(
      item.absoluteBoundingBox.height
    )
  }

  return spacings
}

async function getTokensFromFigma(figmaId = '5UbVMMa68tkeSlrNWgZw93') {
  const result = await nodeFetch('https://api.figma.com/v1/files/' + figmaId, {
    method: 'GET',
    headers: {
      'X-Figma-Token': process.env.FIGMA_API_KEY,
    },
  })
  const figmaData = (await result.json()).document.children.filter((item) => {
    return item.name === 'Liquid Design Tokens'
  })[0].children

  const tokens = {
    themes: parseThemes(
      figmaData.find((child) => child.name.indexOf('Themes') === 0).children
    ),
    shadows: parseShadows(
      figmaData.find((child) => child.name === 'Shadows').children
    ),
    spacings: parseSpacings(
      figmaData.find((child) => child.name === 'Spacings').children
    ),
    colors: {
      ...parseVariants(
        figmaData.find((child) => child.name.indexOf('Themes') === 0).children
      ),
      ...parseColors(
        figmaData.find((child) => child.name === 'Accessible Colors').children
      ),
    },
    typography: parseTypography(
      figmaData.find((child) => child.name === 'Headlines').children,
      figmaData.find((child) => child.name === 'Paragraphs').children
    ),
  }

  return tokens
}

function boxShadowToDropShadow(boxShadow: string): string {
  const shadows = boxShadow.replace('), ', ')| ').split('| ')
  return shadows
    .map((shadow) => {
      const [offsetX, offsetY, blurRadius, ...color] = shadow.split(' ')
      return `drop-shadow(${offsetX} ${offsetY} ${blurRadius} ${color.join(
        ' '
      )})`
    })
    .join(' ')
}

function generateShadows(tokens) {
  return writeFile(
    './src/liquid/global/styles/shadows/shadows.css',
    '/* autogenerated */\n:root {\n' +
      Object.keys(tokens)
        .sort()
        .map((key) => `  --ld-shadow-${key}: ${tokens[key]};`)
        .join('\n') +
      '\n' +
      Object.keys(tokens)
        .sort()
        .map(
          (key) =>
            `  --ld-drop-shadow-${key}: ${boxShadowToDropShadow(tokens[key])};`
        )
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateColors(tokensColors, tokensThemes) {
  const lines = []

  // Basic colors
  Object.keys(tokensColors).forEach((key) => {
    const val = tokensColors[key]
    if (key.includes('/default')) {
      lines.push(`  --ld-col-${key.split('/default')[0]}: ${val};`)
      const colorKey = key.slice(0, -'x/default'.length)
      lines.push(`  --ld-col-${colorKey}-default: ${val};`)
      lines.push(
        `  --ld-col-${colorKey}-a01: ${val.replace(', 1)', ', 0.1)')};`
      )
      lines.push(
        `  --ld-col-${colorKey}-a02: ${val.replace(', 1)', ', 0.2)')};`
      )
    } else {
      lines.push(`  --ld-col-${key}: ${val};`)
    }
  })
  // Theme specific colors
  Object.keys(tokensThemes).forEach((key) => {
    const val = tokensThemes[key]
    if (['bubblegum', 'ocean', 'shake', 'solvent', 'tea'].includes(key)) {
      Object.keys(val).forEach((itemName) => {
        const itemValue = val[itemName]
        lines.push(`  --ld-thm-${key}-${itemName}: ${itemValue};`)
      })
    } else if (key === 'disabled' || key === 'variants') {
      Object.keys(val).forEach((itemName) => {
        const itemValue = val[itemName]
        lines.push(`  --ld-col-${itemName}: ${itemValue};`)
      })
    }
  })

  return writeFile(
    './src/liquid/global/styles/colors/colors.css',
    ['/* autogenerated */', ':root {', ...lines.sort(), '}', ''].join('\n'),
    'utf8'
  )
}

function generateSpacings(tokens) {
  return writeFile(
    './src/liquid/global/styles/spacings/spacings.css',
    '/* autogenerated */\n:root {\n' +
      Object.keys(tokens)
        .sort((key) => parseInt(key))
        .map((key) => `  --ld-sp-${key}: ${tokens[key]};`)
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateTypography(tokens) {
  return writeFile(
    './src/liquid/global/styles/typography/typography.css',
    '/* autogenerated */\n:root {\n' +
      "  --ld-font-body: 'Lato', Helvetica, Arial, sans-serif;\n" +
      "  --ld-font-display: 'MWeb', Helvetica, Arial, sans-serif;\n" +
      Object.keys(tokens.display)
        .sort()
        .map((key) => {
          const val = tokens.display[key]
          return `  --ld-typo-${key}: ${val.fontSize} / ${val.lineHeight} '${
            val.fontFamiliy === 'Lato' ? 'Lato' : 'MWeb'
          }', Helvetica, Arial, sans-serif;`
        })
        .join('\n') +
      '\n' +
      Object.keys(tokens.body)
        .sort()
        .map((key) => {
          const val = tokens.body[key]
          return `  --ld-typo-${key}: ${val.fontSize} / ${val.lineHeight} 'Lato', Helvetica, Arial, sans-serif;`
        })
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateCSSTokenFiles(tokenCollection) {
  return Promise.all([
    generateShadows(tokenCollection.shadows),
    generateColors(tokenCollection.colors, tokenCollection.themes),
    generateSpacings(tokenCollection.spacings),
    generateTypography(tokenCollection.typography),
  ])
}

function generateJSONTokenFile(tokenCollection) {
  writeFile(
    './src/liquid/global/styles/design-tokens.json',
    JSON.stringify(tokenCollection, null, 2),
    'utf8'
  )
}

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(async () => {
  try {
    const tokenCollection = await getTokensFromFigma()
    await generateJSONTokenFile(tokenCollection)
    await generateCSSTokenFiles(tokenCollection)
  } catch (err) {
    console.error('error', err)
  }
})()
