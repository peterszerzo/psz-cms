import React from 'react';
import Buttons from './buttons.jsx';
import { Link } from 'react-router';

class Header extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		}
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
		].reverse()

	}


	/*
	 *
	 *
	 */
	getList() {
		var { activeLinkName } = this.props
		return this.state.buttons.map(function(button, index) {
			var isActive = (activeLinkName && (button.name === activeLinkName)),
				className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
			return (
				<li className={className} key={index} >
					<Link to={button.url}>
						{ button.name }
					</Link>
				</li>
			)
		})
	}


	/*
	 *
	 *
	 */
	render() {
		var cls = 'header';
		if (this.props.isTransparent) { cls += ' header--transparent' }
		if (this.state.isExpanded) { cls += ' header--expanded' }
		return (
			<div className={ cls }>
				<Link className='header__main-link' to='/'>
					<Buttons.BackToMain />
				</Link>
				<ul className='header__nav'>
					<li className='header__nav__arrow' onClick={this.toggleExpandedState.bind(this)}>
						<Buttons.Arrow />
					</li>
					{this.getList()}
				</ul>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	toggleExpandedState() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}
	
}

export default Header