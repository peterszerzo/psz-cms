/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({

	render: function() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					<li>
						<a href="https://github.com/pickled-plugins" target="_blank">mindful code</a>
					</li>
					<li>
						<a href="https://www.etsy.com/shop/dchisel" target="_blank">minimal design</a>
					</li>
					<li>
						<a href="https://github.com/pickled-plugins/scaling-tricks-for-geo" target="_blank">blog</a>
					</li>
				</ul>
				<div className="banner__notice"></div>
			</div>
		);
	}

});

module.exports = Home;