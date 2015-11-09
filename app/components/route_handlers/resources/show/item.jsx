import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { Link } from 'react-router';

import Loader from './../../../general/loader.jsx';

class ShowItem extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var resource = this.props.resource;
		if (resource == null) {
			return (
				<Loader />
			);
		}
		return (
			<div className="project-show">
				<h1 className="title">{ this.getTitle() }</h1>
				{ this.renderHeadline() }
				{ this.renderDates() }
				{ this.renderLinks() }
				{ this.renderBody() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderHeadline() {
		var headline = this.props.resource.get('headline');
		if (!headline) { return; }
		return (<h2 className="headline">{ headline }</h2>);
	}


	/*
	 *
	 *
	 */
	renderLinks() {
		var links = this.props.resource.get('links');
		if (!links) { return; }
		var linksComps = links.map((link, i) => {
			return (
				<li><a className="link" href={link.url} target="_blank">{link.name}</a></li>
			);
		});
		return (
			<ul className='project-show__links'>
				{ linksComps }
			</ul>
		);
	}


	/*
	 *
	 *
	 */
	renderBody() {
		var md = this.props.resource.get('body_text');
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
		var dates = this.props.resource.get('dates'), 
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
		var title = this.props.resource.get('title');
		if (this.props.resource.get('is_draft') === true) {
			title += ' (draft)'
		}
		return title;
	}

}

export default ShowItem;