import React from 'react';
import {combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';

import store from './Store.js';

// import App from './containers/App';
import {reducer as navSideReducer, stateKey as navSideSK, initialState as navSideIS} from './components/nav-side';

// const resetNavSideReducer = () => {
//     const state = store.getState();
//     // console.log(combineReducers({
//     //     ...store._reducers,
//     //     [navSideSK]: navSideReducer
//     // }));

//     // store.reset(combineReducers({
//     //     ...store._reducers,
//     //     [navSideSK]: navSideReducer
//     // }), {
//     //     ...state,
//     //     [navSideSK]: navSideIS
//     // });

//     return App;
// }

const getApp = (nextProps, callback) => {
    require.ensure([], function (require) {
        const {Home, reducer, initialState} = require('./containers/App');
        
        // store._reducers = {...store._reducers, ...reducer};
        // store.reset(combineReducers({
        //     ...store._reducers
        // }), {
        //     ...state,
        //     ...initialState
        // });
        // console.log(1234);

        const state = store.getState();
        store.reset(combineReducers({
            ...store._reducers,
            ...reducer
        }), {
            ...initialState,
            ...state
        });

        callback(null, Home);
    }, 'home');
}

const getHomePage = (nextProps, callback) => {
    require.ensure([], function (require) {
        const {Home, reducer, initialState} = require('./containers/Home');
        
        // store._reducers = {...store._reducers, ...reducer};
        // store.reset(combineReducers({
        //     ...store._reducers
        // }), {
        //     ...state,
        //     ...initialState
        // });

        const state = store.getState();
        console.log(state);
        store.reset(combineReducers({
            ...store._reducers,
            ...reducer
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

        // store._reducers = {...store._reducers, ...reducer};
        // store.reset(combineReducers({
        //     ...store._reducers
        // }), {
        //     ...state,
        //     ...initialState
        // });

        const state = store.getState(); 
        store.reset(combineReducers({
            ...store._reducers,
            ...reducer
        }), {
            ...state,
            ...initialState
        });

        callback(null, Artical);
    }, 'artical');
}

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
    <Router history={history}>
        <Route path="/" getComponent={getHomePage}/>
        <Route path="/home" getComponent={getHomePage}/>
        <Route path="/" getComponent={getApp}>
            <Route path="artical" getComponent={getArticalPage}/>
        </Route>
    </Router>
)

export default Routes;