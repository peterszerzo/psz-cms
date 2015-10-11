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
			'featured': 'A very incomplete collection of work and side projects that are on my mind lately.',
			'recent': 'A mix of mostly finished technical and creative endeavors.',
			'nostalgia': 'The childhood projects that got me started.'
		};
	}

}

export default ProjectsIndex;