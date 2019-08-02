const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pagesConfigs = require('./pages')
const parts = require('./webpack.parts.config')

const productionConfig = merge([
  {
    mode: 'production',

    output: {
      publicPath: '/'
    },

    plugins: [
      new CleanWebpackPlugin('dist'),

      new CopyWebpackPlugin([{ from: './public', to: '' }])
    ]
  },

  parts.uglifyJavascript(),

  parts.loadJavascript({ exclude: [/node_modules/] }),

  parts.extractCSS(),

  parts.loadImages(),

  parts.loadSVG({ optimize: true }),

  parts.loadHtml(),

  parts.loadFonts(),

  parts.loadFavicons()
])

const pages = pagesConfigs.map((config) =>
  parts.page({
    ...config,
    optimize: false
  })
)

module.exports = pages.map((page) => merge([productionConfig, page]))
