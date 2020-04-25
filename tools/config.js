const path = require("path");
const appRoot = require("app-root-path");

function resolveAbsolute(...paths) {
  return path.resolve(appRoot.path, path.join(...paths));
}

// Paths
const app = "./src";
const build = "./dist";
const packageJson = "package.json";
const paths = {
  app,
  build,
  static: path.join(app, "assets", "static"),
  indexTs: path.join(app, "index.tsx"),
  indexHtml: path.join(app, "assets", "index.ejs"),
  packageJson
};

// Dev server
const port = 3000;
const host = process.env.HOST;
const devServer = {
  port,
  host,
  address: `http://${host}:${port}`
};

module.exports = {
  paths,
  devServer,
  useDebugSymbols: true,
  resolveAbsolute
};
