import React from 'react'
import marked from 'marked'
import moment from 'moment'
import { Link } from 'react-router'

import { Loader } from './../../../general/loader.jsx'


/*
 * Render a list of links.
 *
 */
var Links = (props) => {
	var { links } = props
	if (!links) { return <div/> }
	var linksComps = links.map((link, i) => {
		return (
			<li key={i}>
				<a
					className="link" 
					href={link.url} 
					target="_blank"
				>
					{link.name}
				</a>
			</li>
		)
	});
	return (
		<ul className='project-show__links'>
			{ linksComps }
		</ul>
	)
}



/*
 * Render a dash-formatted date pair.
 *
 */
var Dates = (props) => {

	var { dates } = props

	if (dates == null) { return <div/> }
	let formattedDates = dates.map(function(date) {
		if (date === 'present') { return date }
		return moment(date, 'YYYY-MM').format('MMMM YYYY');
	})
	let content = formattedDates.join(' - ')

	return (
		<div className='date'>{ content }</div>
	)

}


/*
 *
 *
 */
function ShowItem(props) {

	var { resource } = props
	
	if (resource == null) { return <Loader /> }

	var { headline, links, body_text, dates, title, is_draft } = resource

	let body

	if (body_text) {
		body = <div className="static" dangerouslySetInnerHTML={{ __html: marked(body_text) }}/>
	}

	if (is_draft === true) {
		title += ' (draft)'
	}

	return (
		<div className="project-show">
			<h1 className="title">{ title }</h1>
			<h2 className='headline'>{ headline }</h2>
			<Dates dates={ dates } />
			<Links links={ links } />
			{ body }
		</div>
	)

}

export default ShowItem