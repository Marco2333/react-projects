import React from 'react';
import {Link} from 'react-router';

import Articles from '../components/articles';

const Home = () => (
	<div>
		<Articles carousel={true} pagination={false} type={1} />
		<div className="block-link">
			<Link to="/article">查看全部文章</Link>
		</div>
	</div>
)

export {
	Home
};