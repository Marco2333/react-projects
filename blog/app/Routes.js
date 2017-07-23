import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';

import store from './Store.js';

import App from './containers/App';

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

const getArticalDetailPage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {ArticalDetail, reducer, initialState, stateKey} = require('./containers/ArticalDetail');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        let currState = {...initialState, ...state};

        currState[stateKey] ? 
        currState[stateKey] = {...currState[stateKey], id: nextProps['params']['id']}
        : currState[stateKey] = {id: nextProps['params']['id']};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...currState
        });
        
        callback(null, ArticalDetail);
    }, 'artical-detail');
}

const getArticalDetailPage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {ArticalDetail, reducer, initialState, stateKey} = require('./containers/ArticalDetail');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        let currState = {...initialState, ...state};

        currState[stateKey] ? 
        currState[stateKey] = {...currState[stateKey], id: nextProps['params']['id']}
        : currState[stateKey] = {id: nextProps['params']['id']};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...currState
        });
        
        callback(null, ArticalDetail);
    }, 'artical-detail');
}

const history = syncHistoryWithStore(hashHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" breadcrumbName="首页" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route name="home" path="/home" getComponent={getHomePage}/>
            <Route name="artical" breadcrumbName="文章" path="artical" getComponent={getArticalPage} />
            <Route name="artical-detail" breadcrumbName="文章详情" path="artical-detail/:id" getComponent={getArticalDetailPage}/>
            <Route name="time-line" breadcrumbName="时间线" path="timeline" getComponent={getTimelinePage} />
        </Route>
    </Router>
)

export default Routes;