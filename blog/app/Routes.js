import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import store from './Store.js';
import App from './containers/App';


const resetState = (reducer, initialState, stateKey, setting = {}) => {
	const state = store.getState();

	store._reducers = {...store._reducers, ...reducer};

	let {_cover = true, ...params} = setting,
		currentState = _cover ? {...state, ...initialState} : {...initialState, ...state};

	currentState[stateKey] = {...currentState[stateKey], ...params};
	
	store.reset(combineReducers({
		...store._reducers
	}), {
		...currentState
	});
}

const getHomePage = (location, callback) => {
    require.ensure([], function (require) {
		const {Home} = require('./containers/Home.js');
		
        callback(null, Home);
    }, 'home');
}

const getArticlePage = (location, callback) => {
    require.ensure([], function (require) {
        const {Article} = require('./containers/Article');
        
        callback(null, Article);
    }, 'article');
}

const getArticleDetailPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {ArticleDetail, reducer, initialState, stateKey} = require('./containers/ArticleDetail');

		resetState(reducer, initialState, stateKey, {'id': location['params']['id']});
        
        callback(null, ArticleDetail);
    }, 'article-detail');
}

const getTimelinePage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {TimeLine, reducer, initialState, stateKey} = require('./containers/Timeline');

		resetState(reducer, initialState, stateKey, {'_cover': false});
        
        callback(null, TimeLine);
    }, 'timeline');
}

const getSearchPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {Search} = require('./containers/Search');
        
        callback(null, Search);
    }, 'search');
}

const getCategoryPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {Category} = require('./containers/Category');
        
        callback(null, Category);
    }, 'category');
}

const getTagPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {Tag} = require('./containers/Tag');
        
        callback(null, Tag);
    }, 'tag');
}

const getGatherPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {Gather, reducer, initialState, stateKey} = require('./containers/Gather');

		resetState(reducer, initialState, stateKey, {'_cover': false});
        
        callback(null, Gather);
    }, 'gather');
}

const getGossipPage = (location, callback) => {
    
    require.ensure([], function (require) {
        const {Gossip, reducer, initialState, stateKey} = require('./containers/Gossip');

		resetState(reducer, initialState, stateKey, {'_cover': false});

        callback(null, Gossip);
    }, 'gossip');
}

const history = syncHistoryWithStore(hashHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" breadcrumbName="首页" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route name="home" path="/home" getComponent={getHomePage}/>
            <Route name="article" breadcrumbName="文章" path="article" getComponent={getArticlePage} />
            <Route name="article-detail" breadcrumbName="文章详情" path="article-detail/:id" getComponent={getArticleDetailPage}/>
            <Route name="timeline" breadcrumbName="Timeline" path="timeline" getComponent={getTimelinePage} />
            <Route name="search" breadcrumbName="Search" path="search/:keyword" getComponent={getSearchPage} />
            <Route name="category" breadcrumbName="Category" path="category/:id" getComponent={getCategoryPage} />
			<Route name="tag" breadcrumbName="标签" path="tag/:tag" getComponent={getTagPage} />
			<Route name="gather" breadcrumbName="点滴" path="gather" getComponent={getGatherPage} />
			<Route name="gossip" breadcrumbName="慢生活" path="gossip" getComponent={getGossipPage} />
        </Route>
    </Router>
)

export default Routes;