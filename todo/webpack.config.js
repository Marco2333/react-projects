const webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/src/index.js",
	output: {
		path: __dirname + "/public",
		filename: 'bundle.js'
	}
}