import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Header from './header.jsx'


class Layout extends React.Component {

	constructor(props) {
		super(props)
		this.setWindowDimensions = this.setWindowDimensions.bind(this)
		this.updateScrollTop = this.updateScrollTop.bind(this)
	}

	render() {
		return (
			<div className='wrapper fill-parent'>
				<Header app={this.props.app} router={this.state.router} />
				{ this.props.children }
			</div>
		)
	}

	componentWillMount() {
		this.setWindowDimensions()
		window.addEventListener('resize', this.setWindowDimensions)
		setInterval(this.updateScrollTop, 100)
	}

	setWindowDimensions() {
		this.props.dispatch({ type: 'SET_WINDOW_DIMENSIONS', data: {
			height: window.innerHeight,
			width: window.innerWidth
		}})
	}

	updateScrollTop(e) {
		var node = findDOMNode(this)
		this.props.dispatch({ type: 'SET_SCROLL_TOP', data: node.scrollTop })
	}

}

export default connect(state => ({ 
	router: state.router,
	app: state.app
}))(Layout)