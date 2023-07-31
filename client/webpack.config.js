const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Adding and configuring workbox plugins for a service worker and manifest file
const WorkboxPlugin = require("workbox-webpack-plugin");

//Adding CSS loaders and babel to webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Adding new HtmlWebpack plugin
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      //Adding new CssExtract plugin
      new MiniCssExtractPlugin(),
      //Adding a new WebpackPwa plugin
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Take notes with Javascript syntax highlighting!",
        theme_color: "#225aca3",
        background_color: "#225ca3",
        start_url: '/',
				publicPath: '/',
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      //Adding a new InjectManifest plugin
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    module: {
      rules: [
        //Adding rule to css loader
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        //Adding rule to babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            }
          }}
        ]
    },
  }};