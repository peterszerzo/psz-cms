var routes = {

	'/': {

		matcher: '/',
		routableSubcomponentClassName: 'Banner',
		routableSubcomponentProps: {}

	},

	'/things': {

		matcher: '/things',
		routableSubcomponentClassName: 'Projects.Index',
		routableSubcomponentProps: [

			{
				key: 'projects',
				query: {},
				dataUrl: function(req) {
					return '/api/v1/projects' + '?' + req.params.id;
				},
				shouldCache: true,
				cacheKey: 'projects'
			},

			{
				key: 'categories',
				query: {},
				dataUrl: '/api/v1/categories',
				shouldCache: true,
				cacheKey: 'categories'
			},

			{
				key: 'category',
				value: function(req) { return req.query.category || 'all'; }
			}

		]

	},

	'/things/:id': {

		matcher: '/things:id',
		routableSubcomponentClassName: 'Projects.Show',
		routebleSubcomponentProps: {

			'categories': {
				dataUrl: '/api/v1/categories'
			},

			'project': {
				dataUrl: function(req) {
					return '/api/v1/projects/' + req.params.id;
				}
			}

		}

	}

};

module.exports = routes;