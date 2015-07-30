/** @jsx React.DOM */

var React = require('react');

var data = [ 
	{ url: '/things?category=code', name: 'mindful code' },  
	{ url: '/things?category=design', name: 'minimal design' }
];

var Banner = React.createClass({

	render: function() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					{ this._renderList() }
				</ul>
				<div className="banner__notice"></div>
			</div>
		);
	},

	getInitialState: function() {
		return {
			data: [ 
				{ url: '/things?category=code', name: 'mindful code' },  
				{ url: '/things?category=design', name: 'minimal design' }
			]
		};
	},

	_renderList: function() {
		return this.state.data.map(function(item) {
			return (
				<li>
					<a href={item.url}>{item.name}</a>
				</li>
			);
		});
	},

	componentDidMount: function() {
		psz.globe('.banner__globe', 'geo.json').start();
	},

	componentWillUnmount: function() {
		psz.globe('.banner__globe', 'geo.json').stop();
	}

});

module.exports = Banner;