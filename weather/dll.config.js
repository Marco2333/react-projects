const path = require('path');
const webpack = require('webpack');

const vendors = [
	'react',
	'redux',
	'react-dom',
	'react-redux'
];

module.exports = {
	output: {
		path: path.resolve(__dirname, './public/script/'),
		filename: '[name].js',
		library: '[name]'
	},
	entry: {
		"lib": vendors
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]',
			context: __dirname
		})
	]
}