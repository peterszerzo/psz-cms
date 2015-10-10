import Index from './../../resources/index/root.jsx';

import project from './../../../../models/project.js';

class ProjectsIndex extends Index {

	/*
	 *
	 *
	 */
	getResourceConstructors() {
		return project;
	}


	/*
	 *
	 *
	 */
	getGroupDescriptions() {
		return {
			'featured': 'These are the projects that are on my mind lately: my day job, ',
			'recent': 'Stuff ',
			'nostalgia': 'Feeling nostalgic about '
		};
	}

}

export default ProjectsIndex;