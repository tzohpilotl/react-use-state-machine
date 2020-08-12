const path = require("path");
const webpack = require("webpack");

module.exports = ["source-map"].map((devtool) => ({
  devtool,
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
        exclude: /__tests__/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "useStateMachine",
    libraryTarget: "umd",
  },
  plugins: [new webpack.IgnorePlugin(/.*test.*/)],
  optimization: {
    runtimeChunk: true,
  },
  externals: ["react"],
}));
