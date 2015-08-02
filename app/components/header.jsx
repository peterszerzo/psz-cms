var React = require('react'),
	Buttons = require('./logos/buttons.jsx');

class Header extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.state.buttons = [
			{
				name: 'all',
				url: '/things?category=all'
			},
			{
				name: 'code',
				url: '/things?category=code'
			},
			{
				name: 'design',
				url: '/things?category=design'
			},
			{
				name: 'blog',
				url: '/things?category=blog'
			},
			{
				name: '..about',
				url: '/things/about'
			}
		];
	}

	getList() {
		var activeCategory = this.props.category;
		return this.state.buttons.reverse().map(function(button) {
			var isActive = (button.name === activeCategory),
				className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
			return (
				<li className={className}>
					<a href={ button.url }>{ button.name }</a>
				</li>
			);
		});
	}

	render() {
		return (
			<div className='header'>
				<a className='header__main-link' href='/'></a>
				<ul className='header__nav'>
					<li className='header__nav__arrow'>
						<Buttons.Arrow />
					</li>
					{this.getList()}
				</ul>
			</div>
		);
	}
	
}

module.exports = Header;