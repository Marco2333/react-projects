import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware
} from 'redux';

import {
	routerReducer
} from 'react-router-redux';


let prod = process.env.NODE_ENV === 'produciton' ? true : false;

const middlewares = [];
const win = window;

const reducer = combineReducers({
	routing: routerReducer
});

if (!prod) {
	const Perf = require('react-addons-perf');

	win.Perf = Perf;

	middlewares.push(require('redux-immutable-state-invariant').default())
}

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	(win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
)

export default createStore(reducer, {}, storeEnhancers);