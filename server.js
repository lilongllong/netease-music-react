const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');


const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: config.devServer.proxy,
    hot: true,
    historyApiFallback: true,
}).listen(8080, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});
