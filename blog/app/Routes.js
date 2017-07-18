import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';

import store from './Store.js';

const getHomePage = (nextProps, callback) => {
    require.ensure([], function (require) {
        const {Home, reducer, stateKey, initialState} = require('./containers/Home.js');

        const state = store.getState();
        store.reset(combineReducers({
            ...store._reducers,
            [stateKey]: reducer
        }), {
            ...state,
            [stateKey]: initialState
        });

        callback(null, Home);
    }, 'home');
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" getComponent={getHomePage}/>
        <Route path="home" getComponent={getHomePage}/>
    </Router>
)

export default Routes;