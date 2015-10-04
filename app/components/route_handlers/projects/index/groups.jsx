import React from 'react';
import _ from 'underscore';

import ProjectList from './list.jsx';
import Loader from './../../../general/loader.jsx';

class ProjectGroups extends React.Component {

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

		var projects = this.props.projects;

		if (projects == null) { return (<Loader />); }

		var groups = _.groupBy(projects.models, (model) => {
			return model.get('group');
		});

		return Object.keys(groups).map((key, index) => {
			var projects = groups[key];
			if (projects == null) { return (<div/>); }
			return (
				<div className='project-group' key={index}>
					<h1 id={key}>{ key }</h1>
					<ProjectList projects={projects} />
				</div>
			);
		});
	}

}

export default ProjectGroups;