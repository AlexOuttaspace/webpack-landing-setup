const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pagesConfigs = require('./pages')
const parts = require('./webpack.parts.config')

const developmentConfig = merge([
  {
    mode: 'development',

    devServer: {
      stats: 'minimal',
      open: true,
      overlay: true,
      publicPath: '/'
    },

    plugins: [new CopyWebpackPlugin([{ from: './public', to: '' }])]
  },

  parts.loadJavascript({ exclude: [/node_modules/] }),

  // using style-loader leads to fullpagejs incorrectly setting up section heights
  parts.extractCSS(),

  parts.loadImages({ optimize: false }),

  parts.loadSVG({ optimize: false }),

  parts.loadHtml(),

  parts.loadFonts()
])

const pages = pagesConfigs.map((config) =>
  parts.page({
    ...config,
    optimize: false
  })
)

module.exports = pages.map((page) => merge([developmentConfig, page]))
