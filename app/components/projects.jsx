/** @jsx React.DOM */

var React = require('react'),
	Header = require('./mixins/header.jsx'),
	marked = require('marked');

var Projects = React.createClass({
	render: function() {
		return (
			<div></div>
		);
	}
});

Projects.Index = React.createClass({
	render: function() {
		return (
			<div>
				<Header/>
				<Projects.List items={this.props.items}/>
			</div>
		);
	}
});

Projects.List = React.createClass({
	render: function() {
		var createItem = function(itemData, index) {
			return <Projects.List.Item itemData={itemData}/>;
		};
		return (
			<ul className="projects">
				{this.props.items.map(createItem)}
			</ul>
		);
	}
});

Projects.List.Item = React.createClass({
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

Projects.Show = React.createClass({
	render: function() {
		return (
			<div>
				<Header/>
				<Projects.Show.Item item={this.props.item}/>
			</div>
		);
	}
});

Projects.Show.Item = React.createClass({
	render: function() {
		return (
			<div>
				<h1 className="title">{this.props.item.title}</h1>
				<h2 className="subtitle">{this.props.item.subtitle}</h2>
				<div 
					className="static"
					dangerouslySetInnerHTML={{
						__html: this.props.item.bodyText
					}}/>
			</div>
		);
	}
});

module.exports = Projects;