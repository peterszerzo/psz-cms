var React = require('react'),
	Router = require('react-router'),
	routes = require('./components/routes.jsx');

Router.run(routes, Router.HistoryLocation, (Root, state) => {
	React.render(<Root />, global.document.body);
});