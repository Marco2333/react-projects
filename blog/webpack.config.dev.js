const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/index.js",
    output: {
        path: __dirname + "/public/script/",
        filename: "bundle.js",
        chunkFilename: 'chunk/[name].chunk.js',
        publicPath: '/script/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.scss$/i,
                include: path.resolve(__dirname, "./app/"),
                loader: "style-loader!css-loader!sass-loader"
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=40000'
            }, {
				test: require.resolve('syntaxhighlighter/src/index.js'), 
				loader: 'exports-loader?this.SyntaxHighlighter'
			}
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({context: __dirname, manifest: require('./manifest.json')}),
        new webpack
            .optimize
            .CommonsChunkPlugin({name: ' common', filename: 'common.js'}),
        new ExtractTextPlugin("style.css")//提取出来的样式放在style.css文件中
    ]
}