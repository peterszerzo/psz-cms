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
				<Projects.Index.List category={this.props.category} items={this.props.items}/>
			</div>
		);
	}
});

Projects.Index.List = React.createClass({
	render: function() {
		var self = this,
			createItem = function(itemData, index) {
			return <Projects.Index.List.Item itemData={itemData} category={self.props.category} />;
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
		var itemData = this.props.itemData,
			cls = this.shouldDisplay() ? '' : 'hidden';
		return (
			<li className={cls}>
				<a className="project" href={'/things/' + itemData.id}>
					<img src={'images/project-logos/project-logos_' + itemData.id + '.svg'}></img>
					<div>{itemData.name}</div>
				</a>
			</li>
		);
	},
	shouldDisplay: function() {
		var activeCategory = this.props.category,
			categories = this.props.itemData.categories;
		return ((activeCategory === 'all') || (categories.indexOf(activeCategory) > -1));
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
		var url = this.props.item.url, md, html;
		md = this.props.item.bodyText;
		if (md == null) { html = ""; } else { html = marked(md); }
		if (this.props.item.url != null) {
			url = <a className="project-site" href={this.props.item.url} target="_blank">Project Site</a>;
		}
		return (
			<div>
				<h1 className="title">{this.props.item.title}</h1>
				<h2 className="subtitle">{this.props.item.subtitle}</h2>
				{url}
				<div className="static" dangerouslySetInnerHTML={{ __html: html }}/>
			</div>
		);
	}
});

module.exports = Projects;