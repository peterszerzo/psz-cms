import React from 'react'
import Form from './../form/root.jsx'

/*
 * Edit resource component.
 *
 */
class Edit extends React.Component {

	/*
	 * Set initial state.
	 *
	 */
	constructor(props) {
		super(props)

		this.handleFormFieldChange = this.handleFormFieldChange.bind(this)

		// Set resource object on state.
		let resource = {}
		this.props.fields.forEach((field) => {
			resource[field.key] = field.defaultValue || ''
		})
		this.state = { resource: resource }	
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div>
				<Form
					fields={ this.props.fields } 
					resource={ this.state.resource }
					handleFormFieldChange={ this.handleFormFieldChange }
					isEnabled={true}
				/>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	handleFormFieldChange(childData) {
		var newResource = Object.assign({}, this.state.resource)
		newResource[childData.id] = childData.value
		this.setState({ resource: newResource })
	}

}

export default Edit