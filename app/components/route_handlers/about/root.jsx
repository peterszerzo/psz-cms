import React from 'react'
import { findDOMNode } from 'react-dom'
import marked from 'marked'

import { Link } from 'react-router'
import text from './text.js'

import Footer from './../../general/footer.jsx'

const GREETINGS = [ 
	'Hello',
	'Sziasztok',
	'Salut',
	'Hallo',
	'Hej'
]

const IMAGE_URL = '/images/me/me_1200.jpg'

export default class About extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			greetingIndex: 0,
			isHeroImageLoaded: false
		}
	}

	render() {
		var heroOverlayStyle = this.state.isHeroImageLoaded ? null : { opacity: '1' }
		return (
			<div className='fill-parent'>
				{ this.renderTestImage() }
				<div className='hero fill-parent'>
					<div className='hero__background' style={this.getHeroBackgroundStyle()} />
					<div className='hero__overlay' style={ heroOverlayStyle } />
					<div className='hero__text'>{ GREETINGS[this.state.greetingIndex] }</div>
				</div>
				<div 
					className='static'
					dangerouslySetInnerHTML={{__html: marked(text, { sanitize: true })}}
				/>
				<Footer />
			</div>
		)
	}

	renderTestImage() {
		return (
			<img
				style={ { opacity: 0.1, width: 10, height: 10, position: 'fixed' } } 
				src={ IMAGE_URL }
				onLoad={this.handleImageLoad.bind(this)} 
			/>
		)
	}

	componentDidMount() {
		this.greetingChangeInterval = setInterval(() => {
			if (this.state.greetingIndex === (GREETINGS.length - 1)) {
				return this.setState({ greetingIndex: 0 });
			}
			this.setState({ greetingIndex: this.state.greetingIndex + 1 });
		}, 2000)
	}

	componentWillUnmount() {
		if (this.greetingChangeInterval) {
			clearInterval(this.greetingChangeInterval)
		}
	}

	getHeroBackgroundStyle() {
		if (this.state.isHeroImageLoaded) {
			return { backgroundImage: `url(${IMAGE_URL})` }
		}
	}

	handleImageLoad() {
		this.setState({ isHeroImageLoaded: true })
	}

}