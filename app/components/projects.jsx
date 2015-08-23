import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';
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
				<ProjectList type={this.getType()} projects={this.getProjects()}/>
			</div>
		);
	}

	componentDidMount() {
		var coll, promise;
		if (this.getProjects() == null) {
			coll = new project.Collection();
			promise = coll.getFetchPromise({});
			promise.then((coll) => {
				this.setState({ projects: coll.toJSON() });
			}, () => { console.log('promise rejected'); });
		}
	}

	static fetchData() {

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

class ProjectList extends React.Component {

	render() {
		return (
			<ul className="projects">
				{ this.renderList() }
			</ul>
		);
	}

	renderList() {
		var projects = this.props.projects;
		if (!projects) { return (<img src="/images/loader/ripple.gif" />); }
		return projects.map((project, index) => {
			return <ProjectListItem project={project} type={this.props.type} key={index} />;
		});
	}

}

class ProjectListItem extends React.Component {

	render() {
		var project = this.props.project;
		if (!this.shouldDisplay()) { return <li />; }
		return (
			<li className={''}>
				<Link className="project" to={'/things/' + project.id}>
					{ this.renderBackgroundImage() }
					<div className="project__title">{project.name}</div>
				</Link>
			</li>
		);
	}

	renderBackgroundImage() {
		var project = this.props.project,
			id = project.id,
			name = id.split('-').map(function(word) {
				return (word[0].toUpperCase() + word.slice(1));
			}).join(''),
			Comp = Logos[name];
		if (Comp == null) { return <Logos.Neutral className='project__logo' />; }
		return (<Comp className='project__logo' />);
	}

	shouldDisplay() {
		return (this.props.type === this.props.project.type);
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
				this.setState({ project: coll.models[0].toJSON() });
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
				<h1 className="title">{project.title}</h1>
				{ this.renderSubtitle() }
				{ this.renderDates() }
				{ this.renderUrl() }
				{ this.renderBody() }
			</div>
		);
	}

	renderDates() {
		var dates = this.props.project.dates, 
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
		if (this.props.project.subtitle == null) { return; }
		return (<h2 className="subtitle">{'' + this.props.project.subtitle + ''}</h2>);
	}

	renderUrl() {
		var url = this.props.project.url;
		if (url == null) { return; }
		return (
			<a className="main-link" href={url} target="_blank">Project Site</a>
		);
	}

	renderBody() {
		var md = this.props.project.bodyText;
		if (md == null) { return; }
		return (
			<div className="static" dangerouslySetInnerHTML={{ __html: marked(md) }}/>
		);
	}

}

module.exports = Projects;