/** @jsx React.DOM */

var React = require('react'),
	Header = require('./header.jsx'),
	Projects = require('./projects.jsx');

var routes = {
	'projects': {
		component: <Projects.List />,
		propKey: 'items',
		propValueDataUrl: '/api/v1/projects'
	},
	'projects/:id': {
		component: <Projects.Show />,
		propKey: 'itemData',
		propValueDataUrl: '/api/v1/projects/:id'
	}
};

var Layout = React.createClass({

	render: function() {
		<div>
			<Header />
			{ this.getRoutable() }
		</div>
	},

	getRoutable: function() {

	}

});