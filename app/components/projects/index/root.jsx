import React from 'react';
import Header from './../../general/header.jsx';
import { Link } from 'react-router';
import _ from 'underscore';
import project from './../../../models/project.js';
import Logos from './../../general/project_logos.jsx';

class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	render() {
		return (
			<div className='wrapper__content'>
				<Header type={this.getType()}/>
				<ProjectGroupList projects={this.getFilteredProjects()}/>
			</div>
		);
	}

	componentDidMount() {
		var coll, promise;
		if (this.getProjects() == null) {
			coll = new project.Collection();
			promise = coll.getFetchPromise({});
			promise.then((coll) => {
				this.setState({ projects: coll });
			}, () => { console.log('promise rejected'); });
		}
	}

	getFilteredProjects() {
		if (this.getProjects() == null) { return; }
		return this.getProjects().where({ type: this.getType() });
	}

	getProjects() {
		// projects are stored in props if rendered server-side, and on the state if rendered client-side.
		if (this.state.projects != null) { return this.state.projects; }
		return this.props.projects;
	}

	getType() {
		return this.props.query.type;
	}

}

Index.contextTypes = {
	router: React.PropTypes.func
}

class ProjectGroupList extends React.Component {

	render() {
		return (
			<div className='project-groups'>
				{ this.renderGroups() }
			</div>
		);
	}

	renderGroups() {

		var projects = this.props.projects;

		if (projects == null) { return (<img src="/images/loader/ripple.gif" />); }

		var groups = _.groupBy(projects, (model) => {
			return model.get('group');
		});

		return Object.keys(groups).map((key, index) => {
			var projects = groups[key];
			if (projects == null) { return (<div/>); }
			return (
				<div className='project-group' key={index}>
					<h1 id={key}>{ key }</h1>
					<ProjectList projects={projects} />
				</div>
			);
		});
	}

}

class ProjectList extends React.Component {

	render() {
		return (
			<ul className="projects">
				{ this.renderList() }
			</ul>
		);
	}

	renderList() {
		return this.props.projects.map((project, index) => {
			return <ProjectListItem project={project} key={index} />;
		});
	}

}

class ProjectListItem extends React.Component {

	render() {
		var project = this.props.project;
		return (
			<li className={''}>
				<Link className="project" to={'/things/' + project.get('id')}>
					{ this.renderBackgroundImage() }
					<div className="project__title">{ this.getName() }</div>
				</Link>
			</li>
		);
	}

	renderBackgroundImage() {
		var project = this.props.project,
			id = project.get('id'),
			name = id.split('-').map(function(word) {
				return (word[0].toUpperCase() + word.slice(1));
			}).join(''),
			Comp = Logos[name];
		if (Comp == null) { return <Logos.Neutral className='project__logo' />; }
		return (<Comp className='project__logo' />);
	}

	getName() {
		var name = this.props.project.get('name');
		if (this.props.project.get('is_draft') === true) {
			name += ' (draft)'
		}
		return name;
	}

}

export default Index;