import * as React from 'react'
import { Link } from 'react-router'

import globe from './../../../assets/scripts/banner_animation/index.js'
import Loader from './../../general/loader.jsx'
import project from './../../../models/project.js'

class Banner extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {
			randomUrl: null,
			isGlobeAnimationRendered: false,
			message: {
				isShowing: false,
				shouldShowOnHover: true
			}
		}
	}


	/*
	 *
	 *
	 */
	render() {
		var style = this.state.isGlobeAnimationRendered ? { opacity: 1 } : { opacity: 0 };
		return (
			<div className='fill-parent'>
				{ this.state.isGlobeAnimationRendered ? null : React.createElement(Loader) }
				<div className="banner fill-parent" style={ style }>
					<div className="banner__background"></div>
					<div className="banner__globe"></div>
					<Link className="banner__summary" to='/projects'>
						<h1>a little room</h1>
						<p>for mindful code, design and writing</p>
					</Link>
					{ this.renderMessage() }
				</div>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	renderMessage() {
		var style = this.state.message.isShowing ? { opacity: 1 } : { opacity: 0 }
		return (
			<div className="banner__message" style={style}>
				{ 'hey, welcome! click a triangle for random content' }
			</div>
		)
	}


	/*
	 *
	 *
	 */
	componentDidMount() {

		var isWide = window.innerWidth > 500

		var geoFileName = isWide ? 'geo.json' : 'geo_small.json'

		if (!isWide) {
			this.state.message.isShowing = true
			this.forceUpdate()
		}

		this.fetchRandomUrl()

		this.globeAnimation = globe(geoFileName)

		this.globeAnimation.onClick = this.navigateToRandom.bind(this)
		this.globeAnimation.onHover = this.triggerMessage.bind(this)

		this.globeAnimation.start()
		this.globeAnimation.on('rendered', () => {
			this.setState({ isGlobeAnimationRendered: true })
		})

	}

	
	/*
	 *
	 *
	 */
	componentWillUnmount() {
		this.globeAnimation.stop()
	}


	/*
	 *
	 *
	 */
	fetchRandomUrl() {
		var coll = new project.Collection()
		coll.getFetchPromise({ random: 'true' }).then((coll) => {
			if (!coll.models || coll.models.length === 0) { return }
			this.setState({ randomUrl: coll.models[0].viewUrl })
		})
	}


	/*
	 *
	 *
	 */
	navigateToRandom() {
		this.props.history.replaceState(null, this.state.randomUrl)
	}


	/*
	 *
	 *
	 */
	triggerMessage() {

		if (!this.state.randomUrl) { return }

		if (!this.state.message.shouldShowOnHover) { return }

		this.setState({
			message: {
				isShowing: true,
				shouldShowOnHover: false
			}
		})
		
		setTimeout(() => {
			this.state.message.isShowing = false
			this.forceUpdate()
		}, 4500)

		setTimeout(() => {
			this.state.message.shouldShowOnHover = true
			this.forceUpdate()
		}, 9000)

	}

}

export default Banner