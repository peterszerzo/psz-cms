import React from 'react'
import { findDOMNode } from 'react-dom'

import { connect } from 'react-redux'

import Header from './header.jsx'

/*
 * Main layout component used in routes.
 *
 */
class Layout extends React.Component {

	/*
	 * Bind handlers to the component.
	 *
	 */
	constructor(props) {
		super(props)
		this.setWindowDimensions = this.setWindowDimensions.bind(this)
		this.updateScrollTop = this.updateScrollTop.bind(this)
	}


	/*
	 * 
	 *
	 */
	render() {
		return (
			<div className='wrapper fill-parent'>
				<Header />
				{ this.props.children }
			</div>
		)
	}


	/*
	 * Add resize and scroll handlers.
	 * Since this component is live forever, there is no need to remove them.
	 */
	componentWillMount() {
		this.setWindowDimensions()
		window.addEventListener('resize', this.setWindowDimensions)
		setInterval(this.updateScrollTop, 100)
	}


	/*
	 *
	 *
	 */
	setWindowDimensions() {
		this.props.dispatch({ type: 'SET_WINDOW_DIMENSIONS', data: {
			height: window.innerHeight,
			width: window.innerWidth
		}})
	}


	/*
	 *
	 *
	 */
	updateScrollTop(e) {
		var node = findDOMNode(this)
		this.props.dispatch({ type: 'SET_SCROLL_TOP', data: node.scrollTop })
	}

}

export default connect(state => ({ 
	router: state.router,
	app: state.app
}))(Layout)