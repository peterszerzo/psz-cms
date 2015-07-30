var React = require('react');

var comp = {
	Banner: require('./banner.jsx'),
	Header: require('./header.jsx'),
	Projects: require('./projects.jsx')
}

class Layout extends React.Component {

	constructor() {
		super();
	}

	render() {
		console.dir(this.props);
		return (
			<div className='wrapper fill-parent'>
				{ this.getRoutable() }
			</div>
		);
	}

	// Splits class name by . and goes down the tree to get component.
	getRoutableComponent() {
		var arr = this.props.routableSubcomponentClassName.split('.'),
			Comp = comp;
		arr.forEach(function(el) {
			Comp = Comp[el];
		});
		return Comp;
	}

	getRoutable() {
		var Comp = this.getRoutableComponent();
		return (<Comp />);
	}

	componentDidMount() {
		this.props.routableSubcomponentProps;
	}

}

module.exports = Layout;