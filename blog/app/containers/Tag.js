import React from 'react';

import Articles from '../components/articles';

const Tag = ({params}) => (
	<Articles tag={params.tag} />
)

export {
    Tag
}