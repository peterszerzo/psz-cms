import React from 'react';
import { Link } from 'react-router';
import Header from './../../general/header.jsx';
import project from './../../../models/project.js';
import marked from 'marked';
import moment from 'moment';
import Logos from './../../general/project_logos.jsx';

class Show extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	render() {
		var project = this.getProject();
		return (
			<div className='wrapper__content'>
				<Header/>
				<ProjectShowItem project={ project }/>
			</div>
		);
	}

	// If project was passed down in props, no need to fetch again.
	componentDidMount() {
		if (this.getProject() == null) {
			this.fetchProject();
		}
	}

	// Always fetch on update.
	componentDidUpdate() {
		this.fetchProject();
	}

	fetchProject() {
		var coll, promise, id;
		id = this.props.params.id;
		coll = new project.Collection();
		promise = coll.getFetchPromise({ id: id });
		promise.then((coll) => {
			this.setState({ project: coll.models[0] });
		}, () => { console.log('promise rejected'); });
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
				<h1 className="title">{ this.getTitle() }</h1>
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

	getTitle() {
		var title = this.props.project.get('title');
		if (this.props.project.get('is_draft') === true) {
			title += ' (draft)'
		}
		return title;
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

export default Show;