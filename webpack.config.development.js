var path = require('path'),
	webpack = require('webpack');

module.exports = {

	entry: './app/assets/scripts/bundle.js',

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
				exclude: /node_modules/,
				query: {
					presets: [ 'es2015', 'react', 'stage-0' ]
				}
			},

			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			},

			{
				test: /\.elm$/,
				exclude: [ /elm-stuff/, /node_modules/ ],
				loader: 'elm-webpack'
			}

		]
	},

	noParse: /\.elm$/,

	devtool: 'source-map'

}