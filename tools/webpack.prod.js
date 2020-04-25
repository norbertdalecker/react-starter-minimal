const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { paths, useDebugSymbols } = require("./config");

const base = require("./webpack.base");
const loaders = require("./loaders");

module.exports = Object.assign({}, base, {
  devtool: undefined,
  mode: "production",
  optimization: {
    runtimeChunk: 'single',
    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
        }
      }
    }
  },
  module: {
    rules: base.module.rules
  },
  plugins: base.plugins
    .concat([
      new CleanWebpackPlugin({
        root: process.cwd(),
        verbose: false
      }),
    ])
});
