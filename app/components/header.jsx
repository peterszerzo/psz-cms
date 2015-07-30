var React = require('react');

class Header extends React.Component {

	getList() {
		var activeCategory = this.props.category;
		return [ 'all', 'code', 'design', 'blog', '..about' ].map(function(category) {
			var isActive = (category === activeCategory),
				className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
			return (
				<li className={className}>
					<a href={ '/things' + '?category=' + category }>{category}</a>
				</li>
			);
		});
	}

	render() {
		return (
			<div className='header'>
				<a className='header__main-link' href='/'></a>
				<ul className='header__nav'>
					{this.getList()}
				</ul>
			</div>
		);
	}
	
}

module.exports = Header;