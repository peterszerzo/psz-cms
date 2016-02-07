import React from 'react'
import { findDOMNode } from 'react-dom'

import globe from './../../../assets/scripts/banner_animation/index.js'

import Elm from './../../../elm/build/elm.js'


export default class GlobeAnimation extends React.Component {

	render() {
		var { ui } = this.props
		return (
			<div className='banner__globe'>
				<svg width={ui.windowWidth} height={ui.windowHeight}></svg>
				<div ref='elm-container' style={{ position: 'fixed', top: '0', left: '0' }} />
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
			this.startElmApp()
		} else {
			// this.updateGlobeAnimation()
		}
	}

	componentWillUnmount() {
		if (this.globeAnimation) {
			this.globeAnimation.stop()
		}
	}

	startElmApp() {
		var coordinates = this.getPolygonCoordinates()
		var elmContainer = findDOMNode(this.refs['elm-container'])
		this.elmApp = Elm.embed(Elm.Main, elmContainer, { addCoordinates: [] })
		console.log(this.elmApp.ports.addCoordinates)

		this.elmApp.ports.addCoordinates.send(coordinates)
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