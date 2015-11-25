import React from 'react'
import { findDOMNode } from 'react-dom'
import marked from 'marked'

import { Link } from 'react-router'
import text from './text.js'

import { Header } from './../../general/header.jsx'

var greetings = [ 
	'Hello',
	'Sziasztok',
	'Salut',
	'Hallo',
	'Hej'
]

var imageUrl = '/images/me/me_1200.jpg'

/*
 *
 *
 */
class About extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {
			greetingIndex: 0,
			isHeroImageLoaded: false
		}
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='fill-parent'>
				{ this.renderTestImage() }
				<div className='hero fill-parent'>
					<div className='hero__background' style={this.getHeroBackgroundStyle()} />
					<div className='hero__overlay' style={{ opacity: this.state.isHeroImageLoaded ? '0.6' : '0.8' }} />
					<div className='hero__text'>{ greetings[this.state.greetingIndex] }</div>
				</div>
				<div 
					className='static'
					dangerouslySetInnerHTML={{__html: marked(text, { sanitize: true })}}
				/>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	renderTestImage() {
		return (
			<img
				style={ { opacity: 0.1, width: 10, height: 10, position: 'fixed' } } 
				src={ imageUrl }
				onLoad={this.handleImageLoad.bind(this)} 
			/>
		)
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		this.greetingChangeInterval = setInterval(() => {
			if (this.state.greetingIndex === (greetings.length - 1)) {
				return this.setState({ greetingIndex: 0 });
			}
			this.setState({ greetingIndex: this.state.greetingIndex + 1 });
		}, 2000)
	}


	/*
	 *
	 *
	 */
	componentWillUnmount() {
		if (this.greetingChangeInterval) {
			clearInterval(this.greetingChangeInterval)
		}
	}


	/*
	 *
	 *
	 */
	getHeroBackgroundStyle() {
		if (this.state.isHeroImageLoaded) {
			return { backgroundImage: `url(${imageUrl})` }
		}
	}


	/*
	 *
	 *
	 */
	handleImageLoad() {
		this.setState({ isHeroImageLoaded: true })
	}

}

export default About