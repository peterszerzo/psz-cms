[Atlas](http://atlas.newamerica.org) is a new policy analysis tool for the New America Foundation's Education Policy Program. It aims to deliver education-related data collected by the program to policymakers, analysts and the general public in a beautiful, clear, highly interactive format. Topics include student loans, innovative educational initiatives nationwide, career readiness policies.

I currently serve this effort as a lead developer.

# Current Technology

Atlas is a native web application powered by Express.js. It is 80% of the way to becoming a fully isomorphic application, the final goal being that all Backbone.js data models and React.js components (controller-views) are shared by the client and the server. Data visualization and interactive mapping components are handled by the very capable d3.js and Leaflet.js. We've figured out some [nice ways](/things/scaling-tricks-for-geo) of integrate these libraries into our existing codebase.

# History

The codebase has come a long way, and its evolution deserves a few words.

## November 2014

We brainstormed on the scope of the platform and made decisions on the technology stack used for prototyping. Ruby on Rails 4.2, Backbone.js and Marionette.js 2.3. are the winners.

## December 2014

The home page and the projects listings page is built out as a single-page app using Marionette.js.

An initial heatmap and pindrop map templates are built out using vanilla JavaScript modules. The initial setup is fairly highly coupled.

## February 2015

All parts of the application enter the framework of Marionette.js modules. The heavily used global messaging system decouples modules. Development goes on in a comfortable pace.

## May 2015

Leaving the Rails project creation platform behind, the public-facing portion of the site moves to Express.js.

## June 2015

The site launches and things look pretty successful. With time on the developer's hand once more, high-level improvements are dabbled with: isomorphic models would simplify data API code, better SEO is needed, Backbone Views are a pain.

## July 2015

80% of the site moves away from Backbone Views to isomorphic React.js components, keeping Marionette.js' global messaging system as a crotch.