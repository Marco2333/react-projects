const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: __dirname + "/app/index.js",
	output: {
		path: __dirname + "/public/script/",
		filename: "bundle.[chunkHash:8].js",
		chunkFilename: 'chunk/[name].[chunkHash:8].js',
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
				use: {
					loader: 'css-loader',
					options: {
						minimize: true //css压缩
					}
				}
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					'sass-loader'
				]
			})
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
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