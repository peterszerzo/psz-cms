import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';
import project from './../models/project.js';
import marked from 'marked';
import moment from 'moment';
import Logos from './logos/project-logos.jsx';

class Projects extends React.Component {

	render() {
		return (
			<div></div>
		);
	}
	
}

Projects.Index = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	render() {
		return (
			<div>
				<Header category={this.getCategory()}/>
				<Projects.Index.List category={this.getCategory()} projects={this.getProjects()}/>
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

	getProjects() {
		// projects are stored in props if rendered server-side, and on the state if rendered client-side.
		if (this.state.projects != null) { return this.state.projects; }
		return this.props.projects;
	}

	getCategory() {
		return this.props.category || this.props.query.category || 'all';
	}

}

Projects.Index.contextTypes = {
	router: React.PropTypes.func
}

Projects.Index.List = class extends React.Component {

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
			return <Projects.Index.List.Item project={project} category={this.props.category || 'all'} key={index} />;
		});
	}

}

Projects.Index.List.Item = class extends React.Component {

	render() {
		var project = this.props.project,
			cls = this.shouldDisplay() ? '' : 'hidden';
		return (
			<li className={cls}>
				<Link className="project" to={'/things/' + project.id}>
					{ this.renderBackground() }
					{ this.renderOldBackgroundImage() }
					{ this.renderNewBackgroundImage() }
					<div className="project__title">{project.name}</div>
				</Link>
			</li>
		);
	}

	renderBackground() {
		var project = this.props.project;
		if (project.has_logo !== false) { return; }
		return (
			<div className="project__background">{this.getInitials()}</div>
		);
	}

	// Obsolete.
	renderOldBackgroundImage() {
		var project = this.props.project;
		return;
		return (
			<img src={'images/project-logos/project-logos_' + project.id + '.svg'}></img>
		);
	}

	renderNewBackgroundImage() {
		var project = this.props.project,
			id = project.id,
			name = id.split('-').map(function(word) {
				return (word[0].toUpperCase() + word.slice(1));
			}).join(''),
			Comp = Logos[name];
		if (Comp == null) { return <Logos.Neutral className='project__logo' />; }
		return (<Comp className='project__logo' />);
	}

	// Get project title initials.
	getInitials() {
		var title = this.props.project.title;
		return title.slice(0, 3);
	}

	// Specifies whether project should display.
	shouldDisplay() {
		var activeCategory = this.props.category,
			categories = this.props.project.categories;
		if (activeCategory === 'all') { return true; }
		if (categories == null) { return false; }
		return (categories.indexOf(activeCategory) > -1);
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
				<Projects.Show.Item project={ project }/>
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

	getProject() {
		return this.state.project || this.props.project;
	}

}

Projects.Show.Item = class extends React.Component {

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