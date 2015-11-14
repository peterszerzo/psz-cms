import React from 'react';
import { Link } from 'react-router';

import Logos from './../../../general/project_logos.jsx';

var ListItem = (props) => {

	var { resource } = props

	function renderBackgroundImage() {
		var iconName = resource.getIconName(),
			Comp = Logos[iconName] || Logos.Neutral;
		return (<Comp className='project-list__item__logo' />);
	}

	var name = resource.get('name');
	if (resource.get('is_draft') === true) {
		name += ' (draft)'
	}

	return (
		<li className={''}>
			<Link className="project-list__item" to={resource.viewUrl}>
				{ renderBackgroundImage() }
				<div className="project-list__item__title">{ name }</div>
			</Link>
		</li>
	);

}

export default ListItem;