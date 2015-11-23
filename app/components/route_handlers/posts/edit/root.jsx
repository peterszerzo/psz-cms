import React from 'react'
import { connect } from 'react-redux'

import Edit from './../../../general/crud/edit.jsx'

import Post from './../../../../models/post.js'

const ACTIONS = [ 'create', 'edit', 'delete' ]

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
		var { id } = this.props.router.params
		var action = (id == null) ? 'create' : 'update'
		return (
			<div className='wrapper__clear-header fill-parent'>
				<Edit 
					modelName='Post'
					modelId={id}
					action='create'
				/>
			</div>
		)
	}

}

export default connect(state => ({ 
	router: state.router
}))(EditPost)