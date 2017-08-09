const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: __dirname + "/app/index.js",
		vendor: ['react', 'react-dom', 'redux', 'redux-thunk', 
				'react-router', 'react-redux', 'react-router-redux']
    },
   	output: {
		path: __dirname + "/public/script/",
		filename: "[name].js",
		chunkFilename: 'chunk/[name].chunk.js',
		publicPath: '/script/'
	},
    module: {
        rules: [
            {
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../style/style.css"), 
        // new webpack.optimize.CommonsChunkPlugin({
		// 	names: ['vendor', 'manifest']
		// })
		new webpack.optimize.CommonsChunkPlugin({
			// name: 'manifest',
			// chunks: ['bundle', 'vendor']
			// name: ["chunk",'common']
			name: ["chunk", 'lib','vendor'],//对应于上面的entry的key
            minChunks:2
		})
    ]
}