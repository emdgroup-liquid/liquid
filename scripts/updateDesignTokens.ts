/* eslint-disable @typescript-eslint/no-var-requires */
const nodeFetch = require('node-fetch')
const { writeFile } = require('fs').promises

type TypoToken = {
  fontFamily: string
  fontSize: string
  fontWeight: number
  lineHeight: string
}

function pxToRem(px: string | number) {
  return parseInt(px + '') / 16 + 'rem'
}

function getColorTokenValue(variant, styles) {
  if (variant.styles?.fill) {
    const style = styles[variant.styles.fill]
    const { name, description } = style
    const variants = description.split(', ')
    const [baseColorName, ...rest] = name.split('/')[1].split('-')
    const referenceName =
      baseColorName.replaceAll(/[a-z]/g, '').toLowerCase() +
      (variants.includes('Default') ? '' : '-' + rest.join('-'))
    return referenceName
  } else {
    return relRGBToAbsRGB(variant.fills[0])
  }
}

function relRGBToAbsRGB(fill) {
  const r = Math.round(fill.color.r * 255)
  const g = Math.round(fill.color.g * 255)
  const b = Math.round(fill.color.b * 255)
  const a = Math.round((fill.opacity ?? 1) * 100) / 100

  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

function parseThemes(items, styles) {
  const themes = {}

  items.forEach((item) => {
    if (!item.name.startsWith('_')) {
      const theme = {}
      const themeName = item.name.toLowerCase()

      const colorGroups = item.children
      colorGroups.forEach((colorGroup) => {
        const groupName = colorGroup.name.toLowerCase()
        const variants = colorGroup.children
        if (variants) {
          variants.forEach((variant) => {
            const variantName = variant.name.toLowerCase()
            const subVariants = variant.children

            if (variant.children) {
              if (subVariants) {
                subVariants.forEach((subVariant) => {
                  const subVariantName = subVariant.name.toLowerCase()
                  const colorName = `${groupName}-${variantName}-${subVariantName}`
                  theme[colorName] = getColorTokenValue(subVariant, styles)
                })
              }
            } else {
              const colorName = `${groupName}${
                variantName === 'default' ? '' : `-${variantName}`
              }`
              theme[colorName] = getColorTokenValue(variant, styles)
            }
          })
        }
      })

      if (Object.keys(themes).length === 0) {
        theme['default'] = true
      }

      themes[themeName] = theme
    }
  })

  return themes
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

function parseColors(items, styles) {
  const colors = {}

  for (const item of items) {
    if (item.name.startsWith('_')) {
      continue
    }

    if (item.children) {
      Object.assign(colors, parseColors(item.children, styles))
    } else if (item.fills?.length && item.styles?.fill) {
      const style = styles[item.styles.fill]
      const { name, description } = style
      const variants = description.split(', ')
      const [baseColorName, ...rest] = name.split('/')[1].split('-')
      const defaultOnly = rest.length === 0
      const colorShortName = ['Neutral', 'White'].includes(baseColorName)
        ? baseColorName === 'White'
          ? 'wht'
          : baseColorName.toLowerCase()
        : baseColorName.replaceAll(/[a-z]/g, '').toLowerCase()
      const colorName =
        colorShortName +
        (defaultOnly ? '' : '-' + rest.join('-')) +
        (variants.includes('Default') ? '/default' : '')
      const colorValue = relRGBToAbsRGB(item.fills[0])
      colors[colorName] = colorValue
    }
  }

  return colors
}

function parseTypography(items, styles) {
  const typography: Record<string, TypoToken> = {}

  items.forEach((item) => {
    const [, styleName] = styles[item.styles.text].name.split('/')
    const typoName = styleName
      .toLowerCase()
      .replace(/^pg-/, 'body-')
      .replace(/^caption-/, 'cap-')
    const {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeightPercentFontSize,
    } = item.style
    const baseFontName =
      fontFamily === 'Merck'
        ? 'MWeb'
        : fontFamily.includes(' ')
        ? `'${fontFamily}'`
        : fontFamily

    typography[typoName] = {
      // TODO: Let Figma define the fallback fonts, as soon as
      // fallback fonts in Figma are no longer buggy
      fontFamily: `${baseFontName}, Helvetica, Arial, sans-serif`,
      fontSize: pxToRem(fontSize),
      fontWeight: fontWeight === 400 ? undefined : fontWeight,
      lineHeight: Math.round(lineHeightPercentFontSize) + '%',
    }
  })

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

async function getTokensFromFigma(
  figmaId = 'JcDMeUwec9e185HfBgT9XE',
  nodeId = '2615:28396'
) {
  const result = await nodeFetch(
    `https://api.figma.com/v1/files/${figmaId}/nodes?ids=${nodeId}`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': process.env.FIGMA_API_KEY,
      },
    }
  )
  const { document, styles } = (await result.json()).nodes[nodeId]
  const { children: figmaData } = document

  const tokens = {
    themes: parseThemes(
      figmaData.find(({ name }) => name === 'Themes').children,
      styles
    ),
    shadows: parseShadows(
      figmaData.find((child) => child.name === 'Shadows').children
    ),
    spacings: parseSpacings(
      figmaData.find((child) => child.name === 'Spacings').children
    ),
    colors: {
      ...parseColors(
        figmaData.find((child) => child.name === 'Colors').children,
        styles
      ),
    },
    typography: parseTypography(
      [
        ...figmaData.find((child) => child.name === 'Headlines').children,
        ...figmaData.find((child) => child.name === 'Paragraphs').children,
      ],
      styles
    ),
    borderRadii: {
      full: '999rem',
      s: '0.125rem',
      m: '0.25rem',
      l: '0.5rem',
    },
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

function generateColors(colorTokens, themes) {
  const colorVariables = []
  const defaultThemeVariables = []
  const themeSelectors = []

  // Basic colors
  Object.keys(colorTokens).forEach((key) => {
    const val = colorTokens[key]
    if (key.includes('/default')) {
      const colorKey = key.split('/default')[0]
      const colorBaseName = key
        .replace(/\d/g, '')
        .replace('/default', '')
        .replace(/-$/, '')

      colorVariables.push(`  --ld-col-${colorKey}: ${val};`)

      // prevents duplicate custom properties in cases like "sp/default"
      if (colorBaseName !== colorKey) {
        colorVariables.push(`  --ld-col-${colorBaseName}: ${val};`)
      }
    } else {
      colorVariables.push(`  --ld-col-${key}: ${val};`)
    }
  })
  // Theme specific colors
  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName]
    themeSelectors.push(`.ld-theme-${themeName},
    [class*='ld-theme'] .ld-theme-${themeName} {`)
    Object.keys(theme).forEach((colorGroupName) => {
      const colorGroup = theme[colorGroupName]

      if (colorGroupName === 'default') {
        return
      }

      const variableValue =
        colorGroup.indexOf('rgb') === 0
          ? colorGroup
          : `var(--ld-col-${colorGroup})`

      colorVariables.push(
        `  --ld-thm-${themeName}-${colorGroupName}: ${variableValue};`
      )
      themeSelectors.push(
        `  --ld-thm-${colorGroupName}: var(--ld-thm-${themeName}-${colorGroupName});`
      )
      if (theme.default) {
        defaultThemeVariables.push(
          `  --ld-thm-${colorGroupName}: var(--ld-thm-${themeName}-${colorGroupName});`
        )
      }
    })
    themeSelectors.push(`}`)
  })

  return writeFile(
    './src/liquid/global/styles/colors/colors.css',
    [
      '/* autogenerated */',
      ':root {',
      ...colorVariables.sort(),
      ...defaultThemeVariables,
      '}',
      ...themeSelectors,
      '',
    ].join('\n'),
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

function generateTypography(tokens: TypoToken[]) {
  const tokenEntries = Object.entries(tokens)
  const [, { fontFamily: bodyFontFamily }] = tokenEntries.find(([key]) =>
    key.startsWith('body')
  )
  const nonBodyTypoEntry = tokenEntries.find(
    ([, value]) => value.fontFamily !== bodyFontFamily
  )
  return writeFile(
    './src/liquid/global/styles/typography/typography.css',
    '/* autogenerated */\n:root {\n' +
      // This expect to have at least one headline and one paragraph typo defined
      `  --ld-font-body: ${bodyFontFamily};\n` +
      (nonBodyTypoEntry !== undefined
        ? `  --ld-font-display: ${nonBodyTypoEntry[1].fontFamily};\n`
        : '') +
      Object.keys(tokens)
        .sort()
        .map((key) => {
          const val = tokens[key]
          return `  --ld-typo-${key}: ${
            val.fontWeight ? `${val.fontWeight} ` : ''
          }${val.fontSize}/${val.lineHeight} ${val.fontFamily};`
        })
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateBorderRadii(tokens) {
  return writeFile(
    './src/liquid/global/styles/border-radius/border-radius.css',
    '/* autogenerated */\n:root {\n' +
      Object.keys(tokens)
        .sort((key) => parseInt(key))
        .map((key) => `  --ld-br-${key}: ${tokens[key]};`)
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
    generateBorderRadii(tokenCollection.borderRadii),
  ])
}

function generateJSONTokenFile(tokenCollection) {
  writeFile(
    './src/liquid/global/styles/design-tokens.json',
    JSON.stringify(tokenCollection, null, 2),
    'utf8'
  )
}

;(async () => {
  try {
    const tokenCollection = await getTokensFromFigma()
    await generateJSONTokenFile(tokenCollection)
    await generateCSSTokenFiles(tokenCollection)
  } catch (err) {
    console.error('error', err)
  }
})()
