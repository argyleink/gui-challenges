const postcssPresetEnv  = require('postcss-preset-env')
const postcssCustomMedia = require('postcss-custom-media')

module.exports = {
  plugins: [
    postcssCustomMedia(),
    postcssPresetEnv({
      stage: 0,
      enableClientSidePolyfills: false,
      features: {
        'cascade-layers': false,
        'clamp': false,
        'logical-properties-and-values': false, 
        'prefers-color-scheme-query': false, 
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'dir-pseudo-class': false,
        'is-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'color-functional-notation': false,
      }
    }),
  ]
}
