/** @jsx React.DOM */

var React = require('react'),
	Banner = require('./banner.jsx'),
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

	renderBanner: function() {
		return (<Banner />);
	},

	renderProjectsIndex: function() {
		return (
			<div>
				<Header categories={this.props.categories} activeCategory={this.props.activeCategory} />
				<Projects.List projects={this.props.projects} />
			</div>
		);
	},

	renderProjectsShow: function() {
		return (
			<div>
				<Header categories={this.props.categories} activeCategory={this.props.activeCategory} />
				<Projects.Show projects={this.props.projects} />
			</div>
		);
	}

});