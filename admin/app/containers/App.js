import React from 'react';

import NavSide from '../components/nav-side';
import NavTop from '../components/nav-top';

export default () => (
	<div className="wrapper">
		<NavTop />
		
		<div className="content">
			<NavSide />
			<div className="main-content">
				
			</div>
		</div>
	</div>
)