import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
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
		document.title = "Marco的个人博客";
		callback(null, Home);
	}, 'home');
}

const getArticlePage = (location, callback) => {
	require.ensure([], function (require) {
		const {Article} = require('./containers/Article');
		
		document.title = "文章列表 - Marco";
		callback(null, Article);
	}, 'article');
}

const getArticleDetailPage = (location, callback) => {
	
	require.ensure([], function (require) {
		const state = store.getState();
		const {ArticleDetail, reducer, initialState, stateKey} = require('./containers/ArticleDetail');
		
		if(!state[stateKey] || state[stateKey] && state[stateKey]['id'] != location['params']['id']) {
			resetState(reducer, initialState, stateKey, {'id': location['params']['id']});
		}
		
		document.title = "文章详情 - Marco";
		callback(null, ArticleDetail);
	}, 'article-detail');
}

const getTimelinePage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {TimeLine, reducer, initialState, stateKey} = require('./containers/Timeline');

		resetState(reducer, initialState, stateKey, {'_cover': false});
		
		document.title = "文章归档 - Marco";
		callback(null, TimeLine);
	}, 'timeline');
}

const getSearchPage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {Search} = require('./containers/Search');
		
		document.title = "搜索结果 - Marco";
		callback(null, Search);
	}, 'search');
}

const getCategoryPage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {Category} = require('./containers/Category');
		
		document.title = "文章分类 - Marco";
		callback(null, Category);
	}, 'category');
}

const getTagPage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {Tag} = require('./containers/Tag');

		document.title = "文章标签 - Marco";
		callback(null, Tag);
	}, 'tag');
}

const getGatherPage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {Gather, reducer, initialState, stateKey} = require('./containers/Gather');

		resetState(reducer, initialState, stateKey, {'_cover': false});
		
		document.title = "点点滴滴 - Marco";
		callback(null, Gather);
	}, 'gather');
}

const getGossipPage = (location, callback) => {
		
	require.ensure([], function (require) {
		const {Gossip, reducer, initialState, stateKey} = require('./containers/Gossip');

		resetState(reducer, initialState, stateKey, {'_cover': false});

		document.title = "碎言碎语 - Marco";
		callback(null, Gossip);
	}, 'gossip');
}

const history = syncHistoryWithStore(browserHistory, store);

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