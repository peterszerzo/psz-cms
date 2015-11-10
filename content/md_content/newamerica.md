New America is a vibrant think-tank that is very much interested in technology - and as such, deserves the very best in interactive web tools. I currently lead coding efforts and contribute to design and UX to make this happen.

The beating heart of my work is [Atlas](http://atlas.newamerica.org), a new data visualization and presentation tool. It delivers the Education Policy Program's carefully collected and synthesized data to policymakers, other analysts and the general public in a beautiful, clear, highly interactive format. Its back-end allows policy analysts to create custom interactive maps and charts without coding.

I am using the core codebase from Atlas to develop the [2014 annual report](http://2014.newamerica.org), [the New America intranet](http://my.newamerica.org), while also doing some consultation and front-end bug fixes on the organization's [main site](https://www.newamerica.org/) on the side. These are busy, exciting, fun times with a whole lot of learning.

# Technology

Atlas is a native web/single-page application powered by Express.js. It is very close to becoming a fully isomorphic application, with Backbone.js data models and React.js components shared by the client and the server.

Data visualization and interactive mapping components are handled by the very capable d3.js and Leaflet.js. We've figured out some [nice ways](/blog/scaling-tricks-for-geo) to integrate these libraries into our client-side codebase.

# History

The codebase has come a long way, included a whole lot of fun, learning and intensity. Here are some of the highlights:

## November 2014

We brainstormed on the scope of the platform and made decisions on the technology stack used for prototyping. Ruby on Rails 4.2, Backbone.js and Marionette.js 2.3 are the winners.

## December 2014

The home page and the projects listings page is built out as a single-page app using Marionette.js.

An initial [heatmap](http://atlas.newamerica.org/mapping-college-readiness) and [pindrop](http://atlas.newamerica.org/tech-early-literacy) map templates are built out using vanilla JavaScript modules. The following starts showing up all over the place:

	var Atlas.SomeMappingModule = function() {
		
		var self = {};

		// Add event emitting, handling and listening capabilities.
		_.extend(self, Backbone.Events);

		var privateMethod = function() {};

		self.listenTo(babyBrother, 'i:m:hungry', function() {});

		self.trigger('real nice');

		self.publicMethod = function() {};

		// Initialize and star the app.
		self.start = function() {

		};

		// Tear down, clean up event listeners and all dom nodes generated by the module.
		self.stop = function() {
			self.stopListening();
		};

		return self;

	};



## February 2015

All parts of the application enter the framework of Marionette.js modules. The heavily used global messaging system decouples modules further. Development goes on in a comfortable pace.

## May 2015

The public-facing portion of the site moves to Express.js, while the back-end stays on Rails. This provides a significant performance boost. In preparation for the June launch, the codebase is cleaned, gulped, gzipped, and dreamed about over the course of several days.

## June 2015

The [first interactive map](http://atlas.newamerica.org/mapping-college-readiness) is shown in public at an event, attended also by Delaware's governor. The site behaves glitch-free, and the program is very happy.

With time on our hands once more, we think about high-level improvements: isomorphic models would simplify data API code, better SEO is needed, Backbone Views are a pain to work with. Luckily, our competent intern Jessica has been making progress prototyping React.js components for the back-end, an endeavour that encouraged us to finally switch technologies.

## July 2015

75% of the site moves away from Backbone Views to React.js components, keeping Marionette.js' global messaging system.

## August 2015

All Marionette modules move over to React. We learn an important lesson: React encourages more encapsulation, crystal-clear data flow and simpler messaging patterns than Marionette's modules. This is not to say the same is not possible in Marionette, it's just more tempting to take shortcuts that introduce wild couplings, shortcuts of which we discovered a few. The plan becomes to use Marionette more sparingly and only as a global messaging system.

There is another lesson another step further back: updating technologies - especially to the ones we like - does wonders to code quality. Feeling motivated to keep doing that as frequently as possible.

## September 2015

The codebase is moved to ES6 code, bundled with Browserify and accessed in a single entry point on the client.

The back-end is revamped using custom, reusable React form components. Things start to resemble an extractable, single-page CMS.