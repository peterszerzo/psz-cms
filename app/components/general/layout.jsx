import React from 'react'
import { findDOMNode } from 'react-dom'

import { connect } from 'react-redux'

import Header from './header.jsx'

/*
 *
 *
 */
class Layout extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.setWindowDimensions = this.setWindowDimensions.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper fill-parent' onScroll={this.handleScroll}>
				<Header />
				{ this.props.children }
			</div>
		)
	}


	/*
	 *
	 *
	 */
	componentWillMount() {
		this.setWindowDimensions()
		// Component is live forever - no need to remove event listener.
		window.addEventListener('resize', this.setWindowDimensions)
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
	handleScroll(e) {
		var node = findDOMNode(this)
		this.props.dispatch({ type: 'SET_SCROLL_TOP', data: node.scrollTop })
	}

}

export default connect(state => ({ 
	router: state.router,
	app: state.app
}))(Layout)