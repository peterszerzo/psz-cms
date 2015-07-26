/** @jsx React.DOM */

var React = require('react');

var Header = React.createClass({

	getList: function() {
		var activeCategory = this.props.category;
		return [ 'all', 'code', 'design', 'blog' ].map(function(category) {
			var isActive = (category === activeCategory),
				className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
			return (
				<li className={className}>
					<a href={ '/things' + '?category=' + category }>{category}</a>
				</li>
			);
		});
	},

	render: function() {
		return (
			<div className='header'>
				<a className='header__main-link' href='/'>PSZ</a>
				<ul className='header__nav'>
					{this.getList()}
				</ul>
			</div>
		);
	}
	
});

module.exports = Header;