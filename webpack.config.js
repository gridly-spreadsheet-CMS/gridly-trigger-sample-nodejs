const path = require("path");
const pkg = require("./package.json");
const webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const DIST_DIR = path.join(__dirname, "build"),
  CLIENT_DIR = path.join(__dirname, "");

module.exports = env => {
  return {
    context: CLIENT_DIR,
    target: "node",
    mode: "development",
    externals: [
      nodeExternals({ modulesDir: "node_modules", whitelist: [/core/] })
    ],
    entry: {
      server: "./src/index",
      _child_process: "./src/node_modules/core/tasks/_child_process.js"
    },
    output: {
      path: DIST_DIR,
      filename: "[name].js"
    },

    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "shebang-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: "./.env", to: ".", toType: "dir" },
        { from: "./resources", to: "./resources", toType: "dir" },
        { from: "./package.json", to: ".", toType: "dir" },
        { from: "./pm2.prod.json", to: ".", toType: "dir" },
        {
          from: "./google-cloud-text-to-speech-api-key.json",
          to: ".",
          toType: "dir"
        },
        { from: "./.env", to: ".", toType: "dir" }
      ]),
      new webpack.DefinePlugin({ VERSION: pkg.version })
    ]
  };
};
