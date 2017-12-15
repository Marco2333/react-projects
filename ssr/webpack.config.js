module.exports = [
	{
		devtool: 'cheap-module-eval-source-map',
		entry: __dirname + '/app/entry.js',
		output: {
			path: __dirname + "/public/",
			filename: "bundle.js"
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}]
		}
	}, {
		devtool: 'cheap-module-eval-source-map',
		entry: __dirname + '/server/page.js',
		output: {
			path: __dirname + "/server/",
			filename: "page.bundle.js",
			library: 'page',
			libraryTarget: 'commonjs'
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}]
		}
	}
]