import * as React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import globe from './../../../assets/scripts/banner_animation/index.js'
import { Loader } from './../../general/loader.jsx'

import fetch from 'isomorphic-fetch'

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
		this.state = {
			isGlobeAnimationRendered: false,
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

		var { isGlobeAnimationRendered } = this.state
		
		var style = isGlobeAnimationRendered ? { opacity: 1 } : { opacity: 0 }

		return (
			<div className="banner fill-parent" style={ style }>
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

		this.fetchRandomUrl()

		var { ui } = this.props

		var isWide = ui.windowWidth && ui.windowWidth > 500

		var geoFileName = isWide ? 'geo.json' : 'geo_small.json'

		this.globeAnimation = globe(geoFileName)

		this.globeAnimation.props = {
			onClick: this.navigateToRandom.bind(this),
			onHover: this.triggerMessage.bind(this),
			ui: ui
		}

		this.globeAnimation.start()
		this.globeAnimation.on('rendered', () => {
			this.setState({ isGlobeAnimationRendered: true })
		})

	}


	/*
	 *
	 *
	 */
	componentDidUpdate() {
		this.globeAnimation.props.ui = this.props.ui
		this.globeAnimation.setDimensions()
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

		const FADE_OUT_IN = 4.5, DO_NOT_REAPPEAR_ON_HOVER_FOR = 9

		if (!this.state.message.shouldShowOnHover) { return }

		this.setState({
			message: {
				isShowing: true,
				shouldShowOnHover: false
			}
		})
		
		setTimeout(() => {
			this.setState({ message: Object.assign({}, this.state.message, { isShowing: false }) })
		}, FADE_OUT_IN)

		setTimeout(() => {
			this.setState({ message: Object.assign({}, this.state.message, { shouldShowOnHover: true }) })
		}, DO_NOT_REAPPEAR_ON_HOVER_FOR)

	}

}

export default connect(state => ({ 
	router: state.router,
	ui: state.app.ui,
	postSummaries: state.app.entities.posts.summaries
}))(Banner)