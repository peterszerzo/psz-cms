import React from 'react'
import { findDOMNode } from 'react-dom'

import globe from './../../../assets/scripts/banner_animation/index.js'

import Elm from './../../../elm/Main.elm'


export default class GlobeAnimation extends React.Component {

	render() {
		var { ui } = this.props
		return (
			<div className='banner__globe'>
				<svg width={ui.windowWidth} height={ui.windowHeight}></svg>
				<div ref='elm-container'/>
			</div>
		)
	}

	componentDidMount() {
		if (this.props.data != null) {
			// this.startGlobeAnimation()
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data == null && this.props.data != null) {
			// this.startGlobeAnimation()
			let coordinates = this.getPolygonCoordinates()
			let elmContainer = findDOMNode(this.refs['elm-container'])
			console.log(coordinates)
			let elmApp = Elm.embed(Elm.Main, elmContainer, { addCoordinates: coordinates })
		} else {
			// this.updateGlobeAnimation()
		}
	}

	componentWillUnmount() {
		if (this.globeAnimation) {
			this.globeAnimation.stop()
		}
	}

	startGlobeAnimation() {
		var { data } = this.props
		var { ui } = this.props
		this.globeAnimation = globe(data)
		this.globeAnimation.props = {
			onClick: this.props.navigateToRandomPost,
			onHover: this.props.triggerMessage,
			ui: ui
		}
		this.globeAnimation.start()
	}

	updateGlobeAnimation() {
		if (this.globeAnimation) {
			this.globeAnimation.props.ui = this.props.ui
			this.globeAnimation.setDimensions()
		}
	}

	getPolygonCoordinates() {
		if (this.props.data == null) { return [] }
		return this.props.data.features.map(feature => feature.geometry.coordinates[0])
	}

}