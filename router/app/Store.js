import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware
} from 'redux';

import {
	routerReducer
} from 'react-router-redux';

import resetEnhancer from './enhancer/reset.js';

let prod = process.env.NODE_ENV === 'produciton' ? true : false;

const middlewares = [];
const win = window;

const originalReducers = {
	routing: routerReducer
}

const reducer = combineReducers(originalReducers);

if (!prod) {
	const Perf = require('react-addons-perf');

	win.Perf = Perf;

	middlewares.push(require('redux-immutable-state-invariant').default())
}

const storeEnhancers = compose(
	resetEnhancer,
	applyMiddleware(...middlewares),
	(win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
)

const store = createStore(reducer, {}, storeEnhancers);
store._reducers = originalReducers;

export default createStore(reducer, {}, storeEnhancers);