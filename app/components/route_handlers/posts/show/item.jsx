import React from 'react'
import marked from 'marked'
import moment from 'moment'
import { Link } from 'react-router'

import { Loader } from './../../../general/loader.jsx'


/*
 * Render a list of links.
 *
 */
function Links(props) {
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
function Dates(props) {

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

	var { resource, scrollRatio } = props
	
	if (resource == null) { return <Loader /> }

	var imageUrl = `/images/posts/${resource.id}/hero.jpg`

	var { headline, links, body_text, dates, title } = resource

	let body

	if (body_text) {
		body = <div className="static" dangerouslySetInnerHTML={{ __html: marked(body_text) }}/>
	}

	var { isHeroImageLoaded } = props

	var heroOverlayOpacity = isHeroImageLoaded ? '0.7' : '1'

	var heroBackgroundStyle = isHeroImageLoaded ? { 
		backgroundImage: `url('${imageUrl}')`
	} : null

	return (
		<div className="project-show fill-parent">
			<div className='hero fill-parent'>
				<div className='hero__background hero__background--blurred' style={ heroBackgroundStyle } />
				<div className='hero__overlay' style={{ opacity: heroOverlayOpacity }}/>
				<div className='hero__top-bar'>
					<Dates dates={ dates } />
				</div>
				<div className='hero__title-bar'>
					<div className='hero__title-bar__content'>
						<h1 className="title">{ title }</h1>
						<h2 className='headline'>{ headline }</h2>
					</div>
				</div>
				<div className='hero__nav-bar'>
					<Links links={ links } />
				</div>
			</div>
			{ body }
		</div>
	)

}

export default ShowItem