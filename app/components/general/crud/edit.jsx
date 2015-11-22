import React from 'react'
import Form from './../form/root.jsx'

import Qajax from 'qajax'

const EDIT_STATUSES = [ 'editing', 'save-pending', 'save-succeeded', 'save-failed' ]

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
		this.handleFormSubmit = this.handleFormSubmit.bind(this)

		this.state = { 
			editStatus: 'editing'
		}	

	}


	/*
	 *
	 *
	 */
	render() {
		if (!this.state.resource) { return <div/> }
		return (
			<div>
				<Form
					fields={ this.props.fields } 
					resource={ this.state.resource }
					handleFormFieldChange={ this.handleFormFieldChange }
					handleFormSubmit={ this.handleFormSubmit }
					isEnabled={ this.state.editStatus === 'editing' }
				/>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	componentWillMount() {
		if (this.props.getUrl) {
			// send ajax request to get resource
		} else {
			let resource = {}
			this.props.fields.forEach((field) => {
				var { defaultValue } = field
				resource[field.key] = defaultValue == null ? '' : defaultValue
			})
			this.setState({ resource: resource })
		}
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


	/*
	 *
	 *
	 */
	handleFormSubmit() {
		Qajax({
			url: this.props.ajaxUrl,
			method: this.props.ajaxMethod,
			data: this.state.resource
		})
			.then(Qajax.filterSuccess)
			.then((xhr) => { console.log(JSON.parse(xhr.response)) }, (err) => { console.log(err) })
	}

}

export default Edit