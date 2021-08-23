/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const designTokens = require('./design-tokens.json')

function decToHex(value) {
  if (value > 255) {
    return 'FF'
  } else if (value < 0) {
    return '00'
  } else {
    return value.toString(16).padStart(2, '0')
  }
}

function rgbToHex(r, g, b) {
  return '#' + decToHex(r) + decToHex(g) + decToHex(b)
}

// Extract colors
const colors = {}
Object.entries(designTokens.colors).forEach(([key, value]) => {
  // Tailwind's background-opacity utility only works with hex color values,
  // so we convert rgb to hex here.
  const rgbRegex = /(\d{1,3}), (\d{1,3}), (\d{1,3})/g
  const extraction = rgbRegex.exec(value as string)
  const hex = rgbToHex(
    parseInt(extraction[1]),
    parseInt(extraction[2]),
    parseInt(extraction[3])
  )

  const [, base, modifier, isDefault] =
    /^([a-z-]+)(\d)*(\/default)?$/.exec(key) || []

  if (!modifier) {
    colors[key] = hex
    return
  }

  if (!colors[base]) {
    colors[base] = {}
  }

  if (isDefault) {
    colors[base].DEFAULT = hex
  }
  colors[base][modifier.padEnd(3, '0')] = hex
})

// Extract typography
const typography = {}
const fontSize = designTokens
Object.entries({
  ...designTokens.typography.display,
  ...designTokens.typography.body,
} as {
  fontSize: string
  lineHeight: string
  fontFamily: string
}[]).forEach(([key, value]) => {
  typography[`.typo-${key}`] = value
  fontSize[key] = value.fontSize
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
    spacing: {
      ...designTokens.spacings,
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
