import React from 'react'
import { connect } from 'react-redux'

import Edit from './../crud/edit.jsx'
import Post from './../../models/post.js'

class EditPost extends React.Component {

	render() {
		var { id, action } = this.props.router.params
		action = action || 'new'
		return (
			<div className='wrapper__clear-header fill-parent'>
				<Edit
					modelName='Post'
					modelId={id}
					action={action}
				/>
			</div>
		)
	}

}

export default connect(state => ({
	router: state.router
}))(EditPost)
