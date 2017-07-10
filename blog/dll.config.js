const webpack = require('webpack');

const vendors = [
	'react',
	'redux',
	'react-dom',
	'react-redux',
	'react-bootstrap'
];

module.exports = {
	output: {
		path: __dirname + '/public/script',
		filename: '[name].js',
		library: '[name]'
	},
	entry: {
		lib: vendors
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