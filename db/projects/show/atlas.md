[Atlas](http://atlas.newamerica.org) is a new policy analysis tool for the New America Foundation's Education Policy Program. It aims to deliver education-related data collected by the program to policymakers, analysts and the general public in a beautiful, clear, highly interactive format. Topics include student loans, innovative educational initiatives nationwide, career readiness policies.

Atlas also features a back-end that allows policy analysts to create interactive projects without coding. We do a lot of really fun experimentation on how to enhance this experience.

I serve this effort as a lead developer.

# Technology

Atlas is a native web application powered by Express.js. It is on its way to becoming a fully isomorphic application, the final goal being that all Backbone.js data models and React.js components are shared by the client and the server.

Data visualization and interactive mapping components are handled by the very capable d3.js and Leaflet.js. We've figured out some [nice ways](/things/scaling-tricks-for-geo) to integrate these libraries into our client-side codebase.

# History

The codebase has come a long way, and its journey deserves a few words.

## November 2014

We brainstormed on the scope of the platform and made decisions on the technology stack used for prototyping. Ruby on Rails 4.2, Backbone.js and Marionette.js 2.3 are the winners.

## December 2014

The home page and the projects listings page is built out as a single-page app using Marionette.js.

An initial heatmap and pindrop map templates are built out using vanilla JavaScript modules. The following starts showing up all over the place:

	var Atlas.SomeMappingModule = function() {
		
		var self = {};

		_.extend(self, Backbone.Events);

		var privateMethod = function() {};

		self.listenTo(babyBrother, 'i:m:hungry', function() {});

		self.trigger('real nice');

		self.publicMethod = function() {};

		return self;

	};



## February 2015

All parts of the application enter the framework of Marionette.js modules. The heavily used global messaging system decouples modules further. Development goes on in a comfortable pace.

## May 2015

Leaving the Rails project creation platform behind, the public-facing portion of the site moves to Express.js. This provides a significant performance boost.

In preparation for the June launch, the codebase is cleaned, gulped, gzipped, and dreamed about over the course of several days.

## June 2015

The site launches and things look pretty successful. The debut of the first map happens with the presence of Delaware's governor.

With time on the relaxed developer's hand once more, high-level improvements are dabbled with: isomorphic models would simplify data API code, better SEO is needed, Backbone Views are a pain.

Luckily, our competent intern Jessica has been making progress prototyping React.js components for the back-end, an endeavour that encouraged us to finally switch technologies.

## July 2015

75% of the site moves away from Backbone Views to isomorphic React.js components, keeping Marionette.js' global messaging system.

## August 2015

All Marionette modules move over to React. We learn an important lesson: React encourages more encapsulation, better defined data flow direction and simpler to follow messaging patterns than Marionette's modules. The plan becomes to use Marionette more sparingly, but not eliminate it completely.

Taking a step back, we learn another important lesson: updating technologies does wonders to code quality. Feeling motivated to keep doing that as frequently as possible.