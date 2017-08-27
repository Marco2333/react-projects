import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import {routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import resetEnhancer from './enhancer/reset.js';

let prod = process.env.NODE_ENV === 'production' ? true : false;

const middleware = [thunkMiddleware];
const win = window;

const originalReducers = {
    routing: routerReducer
}
const reducer = combineReducers(originalReducers);

if (!prod) {
    const Perf = require('react-addons-perf');
    win.Perf = Perf;
    // middleware.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    resetEnhancer, 
    applyMiddleware(...middleware), 
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
)

const store = createStore(reducer, {}, storeEnhancers);
store._reducers = originalReducers;

export default store;