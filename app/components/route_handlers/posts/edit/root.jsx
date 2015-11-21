import React from 'react'

import { Header } from './../../../general/header.jsx'

import Edit from './../../../general/crud/edit.jsx'

import Post from './../../../../models/post.js'


/*
 * 
 *
 */
class EditPost extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {
			resource: {}
		}
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper__content fill-parent'>
				<Header />
				<div>
					<Edit fields={Post.fields} />
				</div>
			</div>
		)
	}

}

export default EditPost