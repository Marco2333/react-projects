import React from 'react';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router';

import {
	syncHistoryWithStore
} from 'react-router-redux';

import App from './pages/App.js';
import store from './Store.js';

const getIndexPage = (nextState, callback) => {
	require.ensure([], function(require) {
		callback(null, require('./pages/Index.js').default);
	}, 'index');
};

const getAboutPage = (nextState, callback) => {
	require.ensure([], function(require) {
		callback(null, require('./pages/About.js').default);
	}, 'about');
};

const getNotFoundPage = (nextState, callback) => {
	require.ensure([], function(require) {
		callback(null, require('./pages/404.js').default);
	}, '404');
};


const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute getComponent={getIndexPage} />
			<Route path='index' getComponent={getIndexPage} />
			<Route path='about' getComponent={getAboutPage} />
			<Route path='*' getComponent={getNotFoundPage} />
		</Route>
	</Router>
)

export default Routes;