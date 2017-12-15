import React from 'react'
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.hydrate(
	<App initialCount={1} />,
	document.getElementById('root')
);