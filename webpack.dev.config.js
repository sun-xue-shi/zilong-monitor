const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "zilong-monitor": path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    compress: true,
    hot: true,
    port: 9000,
  },
  plugins: [
    //清掉dist目录的文件
    new CleanWebpackPlugin(),
    //在dist文件夹下生成内容为template的文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./examples/index.html"),
      chunks: ["zilong-monitor"],
    }),
  ],
};
