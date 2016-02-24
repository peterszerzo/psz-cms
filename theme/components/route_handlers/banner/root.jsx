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

import GlobeAnimation from './globe_animation.jsx'


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
			message: {
				isShowing: true,
				shouldShowOnHover: true
			}
		}
	}

	render() {
		var { ui } = this.props
		var { globeAnimation } = this.props
		var globeAnimationData = globeAnimation ? globeAnimation.data : null
		return (
			<div className='banner fill-parent'>
				<div className='banner__content fill-parent'>
					<div className='banner__background'></div>
					<GlobeAnimation 
						ui={ui}
						navigateToRandomPost={this.navigateToRandomPost}
						triggerMessage={this.triggerMessage}
						data={globeAnimationData}
					/>
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
		var { postSummaries, globeAnimation } = this.props
		if (postSummaries == null || postSummaries.status !== 'success') {
			this.fetchPostSummaries()
		}
		if (globeAnimation == null) {
			this.fetchAnimationGeoFile()
		}
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