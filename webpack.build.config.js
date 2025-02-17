const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "zilong-monitor": path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./examples/index.html"),
      chunks: ["zilong-monitor"],
    }),
  ],
};
