/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https')
const { existsSync } = require('fs')
const { mkdir, writeFile } = require('fs').promises
const { join, dirname } = require('path')

const isBin = __filename.endsWith('.cjs')
const stylesDir = isBin ? './liquid_tmp/styles' : './src/liquid/global/styles'

type Color = {
  r: number
  g: number
  b: number
  a: number
}
type Offset = {
  x: number
  y: number
}

type Fill = {
  opacity: number
  type: string
  color: Color
}

type Font = {
  fontFamily: string
  fontSize: number | string
  fontWeight: number | string | undefined
  lineHeight: number | string
  lineHeightPercentFontSize?: number
}

type Variant = {
  id: string
  name: string
  type: string
  children: Variant[]
  fills: Fill[]
  style: Font
  styles: {
    fill: string
    text: string
  }
  cornerRadius: number
  effects: {
    color: Color
    offset: Offset
    radius: string
  }[]
  absoluteBoundingBox: {
    width: number
    height: number
  }
}

type Styles = Record<
  string,
  {
    description: string
    key: string
    name: string
    styleType: string
  }
>

type Nodes = Record<
  string,
  {
    document: {
      id: string
      name: string
      children: Variant[]
    }
    styles: Styles
  }
>

type TokenCollection = {
  themes: Record<string, Record<string, string>>
  shadows: Record<string, string>
  spacings: Record<number, string>
  colors: Record<string, string>
  typography: Record<string, Font>
  borderRadii: Record<string, string>
}

async function ensureWriteFile(path: string, data: string) {
  const dir = dirname(path)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })

  return writeFile(path, data, 'utf8')
}

function pxToRem(px: string | number) {
  const val = parseInt(px + '') / 16
  if (!val) return '0'
  return val + 'rem'
}

function getColorTokenValue(variant: Variant, styles: Styles) {
  if (variant.styles?.fill) {
    const style = styles[variant.styles.fill]
    const { name, description } = style
    const variants = description.split(', ')
    const [baseColorName, ...rest] = name.split('/')[1].split('-')
    const referenceName =
      (baseColorName === 'Neutral'
        ? baseColorName
        : baseColorName['replaceAll'](/[a-z]/g, '')
      ).toLowerCase() +
      (variants.includes('Default')
        ? ''
        : rest.length
          ? '-' + rest.join('-')
          : '')
    return referenceName
  } else {
    return relRGBToAbsRGB(variant.fills[0])
  }
}

function relRGBToAbsRGB(fill: Fill) {
  const r = Math.round(fill.color.r * 255)
  const g = Math.round(fill.color.g * 255)
  const b = Math.round(fill.color.b * 255)
  const a = Math.round((fill.opacity ?? 1) * 100) / 100

  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

function parseThemes(variants: Variant[], styles: Styles) {
  const themes = {}

  variants.forEach((variant) => {
    if (!variant.name.startsWith('_')) {
      const theme = {}
      const themeName = variant.name.toLowerCase().replace(/ /g, '-')

      const colorGroups = variant.children
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

function parseBorderRadii(variants: Variant[]) {
  const borderRadii = {}

  variants.forEach((item) => {
    borderRadii[item.name.toLowerCase()] = item.cornerRadius
      ? pxToRem(item.cornerRadius)
      : '0'
  })

  return borderRadii
}

function parseShadows(variants: Variant[]) {
  const shadows = {}

  for (const variant of variants) {
    shadows[variant.name.split(' ')[0].toLowerCase()] = variant.effects
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

function parseColors(variants: Variant[], styles: Styles) {
  const colors = {}

  for (const variant of variants) {
    if (variant.name.startsWith('_')) {
      continue
    }

    if (variant.children) {
      Object.assign(colors, parseColors(variant.children, styles))
    } else if (variant.fills?.length && variant.styles?.fill) {
      const style = styles[variant.styles.fill]
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
      const colorValue = relRGBToAbsRGB(variant.fills[0])
      colors[colorName] = colorValue
    }
  }

  return colors
}

function parseTypography(variants: Variant[], styles: Styles) {
  const typography: Record<string, Font> = {}

  variants.forEach((variant) => {
    const [, styleName] = styles[variant.styles.text].name.split('/')
    const typoName = styleName
      .toLowerCase()
      .replace(/^pg-/, 'body-')
      .replace(/^caption-/, 'cap-')
    const { fontFamily, fontSize, fontWeight, lineHeightPercentFontSize } =
      variant.style
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

function parseSpacings(items: Variant[]) {
  const spacings = {}

  for (const variant of items) {
    spacings[variant.name.split('$spacing-')[1]] = pxToRem(
      variant.absoluteBoundingBox.height
    )
  }

  return spacings
}

async function getTokensFromFigma(figmaFileURL: string) {
  let figmaId: string
  let nodeId: string
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
        (resp: typeof https.IncomingMessage) => {
          let data = ''

          resp.on('data', (chunk: string) => {
            data += chunk
          })

          resp.on('end', () => {
            resolve(JSON.parse(data))
          })
        }
      )
      .on('error', (err: unknown) => {
        reject(err)
      })
  })

  const { document, styles } = (result as { nodes: Nodes }).nodes[nodeId]
  const { children: variants } = document

  const tokens: TokenCollection = {
    themes: parseThemes(
      variants.find(({ name }) => name === 'Themes').children,
      styles
    ),
    shadows: parseShadows(
      variants.find((variant) => variant.name === 'Shadows').children
    ),
    spacings: parseSpacings(
      variants.find((variant) => variant.name === 'Spacings').children
    ),
    colors: {
      ...parseColors(
        variants.find((variant) => variant.name === 'Colors').children,
        styles
      ),
    },
    typography: parseTypography(
      [
        ...variants.find((variant) => variant.name === 'Headlines').children,
        ...variants.find((variant) => variant.name === 'Paragraphs').children,
      ],
      styles
    ),
    borderRadii: parseBorderRadii(
      variants.find((variant) => variant.name === 'Border Radius').children
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

function generateShadows(tokens: TokenCollection['shadows']) {
  return ensureWriteFile(
    join(stylesDir, 'shadows/shadows.css'),
    '/* autogenerated */\n/* prettier-ignore */\n:root {\n' +
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
      '\n}\n'
  )
}

function generateColors(colorTokens: TokenCollection['colors']) {
  const colorVariables = []

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

  return ensureWriteFile(
    join(stylesDir, 'colors/colors.css'),
    ['/* autogenerated */', ':root {', ...colorVariables.sort(), '}', ''].join(
      '\n'
    )
  )
}

function generateSpacings(tokens: TokenCollection['spacings']) {
  return ensureWriteFile(
    join(stylesDir, 'spacings/spacings.css'),
    '/* autogenerated */\n/* prettier-ignore */\n:root {\n' +
      Object.keys(tokens)
        .sort((key) => parseInt(key))
        .map((key) => `  --ld-sp-${key}: ${tokens[key]};`)
        .join('\n') +
      '\n}\n'
  )
}

function generateTheming(themes: TokenCollection['themes']) {
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
      '/* autogenerated */',
      ':root {',
      ...themeColorVariables.sort(),
      ...defaultThemeColorVariables.sort(),
      '}',
      ...themeSelectors,
      '',
    ].join('\n')
  )
}

function generateTypography(tokens: TokenCollection['typography']) {
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
    '/* autogenerated */\n/* prettier-ignore */\n:root {\n' +
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
      '\n}\n'
  )
}

function generateBorderRadii(tokens: TokenCollection['borderRadii']) {
  return ensureWriteFile(
    join(stylesDir, 'border-radius/border-radius.css'),
    '/* autogenerated */\n/* prettier-ignore */\n:root {\n' +
      Object.keys(tokens)
        .sort((key) => parseInt(key))
        .map((key) => `  --ld-br-${key}: ${tokens[key]};`)
        .join('\n') +
      '\n}\n'
  )
}

function generateCSSTokenFiles(tokenCollection: TokenCollection) {
  return Promise.all([
    generateShadows(tokenCollection.shadows),
    generateColors(tokenCollection.colors),
    generateSpacings(tokenCollection.spacings),
    generateTheming(tokenCollection.themes),
    generateTypography(tokenCollection.typography),
    generateBorderRadii(tokenCollection.borderRadii),
  ])
}

function generateJSONTokenFile(tokenCollection: TokenCollection) {
  return ensureWriteFile(
    join(stylesDir, 'design-tokens.json'),
    JSON.stringify(tokenCollection, null, 2)
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
