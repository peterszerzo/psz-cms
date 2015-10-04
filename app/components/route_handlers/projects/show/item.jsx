import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { Link } from 'react-router';

import Loader from './../../../general/loader.jsx';

class ProjectShowItem extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var project = this.props.project;
		if (project == null) {
			return (
				<Loader />
			);
		}
		return (
			<div className="project-show fill-parent">
				<h1 className="title">{ this.getTitle() }</h1>
				{ this.renderSubtitle() }
				{ this.renderDates() }
				{ this.renderUrl() }
				{ this.renderBody() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderSubtitle() {
		if (this.props.project.get('subtitle') == null) { return; }
		return (<h2 className="subtitle">{'' + this.props.project.get('subtitle') + ''}</h2>);
	}


	/*
	 *
	 *
	 */
	renderUrl() {
		var url = this.props.project.get('url');
		if (url == null) { return; }
		return (
			<a className="main-link" href={url} target="_blank">Project Site</a>
		);
	}


	/*
	 *
	 *
	 */
	renderBody() {
		var md = this.props.project.get('bodyText');
		if (md == null) { return; }
		return (
			<div className="static" dangerouslySetInnerHTML={{ __html: marked(md) }}/>
		);
	}


	/*
	 *
	 *
	 */
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


	/*
	 *
	 *
	 */
	getTitle() {
		var title = this.props.project.get('title');
		if (this.props.project.get('is_draft') === true) {
			title += ' (draft)'
		}
		return title;
	}

}

export default ProjectShowItem;