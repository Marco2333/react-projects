var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require("react-dom/server");

var App = require('../app/App').default;

module.exports = function(props) {
	var content = ReactDOMServer.renderToString(
		<App initialCount={props.initialCount} />
	);

	var html = ReactDOMServer.renderToStaticMarkup(
		<html>
			<head>
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={
					{__html: content}
				} />
				<script src="./bundle.js"></script>
			</body>
		</html>
	);

	return html;
}