/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path')
const plugin = require('tailwindcss/plugin')

let designTokens: DesignTokens
try {
  designTokens = require(join(process.cwd(), 'design-tokens.json'))
} catch (err) {
  designTokens = require('./design-tokens.json')
}

type Theme = Record<string, string> & {
  default?: boolean
}

type Typo = {
  fontFamily: string
  fontSize: string
  lineHeight: string
}

type DesignTokens = {
  borderRadii: Record<string, string>
  colors: Record<string, string>
  shadows: Record<string, string>
  spacings: Record<string, string>
  themes: Record<string, Theme>
  typography: Record<string, Typo>
}

type TailwindColorObject = {
  [key: string]: TailwindColorObject | string
}

const colors = {
  current: 'currentColor',
  transparent: 'transparent',
  thm: {},
}
const createNestedThemeColorFromFlat = (
  key: string,
  colorObject: TailwindColorObject,
  colorTokenReference?: string
) => {
  const nameParts = key.split('-')
  let currentColorObject = colorObject

  nameParts.forEach((namePart, index) => {
    const lastIndex = nameParts.length - 1

    if (index === lastIndex) {
      if (lastIndex === 0) {
        if (!currentColorObject[namePart]) {
          currentColorObject[namePart] = {}
        }

        if (!colorTokenReference) {
          currentColorObject[namePart]['DEFAULT'] = `var(--ld-thm-${key})`
          return
        }

        if (['#', '('].some((char) => colorTokenReference.includes(char))) {
          currentColorObject[namePart]['DEFAULT'] = colorTokenReference
          return
        }

        const colorTokenReferenceParts = colorTokenReference.split('-')

        currentColorObject[namePart]['DEFAULT'] =
          colorTokenReferenceParts.length === 1
            ? colors[colorTokenReference].DEFAULT
            : designTokens.colors[colorTokenReference] ??
              designTokens.colors[colorTokenReference + '/default']
        return
      }

      currentColorObject[namePart] = colorTokenReference
        ? designTokens.colors[colorTokenReference]
        : `var(--ld-thm-${key})`
      return
    }

    if (!currentColorObject[namePart]) {
      currentColorObject[namePart] = {}
    }

    currentColorObject = currentColorObject[namePart] as TailwindColorObject
  })
}

// Extract colors
Object.entries(designTokens.colors).forEach(([key, value]) => {
  const [name, isDefault] = key.split('/')
  const nameParts = name.split('-')
  let currentColorObject = colors

  nameParts.forEach((namePart, index) => {
    const lastIndex = nameParts.length - 1
    const defaultIndex = nameParts.length - 2

    if (index === lastIndex) {
      if (lastIndex === 0) {
        if (!currentColorObject[namePart]) {
          currentColorObject[namePart] = {}
        }

        currentColorObject[namePart].DEFAULT = value
        return
      }

      currentColorObject[namePart] = value
      return
    }

    if (!currentColorObject[namePart]) {
      currentColorObject[namePart] = {}
    }

    if (isDefault && index === defaultIndex) {
      currentColorObject[namePart].DEFAULT = value
    }

    currentColorObject = currentColorObject[namePart]
  })
})

// Extract theme colors
Object.entries(designTokens.themes).forEach(
  ([themeName, theme], themeIndex) => {
    const isFirstTheme = themeIndex === 0
    const themeNameFinal = themeName === 'neutral' ? 'thm-neutral' : themeName
    colors[themeNameFinal] = {}

    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value !== 'boolean') {
        createNestedThemeColorFromFlat(key, colors[themeNameFinal], value)

        if (isFirstTheme) {
          // Creates dynamic colors based on custom properties
          createNestedThemeColorFromFlat(key, colors.thm)
        }
      }
    })
  }
)

// Extract typography
const typography = {}
const fontSize = {}
const typoTokenEntries = Object.entries(designTokens.typography)
typoTokenEntries.forEach(([key, value]) => {
  typography[`.typo-${key}`] = value
  fontSize[key] = value.fontSize
})
const [, { fontFamily: bodyFontFamily }] = typoTokenEntries.find(([key]) =>
  key.startsWith('body')
)
const nonBodyTypoEntry = typoTokenEntries.find(
  ([, value]) => value.fontFamily !== bodyFontFamily
)
const fontFamily = {
  body: bodyFontFamily.split(', '),
  display: nonBodyTypoEntry
    ? nonBodyTypoEntry[1].fontFamily.split(', ')
    : undefined,
}

// Extract spacings
const spacing = {}
Object.entries(designTokens.spacings).forEach(([key, value]) => {
  spacing[`ld-${key}`] = value
})

const preset = {
  theme: {
    colors,
    borderRadius: {
      ...designTokens.borderRadii,
      none: '0px',
    },
    boxShadow: designTokens.shadows,
    dropShadow: designTokens.shadows,
    fontSize,
    fontFamily,
    extend: {
      spacing,
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(typography)
    }),
  ],
  corePlugins: {},
}

module.exports = preset
