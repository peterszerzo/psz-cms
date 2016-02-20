import React from 'react'
import _ from 'underscore'
import request from 'superagent'
import fetch from 'isomorphic-fetch'

import Form from './../form/root.jsx'

import * as models from './../../models/index.js'

const EDIT_STATUSES = [ 'editing', 'pending', 'success', 'error' ]

function Modal(props) {
	return (
		<div className='modal'>
			<div className='modal__content'>
				{ props.children }
			</div>
		</div>
	)
}

export default class Edit extends React.Component {

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

	renderStatusModal() {
		var { editStatus } = this.state
		if (editStatus === 'editing') { return }
		return (
			<Modal>
				{ editStatus }
			</Modal>
		)
	}

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
			this.setState({ model: model })
		}
	}

	handleFormFieldChange(childData) {
		var { data } = this.state.model
		var change = {}
		change[childData.id] = childData.value
		var newData = Object.assign({}, data, change)
		var newModel = this.Model.create(newData)
		this.setState({ model: newModel })
	}

	handleFormSubmit() {

		var { action } = this.props

		var { model } = this.state

		this.setState({ editStatus: 'pending' })

		var requestMethodName, requestUrl

		switch(action) {
			case 'edit':
				requestMethodName = 'put'
				requestUrl = model.getUpdateUrl()
				break
			case 'delete':
				requestMethodName = 'del'
				requestUrl = model.getDeleteUrl()
				break
			default:
				requestMethodName = 'post'
				requestUrl = model.getCreateUrl()
		}

		request[requestMethodName](requestUrl).send(model.data).end((err, res) => {
			if (err) {
				this.setState({ editStatus: 'error' })
				return console.log(err.stack)
			}
			this.setState({ editStatus: 'success' })
		})

	}

}
