/** @jsx React.DOM */

var React = require('react'),
	Header = require('./header.jsx'),
	marked = require('marked'),
	moment = require('moment');

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
					{ this.renderBackground() }
					<img src={'images/project-logos/project-logos_' + itemData.id + '.svg'}></img>
					<div className="project__title">{itemData.name}</div>
				</a>
			</li>
		);
	},
	renderBackground: function() {
		var itemData = this.props.itemData;
		if (itemData.has_logo !== false) { return; }
		return (
			<div className="project__background">{this.getInitials()}</div>
		);
	},
	// Get project title initials.
	getInitials: function() {
		var title = this.props.itemData.title;
		return title.slice(0, 3);
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
		return (
			<div>
				<h1 className="title">{this.props.item.title}</h1>
				<h2 className="subtitle">{'-- ' + this.props.item.subtitle + ' --'}</h2>
				{ this.renderDates() }
				{ this.renderUrl() }
				{ this.renderBody() }
			</div>
		);
	},

	renderDates: function() {
		var dates = this.props.item.dates, 
			formattedDates, content;
		if (dates == null) { return; }
		formattedDates = dates.map(function(date) {
			if (date === 'present') { return date; }
			return moment(date).format('MMMM YYYY');
		});
		content = formattedDates.join(' - ');
		return (
			<div className='date'>{content}</div>
		);
	},

	renderUrl: function() {
		var url = this.props.item.url;
		if (url == null) { return; }
		return (
			<a className="main-link" href={url} target="_blank">Project Site</a>
		);
	},

	renderBody: function() {
		var md = this.props.item.bodyText;
		if (md == null) { return; }
		return (
			<div className="static" dangerouslySetInnerHTML={{ __html: marked(md) }}/>
		);
	}

});

module.exports = Projects;