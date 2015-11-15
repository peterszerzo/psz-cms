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

		var { resourceGroups } = this.props

		if (resourceGroups == null) { return (<Loader />); }

		return Object.keys(resourceGroups).map((key, index) => {
			var resources = resourceGroups[key]
			if (resources == null) { return <div/> }
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

export default Groups