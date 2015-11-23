import React from 'react'
import _ from 'underscore'
import request from 'superagent'
import fetch from 'isomorphic-fetch'

import Form from './../form/root.jsx'
import Modal from './../modal.jsx'

import * as models from './../../../models/index.js'



const EDIT_STATUSES = [ 'editing', 'pending', 'success', 'error' ]

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

		this.Model = models[this.props.modelName]

		this.state = { 
			editStatus: 'editing',
			password: ''
		}

	}


	/*
	 * Render only if model instance is set.
	 *
	 */
	render() {
		if (!this.state.model) { return <div/> }
		return (
			<div>
				{ this.renderStatusModal() }
				<Form
					fields={ this.Model.fields } 
					model={ this.state.model }
					handleFormFieldChange={ this.handleFormFieldChange }
					handleFormSubmit={ this.handleFormSubmit }
					isEnabled={ this.state.editStatus === 'editing' }
				/>
			</div>
		)
	}


	/*
	 * Render status modal.
	 *
	 */
	renderStatusModal() {
		var { editStatus } = this.state
		if (editStatus === 'editing') { return }
		return (
			<Modal>
				{ editStatus }
			</Modal>
		)
	}


	/*
	 *
	 *
	 */
	componentWillMount() {
		var { modelId } = this.props
		if (modelId) {
			// send ajax request to get resource
			fetch(`/api/v2/posts?id=${modelId}`)
				.then(res => res.json())
				.then((res) => { 
					if (_.isArray(res)) {
						let data = res[0]
						let model = this.Model.create(data)
						this.setState({ model: model })
					} else {
						console.log('not an array')
					}
				})
		} else {
			let model = this.Model.create()
			model.setDefaults()
			this.setState({ model: model })
		}
	}


	/*
	 *
	 *
	 */
	handleFormFieldChange(childData) {
		this.state.model.data[childData.id] = childData.value
		this.forceUpdate()
	}


	/*
	 *
	 *
	 */
	handleFormSubmit() {

		var { action } = this.props

		var { model } = this.state

		this.setState({ editStatus: 'pending' })

		var requestMethodName

		switch(action) {
			case 'update':
				requestMethodName = 'put'
			case 'delete':
				requestMethodName = 'del'
			default:
				requestMethodName = 'post'
		}

		request[requestMethodName](model.getCreateUrl()).send(model.data).end((err, res) => {
			if (err) { 
				this.setState({ editStatus: 'error' })
				return console.log(err) 
			}
			this.setState({ editStatus: 'success' })
			console.log(res)
		})

	}

}

export default Edit