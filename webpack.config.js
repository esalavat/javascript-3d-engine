const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  }
};