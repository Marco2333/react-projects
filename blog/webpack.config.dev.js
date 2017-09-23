const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: __dirname + "/app/index.js",
	output: {
		path: __dirname + "/public/script/",
		filename: "bundle.js",
		chunkFilename: 'chunk/[name].chunk.js',
		publicPath: '/script/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=40000'
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin("../style/style.css", {
			allChunks: true
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json')
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		})
	]
}