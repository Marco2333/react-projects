const webpack = require('webpack');

const vendors = [
	'react',
	'redux',
	'react-dom',
	'react-redux',
	'redux-thunk',
	'react-router',
	'react-router-redux'
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