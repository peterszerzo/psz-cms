import React from 'react';

import ListItem from './item.jsx';


class List extends React.Component {

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
		return this.props.resources.map((resource, index) => {
			return <ListItem resource={resource} key={index} />;
		});
	}

}

export default List;