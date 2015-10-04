import * as React from 'react';
import globe from './../../../assets/scripts/banner_animation/index.js';
import { Link } from 'react-router';

class Banner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: {
				isShowing: false,
				shouldShowOnHover: true
			}
		};
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className="banner fill-parent">
				<div className="banner__background"></div>
				<div className="banner__globe"></div>
				<Link className="banner__summary" to='/projects'>
					<h1>a little room</h1>
					<p>for mindful code, design and writing</p>
				</Link>
				{ this.renderMessage() }
				
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderMessage() {
		var style = this.state.message.isShowing ? { opacity: 0.6 } : { opacity: 0 };
		return (
			<div className="banner__message" style={style}>
				{ 'hey, welcome! click a triangle for random content' }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		this.globeAnimation = globe('geo.json');
		this.globeAnimation.navigateToRandom = this.navigateToRandom.bind(this);
		this.globeAnimation.triggerMessage = this.triggerMessage.bind(this);
		this.globeAnimation.start();
	}

	
	/*
	 *
	 *
	 */
	componentWillUnmount() {
		this.globeAnimation.stop();
	}


	/*
	 *
	 *
	 */
	navigateToRandom() {
		this.context.router.transitionTo('/things/random');
	}


	/*
	 *
	 *
	 */
	getMessageStyle() {
		if (this.state.isMessageShowing) { return { opacity: 0.6 }; }
		return { opacity: 0 };
	}


	/*
	 *
	 *
	 */
	triggerMessage() {

		if (!this.state.message.shouldShowOnHover) { return; }

		this.setState({
			message: {
				isShowing: true,
				shouldShowOnHover: false
			}
		});
		
		setTimeout(() => {
			this.state.message.isShowing = false;
			this.forceUpdate();
		}, 4500);

		setTimeout(() => {
			this.state.message.shouldShowOnHover = true;
			this.forceUpdate();
		}, 9000);

	}

}

Banner.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Banner;