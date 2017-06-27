import {
	createStore,
	applyMiddleware,
	compose,
	combineReducers
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import {
	reducer as weatherReducer
} from './weather/';

const win = window;

const reducer = combineReducers({
	weather: weatherReducer
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
	const Perf = require('react-addons-perf');

	win.Perf = Perf;

	middlewares.push(require('redux-immutable-state-invariant').default())
}

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	(win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
);

export default createStore(reducer, {}, storeEnhancers)