const webpack = require('webpack');

const vendors = [
	'react',
	'react-dom',
	'react-router'
];

module.exports = {
	entry: {
		lib: vendors
	},
	output: {
		path: __dirname + '/public/script',
		filename: '[name].[chunkHash:8].js',
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]',
			context: __dirname
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		})
	]
}