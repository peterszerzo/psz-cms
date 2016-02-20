import React from 'react'

export default class Text extends React.Component {

	render() {
		var { options } = this.props
		var InputComponent = (options && options.isMultiline) ? 'textarea' : 'input'
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
		)
	}

	saveDataOnParent(e) {
		this.props.handleFormFieldChange({
			id: this.props.id,
			value: e.target.value
		})
	}

}
