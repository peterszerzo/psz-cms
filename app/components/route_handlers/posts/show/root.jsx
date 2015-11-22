import React from 'react'
import fetch from 'isomorphic-fetch'

import ShowItem from './item.jsx'

class Show extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {
			isHeroImageLoaded: false
		}
	}


	/*
	 * 
	 *
	 */
	render() {
		var { resource } = this.state
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
	 *
	 *
	 */
	renderTestImage() {
		var { resource } = this.state
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
	 * If project was passed down in props, no need to fetch again.
	 *
	 */
	componentDidMount() {
		this.fetchResource()
	}


	/*
	 *
	 *
	 */
	handleImageLoad() {
		this.setState({ isHeroImageLoaded: true })
	}


	/*
	 *
	 *
	 */
	fetchResource() {
		var { id } = this.props.params
		fetch(`/api/v2/posts?id=${id}`)
			.then(res => res.json())
			.then((resources) => {
				this.setState({ resource: resources[0] })
			})
	}

}

export default Show