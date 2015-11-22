import React from 'react'
import _ from 'underscore'

import * as Subcomponents from './subcomponents/index.js'

/*
 * Reusable form component.
 *
 */
class Form extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.handleFormFieldChange = this.handleFormFieldChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	/*
	 *
	 *
	 */
	render() {
		var style = this.props.isEnabled ? {} : { opacity: 0.5 }
		return (
			<form
				className='form'
				onSubmit={this.handleFormSubmit}
				style={style}
			>
				{ this.renderFormComponents() }
				<input 
					type='submit'
					disabled={!this.props.isEnabled}
					value={ this.props.submitButtonText || 'Submit Form' } 
				/>
			</form>
		);
	}


	/*
	 *
	 *
	 */
	renderFormComponents() {
		return this.props.fields.map((field, i) => {
			var FormComp = Subcomponents[field.formComponentName] || Subcomponents.Text;
			return (
				<FormComp
					key={i}
					id={field.key}
					labelText={field.labelText}
					hint={field.hint}
					isEnabled={this.props.isEnabled}
					handleFormFieldChange={this.handleFormFieldChange.bind(this)}
					initialValue={this.props.resource[field.key]}
				/>
			)

		})
	}


	/*
	 *
	 *
	 */
	handleFormFieldChange(changedFormFieldData) {
		this.props.handleFormFieldChange(changedFormFieldData)
	}

	
	/*
	 * Run method passed down from parent.
	 *
	 */
	handleFormSubmit(e) {
		e.preventDefault()
		this.props.handleFormSubmit()
	}

}

export default Form