import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Header from './header.jsx'

import Elm from './../../elm/Main.elm'


class Layout extends React.Component {

	constructor(props) {
		super(props)
		this.setWindowDimensions = this.setWindowDimensions.bind(this)
		this.updateScrollTop = this.updateScrollTop.bind(this)
	}

	render() {
		return (
			<div className='wrapper fill-parent'>
				<Header 
					app={this.props.app} 
					router={this.props.router} 
				/>
				{ this.props.children }
				<div ref='elm-container' />
			</div>
		)
	}

	componentWillMount() {
		this.setWindowDimensions()
		// Component alive while app runs, no need to remove this event listener.
		window.addEventListener('resize', this.setWindowDimensions)
		setInterval(this.updateScrollTop, 100)
	}

	componentDidMount() {
		var elmContainer = findDOMNode(this.refs['elm-container'])
		Elm.embed(Elm.Main, elmContainer)
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