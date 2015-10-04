import React from 'react';
import { Link } from 'react-router';

import Logos from './../../../general/project_logos.jsx';


class ListItem extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var resource = this.props.resource;
		return (
			<li className={''}>
				<Link className="project-list__item" to={'/projects/' + resource.get('id')}>
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
		var resource = this.props.resource,
			name = resource.getIconName(),
			Comp = Logos[name] || Logos.Neutral;
		return (<Comp className='project-list__item__logo' />);
	}


	/*
	 *
	 *
	 */
	getName() {
		var name = this.props.resource.get('name');
		if (this.props.resource.get('is_draft') === true) {
			name += ' (draft)'
		}
		return name;
	}

}

export default ListItem;