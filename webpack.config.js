const path = require("path");
const webpack = require("webpack");

const libraryName = "react-hook-state-machine";

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
    filename: libraryName + ".js",
    path: path.resolve(__dirname, "dist"),
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  plugins: [new webpack.IgnorePlugin(/.*test.*/)],
  externals: ["react"],
}));
