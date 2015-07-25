/** @jsx React.DOM */

var React = require('react'),
	Header = require('./header.jsx'),
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
				<Header category={this.props.category}/>
				<Projects.Index.List items={this.props.items}/>
			</div>
		);
	}
});

Projects.Index.List = React.createClass({
	render: function() {
		var createItem = function(itemData, index) {
			return <Projects.Index.List.Item itemData={itemData}/>;
		};
		return (
			<ul className="projects">
				{this.props.items.map(createItem)}
			</ul>
		);
	}
});

Projects.Index.List.Item = React.createClass({
	render: function() {
		var itemData = this.props.itemData;
		return (
			<li>
				<a className="project" href={'/things/' + itemData.id}>
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
		var url;
		if (this.props.item.url != null) {
			url = <a className="project-site" href={this.props.item.url} target="_blank">Project Site</a>;
		}
		return (
			<div>
				<h1 className="title">{this.props.item.title}</h1>
				<h2 className="subtitle">{this.props.item.subtitle}</h2>
				{url}
				<div className="static" dangerouslySetInnerHTML={{ __html: this.props.item.bodyText }}/>
			</div>
		);
	}
});

module.exports = Projects;