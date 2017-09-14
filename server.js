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
    colors: true,
    host: '127.0.0.1',
    open: true,
    inline: true,
});
server.listen(8080, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});
