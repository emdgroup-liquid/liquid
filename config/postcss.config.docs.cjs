module.exports = {
  plugins: [
    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-preset-env')({
      features: {
        'focus-visible-pseudo-class': false,
      },
    }),
    require('postcss-import')(),
  ],
}
