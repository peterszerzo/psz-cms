import * as React from 'react';
import globe from './../assets/script/globe.js';
import { Link } from 'react-router';

class Banner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [ 
				{ url: '/things?type=project', name: 'mindful code' },  
				{ url: '/things?type=project', name: 'minimal design' }
			]
		};

	}

	render() {
		return (
			<div className="banner fill-parent">
				<div className="banner__globe"></div>
				<ul className="banner__summary">
					{ this._renderList() }
				</ul>
				<div className="banner__message">hey, welcome! let me surprise you</div>
			</div>
		);
	}

	_renderList() {
		return this.state.data.map(function(item) {
			return (
				<li>
					<Link to={item.url}>{item.name}</Link>
				</li>
			);
		});
	}

	navigateToRandom() {
		this.context.router.transitionTo('/things/random');
	}

	componentDidMount() {
		this.globeAnimation = globe('geo.json');
		this.globeAnimation.navigateToRandom = this.navigateToRandom.bind(this);
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