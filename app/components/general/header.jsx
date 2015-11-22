import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as Buttons from './buttons.jsx'


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
class Header extends Component {

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
	render() {
		var { windowHeight, scrollTop } = this.props.app.ui
		var { pathname } = this.props.router.location
		var isDiscrete = ([ '/projects', '/blog' ].indexOf(pathname) === -1) && (windowHeight > scrollTop)
		
		var cls = classNames({
			'header': true,
			'header--discrete': isDiscrete,
			'header--expanded': this.state.isExpanded
		})
		var opacity = this.props.router.location.pathname === '/' ? '0' : '1'
		return (
			<div className={ cls } style={{ opacity: opacity }}>
				<Link className='header__main-link' to='/'>
					<Buttons.BackToMain />
				</Link>
				<ul className='header__nav'>
					<li className='header__nav__arrow' onClick={this.toggleExpandedState.bind(this)}>
						<Buttons.Arrow />
					</li>
					{this.renderList()}
				</ul>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	renderList() {
		var { activeLinkName } = this.props
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
	toggleExpandedState() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}
	
}


export default connect(state => ({ 
	router: state.router,
	app: state.app
}))(Header)