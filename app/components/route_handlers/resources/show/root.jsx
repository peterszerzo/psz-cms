import React from 'react';
import Header from './../../../general/header.jsx';

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
				<Header activeLinkName={this.getActiveLinkName()} />
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
	 * Include on subclass, returning a { Model: Model, Collection: Collection } object.
	 *
	 */
	getResourceConstructors() {
		return null;
	}


	getActiveLinkName() {
		var resourceUrlBase = this.getResourceConstructors().Model.prototype.resourceUrlBase;
		return resourceUrlBase;
	}


	/*
	 *
	 *
	 */
	fetchResource() {
		var coll, promise, id, resource;
		resource = this.getResourceConstructors();
		id = this.props.params.id;
		coll = new resource.Collection();
		promise = coll.getFetchPromise({ id: id });
		promise.then((coll) => {
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