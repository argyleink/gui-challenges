const postcssPresetEnv  = require('postcss-preset-env')
const postcssImport     = require('postcss-import')
const postcsseasings    = require('postcss-easings')
const importUrl         = require('postcss-import-url')
const cssnano           = require('cssnano')

const dev = {
  plugins: [
    importUrl(),
    postcssImport({
      path: 'app/css',
    }),
    postcsseasings(),
    postcssPresetEnv({
      stage: 0,
    }),
  ]
}

const prod = {
  plugins: [
    importUrl(),
    postcssImport({
      path: 'app/css',
    }),
    postcsseasings(),
    postcssPresetEnv({
      stage: 0,
    }),
    cssnano({
      preset: 'default'
    }),
  ]
}

module.exports = process.env.NODE_ENV === 'production' 
  ? prod 
  : dev
