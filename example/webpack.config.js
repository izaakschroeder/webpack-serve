
var path = require('path');
var webpack = require('webpack');

var root = process.cwd();

module.exports = [{
	entry: {
		server: [
			'./lib/server',
			'webpack/hot/signal?hot-module-update'
		]
	},
	node: {
		__dirname: true,
		__filename: true
	},
	module: {
		loaders: [{
			name: 'json5',
			test: /\.json5?$/,
			loader: 'json5'
		}]
	},
	target: 'node',
	context: root,
	output: {
		publicPath: '/',
		filename: '[name].[hash].js',
		path: path.join(root, 'build', 'server'),
		chunkFilename: '[id].[hash].js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}, {
	entry: {
		client: [
			'./lib/client',
			'webpack/hot/dev-server-only'
		]
	},
	node: {
		__dirname: true,
		__filename: true
	},
	target: 'web',
	context: root,
	output: {
		publicPath: '/assets',
		filename: '[name].[hash].js',
		path: path.join(root, 'build', 'client'),
		chunkFilename: '[id].[hash].js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}]
