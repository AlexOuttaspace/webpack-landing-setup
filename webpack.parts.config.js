const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude,
        include,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  'module-resolver',
                  {
                    root: ['./'],
                    alias: {
                      src: './src'
                    }
                  }
                ]
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true
            }
          }
        ]
      }
    ]
  }
})

exports.extractCSS = ({ include, exclude } = {}) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:4].css'
  })

  return {
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                root: path.resolve(__dirname, './')
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [plugin]
  }
}

exports.loadFavicons = () => ({
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './favicon/favicon.png',
      prefix: 'icons-[hash:4]/',
      persistentCache: true,
      inject: true,
      background: '#fff',
      emitStats: false,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        windows: false,
        yandex: false
      }
    })
  ]
})

exports.loadImages = ({ include, exclude } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|webp)$/,
          include,
          exclude,
          oneOf: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000,
                name: '[name].[hash:4].[ext]'
              }
            },
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[hash:4].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
}

exports.loadSVG = ({
  include,
  exclude,
  optimize = true,
  limit = 8000,
  outputPath = 'assets/images'
} = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/,
          include,
          exclude,
          use: optimize
            ? [
                {
                  loader: 'url-loader',
                  options: {
                    limit,
                    outputPath,
                    name: '[name].[hash:4].[ext]'
                  }
                },
                {
                  loader: 'svgo-loader',
                  options: {
                    plugins: [
                      { removeTitle: true },
                      { convertColors: { shorthex: false } },
                      { convertPathData: false }
                    ]
                  }
                }
              ]
            : [
                {
                  loader: 'url-loader',
                  options: {
                    limit,
                    outputPath,
                    name: '[name].[hash:4].[ext]'
                  }
                }
              ]
        }
      ]
    }
  }
}

exports.loadHtml = ({ include, exclude } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          include,
          exclude,
          use: {
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, './'),
              interpolate: true
            }
          }
        }
      ]
    }
  }
}

exports.loadFonts = ({ include, exclude } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(otf|ttf|eot|woff|woff2)$/,
          include,
          exclude,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 25000,
                outputPath: 'assets/fonts',
                name: '[name].[hash:4].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
}

exports.page = ({
  js,
  css,
  name,
  html = require.resolve('html-webpack-plugin/default_index.ejs'),
  optimize
}) => {
  const entry = {}

  if (js) entry.js = path.join(__dirname, js)
  if (css) entry.css = path.join(__dirname, css)

  const filename = name === 'index' ? 'index.html' : `${name}/index.html`

  return {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js'
    },
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: html,
        excludeAssets: [/css.*.js/],
        filename,
        minify: optimize
          ? {
              collapseWhitespace: true,
              removeComments: false
            }
          : false
      }),
      new HtmlWebpackExcludeAssetsPlugin()
    ]
  }
}

exports.uglifyJavascript = () => ({
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true
      })
    ]
  }
})
