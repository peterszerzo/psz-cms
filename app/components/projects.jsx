var React = require('react'),
	Header = require('./header.jsx'),
	marked = require('marked'),
	moment = require('moment'),
	Logos = require('./logos/project-logos.jsx');

class Projects extends React.Component {

	render() {
		return (
			<div></div>
		);
	}
	
}

Projects.Index = class extends React.Component {
	render() {
		return (
			<div>
				<Header category={this.props.category}/>
				<Projects.Index.List category={this.props.category} projects={this.props.projects}/>
			</div>
		);
	}
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
		return this.props.projects.map((project, index) => {
			return <Projects.Index.List.Item project={project} category={this.props.category} />;
		});
	}

}

Projects.Index.List.Item = class extends React.Component {

	render() {
		var project = this.props.project,
			cls = this.shouldDisplay() ? '' : 'hidden';
		return (
			<li className={cls}>
				<a className="project" href={'/things/' + project.id}>
					{ this.renderBackground() }
					{ this.renderOldBackgroundImage() }
					{ this.renderNewBackgroundImage() }
					<div className="project__title">{project.name}</div>
				</a>
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

	shouldDisplay() {
		var activeCategory = this.props.category,
			categories = this.props.project.categories;
		if (activeCategory === 'all') { return true; }
		if (categories == null) { return false; }
		return (categories.indexOf(activeCategory) > -1);
	}

}

Projects.Show = class extends React.Component {

	render() {
		return (
			<div>
				<Header/>
				<Projects.Show.Item project={this.props.project}/>
			</div>
		);
	}

}

Projects.Show.Item = class extends React.Component {

	render() {
		return (
			<div>
				<h1 className="title">{this.props.project.title}</h1>
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
			return moment(date).format('MMMM YYYY');
		});
		content = formattedDates.join(' - ');
		return (
			<div className='date'>{content}</div>
		);
	}

	renderSubtitle() {
		if (this.props.project.subtitle == null) { return; }
		return (<h2 className="subtitle">{'-- ' + this.props.project.subtitle + ' --'}</h2>);
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