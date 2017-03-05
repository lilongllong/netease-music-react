const compression = require('compression');
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

app.use(compression());
app.use(express.static('public'));
app.use('/api/*', httpProxy({
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
}));

app.listen(8080, () => {
    console.log(`net-ease-music-app is running at port: 8080 in server end...`);
});
