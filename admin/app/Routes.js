import React from 'react';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Login from './components/login';
import App from './containers/App';
import Home from './containers/Home';

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
		</Route>
	</Router>
);

export default Routes;