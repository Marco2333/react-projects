import React from 'react';

import NavSide from '../components/nav-side';
import NavTop from '../components/nav-top';

export default ({children}) => (
	<div className="wrapper">
		<NavTop />
		
		<div className="content">
			<NavSide />
			<div className="main-content">
				{children}
			</div>
		</div>
	</div>
)