const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const express = require('express');
const path =  require('path');

const server = new WebpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, './public'),
    publicPath: path.resolve(__dirname, config.output.publicPath),
    proxy: config.devServer.proxy,
    hot: true,
    historyApiFallback: true,
});
server.listen(8080, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});
