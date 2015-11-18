var path = require('path'),
	webpack = require('webpack');

module.exports = {

	entry: './app/assets/scripts/bundle.js',

	output: {
		path: path.resolve('./public/scripts'),
		publicPath: 'http://localhost:3000/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
		
			{
				test: /(\.js)|(\.jsx)$/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react', 'stage-0' ]
				}
			},

			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			}

		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: [ '$super', '$', 'exports', 'require' ]
			}
		})
	]

}