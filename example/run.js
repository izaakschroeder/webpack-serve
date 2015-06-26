
var server = require('../');
var express = require('express');
var http = require('http');
var webpack = require('webpack');

var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();

// Use other middleware as desired.
// app.use(...)

app.use(server(compiler, {

}));

server = http.createServer();

server.listen(options.port || 8080, function() {
	console.log('listening!');
});

// Start the watch process.
var watch = compiler.watch();
server.on('close', function() {
	watch.close();
});

// https://github.com/olahol/express-chrome-logger
