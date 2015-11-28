import React from 'react'

const links = [
	{
		name: 'GitHub',
		url: 'https://github.com/pickled-plugins'
	},
	{
		name: 'SoundCloud',
		url: 'https://soundcloud.com/bbo-listen'
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/peterszerzo'
	},
	{
		name: 'Couchsurfing',
		url: 'https://www.couchsurfing.com/people/mighty-comfortable'
	}
]

const messages = [
	'Water your plants',
	'Talk about your feelings',
	'Say hi to your neighbor'
]


/*
 *
 *
 */
class Footer extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.changeMessage = this.changeMessage.bind(this)
		this.state = { activeMessageIndex: 0 }
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<footer className='footer'>
				<div className='footer__background' />
				<div className='footer__overlay' style={{  }} />
				<div className='footer__links'>
					{ this.renderLinks() }
				</div>
				<div className='footer__messages'>
					<p>{ messages[this.state.activeMessageIndex] }</p>
				</div>
			</footer>
		)
	}


	/*
	 *
	 *
	 */
	renderLinks() {
		return links.map((link, i) => {
			var { name, url } = link
			return <a key={i} className='link' href={url}>{name}</a>
		})
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		this.changeInterval = setInterval(this.changeMessage, 2500)
	}


	/*
	 *
	 *
	 */
	componentWillUnmount() {
		clearInterval(this.changeInterval)
	}


	/*
	 *
	 *
	 */
	changeMessage() {
		var i = this.state.activeMessageIndex, n = messages.length
		if (i === n - 1) { return this.setState({ activeMessageIndex: 0 }) }
		this.setState({ activeMessageIndex: i + 1 })
	}

}

export default Footer