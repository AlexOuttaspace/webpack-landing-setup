const path = require('path')

const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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

const pages = [
  parts.page({
    entry: {
      js: path.join(__dirname, 'src/script/index.js'),
      css: path.join(__dirname, 'src/styles/index.scss')
    },

    path: '',
    template: path.join(__dirname, 'src/markup/index.hbs'),
    excludeAssets: [/css.*.js/],
    minify: {
      collapseWhitespace: true,
      removeComments: false
    }
  })
]

module.exports = pages.map((page) => merge([productionConfig, page]))
