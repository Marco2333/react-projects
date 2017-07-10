import React from 'react';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router';

import {
	combineReducers
} from 'redux';

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

const getCounterPage = (nextState, callback) => {
	require.ensure([], function(require) {
		const {
			page,
			reducer,
			stateKey,
			initialState
		} = require('./pages/CounterPage.js');

		const state = store.getState();
		store.reset(combineReducers({
			...store._reducers,
			[stateKey]: reducer
		}), {
			...state,
			[stateKey]: initialState
		});
		callback(null, page);
	}, 'counter');
};


const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute getComponent={getIndexPage} />
			<Route path='index' getComponent={getIndexPage} />
			<Route path='about' getComponent={getAboutPage} />
			<Route path='counter' getComponent={getCounterPage} />
			<Route path='*' getComponent={getNotFoundPage} />
		</Route>
	</Router>
)

export default Routes;