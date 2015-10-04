import React from 'react';
import Header from './../../../general/header.jsx';
import project from './../../../../models/project.js';

import ProjectShowItem from './item.jsx';

class Show extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}


	/*
	 *
	 *
	 */
	render() {
		var project = this.getProject();
		return (
			<div className='wrapper__content'>
				<Header/>
				<ProjectShowItem project={ project }/>
			</div>
		);
	}


	/*
	 * If project was passed down in props, no need to fetch again.
	 *
	 */
	componentDidMount() {
		if (this.getProject() == null) {
			this.fetchProject();
		}
	}


	/*
	 *
	 *
	 */
	fetchProject() {
		var coll, promise, id;
		id = this.props.params.id;
		coll = new project.Collection();
		console.log('sending promise');
		promise = coll.getFetchPromise({ id: id });
		promise.then((coll) => {
			console.log(coll);
			this.setState({ project: coll.models[0] });
		}, () => { console.log('promise rejected'); });
	}


	/*
	 *
	 *
	 */
	getProject() {
		return this.state.project || this.props.project;
	}

}

export default Show;