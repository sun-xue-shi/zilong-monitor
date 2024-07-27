const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "zilong-monitor": path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [new CleanWebpackPlugin()],
};
