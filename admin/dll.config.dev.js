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
		filename: '[name].js',
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]',
			context: __dirname
		})
	]
}