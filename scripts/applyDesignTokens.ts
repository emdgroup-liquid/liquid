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

function getHSLFromColor(color) {
  const h = ((color.get('hsl.h') || 0) * 1).toFixed(2)
  const s = (color.get('hsl.s') * 100).toFixed(2)
  const l = (color.get('hsl.l') * 100).toFixed(2)
  return { h, s, l }
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
    const { r, g, b, a } = variant.fills[0]
    const color = chroma({ r, g, b, a })

    const { h, s, l } = getHSLFromColor(color)
    return `hsl(${h}deg ${s}% ${l}%${a === 1 ? '' : ' / ' + a})`
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

function getLightness(lightness: string, isDark = false) {
  if (!isDark) return lightness
  return (100 - parseFloat(lightness)).toFixed(2)
}

function parseColors(
  items,
  styles: { name: string; description: string }[],
  isDark = false
) {
  const colors = {}

  function getKeyFromStep(step) {
    if (step === 0) return '010'
    if (step === 1) return '050'
    return step - 1 + '00'
  }

  function getStepFromKey(colorKey) {
    if (colorKey === '010') return 1
    if (colorKey === '050') return 2
    return (parseInt(colorKey) || 0) / 100 + 1
  }

  for (const item of items) {
    if (item.name.startsWith('_')) {
      continue
    }

    if (item.children) {
      Object.assign(colors, parseColors(item.children, styles, isDark))
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

      const defaultStep = getStepFromKey(name.match(/\d+/g)?.at(0))
      const r = parseFloat((item.fills[0].color.r * 255).toFixed(2))
      const g = parseFloat((item.fills[0].color.g * 255).toFixed(2))
      const b = parseFloat((item.fills[0].color.b * 255).toFixed(2))

      const color = chroma({ r, g, b })
      const { h, s, l } = getHSLFromColor(color)
      const totalSteps = 11
      const totalStepsToLight = defaultStep
      const totalStepsToDark = totalSteps - defaultStep

      if (isWhite) {
        colors[colorShortName] = `hsl(${h}deg ${s}% ${getLightness(
          l,
          isDark
        )}%)`
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
          ] = `hsl(${h}deg ${s}% ${getLightness(l, isDark)}% / ${
            gradient.alpha
          })`
        }
        continue
      }

      // default
      colors[
        `${colorShortName}-${getKeyFromStep(defaultStep)}/default`
      ] = `hsl(${h}deg ${s}% ${getLightness(l, isDark)}%)`

      // const defaultS = parseFloat(s)
      // // scale
      // chroma
      //   .scale([
      //     chroma({ r, g, b })
      //       .set('hsl.h', color.get('hsl.h') - 10)
      //       // .luminance(0.98),
      //       .set('hsl.l', 0.9825),
      //     chroma({ r, g, b })
      //       .set('hsl.h', color.get('hsl.h') + 10)
      //       // .luminance(0.015)
      //       .set('hsl.l', 0.0175),
      //   ])
      //   .mode('lab')
      //   .correctLightness()
      //   .colors(totalSteps)
      //   .forEach((color, step) => {
      //     if (step === defaultStep) return
      //     const s = Math.sin(step * (Math.PI / totalSteps)) * defaultS
      //     const { h, /*s, */ l } = getHSLFromColor(chroma(color))
      //     colors[`${colorShortName}-${getKeyFromStep(step)}`] = `hsl(${
      //       h || 0
      //     }deg ${s}% ${l}%)`
      //     colors[`${colorShortName}-${getKeyFromStep(step)}`] = `hsl(${
      //       h || 0
      //     }deg ${s}% ${getLightness(l, isDark)}%)`
      //   })

      // to light
      const colorLightest = chroma({ r, g, b })
        .set('hsl.h', color.get('hsl.h') - 15)
        .set('hsl.l', 0.9825)
        .set('hsl.s', isNeutral ? 0 : 1)
      const colorLight = chroma({ r, g, b })
        .set('hsl.h', color.get('hsl.h') - 10)
        .set('hsl.l', 0.9425)
        .set('hsl.s', isNeutral ? 0 : 1)
      const colorsToLightest = [
        colorLightest,
        ...chroma
          .scale([colorLight, color])
          .correctLightness()
          .colors(totalStepsToLight),
      ]
      colorsToLightest.forEach((color, step) => {
        if (step === defaultStep) return
        const { h, s, l } = getHSLFromColor(chroma(color))
        colors[
          `${colorShortName}-${getKeyFromStep(step)}`
        ] = `hsl(${h}deg ${s}% ${getLightness(l, isDark)}%)`
      })

      // to dark
      const colorDark = chroma({ r, g, b })
        .set('hsl.h', color.get('hsl.h') + 10)
        .luminance(0.015)
      chroma
        .scale([color, colorDark])
        .mode('lab')
        .correctLightness()
        .colors(totalStepsToDark)
        .forEach((color, i) => {
          if (i === 0) return
          const step = defaultStep + i
          const { h, s, l } = getHSLFromColor(chroma(color))
          colors[`${colorShortName}-${getKeyFromStep(step)}`] = `hsl(${
            h || 0
          }deg ${s}% ${l}%)`
          colors[`${colorShortName}-${getKeyFromStep(step)}`] = `hsl(${
            h || 0
          }deg ${s}% ${getLightness(l, isDark)}%)`
        })

      // TODO check if it is wiser to pick a color from the middle of the range
      // alpha
      colors[`${colorShortName}-alpha-low`] = `hsl(${h}deg ${s}% ${getLightness(
        l,
        isDark
      )}% / 0.2)`
      colors[
        `${colorShortName}-alpha-lowest`
      ] = `hsl(${h}deg ${s}% ${getLightness(l, isDark)}% / 0.1)`
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
    colorsDark: {
      ...parseColors(
        figmaData.find((child) => child.name === 'Colors').children,
        styles,
        true
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

function generateColors(colors, colorsDark) {
  const colorVariables = []
  const colorDarkVariables = []

  // Basic colors
  Object.keys(colors).forEach((key) => {
    const val = colors[key]
    const valDark = colorsDark[key]
    if (key.includes('/default')) {
      const colorKey = key.split('/default')[0]
      const colorBaseName = key
        .replace(/\d/g, '')
        .replace('/default', '')
        .replace(/-$/, '')

      colorVariables.push(`  --ld-col-${colorKey}: ${val};`)
      colorDarkVariables.push(`  --ld-col-${colorKey}: ${valDark};`)

      // prevents duplicate custom properties in cases like "sp/default"
      if (colorBaseName !== colorKey) {
        colorVariables.push(`  --ld-col-${colorBaseName}: ${val};`)
        colorDarkVariables.push(`  --ld-col-${colorBaseName}: ${valDark};`)
      }
    } else {
      colorVariables.push(`  --ld-col-${key}: ${val};`)
      colorDarkVariables.push(`  --ld-col-${key}: ${valDark};`)
    }
  })

  return ensureWriteFile(
    join(stylesDir, 'colors/colors.css'),
    [
      '/* autogenerated */',
      'html:not(.ld-dark) {',
      ...colorVariables.sort(),
      '}',
      'html:is(.ld-dark) {',
      ...colorDarkVariables.sort(),
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
    generateColors(tokenCollection.colors, tokenCollection.colorsDark),
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
