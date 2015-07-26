/** @jsx React.DOM */

var React = require('react');

var data = [ 
	{ url: '/things?category=code', name: 'mindful code' },  
	{ url: '/things?category=design', name: 'minimal design' }
];

var Home = React.createClass({

	render: function() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					{ this.renderList() }
				</ul>
				<div className="banner__notice"></div>
			</div>
		);
	},

	renderList: function() {
		return data.map(function(item) {
			return (
				<li>
					<a href={item.url}>{item.name}</a>
				</li>
			);
		});
	}

});

module.exports = Home;