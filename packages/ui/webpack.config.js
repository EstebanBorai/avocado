const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const basePath = __dirname

const src = (dir) => path.join(basePath, 'src', dir)

module.exports = {
  context: path.join(basePath, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(basePath, 'build'),
    filename: 'bundle.js'
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    inline: true,
    host: 'localhost',
    port: 3000,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': src(''),
      assets: src('assets'),
      components: src('components'),
      constants: src('constants'),
      context: src('context'),
      hooks: src('hooks'),
      service: src('service'),
      styles: src('styles'),
      utils: src('utils'),
      views: src('views'),
    }
  }
}
