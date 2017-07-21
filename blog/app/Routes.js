import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';

import store from './Store.js';

import App from './containers/App';
import {reducer as navSideReducer, stateKey as navSideSK, initialState as navSideIS} from './components/nav-side';

const getHomePage = (nextProps, callback) => {
    require.ensure([], function (require) {
        const {Home, reducer, initialState} = require('./containers/Home');
        
        const state = store.getState();

        store._reducers = {...store._reducers, ...reducer};
        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...initialState,
            ...state
        });
        
        callback(null, Home);
    }, 'home');
}

const getArticalPage = (nextProps, callback) => {
    require.ensure([], function (require) {
        const {Artical, reducer, initialState} = require('./containers/Artical');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...initialState,
            ...state
        });

        callback(null, Artical);
    }, 'artical');
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute getComponent={getHomePage}/>
            <Route path="home" getComponent={getHomePage}/>
            <Route path="artical" getComponent={getArticalPage}/>
        </Route>
    </Router>
)

export default Routes;