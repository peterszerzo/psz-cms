var path = require('path'),
	webpack = require('webpack'),
	CompressionPlugin = require('compression-webpack-plugin');

var productionPlugins = [
	new webpack.optimize.UglifyJsPlugin({
		mangle: {
			except: [ '$super', '$', 'exports', 'require' ]
		}
	}),
	new CompressionPlugin()
];

var NODE_ENV = process.env.NODE_ENV;

module.exports = {

	entry: './theme/src/assets/scripts/bundle.js',

	output: {
		path: path.resolve('./public/scripts'),
		publicPath: 'http://localhost:3001/',
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.js.map'
	},

	module: {

		loaders: [

			{
				test: /(\.js)|(\.jsx)$/,
				loader: 'babel-loader',
				query: { presets: [ 'es2015', 'react', 'stage-0' ] },
				exclude: /node_modules/
			},

			{
				test: /\.json$/,
				loader: 'json-loader'
			},

			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			},

			{
				test: /\.elm$/,
				loader: 'elm-webpack'
			}

		]
	},

	noParse: /\.elm$/,

	devtool: NODE_ENV === 'development' ? 'source-map' : null,

	plugins: NODE_ENV === 'development' ? null : productionPlugins

}
