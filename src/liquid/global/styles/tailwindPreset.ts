/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const designTokens: DesignTokens = require('./design-tokens.json')

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
  typography: {
    body: Record<string, Typo>
    display: Record<string, Typo>
  }
}

type TailwindColorObject = {
  [key: string]: TailwindColorObject | string
}

const colors = { thm: {} }
const createNestedColorFromFlat = (
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

        currentColorObject[namePart]['DEFAULT'] = colorTokenReference
          ? colors[colorTokenReference].DEFAULT
          : `var(--ld-thm-${key})`
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
    colors[themeName] = {}

    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value !== 'boolean') {
        createNestedColorFromFlat(key, colors[themeName], value)

        if (isFirstTheme) {
          // Creates dynamic colors based on custom properties
          createNestedColorFromFlat(key, colors.thm)
        }
      }
    })
  }
)

// Extract typography
const typography = {}
const fontSize = {}
Object.entries({
  ...designTokens.typography.display,
  ...designTokens.typography.body,
}).forEach(([key, value]) => {
  typography[`.typo-${key}`] = value
  fontSize[key] = value.fontSize
})

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
    fontFamily: {
      body: ['Lato', 'sans-serif'],
      display: ['MWeb', 'sans-serif'],
    },
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
