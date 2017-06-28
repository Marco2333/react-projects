const webpack = require('webpack');

var prod = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
	'entry': __dirname + '/app/index.js',
	'output': {
		path: __dirname + "/public/script",
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader?module'
		}]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json')
		})
	]
}

if (!prod) {
	module.exports.devtool = 'eval-source-map';
}