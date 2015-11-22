import React from 'react'

/*
 *
 *
 */
class Text extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var InputComponent = !this.props.isMultiline ? 'input' : 'textarea'
		return (
			<div className='form__wrapper'>
				<label for={this.props.id}>{ this.props.labelText }</label>
				<p className='form__hint'>{ this.props.hint }</p>
				<InputComponent 
					type='text'
					onChange={this.saveDataOnParent.bind(this)}
					disabled={!this.props.isEnabled}
					name={this.props.id}
					id={this.props.id}
					value={this.props.initialValue}
					placeholder={this.props.placeholder} 
				/>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	saveDataOnParent(e) {
		this.props.handleFormFieldChange({
			id: this.props.id,
			value: e.target.value
		})
	}

}

export default Text