import React from 'react';
import { Link } from 'react-router';

import Logos from './../../../general/project_logos.jsx';


class ProjectListItem extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var project = this.props.project;
		return (
			<li className={''}>
				<Link className="project-list__item" to={'/projects/' + project.get('id')}>
					{ this.renderBackgroundImage() }
					<div className="project-list__item__title">{ this.getName() }</div>
				</Link>
			</li>
		);
	}


	/*
	 *
	 *
	 */
	renderBackgroundImage() {
		var project = this.props.project,
			name = project.getIconName(),
			Comp = Logos[name];
		if (Comp == null) { return <Logos.Neutral className='project-list__item__logo' />; }
		return (<Comp className='project-list__item__logo' />);
	}


	/*
	 *
	 *
	 */
	getName() {
		var name = this.props.project.get('name');
		if (this.props.project.get('is_draft') === true) {
			name += ' (draft)'
		}
		return name;
	}

}

export default ProjectListItem;