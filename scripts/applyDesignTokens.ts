/* eslint-disable @typescript-eslint/no-var-requires */

const https = require('https')
const { existsSync } = require('fs')
const { mkdir, writeFile } = require('fs').promises
const { join, dirname } = require('path')

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

function getColorTokenValue(variant, styles) {
  if (variant.styles?.fill) {
    const style = styles[variant.styles.fill]
    const { name, description } = style
    const variants = description.split(', ')
    const [baseColorName, ...rest] = name.split('/')[1].split('-')
    const referenceName =
      (baseColorName === 'Neutral'
        ? baseColorName
        : baseColorName.replaceAll(/[a-z]/g, '')
      ).toLowerCase() +
      (variants.includes('Default')
        ? ''
        : rest.length
        ? '-' + rest.join('-')
        : '')
    return referenceName
  } else {
    // return relRGBToAbsRGB(variant.fills[0])
    return relRGBToAbsHSL(variant.fills[0])
  }
}

function relRGBToAbsHSL(fill) {
  const { r, g, b } = fill.color
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0
  const a = Math.round((fill.opacity ?? 1) * 100) / 100

  // Calculate hue
  // No difference
  if (delta == 0) h = 0
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2
  // Blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0) h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return `hsl(${h}deg ${s}% ${l}%${a === 1 ? '' : ' / ' + a})`
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
            const subVariants = variant.children

            if (variant.children) {
              if (subVariants) {
                subVariants.forEach((subVariant) => {
                  const subVariantName = subVariant.name
                    .toLowerCase()
                    .replace(/ /g, '-')
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
      const variants = description.split(', ')
      const pathParts = name.split('/')
      const [baseColorName, ...rest] =
        pathParts[pathParts.length > 1 ? pathParts.length - 1 : 0].split('-')
      const defaultOnly = rest.length === 0
      const colorShortName = ['Neutral', 'White'].includes(baseColorName)
        ? baseColorName === 'White'
          ? 'wht'
          : baseColorName.toLowerCase()
        : baseColorName.replace(/[a-z]/g, '').toLowerCase()
      const colorName =
        colorShortName +
        (defaultOnly ? '' : '-' + rest.join('-')) +
        (variants.includes('Default') ? '/default' : '')
      // const colorValue = relRGBToAbsRGB(item.fills[0])
      const colorValue = relRGBToAbsHSL(item.fills[0])
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

function getHSLPartsFromValue(hslValue): {
  h: string
  s: string
  l: string
  a: string
} {
  const hslParts = hslValue.match(/([\d.]+)(deg|%)|(0\.\d+)/g)
  const [h, s, l, a] = hslParts
  return {
    h,
    s,
    l,
    a: a ? a : '1',
  }
}

function getColorVariable(
  colorBaseName: string,
  colorKey: string,
  saturation: number,
  lightness: number,
  alpha: number
) {
  console.info('saturation', saturation)
  return `  --ld-col-${colorBaseName}-${colorKey}: hsl(var(--ld-col-${colorBaseName}-h) var(--ld-col-${colorBaseName}-s) ${(
    lightness * 100
  ).toFixed(2)}%${alpha === 1 ? '' : ' / ' + alpha});`
  // return `  --ld-col-${colorBaseName}-${colorKey}: hsl(var(--ld-col-${colorBaseName}-h) ${(
  //   saturation * 100
  // ).toFixed(2)}% ${(lightness * 100).toFixed(2)}%${
  //   alpha === 1 ? '' : ' / ' + alpha
  // });`
}

// Function to compute logarithmic function
function computeLogFn(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  power: number
) {
  // Calculate the coefficients of the logarithmic equation, y = a * log(x)^p + b
  const a =
    (y1 - y3) / (Math.pow(Math.log(x1), power) - Math.pow(Math.log(x3), power))
  const b = y2 - a * Math.pow(Math.log(x2), power)

  // Return the logarithmic function
  return (x: number) => a * Math.pow(Math.log(x), power) + b
}
function computeY(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  power: number,
  xVal: number
): number {
  // Get logarithmic function
  const logFn = computeLogFn(x1, y1, x2, y2, x3, y3, power)

  // Calculate and return y value
  return logFn(xVal)
}

function getStepFromKey(colorKey) {
  if (colorKey === '010') return 1
  if (colorKey === '050') return 2
  return (parseInt(colorKey) || 0) / 100 + 2
}

function getLighness(
  baseHue: string,
  baseLighness: string,
  baseColorKey: string,
  colorKey: string
): number {
  console.info('baseHue', baseHue)
  const totalSteps = 11
  const baseStep = getStepFromKey(baseColorKey)
  const step = getStepFromKey(colorKey)

  const x1 = 1
  const y1 = 0.98
  const x2 = 1 + baseStep / totalSteps
  const y2 = parseFloat(baseLighness) / 100
  const x3 = 1 + 1
  const y3 = 0.11

  // f(x) = 1 + (sin(Pi * x - Pi / c) + 1) / 2
  const x = parseFloat(baseHue) / 360
  const c = 3
  let power = Math.sin(Math.PI * x - Math.PI / c) + 1
  power = 1.1

  const lighness = computeY(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    power,
    1 + step / totalSteps
  )
  return lighness
}

function getSaturation(
  baseSaturation: string,
  baseColorKey: string,
  colorKey: string
): number {
  const totalSteps = 11
  const baseStep = getStepFromKey(baseColorKey)
  const step = getStepFromKey(colorKey)

  const x1 = 1
  const y1 = 0.01
  const x2 = 1 + baseStep / totalSteps
  const y2 = parseFloat(baseSaturation) / 100
  const x3 = 1 + 1
  const y3 = 0.9

  const power = 3

  const saturation = computeY(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    power,
    1 + step / totalSteps
  )
  return saturation
}

function generateColors(colorTokens) {
  const colorVariables = []

  // Basic colors
  Object.keys(colorTokens).forEach((key) => {
    const colorVal = colorTokens[key]
    if (key.includes('/default')) {
      const { h, s, l } = getHSLPartsFromValue(colorVal)
      const baseColorName = key
        .replace(/\d+/g, '')
        .replace('/default', '')
        .replace(/-$/, '')

      if (baseColorName === 'wht') {
        return
      }

      const baseColorKey = key.match(/\d+/g)?.at(0)
      if (!baseColorKey) {
        return
      }

      const baseHue = h
      const baseLighness = l
      const baseSaturation = s

      colorVariables.push(
        `  --ld-col-${baseColorName}: hsl(var(--ld-col-${baseColorName}-h) var(--ld-col-${baseColorName}-s) ${baseLighness});`
      )
      colorVariables.push(`  --ld-col-${baseColorName}-h: ${h};`)
      colorVariables.push(`  --ld-col-${baseColorName}-s: ${s};`)
      ;[
        '010',
        '050',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'alpha-low',
        'alpha-lowest',
      ].forEach((colorKey) => {
        let lightness: number
        let saturation: number
        let alpha: number
        if (colorKey === 'alpha-low') {
          alpha = 0.2
          lightness = parseFloat(baseLighness) / 100
          saturation = parseFloat(baseSaturation) / 100
        } else if (colorKey === 'alpha-lowest') {
          alpha = 0.1
          lightness = parseFloat(baseLighness) / 100
          saturation = parseFloat(baseSaturation) / 100
        } else {
          alpha = 1
          lightness = getLighness(baseHue, baseLighness, baseColorKey, colorKey)
          saturation = getSaturation(baseSaturation, baseColorKey, colorKey)
        }
        colorVariables.push(
          getColorVariable(
            baseColorName,
            colorKey,
            saturation,
            lightness,
            alpha
          )
        )
      })
    }
  })
  colorVariables.push('  --ld-col-inv: 0;')

  return ensureWriteFile(
    join(stylesDir, 'colors/colors.css'),
    [
      '/* autogenerated */ /* prettier-ignore */',
      ':root {',
      ...colorVariables.sort(),
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
    themeSelectors.push(...currentThemeColorVariables.sort())
    themeSelectors.push(`}`)
  })

  return ensureWriteFile(
    join(stylesDir, 'theming/theming.css'),
    [
      '/* autogenerated */ /* prettier-ignore */',
      ':root {',
      ...themeColorVariables.sort(),
      ...defaultThemeColorVariables.sort(),
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
