import 'whatwg-fetch';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import Promise from 'promise-polyfill';

import store from './Store.js';
import Routes from './Routes.js';


if (!window.Promise) {
	window.Promise = Promise;
}

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('react-root')
)