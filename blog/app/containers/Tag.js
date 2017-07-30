import React from 'react';

import Articles, {stateKey, reducer as articleReducer, initialState as articleState} from '../components/articles';

const Tag = () => (
	<Articles />
)

const reducer = {
    [stateKey]: articleReducer
}

const initialState = {
    [stateKey]: articleState
}

export {
    Tag, reducer, stateKey, initialState
}