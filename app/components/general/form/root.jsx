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
		var { model, isEnabled } = this.props
		var fields = [ ...model.fields, { key: 'password', type: 'text', labelText: 'Password', hint: 'Enter edit password.' } ]
		return fields.map((field, i) => {
			var { key } = field
			var FormComp = Subcomponents[field.formComponentName] || Subcomponents.Text;
			return (
				<FormComp
					key={i}
					id={key}
					options={field.formComponentOptions}
					labelText={field.labelText}
					hint={field.hint}
					isEnabled={isEnabled}
					handleFormFieldChange={this.handleFormFieldChange.bind(this)}
					initialValue={model.getAttributeForFormField(field)}
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