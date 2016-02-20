// Enable ES6.
require('babel-core/register');

// Load development environment variables.
if (process.env['NODE_ENV'] !== 'production') {
	try {
		require('dotenv').load();
	} catch(err) {
		console.log(err);
	}
}

// Require server.
require('./server/index.js');
