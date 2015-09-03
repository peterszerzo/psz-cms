import * as React from 'react';
import globe from './../assets/script/globe.js';
import { Link } from 'react-router';

class Banner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			wasMessageTriggered: false,
			isMessageShowing: false
		};
	}

	render() {
		return (
			<div className="banner fill-parent">
				<div className="banner__background"></div>
				<div className="banner__globe"></div>
				<div className="banner__summary">
					<div>
						<Link to='/things?type=project'>
							a little room
						</Link>
						<Link to='/things?type=project'>
							for some mindful code, design and writing
						</Link>
					</div>
				</div>
				<div className="banner__message" style={this.getMessageStyle()}>hey, welcome! click a triangle for random content</div>
			</div>
		);
	}

	navigateToRandom() {
		this.context.router.transitionTo('/things/random');
	}

	getMessageStyle() {
		if (this.state.isMessageShowing) { return { opacity: 0.6 }; }
		return { opacity: 0 };
	}

	triggerMessage() {
		if (this.state.wasMessageTriggered) { return; }
		this.setState({
			wasMessageTriggered: true,
			isMessageShowing: true
		});
		setTimeout(() => {
			this.setState({ isMessageShowing: false });
		}, 4500);
	}

	componentDidMount() {
		this.globeAnimation = globe('geo.json');
		this.globeAnimation.navigateToRandom = this.navigateToRandom.bind(this);
		this.globeAnimation.triggerMessage = this.triggerMessage.bind(this);
		this.globeAnimation.start();
	}

	componentWillUnmount() {
		this.globeAnimation.stop();
	}

}

Banner.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Banner;