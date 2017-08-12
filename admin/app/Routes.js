import React from 'react';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Login from './components/login';
import App from './containers/App';
import Home from './containers/Home';

import store from './Store';


const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
	<Router history={history}>
		<Route path='/login' component={Login}/>
		<Route path='/' component={App}>
			<Route path='home' component={Home}/>
		</Route>
	</Router>
);

export default Routes;