import React from 'react';
import Header from './../../../general/header.jsx';
import { Link } from 'react-router';
import _ from 'underscore';

import project from './../../../../models/project.js';

import Groups from './groups.jsx';

class Index extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = this.state || {};
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper__content'>
				<Header />
				<Groups resources={this.getResources()}/>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		if (this.getResources() == null) {
			let coll = new project.Collection();
			coll.getFetchPromise().then((coll) => {
				console.log(coll);
				this.setState({ resources: coll });
			}, () => { console.log('promise rejected'); });
		}
	}


	/*
	 *
	 *
	 */
	getResources() {
		// projects are stored in props if rendered server-side, and on the state if rendered client-side.
		if (this.state.resources != null) { return this.state.resources; }
		return this.props.resources;
	}

}

Index.contextTypes = {
	router: React.PropTypes.func
}

export default Index;