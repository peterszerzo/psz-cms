import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';
import _ from 'underscore';
import project from './../models/project.js';
import marked from 'marked';
import moment from 'moment';
import Logos from './logos/project-logos.jsx';

var Projects = {};

Projects.Index = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	render() {
		return (
			<div>
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

Projects.Index.contextTypes = {
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

		console.log(projects);

		var groups = _.groupBy(projects, (model) => {
			return model.get('group');
		});

		return Object.keys(groups).map((key) => {
			var projects = groups[key];
			if (projects == null) { return (<div/>); }
			return (
				<div className='project-group'>
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
					<div className="project__title">{project.get('name')}</div>
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

}

Projects.Show = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	render() {
		var project = this.getProject();
		return (
			<div>
				<Header/>
				<ProjectShowItem project={ project }/>
			</div>
		);
	}

	componentDidMount() {
		var coll, promise;
		if (this.getProject() == null) {
			coll = new project.Collection();
			promise = coll.getFetchPromise({ id: this.props.params.id });
			promise.then((coll) => {
				this.setState({ project: coll.models[0] });
			}, () => { console.log('promise rejected'); });
		}
	}

	static fetchData() {

	}

	getProject() {
		return this.state.project || this.props.project;
	}

}

class ProjectShowItem extends React.Component {

	render() {
		var project = this.props.project;
		if (project == null) {
			return (
				<div className='projects'>
					<img src="/images/loader/ripple.gif" />
				</div>
			);
		}
		return (
			<div className="fill-parent">
				<h1 className="title">{project.get('title')}</h1>
				{ this.renderSubtitle() }
				{ this.renderDates() }
				{ this.renderUrl() }
				{ this.renderBody() }
			</div>
		);
	}

	renderDates() {
		var dates = this.props.project.get('dates'), 
			formattedDates, content;
		if (dates == null) { return; }
		formattedDates = dates.map(function(date) {
			if (date === 'present') { return date; }
			return moment(date, 'YYYY-MM').format('MMMM YYYY');
		});
		content = formattedDates.join(' - ');
		return (
			<div className='date'>{content}</div>
		);
	}

	renderSubtitle() {
		if (this.props.project.get('subtitle') == null) { return; }
		return (<h2 className="subtitle">{'' + this.props.project.get('subtitle') + ''}</h2>);
	}

	renderUrl() {
		var url = this.props.project.get('url');
		if (url == null) { return; }
		return (
			<a className="main-link" href={url} target="_blank">Project Site</a>
		);
	}

	renderBody() {
		var md = this.props.project.get('bodyText');
		if (md == null) { return; }
		return (
			<div className="static" dangerouslySetInnerHTML={{ __html: marked(md) }}/>
		);
	}

}

module.exports = Projects;