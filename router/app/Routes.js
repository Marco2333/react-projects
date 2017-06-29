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
import Index from './pages/Index.js';
import About from './pages/About.js';
import NotFound from './pages/404.js';
import store from './Store.js';

// const history = syncHistoryWithStore(browserHistory, store);
const history = browserHistory;

const Routes = () => (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path='index' component={Index} />
			<Route path='about' component={About} />
			<Route path='*' component={NotFound} />
		</Route>
	</Router>
)

export default Routes;