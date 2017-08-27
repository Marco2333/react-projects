const webpack = require('webpack');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: 'css-loader'
				// })
				loader: 'style-loader!css-loader'
            }, {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader']
				// })
				loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("../style/style.css"),  
		new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
		})
    ]
}