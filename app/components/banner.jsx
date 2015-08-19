var React = require('react'),
	globe = require('./../assets/script/globe.js');

var data = [ 
	{ url: '/things?category=code', name: 'mindful code' },  
	{ url: '/things?category=design', name: 'minimal design' }
];

class Banner extends React.Component {

	constructor() {
		super();
		this.state = {
			data: [ 
				{ url: '/things?category=code', name: 'mindful code' },  
				{ url: '/things?category=design', name: 'minimal design' }
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
					<a href={item.url}>{item.name}</a>
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