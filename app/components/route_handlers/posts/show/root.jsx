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
				<ShowItem 
					isHeroImageLoaded={ this.state.isHeroImageLoaded } 
					resource={ resource }
				/>
			</div>
		);
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