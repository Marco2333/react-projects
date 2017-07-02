const webpack = require('webpack');

var prod = process.env.NODE_ENV === 'production' ? true : false;


module.exports = {
	entry: __dirname + "/app/index.js",
	output: {
		path: __dirname + "/public/script/",
		filename: "bundle.js",
		chunkFilename: 'chunk/[name].chunk.js',
		publicPath: '/script/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_mdodules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js'
		})
	]
}

if (!prod) {
	module.exports.devtool = 'eval-source-map';
}