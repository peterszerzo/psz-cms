import React from 'react';
import { Link } from 'react-router';

import Logos from './../../../general/project_logos.jsx';

var ListItem = (props) => {

	var { resource } = props

	var viewUrl = `/${resource.id}`

	function getIconName(id) {
        var name = id.split('-').map(function(word) {
                return (word[0].toUpperCase() + word.slice(1));
            }).join('');
        return name;
    }

	function renderBackgroundImage() {
		var iconName = getIconName(resource.id),
			Comp = Logos[iconName] || Logos.Neutral;
		return (<Comp className='project-list__item__logo' />);
	}

	var { name } = resource
	if (resource.is_draft === true) {
		name += ' (draft)'
	}

	return (
		<li className={''}>
			<Link className="project-list__item" to={ viewUrl }>
				{ renderBackgroundImage() }
				<div className="project-list__item__title">{ name }</div>
			</Link>
		</li>
	);

}

export default ListItem;