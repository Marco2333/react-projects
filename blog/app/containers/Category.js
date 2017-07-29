import React from 'react';

import Articles, {stateKey, reducer as cReducer, initialState as cState} from '../components/articles';

const Category = () => (
	<Articles />
)

const reducer = {
    [stateKey]: cReducer
}

const initialState = {
    [stateKey]: cState
}

export {
    Category, reducer, stateKey, initialState
}