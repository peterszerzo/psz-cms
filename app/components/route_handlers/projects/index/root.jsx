import React from 'react';
import Header from './../../../general/header.jsx';
import { Link } from 'react-router';
import _ from 'underscore';

import ProjectListItem from './item.jsx';

import project from './../../../../models/project.js';

import ProjectGroups from './groups.jsx';

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
				<ProjectGroups projects={this.getProjects()}/>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		var coll, promise;
		if (this.getProjects() == null) {
			coll = new project.Collection();
			promise = coll.getFetchPromise();
			promise.then((coll) => {
				console.log(coll);
				this.setState({ projects: coll });
			}, () => { console.log('promise rejected'); });
		}
	}


	/*
	 *
	 *
	 */
	getProjects() {
		// projects are stored in props if rendered server-side, and on the state if rendered client-side.
		if (this.state.projects != null) { return this.state.projects; }
		return this.props.projects;
	}

}

Index.contextTypes = {
	router: React.PropTypes.func
}

export default Index;