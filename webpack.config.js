require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

const basePath = __dirname;

const fromReactRoot = (dir) => path.join(basePath, 'src', 'react', dir);

module.exports = {
  context: path.join(basePath, 'src', 'react'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '~': fromReactRoot(''),
      assets: fromReactRoot('assets'),
      components: fromReactRoot('components'),
      pages: fromReactRoot('pages'),
      styles: fromReactRoot('styles'),
    }
  },
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    path: path.join(basePath, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build', // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 3000,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.join(basePath, 'tsconfig.webpack.json'),
          useBabel: true,
          babelCore: '@babel/core'
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
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new FriendlyErrorsPlugin()
  ]
}
