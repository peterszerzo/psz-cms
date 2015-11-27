import React from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import ShowItem from './item.jsx'


/*
 *
 *
 */
class Show extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = { isHeroImageLoaded: false }
	}


	/*
	 * 
	 *
	 */
	render() {
		var resource = this.getResource()
		return (
			<div className='wrapper__content fill-parent'>
				{ this.renderTestImage() }
				<ShowItem 
					isHeroImageLoaded={ this.state.isHeroImageLoaded } 
					resource={ resource }
				/>
			</div>
		);
	}


	/*
	 * Render dummy image used to capture loaded state.
	 *
	 */
	renderTestImage() {
		var resource = this.getResource()
		if (!resource) { return }
		var imageUrl = `/images/posts/${resource.id}/hero.jpg`
		return (
			<img
				style={ { opacity: 0.1, width: 10, height: 10, position: 'fixed' } } 
				src={ imageUrl }
				onLoad={this.handleImageLoad.bind(this)} 
			/>
		)
	}


	/*
	 * Fetch resource if not available through connect props.
	 *
	 */
	componentDidMount() {
		if (!this.getResource()) { this.fetchResource() }
	}


	/*
	 * Sets image loaded state when the image loads.
	 *
	 */
	handleImageLoad() {
		this.setState({ isHeroImageLoaded: true })
	}


	/*
	 * Gets data for current resource.
	 *
	 */
	getResource() {
		var { id } = this.props.params
		var { postsById } = this.props
		if (!postsById) { return }
		if (!postsById[id]) { return }
		var { status, data } = postsById[id]
		if (status === 'success') { return data }
	}


	/*
	 * Fetch resource and dispatch success action.
	 * TODO: dispatch and handle error actions.
	 */
	fetchResource() {
		var { id } = this.props.params
		fetch(`/api/v2/posts?id=${id}`)
			.then(res => res.json())
			.then((resources) => {
				this.props.dispatch({ type: 'FETCH_SINGLE_POST_SUCCESS', data: resources[0] })
			})
	}

}


export default connect(state => ({ 
	router: state.router,
	postsById: state.app.entities.posts.byId
}))(Show)