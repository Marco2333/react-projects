import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import App from './App.js';

import store from './Store.js';

import "./style.css";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);