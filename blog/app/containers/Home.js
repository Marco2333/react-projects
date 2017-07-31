import React from 'react';

import Articles from '../components/articles';

const Home = () => (
	<Articles carousel={true} pagination={false} type={1} />
)

export {
    Home
}