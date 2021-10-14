module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-declaration-strict-value',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-use-nesting',
  ],
  rules: {
    'block-no-empty': true,
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,
    'csstools/use-nesting': true,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'declaration-block-trailing-semicolon': null,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: require('./package.json').browserslist,
        ignorePartialSupport: true,
        ignore: [
          'pointer',
          'user-select-none',
          'css-touch-action',
          'word-break',
        ],
      },
    ],
    'plugin/no-low-performance-animation-properties': [
      true,
      {
        ignoreProperties: ['visibility'],
      },
    ],
    'scale-unlimited/declaration-strict-value': [
      ['/color/', 'font-size'],
      {
        ignoreValues: ['inherit', 'transparent', 'currentColor'],
        disableFix: true,
      },
    ],
    'selector-disallowed-list': [
      /(?::?:after|:?:before|:?:first-letter|:?:first-line)[^,]+/,
      // /::slotted\(.+\) .*/,
      // /::slotted\(.+\):(?!:?after|:?before|:?first-letter|:?first-line)/,
      // /::slotted\(.*(?::?:after|:?:before|:?:first-letter|:?:first-line|::slotted|:host).*\)/,
      // /::slotted\([^,]+ [^,]+\)/,
      // /::slotted\([^,]*[>+~][^,]+\)/,
      // /:host\([^,]+ [^,]+\)/,
      // /:host\([^,]*[>+~][^,]+\)/,
      /([^, \n][ \n]*):host/,
    ],
    'selector-no-qualifying-type': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^ld-/', '/^docs-/'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['/^define-mixin/', '/^mixin/'],
      },
    ],
  },
}
