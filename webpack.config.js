const path = require("path");
var webpack = require("webpack");

const config = function (mode) {
  let conf = {
    mode: "development",
    entry: ["./src/index.js"],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"],
            },
          },
        },
        {
          test: /\.html$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "html-loader",
            options: {},
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "public/bundle/"),
      filename: "bundle.js",
      publicPath: "/",
    },
    plugins: [],
    devServer: {
      watchOptions: {
        ignored: /node_modules/,
      },
      contentBase: "public",
      compress: true,
      hot: true,
      port: 3001,
    },
  };

  if (mode === "development") {
    conf.plugins.push(new webpack.HotModuleReplacementPlugin());
    conf.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  return conf;
};

module.exports = config(process.env.NODE_ENV);
