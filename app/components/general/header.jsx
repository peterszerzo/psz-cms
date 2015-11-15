import React, { Component } from 'react'
import classNames from 'classnames'
import Buttons from './buttons.jsx'
import { Link } from 'react-router'

var buttons = [
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


/*
 *
 *
 */
class HeaderComp extends Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		}
	}


	/*
	 *
	 *
	 */
	getList() {
		var { activeLinkName, buttons } = this.props
		return buttons.map(function(button, index) {
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
		var cls = classNames({
			'header': true,
			'header--transparent': this.props.isTransparent,
			'header--expanded': this.state.isExpanded
		})
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


export class Header extends Component {

	render() {
		return <HeaderComp {...this.props} buttons={buttons} />
	}

}