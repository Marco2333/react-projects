import React from 'react';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Login from './components/login';

import store from './Store';


const getArticles = (location, callback) => {
	require.ensure([], function(require) {
		const {Articles} = require('./components/Articles');
		callback(null, Articles);
	}, 'articles')
}

const getGather = (location, callback) => {
	require.ensure([], function(require) {
		const {Gather} = require('./components/gather');
		callback(null, Gather);
	}, 'gather')
}

const getGossip = (location, callback) => {
	require.ensure([], function(require) {
		const {Gossip} = require('./components/gossip');
		callback(null, Gossip);
	}, 'gossip')
}

const newArticle = (location, callback) => {
	require.ensure([], function(require) {
		const {NewArticle} = require('./containers/NewArticle');
		callback(null, NewArticle);
	}, 'new-article')
}

const articleUpdate = (location, callback) => {
	require.ensure([], function(require) {
		const {ArticleUpdate} = require('./containers/ArticleUpdate');
		callback(null, ArticleUpdate)
	}, 'article-update')
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
	<Router history={history}>
		<Route path='/login' component={Login}/>
		<Route path='/' component={App}>
			<IndexRoute component={Home}/>
			<Route path='home' component={Home}/>
			<Route path='articles' getComponent={getArticles}/>
			<Route path='gather' getComponent={getGather}/>
			<Route path='gossip' getComponent={getGossip}/>
			<Route path='new-article' getComponent={newArticle}/>
			<Route path='article-update/:id' getComponent={articleUpdate}/>
		</Route>
	</Router>
);

export default Routes;