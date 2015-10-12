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
			'featured': 'Things on my mind these days. An incomplete collection.',
			'recent': 'A blend of mostly finished technical and creative endeavors.',
			'nostalgia': 'The childhood project(s) that got me started.'
		};
	}

}

export default ProjectsIndex;