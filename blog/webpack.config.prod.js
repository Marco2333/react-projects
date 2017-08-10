const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                            minimize: true //css压缩
                        }
                    },
                    'sass-loader'
                ]
            })
        }]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("../style/style.css")，
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common'],
            minChunks: 2
        })
    ]
}