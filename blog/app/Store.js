import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import {routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import resetEnhancer from './enhancer/reset.js';

import {reducer as naveSideReducer, stateKey} from './components/nav-side';

let prod = process.env.NODE_ENV === 'producion' ? true : false;

const middlewares = [thunkMiddleware];
const win = window;

const originalReducers = {
    routing: routerReducer,
    [stateKey]: naveSideReducer
}
const reducer = combineReducers(originalReducers);

if (!prod) {
    const Perf = require('react-addons-perf');
    win.Perf = Perf;
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    resetEnhancer, 
    applyMiddleware(...middlewares), 
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
)

const store = createStore(reducer, {}, storeEnhancers);
store._reducers = originalReducers;

export default store;