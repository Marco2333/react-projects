const webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/src/index.js",
	output: {
		path: __dirname + "/public",
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json')
		})
	]
}