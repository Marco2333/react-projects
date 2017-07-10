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

import store from './Store.js';

const getHomePage = (nextProps, callback) => {
	require.ensure([], function(require) {
		callback(null, require('./containers/Home.js').default);
	}, 'home');
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
	<Router history={history}>
		<Route path="/" getComponent={getHomePage} />
		<Route path="home" getComponent={getHomePage} />
	</Router>
)

export default Routes;