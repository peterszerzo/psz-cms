import React from 'react'
import { Link } from 'react-router'


export default class NewList extends React.Component {

	render() {
		return (
			<div className='post-grid'>
				{ this.renderPostList() }
			</div>
		)
	}

	renderPostList() {
		return this.props.posts.map((post, i) => {
			var imageUrl = `/images/posts/${post.id}/hero.jpg`
			var viewUrl = `/${post.id}`
			return (
				<Link to={viewUrl} className='post-grid__element' key={i}>
					<div className='post-grid__element__background' style={{backgroundImage: `url(${imageUrl})`}} />
					<div className='post-grid__element__overlay' />
					<h1 className='post-grid__element__title'>{ post.name }</h1>
				</Link>
			)
		})
	}

}