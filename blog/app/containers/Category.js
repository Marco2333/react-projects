import React from 'react';

import Articles from '../components/articles';

const Category = ({params}) => (
	<Articles category={params.id} />
)

export {
    Category
}