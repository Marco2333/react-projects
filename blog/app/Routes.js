import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

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

const getTimelinePage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {TimeLine, reducer, initialState, stateKey} = require('./containers/Timeline');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...initialState, 
            ...state
        });
        
        callback(null, TimeLine);
    }, 'timeline');
}

const getSearchPage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {Search, reducer, initialState, stateKey} = require('./containers/Search');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        let currState = {...initialState, ...state};

        currState[stateKey] ? 
        currState[stateKey] = {...currState[stateKey], keyword: nextProps['params']['keyword']}
        : currState[stateKey] = {keyword: nextProps['params']['keyword']};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...currState
        });
        
        callback(null, Search);
    }, 'search');
}

const getCategoryPage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {Category, reducer, initialState, stateKey} = require('./containers/Category');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        let currState = {...initialState, ...state};

        currState[stateKey] ? 
        currState[stateKey] = {...currState[stateKey], category: nextProps['params']['id']}
        : currState[stateKey] = {category: nextProps['params']['id']};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...currState
        });
        
        callback(null, Category);
    }, 'category');
}

const getTagPage = (nextProps, callback) => {
    
    require.ensure([], function (require) {
        const {Tag, reducer, initialState, stateKey} = require('./containers/Tag');

        const state = store.getState(); 

        store._reducers = {...store._reducers, ...reducer};

        let currState = {...initialState, ...state};

        currState[stateKey] ? 
        currState[stateKey] = {...currState[stateKey], tag: nextProps['params']['tag']}
        : currState[stateKey] = {tag: nextProps['params']['tag']};

        store.reset(combineReducers({
            ...store._reducers
        }), {
            ...currState
        });
        
        callback(null, Tag);
    }, 'tag');
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" breadcrumbName="首页" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route name="home" path="/home" getComponent={getHomePage}/>
            <Route name="artical" breadcrumbName="文章" path="artical" getComponent={getArticalPage} />
            <Route name="artical-detail" breadcrumbName="文章详情" path="artical-detail/:id" getComponent={getArticalDetailPage}/>
            <Route name="timeline" breadcrumbName="Timeline" path="timeline" getComponent={getTimelinePage} />
            <Route name="search" breadcrumbName="Search" path="search/:keyword" getComponent={getSearchPage} />
            <Route name="category" breadcrumbName="Category" path="category/:id" getComponent={getCategoryPage} />
            <Route name="tag" breadcrumbName="标签" path="tag/:tag" getComponent={getTagPage} />
        </Route>
    </Router>
)

export default Routes;