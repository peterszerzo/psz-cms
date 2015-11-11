import React from 'react'
import marked from 'marked'

import { Link } from 'react-router'
import text from './text.js'

import Header from './../../general/header.jsx'

var greetings = [
	'Hello',
	'Sziasztok',
	'Salut',
	'Hallo',
	'Hej'
]

class About extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {
			greetingIndex: 0,
			scrollTop: 0,
			hasImageLoaded: false,
			heroHeight: window.innerHeight
		}
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div 
				className='wrapper__content fill-parent' 
				style={{paddingTop: 0}} 
				onScroll={this.handleScroll.bind(this)}
			>
				<Header activeLinkName='about' isTransparent={ this.state.scrollTop < this.state.heroHeight - 80 } />
				<img 
					style={ { opacity: 0.1, width: 10, height: 10, position: 'fixed' } } 
					src='/images/me/me_1200.jpg' 
					onLoad={this.handleImageLoad.bind(this)} 
				/>
				<div className='hero' style={this.getHeroStyle()}>
					<div className='hero__overlay' style={{ opacity: this.state.hasImageLoaded ? null : '0.9' }} />
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
	getHeroStyle() {
		if (!this.state.hasImageLoaded) { 
			return { 
				backgroundColor: '#101C29',
				height: this.state.heroHeight
			}
		}
		return {
			backgroundImage: 'url(/images/me/me_1200.jpg)',
			height: this.state.heroHeight
		}
	}


	/*
	 *
	 *
	 */
	handleScroll(e) {
		var node = React.findDOMNode(this)
		this.setState({ scrollTop: node.scrollTop })
	}


	/*
	 *
	 *
	 */
	handleImageLoad() {
		this.setState({ hasImageLoaded: true })
	}

}

export default About