import Show from './../../resources/show/root.jsx';

import project from './../../../../models/project.js';

class ProjectsShow extends Show {

	getResourceConstructors() {
		return project;
	}

}

export default ProjectsShow;