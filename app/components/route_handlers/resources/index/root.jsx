import React from 'react'
import { Link } from 'react-router'

import _ from 'underscore'

import Header from './../../../general/header.jsx';

import project from './../../../../models/project.js';

import Groups from './groups.jsx';

class Index extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = this.state || {}
	}


	/*
	 *
	 *
	 */
	getResourceConstructors() {
		return project;
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper__content fill-parent'>
				<Header activeLinkName={this.getActiveLinkName()} />
				<Groups groupDescriptions={this.props.groupDescriptions} resources={this.getResources()}/>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	getActiveLinkName() {
		var { Model } = this.props.resourceConstructors
		var resourceUrlBase = Model.prototype.resourceUrlBase
		return resourceUrlBase
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		var { Collection } = this.props.resourceConstructors
		if (this.getResources() == null) {
			let coll = new Collection()
			coll.getFetchPromise().then((coll) => {
				this.setState({ resources: coll })
			}, () => { console.log('promise rejected') })
		}
	}


	/*
	 *
	 *
	 */
	getResources() {
		// projects are stored in props if rendered server-side, and on the state if rendered client-side.
		if (this.state.resources != null) { return this.state.resources }
		return this.props.resources
	}

}

export default Index