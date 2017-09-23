import React from 'react';

import Articles from '../components/articles';

const Search = ({params}) => (
	<Articles keyword={params.keyword} />
)

export {
	Search
}