import React from 'react'
import _ from 'underscore'

export default class Radio extends React.Component {

	constructor(props) {
		super(props)
		this.handleFormFieldChange = this.handleFormFieldChange.bind(this)
	}

	render() {
		return (
			<div className='form__wrapper'>
				<label for={this.props.id}>{ this.props.labelText }</label>
				<p className='form__hint'>{ this.props.hint }</p>
				{ this.renderOptions() }
			</div>
		);
	}

	renderOptions() {
		return this.props.options.map((option, i) => {
			var option = option.key,
				isChecked = this.isOptionChecked(option, i);
			return (
				<div className='form__radio' key={i}>
					<input
						type='checkbox'
						name={this.props.id}
						id={this.props.id + '-opt-' + i}
						disabled={!this.props.isEnabled}
						checked={ isChecked }
						onChange={this.handleFormFieldChange.bind(this)}
						value={ option }
					/>
					<p onDoubleClick={this.navigateToForeignModelEdit.bind(this, foreignModel)}>{ foreignModel.get(field) }</p>
				</div>
			);
		});
	}

	componentDidMount() {
		// If there was no initial value passed to the component, pass back the first option to the parent.
		this.fetchForeignCollection();
		if (!_.isArray(this.props.initialValue)) {
			this.props.saveDataOnParent({ id: this.props.id, value: [] });
		}
	}

	isOptionChecked(option, i) {
		return (this.props.initialValue === option)
	}

	handleFormFieldChange(e) {
		this.props.handleFormFieldChange({
			id: this.props.id,
			value: e.target.value
		})
	}

}
