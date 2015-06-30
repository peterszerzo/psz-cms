/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({

	render: function() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					<li>
						<a href="/code">mindful code</a>
					</li>
					<li>
						<a href="/design">minimal design</a>
					</li>
					<li>
						<a href="/blog">blog</a>
					</li>
				</ul>
				<div className="banner__notice">.. Coming Soon ..</div>
			</div>
		);
	}

});

module.exports = Home;