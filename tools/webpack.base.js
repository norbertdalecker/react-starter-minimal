const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ForkChecker = require("fork-ts-checker-webpack-plugin");

const manifest = require("../src/assets/manifest");
const { paths, useDebugSymbols, resolveAbsolute } = require("./config");
const loaders = require("./loaders");

module.exports = {
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  },
  entry: {
    app: [resolveAbsolute(paths.indexTs)]
  },
  output: {
    path: resolveAbsolute(paths.build),
    crossOriginLoading: "anonymous",
    publicPath: '',
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    modules: ["node_modules", resolveAbsolute(paths.app)]
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.((tsx?)|js)$/,
        use: loaders.ts
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: "file-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|webm)$/i,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new CopyPlugin([{ from: paths.static }]),
    new HtmlPlugin({
      inject: false,
      template: paths.indexHtml,
      meta: [
        {
          name: "description",
          content: manifest.description
        }
      ],
      title: manifest.name
    }),
    new ForkChecker({
      tslint: true,
      async: true,
      logger: {
        info() {},
        warn: console.warn,
        error: console.error
      },
    })
  ]
};
