module.exports = {

	entry: './app/assets/scripts/bundle.js',

	output: {
		path: './public/scripts/bundle.js',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
		
			{
				test: '',
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react' ]
				}
			},

			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			}

		]
	}

}