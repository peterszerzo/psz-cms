import React from 'react';
import _ from 'underscore';

import List from './list.jsx';
import Loader from './../../../general/loader.jsx';

class Groups extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='project-groups'>
				{ this.renderGroups() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderGroups() {

		var resources = this.props.resources;

		if (resources == null) { return (<Loader />); }

		var groups = _.groupBy(resources.models, (model) => {
			return model.get('group');
		});

		return Object.keys(groups).map((key, index) => {
			var resources = groups[key];
			if (resources == null) { return (<div/>); }
			return (
				<div className='project-group' key={index}>
					<div className='project-group__content'>
						<h1 id={key}>{ key }</h1>
						<div className='project-group__separator' />
						<p className='project-group__description'>
							{ this.props.groupDescriptions[key] }
						</p>
						<List resources={resources} />
					</div>
				</div>
			);
		});
	}

}

export default Groups;