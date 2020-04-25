const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const { devServer, paths, useDebugSymbols } = require("./config");

const base = require("./webpack.base");
const loaders = require("./loaders");

module.exports = Object.assign({}, base, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  performance: false,
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },
  output: {
    ...base.output,
    pathinfo: false
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: paths.build,
    port: devServer.port,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      children: false,
      modules: false,
      reasons: false,
      warnings: true,
      assets: false,
      version: false
    }
  },
  module: {
    rules: base.module.rules
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new CaseSensitivePathsPlugin(),
  ]
});
