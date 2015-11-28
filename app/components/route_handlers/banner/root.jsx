import * as React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import globe from './../../../assets/scripts/banner_animation/index.js'
import { Loader } from './../../general/loader.jsx'

import fetch from 'isomorphic-fetch'

const FADE_OUT_IN = 4500, DO_NOT_REAPPEAR_ON_HOVER_FOR = 9000

/*
 *
 *
 */
class Banner extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.navigateToRandom = this.navigateToRandom.bind(this)
		this.triggerMessage = this.triggerMessage.bind(this)

		this.fadeOut = function() {
			this.setState({ message: Object.assign({}, this.state.message, { isShowing: false }) })
		}

		this.reactivateOnHover = function() {
			this.setState({ message: Object.assign({}, this.state.message, { shouldShowOnHover: true }) })
		}

		this.fadeOut = this.fadeOut.bind(this)
		this.reactivateOnHover = this.reactivateOnHover.bind(this)

		this.state = {
			isGlobeAnimationRunning: false,
			message: {
				isShowing: true,
				shouldShowOnHover: true
			}
		}
	}


	/*
	 *
	 *
	 */
	render() {
		var { ui } = this.props

		var { isGlobeAnimationRunning } = this.state
		
		var style = isGlobeAnimationRunning ? { opacity: '1' } : { opacity: '0' }

		return (
			<div className="banner fill-parent">
				{ isGlobeAnimationRunning ? null : <Loader /> }
				<div className='banner__content fill-parent' style={ style }>
					<div className="banner__background"></div>
					<div className="banner__globe">
						<svg width={ui.windowWidth} height={ui.windowHeight}></svg>
					</div>
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
		var { postSummaries } = this.props
		if (postSummaries == null || postSummaries.status !== 'success') {
			this.fetchPostSummaries()
		}
		
	}


	/*
	 * If the animation is already running, update it.
	 * Otherwise, fetch geo data if necessary.
	 * If available, start globe animation.
	 */
	componentDidUpdate() {
		if (this.state.isGlobeAnimationRunning) {
			this.globeAnimation.props.ui = this.props.ui
			this.globeAnimation.setDimensions()
		} else {
			let { globeAnimation } = this.props
			if (globeAnimation && globeAnimation.status === 'success') {
				this.startGlobeAnimation()
			} else {
				this.fetchAnimationGeoFile()
			}
		}
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
	fetchPostSummaries() {
		fetch('/api/v2/posts?fields=(id,name,post_group,type)')
			.then(res => res.json())
			.then((posts) => {
				if (_.isArray(posts)) {
					this.props.dispatch({ type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: posts })
				}
			})
	}


	/*
	 *
	 *
	 */
	fetchAnimationGeoFile() {
		var { ui } = this.props
		var isWide = ui.windowWidth && ui.windowWidth > 500
		var geoFileName = isWide ? 'geo.json' : 'geo_small.json'
		fetch(`/data/geo/${geoFileName}`)
			.then(res => res.json())
			.then((geo) => {
				this.props.dispatch({
					type: 'FETCH_GLOBE_ANIMATION_GEO_JSON_SUCCESS',
					data: geo
				})
			})
	}


	/*
	 *
	 *
	 */
	startGlobeAnimation() {
		let { globeAnimation } = this.props
		var { ui } = this.props
		this.globeAnimation = globe(globeAnimation.data)
		this.globeAnimation.props = {
			onClick: this.navigateToRandom,
			onHover: this.triggerMessage,
			ui: ui
		}
		this.globeAnimation.start()
		this.setState({ isGlobeAnimationRunning: true })
	}


	/*
	 * Navigate to a random post's location.
	 *
	 */
	navigateToRandom() {
		var { dispatch, postSummaries } = this.props
		var randomPostId
		if (postSummaries) {
			let { data } = postSummaries
			randomPostId = data[Math.floor(data.length * Math.random())].id
		}
		if (randomPostId) {
			let url = `/${randomPostId}`
			this.props.dispatch(pushState(null, `/${randomPostId}`))
		}
	}


	/*
	 * Trigger the message encouraging the user to click on a triangle.
	 * The message should fade out after a certain time, and it should not reappear on triangle hover for some time longer.
	 */
	triggerMessage() {

		if (!this.state.message.shouldShowOnHover) { return }

		this.setState({
			message: {
				isShowing: true,
				shouldShowOnHover: false
			}
		})
		
		setTimeout(this.fadeOut, FADE_OUT_IN)

		setTimeout(this.reactivateOnHover, DO_NOT_REAPPEAR_ON_HOVER_FOR)

	}

}

export default connect(state => ({ 
	router: state.router,
	ui: state.app.ui,
	postSummaries: state.app.entities.posts.summaries,
	globeAnimation: state.app.entities.geo.globeAnimation
}))(Banner)