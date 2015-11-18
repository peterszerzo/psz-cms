import React from 'react';

import ListItem from './item.jsx';

var List = (props) => {

	var { resources } = props

	if (resources == null) { return <div/> }

	var list = resources.map((resource, index) => {
		return <ListItem resource={resource} key={index} />;
	})

	return (
		<ul className="project-list">
			{ list }
		</ul>
	)

}

export default List;