"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "jquery" ],
        nmr: ["webpack-dev-server/client?http://localhost:8080",
              "webpack/hot/only-dev-server",
              "./nmr/index.js",
              "./nmr/resource/index.less" ]
    },

    output: {
        path: path.resolve("./assets"),
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ],

    devServer:
    {
        /* transit proxy 可以解决跨域请求的问题 将浏览器的请求经服务器发给target/
            referer 实现认为网易自己的域
        */
        proxy: {
            '/api/**': {
                target: {
                    host: "music.163.com",
                    protocol: "http:",
                    port: 80
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false,
                headers: {
                    "Referer": "http://music.163.com"
                }
            }
        }
    }
};
