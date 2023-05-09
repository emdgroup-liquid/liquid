/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const { existsSync } = require('fs')
const { mkdir, writeFile } = require('fs').promises
const { join, dirname } = require('path')
const chroma = require('chroma-js')

const isBin = __filename.endsWith('.cjs')
const stylesDir = isBin ? './liquid_tmp/styles' : './src/liquid/global/styles'

type TypoToken = {
  fontFamily: string
  fontSize: string
  fontWeight: number
  lineHeight: string
}

async function ensureWriteFile(path, data, options) {
  const dir = dirname(path)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })

  return writeFile(path, data, options)
}

function pxToRem(px: string | number) {
  const val = parseInt(px + '') / 16
  if (!val) return '0'
  return val + 'rem'
}

function getShortName(baseColorName: string) {
  return (
    baseColorName === 'Neutral'
      ? baseColorName
      : baseColorName['replaceAll'](/[a-z]/g, '')
  ).toLowerCase()
}

function getColorTokenValue(
  variant,
  styles,
  modifier?: 'hover' | 'active' | 'focus',
  isDark = false
) {
  function darken(colKey: string, times: 1 | 2 | -2) {
    // const colNum = isDark ? 1100 - parseInt(colKey) : parseInt(colKey)
    const colNum = parseInt(colKey)
    if (isDark) {
      if (colNum === 200) {
        if (times === 2) return '050'
      }
      if (colNum === 100) {
        if (times === 1) return '050'
        if (times === 2) return '010'
      }
      if (times === -2) {
        if (colNum === 10) return '100'
        if (colNum === 50) return '200'
      }
      return String(colNum - times * 100)
    }

    if (colNum === 10) {
      if (times === 1) return '050'
      if (times === 2) return '100'
    }
    if (colNum === 50) {
      if (times === 1) return '100'
      if (times === 2) return '200'
    }
    if (times === -2) {
      if (colNum === 100) return '010'
      if (colNum === 200) return '050'
    }
    return String(colNum + times * 100)
  }

  if (variant.styles?.fill) {
    const style = styles[variant.styles.fill]
    const { name, description } = style
    const variants = description.split(', ')
    const [baseColorName, ...rest] = name.split('/')[1].split('-')
    const shortName = getShortName(baseColorName)
    const referenceName =
      shortName +
      (variants.includes('Default')
        ? ''
        : rest.length
        ? '-' + rest.join('-')
        : '')

    switch (modifier) {
      case 'hover':
        return `${referenceName}-${darken(
          getDefaultKeyFromCache(shortName),
          1
        )}`
      case 'active':
        return `${referenceName}-${darken(
          getDefaultKeyFromCache(shortName),
          2
        )}`
      case 'focus':
        return `${referenceName}-${darken(
          getDefaultKeyFromCache(shortName),
          -2
        )}`
      default:
        return referenceName
    }
  } else {
    const { r, g, b, a } = variant.fills[0]
    const color = chroma({ r, g, b, a })

    return `hsl(${color.get('hsl.h')}deg ${color.get('hsl.s') * 100}% ${
      color.get('hsl.l') * 100
    }%${a === 1 ? '' : ' / ' + a})`
  }
}

function parseThemes(items, styles) {
  const themes = {}

  items.forEach((item) => {
    if (!item.name.startsWith('_')) {
      const theme = {}
      const themeName = item.name.toLowerCase().replace(/ /g, '-')

      const colorGroups = item.children
      colorGroups.forEach((colorGroup) => {
        const groupName = colorGroup.name.toLowerCase().replace(/ /g, '-')
        const variants = colorGroup.children
        if (variants) {
          variants.forEach((variant) => {
            const variantName = variant.name.toLowerCase().replace(/ /g, '-')

            // Ignore hover, active, focus variants - we do not fetch these from Figma;
            // instead we set them programmatically for light and dark mode based on the default variant.
            if (['hover', 'active', 'focus'].includes(variantName)) {
              return
            }

            const subVariants = variant.children

            if (subVariants) {
              subVariants.forEach((subVariant) => {
                const subVariantName = subVariant.name
                  .toLowerCase()
                  .replace(/ /g, '-')
                const colorName = `${groupName}-${variantName}-${subVariantName}`
                theme[colorName] = getColorTokenValue(subVariant, styles)
              })
            } else {
              const colorName = `${groupName}${
                variantName === 'default' ? '' : `-${variantName}`
              }`
              theme[colorName] = getColorTokenValue(variant, styles)

              if (variantName === 'default') {
                // Derive hover, active, focus variants from default variant for light and dark mode.
                theme[`${colorName}-hover`] = getColorTokenValue(
                  variant,
                  styles,
                  'hover'
                )
                theme[`${colorName}-active`] = getColorTokenValue(
                  variant,
                  styles,
                  'active'
                )
                theme[`${colorName}-focus`] = getColorTokenValue(
                  variant,
                  styles,
                  'focus'
                )

                theme[`${colorName}-hover-dark`] = getColorTokenValue(
                  variant,
                  styles,
                  'hover',
                  true
                )
                theme[`${colorName}-active-dark`] = getColorTokenValue(
                  variant,
                  styles,
                  'active',
                  true
                )
                theme[`${colorName}-focus-dark`] = getColorTokenValue(
                  variant,
                  styles,
                  'focus',
                  true
                )
              }
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

function parseBorderRadii(items) {
  const borderRadii = {}

  items.forEach((item) => {
    borderRadii[item.name.toLowerCase()] = item.cornerRadius
      ? pxToRem(item.cornerRadius)
      : '0'
  })

  return borderRadii
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

const defaultColorKeysCache = new Map<string, `${number}${number}${number}`>()
function getDefaultKeyFromCache(colorShortName: string) {
  return defaultColorKeysCache.get(colorShortName)
}

function getDefaultKey(
  colorShortName: string,
  defaultColor: { hex(mode?: 'auto' | 'rgb' | 'rgba'): string },
  oklchH: number,
  scale: {
    key: `${number}${number}${number}`
    chroma: number
    lightness: number
  }[]
) {
  const defaultKey = scale.reduce((key, setting) => {
    const settingColor = chroma.oklch(setting.lightness, setting.chroma, oklchH)
    if (!key) {
      return setting.key
    }
    const keyColorSetting = scale.find((setting) => setting.key === key)
    const keyColor = chroma.oklch(
      keyColorSetting.lightness,
      keyColorSetting.chroma,
      oklchH
    )
    const distanceToSettingColor = chroma.deltaE(
      settingColor.hex(),
      defaultColor.hex()
    )
    const distanceToKeyColor = chroma.deltaE(keyColor.hex(), defaultColor.hex())
    if (distanceToSettingColor < distanceToKeyColor) {
      return setting.key
    }
    return key
  }, '') as `${number}${number}${number}`

  // HACK: intended side effect
  defaultColorKeysCache.set(colorShortName, defaultKey)

  return defaultKey
}

function parseColors(items, styles: { name: string; description: string }[]) {
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
      const pathParts = name.split('/')
      const [baseColorName, ...rest] =
        pathParts[pathParts.length > 1 ? pathParts.length - 1 : 0].split('-')

      const isDefault = description === 'Default'
      const isNeutral = name.includes('/Neutral-900')
      const isWhite = name.includes('/White') && !rest.length

      if (!isDefault && !isNeutral && !isWhite) continue

      let colorShortName: string
      if (isNeutral) {
        colorShortName = 'neutral'
      } else if (isWhite) {
        colorShortName = 'wht'
      } else {
        colorShortName = baseColorName.replace(/[a-z]/g, '').toLowerCase()
      }

      const r = parseFloat((item.fills[0].color.r * 255).toFixed(2))
      const g = parseFloat((item.fills[0].color.g * 255).toFixed(2))
      const b = parseFloat((item.fills[0].color.b * 255).toFixed(2))

      const defaultColor = chroma({ r, g, b })
      const hslH = defaultColor.get('hsl.h') || 0
      const hslS = defaultColor.get('hsl.s')
      const hslL = defaultColor.get('hsl.l')
      const oklchH = defaultColor.get('oklch.h') || 0

      if (isWhite) {
        colors[colorShortName] = `hsl(${hslH.toFixed(2)}deg ${(
          hslS * 100
        ).toFixed(2)}% ${(hslL * 100).toFixed(2)}%)`
        const whiteGradients = [
          {
            modifier: 'alpha-highest',
            alpha: 0.8,
          },
          {
            modifier: 'alpha-high',
            alpha: 0.7,
          },
          {
            modifier: 'alpha-medium',
            alpha: 0.5,
          },
          {
            modifier: 'alpha-low',
            alpha: 0.2,
          },
          {
            modifier: 'alpha-lowest',
            alpha: 0.1,
          },
        ]
        for (const gradient of whiteGradients) {
          colors[
            `${colorShortName}-${gradient.modifier}`
          ] = `hsl(${hslH.toFixed(2)}deg ${(hslS * 100).toFixed(2)}% ${(
            hslL * 100
          ).toFixed(2)}% / ${gradient.alpha})`
        }
        continue
      }

      const scale = [
        { key: '010', chroma: isNeutral ? 0.002 : 0.02, lightness: 0.98 },
        { key: '050', chroma: isNeutral ? 0.005 : 0.04, lightness: 0.96 },
        { key: '100', chroma: isNeutral ? 0.005 : 0.07, lightness: 0.91 },
        { key: '200', chroma: isNeutral ? 0.01 : 0.14, lightness: 0.8 },
        { key: '300', chroma: isNeutral ? 0.01 : 0.15, lightness: 0.74 },
        { key: '400', chroma: isNeutral ? 0.01 : 0.14, lightness: 0.64 },
        { key: '500', chroma: isNeutral ? 0.005 : 0.13, lightness: 0.55 },
        { key: '600', chroma: isNeutral ? 0.01 : 0.11, lightness: 0.5 },
        { key: '700', chroma: isNeutral ? 0.015 : 0.1, lightness: 0.4 },
        { key: '800', chroma: isNeutral ? 0.02 : 0.08, lightness: 0.35 },
        { key: '900', chroma: 0.06, lightness: 0.24 },
      ] as {
        key: `${number}${number}${number}`
        chroma: number
        lightness: number
      }[]

      scale.forEach((setting) => {
        const color = chroma.oklch(setting.lightness, setting.chroma, oklchH)
        colors[`${colorShortName}-${setting.key}`] = `hsl(${color
          .get('hsl.h')
          .toFixed(2)}deg ${(color.get('hsl.s') * 100).toFixed(2)}% ${(
          color.get('hsl.l') * 100
        ).toFixed(2)}%)`
      })

      // Find color in scale with the smallest distance to the default color
      // and replace it with the default color. Note that interactivity variants,
      // such as hover and focus, need to be assigned according to the new default
      // color key.
      const defaultKey = getDefaultKey(
        getShortName(baseColorName),
        defaultColor,
        oklchH,
        scale
      )
      colors[`${colorShortName}-${defaultKey}`] = `hsl(${hslH.toFixed(2)}deg ${(
        hslS * 100
      ).toFixed(2)}% ${(hslL * 100).toFixed(2)}%)`
      colors[`${colorShortName}-${defaultKey}/default`] = `hsl(${hslH.toFixed(
        2
      )}deg ${(hslS * 100).toFixed(2)}% ${(hslL * 100).toFixed(2)}%)`

      // TODO check if it is wiser to pick a color from the middle of the range
      // alpha
      colors[`${colorShortName}-alpha-low`] = `hsl(${hslH.toFixed(2)}deg ${(
        hslS * 100
      ).toFixed(2)}% ${(hslL * 100).toFixed(2)}% / 0.2)`
      colors[`${colorShortName}-alpha-lowest`] = `hsl(${hslH.toFixed(2)}deg ${(
        hslS * 100
      ).toFixed(2)}% ${(hslL * 100).toFixed(2)}% / 0.1)`
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
    const { fontFamily, fontSize, fontWeight, lineHeightPercentFontSize } =
      item.style
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

function invertColors(colors) {
  const inverted = JSON.parse(
    JSON.stringify(colors)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .replaceAll(/(-\d\d\d)/g, '$1_')
      .replaceAll('900_', '010')
      .replaceAll('800_', '050')
      .replaceAll('700_', '100')
      .replaceAll('600_', '200')
      .replaceAll('500_', '300')
      .replaceAll('400_', '400')
      .replaceAll('300_', '500')
      .replaceAll('200_', '600')
      .replaceAll('100_', '700')
      .replaceAll('050_', '800')
      .replaceAll('010_', '900')
      .replaceAll('/default', '')
  )
  Object.keys(colors).forEach((key) => {
    if (key.includes('/default')) {
      inverted[key] = inverted[key.split('/default')[0]]
      delete inverted[key.split('/default')[0]]
    }
  })
  return inverted
}

async function getTokensFromFigma(figmaFileURL: string) {
  let figmaId
  let nodeId
  try {
    const url = new URL(figmaFileURL)
    figmaId = url.pathname.split('/file/')[1].split('/')[0]
    nodeId = url.searchParams.get('node-id')
  } catch (err) {
    console.error('Failed to parse Figma file URL.')
    throw err
  }

  if (!figmaId || !nodeId) {
    throw new Error('Failed to parse Figma file URL.')
  }

  const result = await new Promise((resolve, reject) => {
    https
      .get(
        `https://api.figma.com/v1/files/${figmaId}/nodes?ids=${nodeId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Figma-Token': process.env.FIGMA_API_KEY,
          },
        },
        (resp) => {
          let data = ''

          resp.on('data', (chunk) => {
            data += chunk
          })

          resp.on('end', () => {
            resolve(JSON.parse(data))
          })
        }
      )
      .on('error', (err) => {
        reject(err)
      })
  })

  const { document, styles } = (result as { nodes }).nodes[nodeId]
  const { children: figmaData } = document

  const colors = parseColors(
    figmaData.find((child) => child.name === 'Colors').children,
    styles
  )
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
      ...colors,
    },
    colorsDark: {
      ...invertColors(colors),
    },
    typography: parseTypography(
      [
        ...figmaData.find((child) => child.name === 'Headlines').children,
        ...figmaData.find((child) => child.name === 'Paragraphs').children,
      ],
      styles
    ),
    borderRadii: parseBorderRadii(
      figmaData.find((child) => child.name === 'Border Radius').children
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
  return ensureWriteFile(
    join(stylesDir, 'shadows/shadows.css'),
    '/* autogenerated */ /* prettier-ignore */\n/* prettier-ignore */\n:root {\n' +
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

function generateColors(colors, isDark = false) {
  const colorVariables = new Map<string, string>()

  // Defaults
  const defaults = {}
  Object.keys(colors).forEach((key) => {
    if (key.includes('/default')) {
      const colorKey = key.split('/default')[0]
      const colorBaseName = key
        .replace(/\d/g, '')
        .replace('/default', '')
        .replace(/-$/, '')
      defaults[colorBaseName] = colorKey.match(/\d+/g)?.at(0)
    }
  })

  // Basic colors
  Object.keys(colors).forEach((key) => {
    const val = colors[key]
    if (key.includes('/default')) {
      const colorKey = key.split('/default')[0]
      const colorBaseName = key
        .replace(/\d/g, '')
        .replace('/default', '')
        .replace(/-$/, '')
      colorVariables.set(`--ld-col-${colorKey}`, val)
      colorVariables.set(`--ld-col-${colorBaseName}`, val)
    } else {
      colorVariables.set(`--ld-col-${key}`, val)
    }
  })

  return ensureWriteFile(
    join(stylesDir, isDark ? 'colors/colors-dark.css' : 'colors/colors.css'),
    [
      '/* autogenerated */',
      isDark ? ':root:is(.ld-dark) {' : ':root:not(.ld-dark) {',
      ...Array.from(colorVariables.entries())
        .map((entry) => `  ${entry[0]}: ${entry[1]};`)
        .sort(),
      '}',
      '',
    ].join('\n'),
    'utf8'
  )
}

function generateSpacings(tokens) {
  return ensureWriteFile(
    join(stylesDir, 'spacings/spacings.css'),
    '/* autogenerated */ /* prettier-ignore */\n/* prettier-ignore */\n:root {\n' +
      Object.keys(tokens)
        .sort((key) => parseInt(key))
        .map((key) => `  --ld-sp-${key}: ${tokens[key]};`)
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateTheming(themes) {
  const themeColorVariables = []
  const defaultThemeColorVariables = []
  const themeSelectors = []

  // Theme specific colors
  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName]
    const currentThemeColorVariables = []

    Object.keys(theme).forEach((colorGroupName) => {
      const colorGroup = theme[colorGroupName]

      if (colorGroupName === 'default') {
        return
      }

      const variableValue =
        colorGroup.indexOf('rgb') === 0
          ? colorGroup
          : `var(--ld-col-${colorGroup})`

      themeColorVariables.push(
        `  --ld-thm-${themeName}-${colorGroupName}: ${variableValue};`
      )
      currentThemeColorVariables.push(
        `  --ld-thm-${colorGroupName}: var(--ld-thm-${themeName}-${colorGroupName});`
      )
      if (theme.default) {
        defaultThemeColorVariables.push(
          `  --ld-thm-${colorGroupName}: var(--ld-thm-${themeName}-${colorGroupName});`
        )
      }
    })

    themeSelectors.push(`.ld-theme-${themeName} {`)
    themeSelectors.push(
      ...currentThemeColorVariables.filter((v) => !v.includes('-dark:')).sort()
    )
    // themeSelectors.push('\n  &.ld-dark {')
    // themeSelectors.push(
    //   ...currentThemeColorVariables
    //     .filter((v) => v.includes('-dark:'))
    //     .map((v) => '  ' + v.replace('-dark:', ':'))
    //     .sort()
    // )
    // themeSelectors.push('  }')
    themeSelectors.push('}')
  })

  return ensureWriteFile(
    join(stylesDir, 'theming/theming.css'),
    [
      '/* autogenerated */ /* prettier-ignore */',
      ':root {',
      ...themeColorVariables.filter((v) => !v.includes('-dark:')).sort(),
      ...defaultThemeColorVariables.filter((v) => !v.includes('-dark:')).sort(),
      '\n  &.ld-dark {',
      ...themeColorVariables
        .filter((v) => v.includes('-dark:'))
        .map((v) => '  ' + v.replace('-dark:', ':'))
        .sort(),
      ...defaultThemeColorVariables
        .filter((v) => v.includes('-dark:'))
        .map((v) => '  ' + v.replace('-dark:', ':'))
        .sort(),
      '  }',
      '}',
      ...themeSelectors,
      '',
    ].join('\n'),
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
  const getFontFamilyVarString = (ff: string) => {
    return ff === bodyFontFamily
      ? 'var(--ld-font-body)'
      : 'var(--ld-font-display)'
  }
  return ensureWriteFile(
    join(stylesDir, 'typography/typography.css'),
    '/* autogenerated */ /* prettier-ignore */\n/* prettier-ignore */\n:root {\n' +
      // This expects to have at least one headline and one paragraph typo defined
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
          }${val.fontSize}/${val.lineHeight} ${getFontFamilyVarString(
            val.fontFamily
          )};`
        })
        .join('\n') +
      '\n}\n',
    'utf8'
  )
}

function generateBorderRadii(tokens) {
  return ensureWriteFile(
    join(stylesDir, 'border-radius/border-radius.css'),
    '/* autogenerated */ /* prettier-ignore */\n/* prettier-ignore */\n:root {\n' +
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
    generateColors(tokenCollection.colors),
    generateColors(tokenCollection.colorsDark, true),
    generateSpacings(tokenCollection.spacings),
    generateTheming(tokenCollection.themes),
    generateTypography(tokenCollection.typography),
    generateBorderRadii(tokenCollection.borderRadii),
  ])
}

function generateJSONTokenFile(tokenCollection) {
  return ensureWriteFile(
    join(stylesDir, 'design-tokens.json'),
    JSON.stringify(tokenCollection, null, 2),
    'utf8'
  )
}

async function applyDesignTokens(
  figmaFileURL = process.env.FIGMA_FILE_URL ||
    'https://www.figma.com/file/JcDMeUwec9e185HfBgT9XE/Liquid-Oxygen?node-id=2615%3A28396'
) {
  if (!process.env.FIGMA_API_KEY) {
    console.warn('No Figma API key provided - skipping design token update.')
    return
  }

  try {
    const tokenCollection = await getTokensFromFigma(figmaFileURL)
    await generateJSONTokenFile(tokenCollection)
    await generateCSSTokenFiles(tokenCollection)
  } catch (err) {
    console.error('error', err)
  }
}

if (!isBin) {
  applyDesignTokens()
}

module.exports = applyDesignTokens
