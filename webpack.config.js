const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "./js/client/index.js"),
  devtool: "source-map",
  output: {
    filename: "app.js",
    path: path.join(__dirname, "./dist"),
  },
  devServer: {
    historyApiFallback: true,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
