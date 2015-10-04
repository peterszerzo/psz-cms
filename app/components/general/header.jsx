import React from 'react';
import Buttons from './buttons.jsx';
import { Link } from 'react-router';

class Header extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.state.buttons = [
			{
				name: 'projects',
				url: '/projects'
			},
			{
				name: 'blog',
				url: '/blog'
			},
			{
				name: 'about',
				url: '/about'
			}
		].reverse();

	}

	getList() {
		var activeType = this.props.type;
		return this.state.buttons.map(function(button, index) {
			var isActive = (activeType && (button.name === activeType || button.name.slice(0, -1) === activeType)),
				className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
			return (
				<li className={className} key={index} >
					<Link to={button.url}>{ button.name }</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div className='header'>
				<Link className='header__main-link' to='/'>
					<Buttons.BackToMain />
				</Link>
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

Header.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Header;