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
		filename: '[name].[chunkHash:8].js',
		library: '[name]'
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
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