/** @jsx React.DOM */

var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<div className='header'>
				<a className='header__main-link' href='/'>PSZ</a>
				<ul className='header__nav'>
					<li>
						<a href="/">code</a>
					</li>
					<li> 
						<a href="/">design</a>
					</li>
					<li> 
						<a href="/">blog</a>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = Header;