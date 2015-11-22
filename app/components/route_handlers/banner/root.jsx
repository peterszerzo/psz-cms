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
			randomPostId: null,
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
		var { isGlobeAnimationRendered } = this.state
		var style = isGlobeAnimationRendered ? { opacity: 1 } : { opacity: 0 }
		return (
			<div className="banner fill-parent" style={ style }>
				<div className="banner__background"></div>
				<div className="banner__globe"></div>
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
		fetch('/api/v2/posts?fields=(id)')
			.then(res => res.json())
			.then((posts) => {
				if (_.isArray(posts)) {
					this.setState({ randomPostId: posts[Math.floor(Math.random() * posts.length)].id })
				}
			})
	}


	/*
	 *
	 *
	 */
	navigateToRandom() {
		var { randomPostId } = this.state,
			{ dispatch, history } = this.props;
		if (randomPostId) {
			let url = `/${randomPostId}`
			this.props.dispatch(pushState(null, `/${randomPostId}`))
			// history.pushState(null, `/${randomPostId}`)
		}



	}


	/*
	 *
	 *
	 */
	triggerMessage() {

		if (!this.state.randomPostId) { return }

		if (!this.state.message.shouldShowOnHover) { return }

		this.setState({
			message: {
				isShowing: true,
				shouldShowOnHover: false
			}
		})
		
		setTimeout(() => {
			this.setState({ message: Object.assign({}, this.state.message, { isShowing: false }) })
		}, 4500)

		setTimeout(() => {
			this.setState({ message: Object.assign({}, this.state.message, { shouldShowOnHover: false }) })
		}, 9000)

	}

}

export default connect(state => ({ 
	router: state.router,
	app: state.app
}))(Banner)