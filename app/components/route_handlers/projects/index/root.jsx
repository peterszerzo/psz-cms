import Index from './../../resources/index/root.jsx';

import project from './../../../../models/project.js';

class ProjectsIndex extends Index {

	getResourceConstructors() {
		return project;
	}

}

export default ProjectsIndex;