/** @jsx React.DOM */

var React = require('react');

var data = [ 
	{ url: '/code', name: 'mindful code' },  
	{ url: '/design', name: 'minimal design' },
	{ url: '/blog', name: 'blog' }
];

var Home = React.createClass({

	render: function() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					{ this.renderList() }
				</ul>
				<div className="banner__notice">.. Coming Soon ..</div>
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