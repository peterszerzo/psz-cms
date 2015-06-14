/** @jsx React.DOM */

var React = require('react');

var Projects = React.createClass({
	render: function() {
		var createItem = function(itemData, index) {
			return <Project itemData={itemData}></Project>;
		};
		return (
			<ul className="projects">
				{this.props.items.map(createItem)}
			</ul>
		);
	}
});

var Project = React.createClass({
	render: function() {
		var itemData = this.props.itemData;
		return (
			<li>
				<a className="project" href={'projects/' + itemData.id}>
					<img src={'images/project-logos/project-logos_' + itemData.id + '.svg'}></img>
					<div>{itemData.name}</div>
				</a>
			</li>
		);
	}
});

module.exports = Projects;