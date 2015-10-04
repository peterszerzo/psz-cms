import React from 'react';

import ProjectListItem from './item.jsx';


class ProjectList extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		return (
			<ul className="project-list">
				{ this.renderList() }
			</ul>
		);
	}


	/*
	 *
	 *
	 */
	renderList() {
		return this.props.projects.map((project, index) => {
			return <ProjectListItem project={project} key={index} />;
		});
	}

}

export default ProjectList;