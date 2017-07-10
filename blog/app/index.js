import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';

import Routes from './Routes.js';
import store from './Store.js';

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('react-root')
)