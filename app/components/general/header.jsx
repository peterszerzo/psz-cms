import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { BackToMain, Falafel } from './buttons.jsx'

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


class Header extends Component {

	constructor(props) {
		super(props)
		this.toggleExpandedState = this.toggleExpandedState.bind(this)
		this.state = { isExpanded: false }
	}

	render() {

		var { windowWidth, windowHeight, scrollTop } = this.props.app.ui

		var { pathname } = this.props.router.location

		var isDiscrete = windowWidth < 600 || (([ '/projects', '/blog' ].indexOf(pathname) === -1) && (windowHeight > scrollTop))
		
		var isTransparent = ([ '/projects', '/blog' ].indexOf(pathname) === -1) && (windowHeight > scrollTop)

		var cls = classNames({
			'header': true,
			'header--discrete': isDiscrete,
			'header--expanded': this.state.isExpanded,
			'header--transparent': isTransparent
		})

		// Do not show if at root route.
		var opacity = (pathname === '/') ? '0' : '1'

		return (
			<header className={ cls } style={{ opacity: opacity }}>

				<Link className='header__icon header__main-link' to='/'>
					<BackToMain />
				</Link>

				<nav className='header__icon header__falafel' onClick={this.toggleExpandedState}>
					<Falafel/>
				</nav>

				<nav className='header__nav'>
					<ul>
						{this.renderList()}
					</ul>
				</nav>

				{ this.renderModalNav() }
				
			</header>
		)
	}

	renderList() {
		var { pathname } = this.props.router.location
		var activeLinkName = pathname.slice(1)
		return buttons.map(function(button, i) {
			var { url, name } = button,
				cls = classNames({ 
					'header__nav__item': true,
					'header__nav__item--active': name === activeLinkName
				});
			return (
				<li className={cls} key={i} >
					<Link to={ url }>
						{ name }
					</Link>
				</li>
			)
		})
	}

	renderModalList() {
		var { activeLinkName } = this.props
		return buttons.map(function(button, i) {
			var { url, name } = button,
				cls = classNames({ 
					'header__modal-nav__item': true,
					'header__modal-nav__item--active': name === activeLinkName
				});
			return (
				<li className={cls} key={i} >
					<Link to={ url }>
						{ name }
					</Link>
				</li>
			)
		})
	}

	renderModalNav() {
		if (!this.state.isExpanded) { return }
		return (
			<nav className='header__modal-nav'>
				<div className='close-button' onClick={this.toggleExpandedState}>
					<Falafel />
				</div>
				<ul className='header__modal-nav__items'>
					{ this.renderModalList() }
				</ul>
			</nav>
		)
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.router.location !== nextProps.router.location && this.state.isExpanded) {
			this.toggleExpandedState()
		}
	}

	toggleExpandedState() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}
	
}


export default Header