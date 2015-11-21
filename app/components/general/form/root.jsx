import './style.scss'

import React from 'react'
import _ from 'underscore'

import * as Subcomponents from './subcomponents/index.js'

/*
 *
 *
 */
class Form extends React.Component {


	/*
	 *
	 *
	 */
	render() {
		var style = this.props.isEnabled ? {} : { opacity: 0.5 }
		return (
			<form
				className='form'
				onSubmit={this.sendFormDataToParent.bind(this)}
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
					saveDataOnParent={this.saveDataFromChild.bind(this)}
					initialValue={this.props.resource[field.key]}
				/>
			)

		})
	}


	/*
	 *
	 *
	 */
	saveDataFromChild(childData) {
		this.props.handleFormFieldChange(childData)
	}

	
	/*
	 * Run method passed down from parent.
	 *
	 */
	sendFormDataToParent(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.model);
	}

}

export default Form