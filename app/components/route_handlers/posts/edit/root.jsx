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
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper__clear-header fill-parent'>
				<Edit 
					fields={Post.fields}
					ajaxMethod={'post'}
					ajaxUrl={'/api/v2/posts'}
				/>
			</div>
		)
	}

}

export default EditPost