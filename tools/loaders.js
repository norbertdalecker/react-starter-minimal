const ts = [
  {
    loader: "babel-loader",
    options: {
      cacheDirectory: true
    }
  },
  {
    loader: "ts-loader",
    options: {
      transpileOnly: true,
      experimentalWatchApi: true
    }
  }
];

module.exports = {
  ts
};
