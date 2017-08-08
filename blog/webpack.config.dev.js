const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-eval-source-map',
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
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../style/style.css"), 
        new webpack.DllReferencePlugin({context: __dirname, manifest: require('./manifest.json')}),
        new webpack.optimize.CommonsChunkPlugin({name: ' common', filename: 'common.js'})
    ]
}