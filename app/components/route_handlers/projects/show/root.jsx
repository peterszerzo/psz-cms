import React from 'react';
import Header from './../../../general/header.jsx';
import project from './../../../../models/project.js';

import ShowItem from './item.jsx';

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
		var resource = this.getResource();
		return (
			<div className='wrapper__content'>
				<Header/>
				<ShowItem resource={ resource }/>
			</div>
		);
	}


	/*
	 * If project was passed down in props, no need to fetch again.
	 *
	 */
	componentDidMount() {
		if (this.getResource() == null) {
			this.fetchResource();
		}
	}


	/*
	 *
	 *
	 */
	fetchResource() {
		var coll, promise, id;
		id = this.props.params.id;
		coll = new project.Collection();
		console.log('sending promise');
		promise = coll.getFetchPromise({ id: id });
		promise.then((coll) => {
			console.log(coll);
			this.setState({ resource: coll.models[0] });
		}, () => { console.log('promise rejected'); });
	}


	/*
	 *
	 *
	 */
	getResource() {
		return this.state.resource || this.props.resource;
	}

}

export default Show;