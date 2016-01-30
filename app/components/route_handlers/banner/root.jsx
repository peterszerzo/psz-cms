import React from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import Sign from './../../general/sign.jsx'
import globe from './../../../assets/scripts/banner_animation/index.js'
import { Loader } from './../../general/loader.jsx'

// import Elm from './../../../elm/Main.elm'


const FADE_OUT_IN = 4500
const DO_NOT_REAPPEAR_ON_HOVER_FOR = 9000


export default class Banner extends React.Component {

	constructor(props) {
		super(props)
		this.navigateToRandomPost = this.navigateToRandomPost.bind(this)
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
					<div className="banner__elm" ref="elm-container" />
					<Link className="banner__summary" to='/projects'>
						<Sign />
					</Link>
					{ this.renderMessage() }
				</div>
			</div>
		)
	}

	renderMessage() {
		var style = this.state.message.isShowing ? { opacity: 1 } : { opacity: 0 }
		return (
			<div className="banner__message" style={style}>
				{ 'hey, welcome! click a triangle for a featured project' }
			</div>
		)
	}

	componentDidMount() {
		this.startElm()
		var { postSummaries } = this.props
		if (postSummaries == null || postSummaries.status !== 'success') {
			this.fetchPostSummaries()
		}
		
	}

	startElm() {
		// var elmContainer = findDOMNode(this.refs['elm-container'])
		// var elmApp = Elm.embed(Elm.Main, elmContainer, { addGeoData: [] })
	}

	componentDidUpdate() {
		// If the animation is already running, update it.
		// Otherwise, fetch geo data if necessary.
		// If that's available, start globe animation.
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

	componentWillUnmount() {
		this.globeAnimation.stop()
	}

	fetchPostSummaries() {
		fetch('/api/v2/posts?fields=(id,name,post_group,type)')
			.then(res => res.json())
			.then((posts) => {
				if (_.isArray(posts)) {
					posts = posts.sort((p1, p2) => (p1['display_order'] - p2['display_order']))
					this.props.dispatch({ type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: posts })
				}
			})
	}

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

	startGlobeAnimation() {
		let { globeAnimation } = this.props
		console.log(globeAnimation.data)
		var { ui } = this.props
		this.globeAnimation = globe(globeAnimation.data)
		this.globeAnimation.props = {
			onClick: this.navigateToRandomPost,
			onHover: this.triggerMessage,
			ui: ui
		}
		this.globeAnimation.start()
		this.setState({ isGlobeAnimationRunning: true })
	}

	navigateToRandomPost() {
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